const chrome = require( "chrome-aws-lambda" );
const puppeteer = require( "puppeteer-core" );

async function getScreenshot( { url, width, height, quality, type, fullPage } ) {
  const browser = await puppeteer.launch( {
    args: chrome.args,
    executablePath: await chrome.executablePath, // comment this line when working on localhost
    headless: chrome.headless, // comment this line when working on localhost
    // executablePath: "./node_modules/puppeteer/.local-chromium/win64-722234/chrome-win/chrome.exe", //uncomment this line when working on localhost
  } );

  const options = { encoding: "base64", fullPage: fullPage };
  const page = await browser.newPage();
  let buffer;

  if ( type === "twitter" ) {
    await page.setViewport( {
      width: 767,
      height: 800,
      deviceScaleFactor: 2,
    } );
    const tUrl = `https://publish.twitter.com/?query=${url}&widget=Tweet`;
    await page.goto( tUrl, { waitUntil: "networkidle2" } );
    const selector = "body #WidgetConfigurator-preview .twitter-tweet";
    await page.waitForSelector( selector ); // wait for the selector to load
    const element = await page.$( selector ); // declare a variable with an ElementHandle
    buffer = await element.screenshot( options );
  } else {
    await page.setViewport( {
      width: parseInt( width ),
      height: parseInt( height ),
      deviceScaleFactor: parseInt( quality ),
    } );
    await page.goto( url, { waitUntil: "networkidle2" } );
    buffer = await page.screenshot( options );
  }
  await browser.close();
  return buffer;
}

module.exports = { getScreenshot };
