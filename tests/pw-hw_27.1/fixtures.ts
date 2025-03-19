import { test as baseTest, expect } from '@playwright/test';
import { LogInPage } from './log_inMethods.js';

export type userGaragePage = {
    myData: string;
    loginPage: LogInPage;
}

export const test = baseTest.extend<userGaragePage>({
    myData: async({page, context}, use) => {
        const email = process.env.HTTP_CREDENTIALS_USERNAME_PROD || '';
        const password = process.env.HTTP_CREDENTIALS_PASSWORD_PROD || '';

        const loginPage = new LogInPage(page);
        
        await loginPage.goto();
        await loginPage.openLoginForm();
        await loginPage.isLogInButtonDisabled();
        await loginPage.fillEmail(email);
        await loginPage.fillPassword(password);
        await loginPage.sendLogInForm();

        // Получаем cookie "sid" после логина
        const cookies = await page.context().cookies();
        const sidCookie = cookies.find(cookie => cookie.name === 'sid');
        console.log(sidCookie?.value);

        // Передаём значение дальше в тесты
        await use(sidCookie?.value || '');

        // Очистка после теста
        await context.clearCookies();
    },

    loginPage: async ({ page }, use) => {
        await use(new LogInPage(page));
    }

})