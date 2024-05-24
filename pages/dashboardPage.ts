import { expect, Page } from "@playwright/test";



//This metthod will be used to create dynamic xpath for CMS Main dashbaord Man Nav Item. Pass the Name Text
function createXPathForNavItem(text: string): string {
    return `//*[@class='nav-item has-sub']//span[text()='${text}']`;
}


export class DashboardPage{
    private page: Page
    private campaignsLocator = () => this.page.locator("xpath=//*[@class='menu-content']//ancestor::span[text()='Campaigns']");
    private cashBackCampaignLocator = () => this.page.locator("xpath=//*[@class='menu-content']//child::a[contains(@href,'cash-back-campaign')]");
    private newCamModalityLocator = () => this.page.locator("xpath=//*[@class='menu-content']//child::a[contains(@href,'new')]");


    
    constructor(page: Page) {
        this.page = page;

    }

    //Use this method for clicking on Mian Nav Item, Pass the Name. For example Connect|Content|Orange Club | Course
    public async clickNavItem(navItemName : string) {
       await  this.page.locator(createXPathForNavItem(navItemName)).click();
    }

    //Open Campaigns Nav Menu and open NCM or Cashback Campaign
    public async clickCampaigns(cmapaignType : String){
        await this.campaignsLocator().click();
        if(cmapaignType == "CashbackCampaign")
            {
                await this.cashBackCampaignLocator().click();
            }
            else if(cmapaignType == "NCM"){
                await this.newCamModalityLocator().click();
            }
            else{
                console.log("Campaign Type isn't correct, it has to be any of CashbackCampaign | NCM, you has passed-->>"+cmapaignType)
            }
    }

}