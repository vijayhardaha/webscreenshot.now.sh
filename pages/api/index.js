const chrome = require("chrome-aws-lambda");
const cors = require("cors");
const nc = require("next-connect");
const createError = require("http-errors");

const getScreenshot = async ({
  url,
  width,
  height,
  scale,
  full,
  isTweet,
  format,
}) => {
  const browser = await chrome.puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath, // comment this line when working on localhost
    headless: true,
  });

  let buffer;

  const options = { type: format, encoding: "base64", fullPage: full };
  const page = await browser.newPage();

  if (isTweet) {
    await page.setViewport({
      width: 600,
      height: 600,
      deviceScaleFactor: 2,
    });
    options.fullPage = false;
    const tUrl = `https://twitframe.com/show?url=${encodeURI(url)}`;
    await page.goto(tUrl, { waitUntil: "networkidle2" });
    const selector = "body .twitter-tweet";
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
  await page.close();
  await browser.close();
  return buffer;
};

const handler = nc({
  onError: (err, req, res, next) => {
    const status = err.status || 500;
    // Sends response
    res.status(status).json({
      message: err.message || "Error",
    });
  },
  onNoMatch: (req, res) => {
    throw createError(403, "403 Forbidden");
  },
});

handler
  .use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["POST"],
    })
  )
  .post(async (req, res) => {
    const { body } = req;

    const {
      url = "",
      width = 800,
      height = 600,
      scale = 1,
      full = false,
      isTweet = false,
      format = "jpeg",
    } = body;

    if (typeof url !== "string" || !url.length) {
      throw createError(
        400,
        "Please provide a valid URL. Example: https://example.com"
      );
    }

    const file = await getScreenshot({
      url,
      width,
      height,
      scale,
      full,
      isTweet,
      format,
    });

    res.status(200).json({
      image: `data:image/${format};base64,${file}`,
    });
  });

export default handler;
