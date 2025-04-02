import { expect } from '@playwright/test';
import { test } from './fixtures';


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

        // const client = page.context()
        const positiveAddCars = await page.context().request.post('/api/cars', {
            data: {
                "carBrandId":1,
                "carModelId":1,
                "mileage":2323
            }
        });
        console.log(await positiveAddCars.json());

        const responseBody = await positiveAddCars.json();

        expect(positiveAddCars.status()).toBe(201);
    
        expect(responseBody.data).toHaveProperty('carBrandId', 1);
        expect(responseBody.data).toHaveProperty('carModelId', 1);
        expect(responseBody.data).toHaveProperty('mileage', 2323);


        const negativeveAddCars = await page.context().request.post('/api/cars', {
            data: {
                "carBrandId":1,
                "mileage":2323
            }
        });

        const negativeResponse = await negativeveAddCars.json();

        console.log(negativeResponse);

        expect(negativeveAddCars.status()).toBe(400);
        expect(negativeResponse).toHaveProperty('message', 'Car model id is required');

        const negAddCars = await page.context().request.post('/api/cars', {
            data: {
                "carBrandId":1,
                "carModelId":1
            }
        });

        const negResponse = await negAddCars.json();

        console.log(negResponse);

        expect(negAddCars.status()).toBe(400);
        expect(negResponse).toHaveProperty('message', 'Mileage is required');

    });
});