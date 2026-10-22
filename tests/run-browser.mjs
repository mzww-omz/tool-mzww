import smoke from './browser-smoke.mjs';
import extended from './browser-extended.mjs';
import added from './browser-new.mjs';
import categories from './browser-categories.mjs';

// Reuse an existing Playwright installation; it is not an application dependency.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ channel:process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
try {
 const context = await browser.newContext();
 const page = await context.newPage();
 const origin=process.env.TOOLBOX_URL || 'http://127.0.0.1:5174';
 console.log(await categories(page,origin));
 console.log(await smoke(page,origin));
 console.log(await extended(page,origin));
 console.log(await added(page,origin));
} finally {
 await browser.close();
}
