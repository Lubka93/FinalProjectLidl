
import { test, expect } from '@playwright/test';
import { NavPage } from '../pages/NavPage.js';
import { DiscountPage } from '../pages/DiscountPage.js';
import { MainPage } from '../pages/MainPage.js'; 

//import { mainModule } from 'process';

test.describe('UI - Verify the correct paths to the discount page', ()=>{ 
    let navPage, discountPage, mainPage;

   test.beforeEach(async ({ page }) => {
    navPage = new NavPage(page);
    discountPage = new DiscountPage(page);
    mainPage = new MainPage(page);
  });
test('UI path - Go using direct nav bar (online shop) link',  { tags: ['@smoke', '@high'] }, async ({ page }) => {
    await page.goto(`/`);
    await expect(page, 'Logged user landed on home page').toHaveURL('/');
    await expect(mainPage.welcomeHeader02, 'User landed at home page - UI verification').toBeVisible();
    await navPage.onlineShopButton.click();
    await expect(page, 'User landed on online shopping page').toHaveURL('/online');
    await expect(mainPage.discountBlock, 'Verify that discount block in visible on page').toBeVisible();
    await mainPage.discountBlock.click();
    await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
    await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy'); 
    });
    

test('UI path - Go using dicount block on home page', { tags: ['@low'] }, async ({ page }) => {
    await page.goto(`/`);
    await expect(mainPage.welcomeHeader02, 'User landed at home page - UI verification').toBeVisible();
    await expect(mainPage.discountBlock, 'Verify that discount block in visible on page').toBeVisible();
    await mainPage.discountBlock.click();
    await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
    await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy'); 

});

test('UI path - Go using non-direct nav bar link using sandwitch menu',{ tags: ['@low'] }, async ({ page }) => { 
  await page.goto(`/`);
  await expect(page, 'Logged user landed on home page').toHaveURL('/');
  await expect(mainPage.welcomeHeader02, 'User landed at home page - UI verification').toBeVisible();
  await navPage.sandwichMenuButton.click();
  await navPage.sandwitchMenuOnlineShop.click();
  await navPage.sadwitchMenuDiscount.click();
  await expect(page).toHaveURL('/q/query/zlavy?pageId=10000274');
  await expect(discountPage.discountUITitle).toHaveText('Zľavy');
});

test('URL path - Go to discount page using URLs',{ tags: ['@low'] }, async ({ page }) => {
  await page.goto(`/`);
  await expect(mainPage.welcomeHeader02, 'User landed at home page - UI verification').toBeVisible();
  await expect(mainPage.discountBlock, 'Verify that discount block in visible on page').toBeVisible();
  await page.goto(`/q/query/zlavy?pageId=10000274`);
  await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
  await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy'); 
});
})

