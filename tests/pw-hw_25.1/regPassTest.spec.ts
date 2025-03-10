import { test, expect } from '@playwright/test';
import { RegistrationPage } from './regMethods.js';

let name, lastName, email, password, repeatPassword;

name = 'Nick';
lastName = 'Jonson';
email = 'aqa-some2234567890@test.com';
password = 'Password123';
repeatPassword = 'Password123';

test.describe('Positive Registration Tests', () => {
    test('Successful user registration', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        
        await registrationPage.goto();
        await registrationPage.openRegistrationForm();
        await registrationPage.isRegisterButtonDisabled();
        await registrationPage.fillName(name);
        await registrationPage.fillLastName(lastName);
        await registrationPage.fillEmail(email);
        await registrationPage.fillPassword(password);
        await registrationPage.fillRepeatPassword(repeatPassword);
        await registrationPage.sendRegistrationForm();
        await registrationPage.checkURL('https://qauto.forstudy.space/panel/garage');
    });
});