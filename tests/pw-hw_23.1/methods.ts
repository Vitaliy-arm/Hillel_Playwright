import { Page, expect } from '@playwright/test';

export class RegistrationPage {
    private page: Page;

  constructor(page: Page) {
    this.page = page;
  }


    async goto() {
        await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    }

    async openRegistrationForm() {
        await this.page.getByRole('button', { name: "Sign up" }).click();
    }

    async fillName(name) {
        await this.page.locator('input[name="name"]').fill(name);
    }

    async fillLastName(lastName) {
        await this.page.locator('input[name="lastName"]').fill(lastName);
    }

    async fillEmail(email) {
        await this.page.locator('input[name="email"]').fill(email);
    }

    async fillPassword(password) {
        await this.page.locator('input[name="password"]').fill(password);
    }
    
    async fillRepeatPassword(repeatPassword) {
        await this.page.locator('input[name="repeatPassword"]').fill(repeatPassword);
    }

    async sendRegistrationForm() {
        await this.page.getByRole('button', { name: "Register" }).click();
    }

    async checkErrorMessageFirst(message) {
        const errorMessage = this.page.getByText(message);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveCSS('color', 'rgb(220, 53, 69)');
    }

    async checkErrorMessageSecond(message) {
        const errorMessage = this.page.getByText(message).nth(1);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveCSS('color', 'rgb(220, 53, 69)');
    }

    async changeFocus() {
        await this.page.locator('.modal-title').click();
    }

    async clearField(field: string) {
        await this.page.locator(field).fill(''); // Очищаем поле ввода 
    }

    async isRegisterButtonDisabled() {
        const registerButton = this.page.locator('button:text("Register")');
        await expect(registerButton).toBeDisabled();
      }

      async checkURL(url: string) {
        await expect(this.page).toHaveURL(url);
      }
}