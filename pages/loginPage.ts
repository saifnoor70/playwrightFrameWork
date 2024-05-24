import { expect, Page } from "@playwright/test";
const url = 'http://172.16.191.50:7443/login'


export class LoginPage {

    private page: Page
    private emailTextbox = () => this.page.locator("xpath=//input[@type='email']");
    private passwordTextbox = () => this.page.locator("xpath=//input[@type='password']");
    private loginButton = () => this.page.locator("xpath=//button[@type='submit']");

    constructor(page: Page) {
        this.page = page;

    }

    public async goto() {
        await this.page.goto('http://172.16.191.50:7443/login');
    }

    public async loginToApplication(email: string,password: string) {
        await this.emailTextbox().fill(email);
        await this.passwordTextbox().fill(password);
        await this.loginButton().click();
    }

}