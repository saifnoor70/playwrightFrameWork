import { test } from '../fixtures/basePage'

test("Create Cashback Campaign", async ({ loginPage,dashboardPage,cashbackCampaignPage, page}) => {
    await loginPage.goto();
    await dashboardPage.clickNavItem('Connect');
    await dashboardPage.clickCampaigns('CashbackCampaign');
    await cashbackCampaignPage.createCashbackCampaign();
    await page.screenshot({path:"screenshots/cashback.png"})
    await page.screenshot({path:"screenshots/afterDeletingAll.png"})
});

// test("Open NCM Campaign", async ({ loginPage,dashboardPage,cashbackCampaignPage, page}) => {
//     await loginPage.goto();
//     await dashboardPage.clickNavItem('Connect');
//     await dashboardPage.clickCampaigns('NCM');
//     await page.screenshot({path:"screenshots/ncm.png"})
//     console.log(await cashbackCampaignPage.isCampaignAvailable());
    
// });