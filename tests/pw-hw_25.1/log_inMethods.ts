import { Page, expect } from '@playwright/test';

export class LogInPage {
    private page: Page;
    private singInButton;
    private emailField;
    private passwordField;
    private loginButton;

  constructor(page: Page) {
    this.page = page;
    this.singInButton = page.getByRole('button', { name: "Sign In" });
    this.emailField = this.page.locator('input[name="email"]');
    this.passwordField = this.page.locator('input[name="password"]');
    this.loginButton = this.page.getByRole('button', { name: "Login" });
  }


    async goto() {
        await this.page.goto('/');
    }

    async openLoginForm() {
        await this.singInButton.click();
        await expect(this.page.locator('h4.modal-title')).toHaveText('Log in');
    }

    async fillEmail(email) {
        await this.emailField.fill(email);
    }

    async fillPassword(password) {
        await this.passwordField.fill(password);
    }

    async sendLogInForm() {
        await this.loginButton.click();
        await expect(this.page.locator('h1')).toHaveText('Garage');
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

    async clearField(field: string) {
        await this.page.locator(field).fill(''); // Очищаем поле ввода 
    }

    // async isRegisterButtonDisabled() {
    //     const registerButton = this.page.locator('button:text("Register")');
    //     await expect(registerButton).toBeDisabled();
    //   }

      async isLogInButtonDisabled() {
        await expect(this.loginButton).toBeDisabled();
      }
}