
import { test, expect } from '@playwright/test';
import { NavPage } from '../pages/NavPage.js';
import { DiscountPage } from '../pages/DiscountPage.js';
import { MainPage } from '../pages/MainPage.js'; 
import { LoginPage } from '../pages/LoginPage.js';


test.describe('UI - Verify the correct login functionality', ()=>{ 
    let navPage, discountPage, mainPage, loginPage;

   test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    navPage = new NavPage(page);
    discountPage = new DiscountPage(page);
    mainPage = new MainPage(page);
    loginPage = new LoginPage(page);
  });

  test('Login with both valid credentials - @smoke',  { tags: ['@smoke', '@UI'] }, async ({ page }) => {
  
  await page.goto(`/`);
  await loginPage.confirmConditions();
  await navPage.goToLoginPage();
  await expect(page).toHaveURL(/accounts\.lidl\.com\/Account/);
  await loginPage.fillEmailInput(process.env.LOGIN_EMAIL);
  await page.waitForTimeout(1000); 
  await loginPage.fillPasswordInput(process.env.LOGIN_PASSWORD);
  await page.waitForTimeout(1000); 
  await loginPage.clickOnLoginButton();
  await page.waitForTimeout(1000); 
  await page.waitForURL('/mla/');
  await expect(mainPage.welcomeHeader01).toBeVisible();
  });

  test('Login with  valid e-mail and invalid password - @smoke @UI',{ tags: [ '@smoke', '@UI'] }, async ({ page }) => {
    await page.goto(`/`);
    await loginPage.confirmConditions();
    await navPage.goToLoginPage();
    await expect(page).toHaveURL(/accounts\.lidl\.com\/Account/);
    await loginPage.fillEmailInput(process.env.LOGIN_EMAIL);
    await page.waitForTimeout(1000); 
  
    await loginPage.fillPasswordInput('544wdkdkdj');
    await page.waitForTimeout(1000);
    await loginPage.clickOnLoginButton();
    await page.waitForTimeout(1000); 
    await expect(page).toHaveURL(/.*accounts\.lidl\.com\/Account\//);
    await expect(mainPage.welcomeHeader01).not.toBeVisible();
    });

    test('Login with  valid password and invalid e-mail @smoke @UI ',{ tags: ['@smoke', '@UI'] }, async ({ page }) => {
  
      await page.goto(`/`);
      await loginPage.confirmConditions();
    
      await navPage.goToLoginPage();
      await expect(page).toHaveURL(/accounts\.lidl\.com\/Account/);
      await loginPage.fillEmailInput('sdhfshds@gmail.com');
      await page.waitForTimeout(1000); 
      await loginPage.fillPasswordInput(process.env.LOGIN_PASSWORD);
      await page.waitForTimeout(1000); 
      await loginPage.clickOnLoginButton();
      await page.waitForTimeout(1000); 
      await expect(page).toHaveURL(/.*accounts\.lidl\.com\/Account\//);
      await expect(mainPage.welcomeHeader01).not.toBeVisible();
      });

      test('Login with both invalid password and invalid e-mail - @low @UI ', { tags: ['@low', '@UI'] }, async ({ page }) => {
  
        await page.goto(`/`);
        await loginPage.confirmConditions();
        await navPage.goToLoginPage();
        await expect(page).toHaveURL(/accounts\.lidl\.com\/Account/);
        await loginPage.fillEmailInput('sdhfshds@gmail.com');
        await page.waitForTimeout(1000); 
        await loginPage.fillPasswordInput('544wdkdkdj');
        await page.waitForTimeout(1000);
        await loginPage.clickOnLoginButton();
        await page.waitForTimeout(1000); 
        await expect(page).toHaveURL(/.*accounts\.lidl\.com\/Account\//);
        await expect(mainPage.welcomeHeader01).not.toBeVisible();

        });
})

