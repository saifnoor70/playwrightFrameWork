import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { DashboardPage } from "../pages/dashboardPage";
import { CashbackCampaignPage } from "../pages/cashbackCmapaignPage";



export const test = base.extend<{ loginPage: LoginPage, dashboardPage: DashboardPage, cashbackCampaignPage: CashbackCampaignPage}>({
      loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
      },

      dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
      },

      cashbackCampaignPage: async ({ page }, use) => {
        await use(new CashbackCampaignPage(page));
      }
    });