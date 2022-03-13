const chrome = require("chrome-aws-lambda");
const cors = require("cors");
const nc = require("next-connect");
const createError = require("http-errors");

const minimalArgs = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-gpu",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--headless",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--single-process",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
];

const getScreenshot = async ({
  url,
  width,
  height,
  scale,
  full,
  isTweet,
  format,
}) => {
  const executablePath = await chrome.executablePath;

  const browser = await chrome.puppeteer.launch({
    args: minimalArgs,
    executablePath: executablePath || process.env.PUPPETEER_EXECUTABLE_PATH,
  });

  let buffer;

  const options = { type: format, encoding: "base64", fullPage: full };
  const page = await browser.newPage();

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
