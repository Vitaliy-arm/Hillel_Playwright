import { request } from 'http';
import { test } from './fixtures';
import { expect } from '@playwright/test';


test.describe('Check as user is log in', () => {
    test('Set cookie', async ({ page, myData, loginPage }) => {

        console.log('Session ID:', myData);

        await page.context().addCookies([
            {
                name: 'sid',
                value: myData,
                domain: 'qauto.forstudy.space',
                path: '/panel/garage',
                httpOnly: true,
                secure: true
            }
        ]);
        await loginPage.goto();
        const garageHeader = page.locator('h1:has-text("Garage")');
        await expect(garageHeader).toBeVisible();

        page.on('request', request => console.log('>>', request.method(), request.url()));

        await page.route('*/**/api/users/profile', async route => {
            const json = ({
                status: "ok",
                data: {
                  userId: 183763,
                  photoFilename: "default-user.png",
                  name: "Joe",
                  lastName: "Doe"
                }
            })
            await route.fulfill({json});
        });

        await page.goto('/panel/profile');
        await expect(page.getByText("Joe")).toBeVisible();

    });
});