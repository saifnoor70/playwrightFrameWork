import { expect, Page } from "@playwright/test";


/*Generic Function to Use*/
function generateUniqueString(preText: string) {
    var currentTime = new Date(); // Get current date and time
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var formattedTime = hours + "" + minutes + "" + seconds; // Format time as HHMMSS
    return preText + formattedTime; // Concatenate "bKash" with current time
}

function createXPathForCampaignFor(text: string): string {
    return `//input[@type='radio' and @value='${text}']`;
}


/*Campaign Create Data*/

var campaignCode = generateUniqueString('CampaignCode');
var campaignName = generateUniqueString('CampaignName');
var campaignStartDate = '2024-05-23 20:00:00';
var campaignEndDate = '2024-05-23 20:00:00';
var rechargeAmount = '27';
var cashbackAmount = '10';




export class CashbackCampaignPage{
    private page: Page;
    private deleteLocator= () => this.page.locator("//td[@class='sorting_1' and text()='1']//following::a[@title='Delete'][1]");
    private confirmDeleteLocator = () => this.page.locator("//button[contains(text(),'delete')]");
    private rowLocator = () => this.page.locator('//table[@id="Example1"]//child::tr');
    private createCampaignLocator = () => this.page.getByRole('link', { name: ' Create Campaign' });
    private campaignCodeLocator = () => this.page.locator("//input[@name='campaign_code']");
    private campaignNameLocator = () => this.page.locator("//input[@name='title']");
    private radioCampaignFor = () => this.page.locator(createXPathForCampaignFor('all'));
    private campaignStartDate = () => this.page.locator("//input[@id='start_date']");
    private campaignEndDate = () => this.page.locator("//input[@id='end_date']");
    private paymentChannelsLocator = () => this.page.locator('#payment_channels');
    private rechargeAmountLocator = () => this.page.locator("//label[@for='recharge_amount']/following-sibling::div[@class='input-group']//child::input");
    private cashbackAmountLocator = () => this.page.locator("//label[@for='cash_back_amount']/following-sibling::input[@type='number']");
    private cashbackStatusLocator = () => this.page.locator("#navigate_action");
    private productStartDate = () => this.page.locator("//input[@id='product_start_date']");
    private productEndDate = () => this.page.locator("//input[@id='product_end_date']");   
    private activeStatusLocator = () => this.page.locator("//input[@type='radio' and @value = '1']");
    private saveButtonLocator = () => this.page.getByRole('button', { name: ' Save' });     
    

    
    constructor(page: Page) {
        this.page = page;

    }  

    //Here By Calling this Method , you can know if there is any existing campaign. Here row count is always 1. 
    //Here waited for nth(1), as count() function doesn't wait for visibility. Sometimes it gives the count 0. Hence , I have waited for minimum count 1 . https://github.com/microsoft/playwright/issues/14278
    async isCampaignAvailable(timeout: number = 3000): Promise<boolean> {
        await this.rowLocator().nth(1).waitFor();
        var rowCount = await this.rowLocator().count();
        if(rowCount > 1) {
            console.log(rowCount-1)
            return true;
        }
        else{
            console.log(rowCount-1)
            return false;
        }
    }
//This method will delete all the camapign
    async deleteAllCampaign(){
        await this.rowLocator().nth(1).waitFor();
        var rowCount = await this.rowLocator().count();

        while(rowCount>2){
            await this.deleteLocator().click();
            await this.confirmDeleteLocator().click();
            await this.rowLocator().nth(1).waitFor();
            rowCount = await this.rowLocator().count();
            console.log(rowCount)
        }
    }


    /* Create Cashback Campaign for Single Deno
    You can choose payment method and use 301,601,201,211
    */
    async createCashbackCampaign(){
        await this.createCampaignLocator().click();
        await this.campaignCodeLocator().fill(campaignCode);
        await this.campaignNameLocator().fill(campaignName);
        await this.campaignStartDate().fill(campaignStartDate);
        await this.campaignEndDate().fill(campaignEndDate);
        await this.paymentChannelsLocator().selectOption('301');
        await this.rechargeAmountLocator().fill(rechargeAmount);
        await this.cashbackAmountLocator().fill(cashbackAmount);
        await this.cashbackStatusLocator().selectOption('Enable')
        await this.productStartDate().fill(campaignStartDate);
        await this.productEndDate().fill(campaignEndDate);
        await this.activeStatusLocator().setChecked(true);
        await this.saveButtonLocator().click();
    }
}

