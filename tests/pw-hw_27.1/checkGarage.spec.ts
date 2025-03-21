import { test } from './fixtures';
import { expect } from '@playwright/test';


test.describe('Check as user is log in', () => {
    test('Set cookie', async ({ page, myData, loginPage }) => {

        console.log('Session ID:', myData);

        await page.context().addCookies([
            {
                name: 'sid',
                value: myData,
                domain: 'qauto.forstudy.space', // Укажите правильный домен
                path: '/panel/garage',
                httpOnly: true,
                secure: true
            }
        ]);
        await loginPage.goto();
        const garageHeader = page.locator('h1:has-text("Garage")');
        await expect(garageHeader).toBeVisible();
    });
});