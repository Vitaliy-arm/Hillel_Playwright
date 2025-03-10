import { test, expect } from '@playwright/test';
import { LogInPage } from './log_inMethods.js';



test.describe('Positive Registration Tests', () => {
    test('Successful user registration', async ({ page }) => {
        const loginPage = new LogInPage(page);
        
        await loginPage.goto();
        await loginPage.openLoginForm();
        await loginPage.isLogInButtonDisabled();
        await loginPage.fillEmail(process.env.email);
        await loginPage.fillPassword(process.env.password);
        await loginPage.sendLogInForm()
    });
});