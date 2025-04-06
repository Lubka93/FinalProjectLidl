import { test as base, expect as baseExpect} from '@playwright/test';

import { NavPage } from './pages/NavPage.js';
import {LoginPage} from './pages/LoginPage.js';



export const test = base.extend({
  homePage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const navPage = new NavPage(page);

    await page.goto(process.env.BASE_URL || 'https://www.lidl.sk/mla/');

    await navPage.goToLoginPage();
    await loginPage.fillEmailInput();
    await loginPage.fillPasswordInput();
    await loginPage.clickOnLoginButton();

    await use(page);
  },
});

export const expect = baseExpect;