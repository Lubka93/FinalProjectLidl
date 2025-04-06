import { test as setup, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';
import { NavPage } from '../pages/NavPage';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.resolve(__dirname, '../.auth/user.json');
console.log('Auth file path:', authFile);

setup('authenticate',  async ({ page }) => {

  const loginPage = new LoginPage(page);
  const navPage = new NavPage(page);
  const mainPage = new MainPage(page);
  
  await page.goto(`/`);

  await loginPage.confirmConditions();

  await navPage.goToLoginPage();
  await loginPage.fillEmailInput(process.env.LOGIN_EMAIL);
  await page.waitForTimeout(1000); 

  await loginPage.fillPasswordInput(process.env.LOGIN_PASSWORD);
  await page.waitForTimeout(1000); 

  await loginPage.clickOnLoginButton();

  await page.waitForTimeout(1000); 
  await page.waitForURL('/mla/');

  await expect(mainPage.welcomeHeader01).toBeVisible();
  await page.context().storageState({ path: authFile });
});