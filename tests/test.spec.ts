import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    const signInButton = await page.locator('text=Sign In');
    await expect(signInButton).toBeVisible();
  });