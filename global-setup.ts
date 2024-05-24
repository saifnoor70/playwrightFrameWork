import { Browser, Page, chromium } from "@playwright/test";

async function globalSetup() {
    const browser: Browser = await chromium.launch({headless: false})
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://172.16.191.50:7443/login');
    await page.locator("xpath=//input[@type='email']").fill('mybl-admin@admin.com');
    await page.locator("xpath=//input[@type='password']").fill('Banglalink@2020');
    await page.locator("xpath=//button[@type='submit']").click();


    await page.context().storageState({path: "./LoginAuth.json"})
    await browser.close();
}

export default globalSetup;