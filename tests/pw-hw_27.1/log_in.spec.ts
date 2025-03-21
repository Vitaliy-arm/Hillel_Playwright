import { test, expect } from '@playwright/test';
import { LogInPage } from './log_inMethods.js';

test.describe('Log_in', () => {
    test('Successful user log_in', async ({ page }, testInfo) => {
        const email = testInfo.project.use?.httpCredentials?.username || '';
        const password = testInfo.project.use?.httpCredentials?.password || '';

        const loginPage = new LogInPage(page);
        
        await loginPage.goto();
        await loginPage.openLoginForm();
        await loginPage.isLogInButtonDisabled();
        await loginPage.fillEmail(email);
        await loginPage.fillPassword(password);
        await loginPage.sendLogInForm();
    });
});