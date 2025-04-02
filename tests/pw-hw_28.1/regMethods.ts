import { Page, expect } from '@playwright/test';

export class RegistrationPage {
    private page: Page;
    private registrationButton;
    private nameField;
    private lastNameField;
    private emailField;
    private passwordField;
    private repeatPasswordField;
    private sendRegistrationButton;
    private focus;

  constructor(page: Page) {
    this.page = page;
    this.registrationButton = page.getByRole('button', { name: "Sign up" });
    this.nameField = this.page.locator('input[name="name"]');
    this.lastNameField = this.page.locator('input[name="lastName"]');
    this.emailField = this.page.locator('input[name="email"]');
    this.passwordField = this.page.locator('input[name="password"]');
    this.repeatPasswordField = this.page.locator('input[name="repeatPassword"]');
    this.sendRegistrationButton = this.page.getByRole('button', { name: "Register" });
    this.focus = this.page.locator('.modal-title');
  }


    async goto() {
        await this.page.goto('/');
    }

    async openRegistrationForm() {
        await this.registrationButton.click();
    }

    async fillName(name) {
        await this.nameField.fill(name);
    }

    async fillLastName(lastName) {
        await this.lastNameField.fill(lastName);
    }

    async fillEmail(email) {
        await this.emailField.fill(email);
    }

    async fillPassword(password) {
        await this.passwordField.fill(password);
    }
    
    async fillRepeatPassword(repeatPassword) {
        await this.repeatPasswordField.fill(repeatPassword);
    }

    async sendRegistrationForm() {
        await this.sendRegistrationButton.click();
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
        await this.focus.click();
    }

    async clearField(field: string) {
        await this.page.locator(field).fill(''); // Очищаем поле ввода 
    }

    // async isRegisterButtonDisabled() {
    //     const registerButton = this.page.locator('button:text("Register")');
    //     await expect(registerButton).toBeDisabled();
    //   }

      async isRegisterButtonDisabled() {
        await expect(this.sendRegistrationButton).toBeDisabled();
      }

      async checkURL(url: string) {
        await expect(this.page).toHaveURL(url);
      }
}