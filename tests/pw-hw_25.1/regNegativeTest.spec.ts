import { test, expect } from '@playwright/test';
import { RegistrationPage } from './regMethods.js';

let nonValidEmail = 'E';
let shortNonValidEmail = 'f@f.c';
let longNonValidEmail = 'fdhjghfdjgjfkghdfkghjkdfhjkdshfjksdhfjsdkfhsjkdfhsdjkfhsdjkfhsdkjfhsdjkfhsjkfhsdjkfhskjfhsdjkfhsdkjfhjskhfjshfjshfjkshdfjksdhfsjdkhfskjdhfskdjhfskdjhfskjdfhsjkdhfsjkdfhskjdfhsdjkfhsdjkhfskjdfhsdjkfhjskdhfdsjkfhsdjkfhsdjjkfhsdjfhsdjkshdjfhsjjdccdcs@gmail.com';
let shortValidEmail = 's@g.bo';
//Максимальное значение для валидного email - 255 сим
let longValidEmail = 'fdhjghfdjgjfkghdbkghjkdmhwrdshkjksdhfjsdkfhsjkdfhsdjkfhsdjkfhsdkjfhsdjkfhsjkfhsdjkfhskjfhsdjkfhsdkjfhjskhfjshfjshfjkshdfjksdhfsjdkhfskjdhfskdjhfskdjhfskjdfhsjkdhfsjkdfhskjdfhsdjkfhsdjkhfskjdfhsdjkfhjskdhfdsjkfhsdjkfhsdjkfhsdjfhsdjkshdjfhsjjdcccs@gmail.com';

let shortNonValidName = 'N';
let longNonValidName = 'heReisexactlytwentyon';
let nameWithSpecialCharacter = 'h\'';
let NameWithCyril = 'nЮ';
let nameWithNumber = 'Name2';
let nameForTrim = ' Name ';
let shortValidName = 'Na';
let longtValidName = 'hereisexactlytwentyo';

let shortNonValidLName = 'L';
let longNonValidLName = 'LaReisexactlytwentyon';
let lNameWithSpecialCharacter = 'h-';
let lNameWithCyril = 'lЖ';
let lNameWithNumber = 'Last9';
let lNameForTrim = '  Last  ';
let shortValidLName = 'La';
let longtValidLName = 'Lereisexactlytwentyo';

let shortNonValidPassword = 'Passw12';
let longNonValidPassword = 'PasswordQwerty12';
let passwordWithCapitelLetters = 'PASSW123';
let passwordWithSmallLetters = 'passw123';
let passwordWithoutNumber = 'Password';
let shortValidPassword = 'Passw123';
let longtValidPassword = 'PasswordQwerty1';


test.describe('Negative Registration Tests', () => {

  test('Проверка формы регистрации на пустые поля', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    await registrationPage.goto();
    await registrationPage.openRegistrationForm();
    await registrationPage.isRegisterButtonDisabled();
    
    await registrationPage.fillName(shortValidName);
    await registrationPage.clearField('input[name="name"]');
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageFirst('Name required');
    
    await registrationPage.fillLastName(shortValidLName);
    await registrationPage.clearField('input[name="lastName"]');
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageFirst('Last name required');
    
    await registrationPage.fillEmail(shortValidEmail);
    await registrationPage.clearField('input[name="email"]');
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageFirst('Email required');

    await registrationPage.fillPassword(shortValidPassword);
    await registrationPage.clearField('input[name="password"]');
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageFirst('Password required');
    
    await registrationPage.fillRepeatPassword(shortValidPassword);
    await registrationPage.clearField('input[name="repeatPassword"]');
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageFirst('Re-enter password required');
    await registrationPage.isRegisterButtonDisabled();
  });


  test('Проверка формы регистрации на минимальные значения полей', async ({ page }) => {
      const registrationPage = new RegistrationPage(page);
      
      await registrationPage.goto();
      await registrationPage.openRegistrationForm();
      await registrationPage.isRegisterButtonDisabled();
      await registrationPage.fillName(shortNonValidName);
      await registrationPage.changeFocus();
      await registrationPage.checkErrorMessageFirst('Name has to be from 2 to 20 characters long');
      await registrationPage.fillLastName(shortNonValidLName);
      await registrationPage.changeFocus();
      await registrationPage.checkErrorMessageFirst('Last name has to be from 2 to 20 characters long');
      await registrationPage.fillEmail(shortNonValidEmail);
      await registrationPage.changeFocus();
      await registrationPage.checkErrorMessageFirst('Email is incorrect');
      await registrationPage.fillPassword(shortNonValidPassword);
      await registrationPage.changeFocus();
      await registrationPage.checkErrorMessageFirst('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      await registrationPage.fillRepeatPassword(shortNonValidPassword);
      await registrationPage.changeFocus();
      await registrationPage.checkErrorMessageSecond('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      await registrationPage.isRegisterButtonDisabled();
  });

  test('Проверка формы регистрации на максимальные значения полей', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    await registrationPage.goto();
    await registrationPage.openRegistrationForm();
    await registrationPage.isRegisterButtonDisabled();
    await registrationPage.fillName(longNonValidName);
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageFirst('Name has to be from 2 to 20 characters long');
    await registrationPage.fillLastName(longNonValidLName);
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageFirst('Last name has to be from 2 to 20 characters long');
    await registrationPage.fillEmail(shortNonValidEmail); //Максимальное значение для email будет проверено отдельным кейсом
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageFirst('Email is incorrect');
    await registrationPage.fillPassword(longNonValidPassword);
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageFirst('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await registrationPage.fillRepeatPassword(longNonValidPassword);
    await registrationPage.changeFocus();
    await registrationPage.checkErrorMessageSecond('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await registrationPage.isRegisterButtonDisabled();
});
});