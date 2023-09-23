const chromium = require("chrome-aws-lambda");
const cors = require("cors");
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
	try {
		const isLocal = process.env.IS_LOCAL || false;

		const browser = await chromium.puppeteer.launch({
			args: [
				...chromium.args,
				"--autoplay-policy=user-gesture-required",
				"--disable-background-networking",
				"--disable-background-timer-throttling",
				"--disable-backgrounding-occluded-windows",
				"--disable-breakpad",
				"--disable-client-side-phishing-detection",
				"--disable-component-update",
				"--disable-default-apps",
				"--disable-dev-shm-usage",
				"--disable-domain-reliability",
				"--disable-extensions",
				"--disable-features=AudioServiceOutOfProcess",
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
				"--use-gl=swiftshader",
				"--use-mock-keychain",
			],
			defaultViewport: chromium.defaultViewport,
			executablePath: isLocal
				? process.env.PUPPETEER_EXECUTABLE_PATH
				: await chromium.executablePath(),
			headless: isLocal ? true : chromium.headless,
			ignoreHTTPSErrors: true,
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
			await page.waitForSelector(selector);
			const element = await page.$(selector);
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
	} catch (error) {
		throw error;
	}
};

const express = require("express");
const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["POST"],
	})
);

const handler = async (req, res) => {
	if (req.method !== "POST") {
		res.status(400).json({ message: "Only POST requests are allowed." });
		return;
	}

	try {
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
	} catch (error) {
		res.status(error.status || 500).json({
			message: error.message || "Error",
		});
	}
};

export default handler;
