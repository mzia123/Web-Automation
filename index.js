const puppeteer = require('puppeteer-core');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.GOLOGIN_TOKEN;
const PROFILE_ID = process.env.GOLOGIN_PROFILE_ID;
const TEST_WEB_URL = process.env.TEST_WEB_URL || 'https://www.reddit.com/';

const SCREENSHOT_DIR = path.join(__dirname, "screenshot");

// Ensure the directory exists
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });


//const gologin = require('gologin');
//const fetch = require('node-fetch');

async function navigateAndTakeScreenshot(page, url, screenshotFileName) {
  // Navigate to Twitch
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Perform your automation tasks
  const title = await page.title();
  console.log('Page title:', title);

  // Take a screenshot
  await page.screenshot({ path: screenshotFileName });
}
async function closeBrowserProfile() {
  await fetch(`https://api.gologin.com/browser/${PROFILE_ID}/web`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

(async () => {
  if (!TOKEN || !PROFILE_ID) {
    console.error('❌ Missing GOLOGIN_TOKEN or GOLOGIN_PROFILE_ID in .env');
    process.exit(1);
  }
  const tests = process.argv.slice(2);
  if (tests.length === 0) {
    console.error('❌ No tests specified. Usage: node index.js <test1> <test2> ...');
    process.exit(2);
  }

  const cloudBrowserUrl = `https://cloudbrowser.gologin.com/connect?token=${TOKEN}${PROFILE_ID ? `&profile=${PROFILE_ID}` : ''}`;

  try {
    //const gl = gologin.GologinApi({
    //  token: token,
    //  profile_id: profileId
    //});
    //await gl.exit();
    //return

    // Construct the cloud browser URL

    // Connect to the browser
    const browser = await puppeteer.connect({
      browserWSEndpoint: cloudBrowserUrl,
      defaultViewport: null
    });

    // Create a new page
    const page = await browser.newPage();

    for (const testName of tests) {
      switch (testName) {
        case navigateAndTakeScreenshot.name:
          await navigateAndTakeScreenshot(page, TEST_WEB_URL, path.join(SCREENSHOT_DIR, `screenshot-${Date.now()}.png`));
          break;
        default:
          console.error(`❌ Unknown test: ${testName}`);
      }
    }

    // Close the browser when done
    await browser.close();
    console.log('Automation Finished Sucessfully!');
  } catch (err) {
    console.error('❌ Connection or script error:', err);
    process.exit(3);
  } finally {
    console.log('Trying to stop the profile');
    // Stop the profile cleanly
    await closeBrowserProfile()
    console.log('Profile stopped');
  }
})();
