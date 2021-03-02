const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

import Cors from "cors";

const getScreenshot = async ({ url, width, height, scale, full, isTweet }) => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath, // comment this line when working on localhost
    headless: chrome.headless, // comment this line when working on localhost
    //executablePath: "./node_modules/puppeteer/.local-chromium/win64-856583/chrome-win/chrome.exe", //uncomment this line when working on localhost
  });

  const options = { encoding: "base64", fullPage: full };
  const page = await browser.newPage();
  let buffer;

  if (isTweet) {
    await page.setViewport({
      width: 767,
      height: 800,
      deviceScaleFactor: 2,
    });
    const tUrl = `https://publish.twitter.com/?query=${url}&widget=Tweet`;
    await page.goto(tUrl, { waitUntil: "networkidle2" });
    await page.waitForTimeout(3000);
    await page.evaluate((sel) => {
      const elem = document.querySelector(sel);
      elem.parentNode.removeChild(elem);
    }, "body #top");
    const selector = "body #WidgetConfigurator-preview .twitter-tweet";
    await page.waitForSelector(selector); // wait for the selector to load
    const element = await page.$(selector); // declare a variable with an ElementHandle
    buffer = await element.screenshot(options);
  } else {
    await page.setViewport({
      width: parseInt(width),
      height: parseInt(height),
      deviceScaleFactor: parseInt(scale),
    });
    await page.goto(url, { waitUntil: "networkidle2" });
    buffer = await page.screenshot(options);
  }
  await browser.close();
  return buffer;
};

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    origin: true,
    methods: ["POST"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  let response;
  const body = req.body;
  const {
    url = "",
    width = 800,
    height = 600,
    scale = 1,
    full = false,
    isTweet = false,
  } = body;

  if (typeof url !== "string" || !url.length) {
    return res.status(400).send({
      message: "Please provide a valid URL. Example: https://example.com",
    });
  }

  try {
    const file = await getScreenshot({
      url,
      width,
      height,
      scale,
      full,
      isTweet,
    });
    response = res.status(200).send({
      image: "data:image/png;base64," + file,
    });
  } catch (e) {
    response = res.status(400).send({ message: e.toString() });
  }

  // Rest of the API logic
  return response;
}
