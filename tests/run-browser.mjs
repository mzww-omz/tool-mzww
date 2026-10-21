import smoke from './browser-smoke.mjs';

// Reuse an existing Playwright installation; it is not an application dependency.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
try {
 const page = await browser.newPage();
 console.log(await smoke(page, process.env.TOOLBOX_URL || 'http://127.0.0.1:5174'));
} finally {
 await browser.close();
}
