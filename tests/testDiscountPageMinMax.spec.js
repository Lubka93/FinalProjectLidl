
import { test, expect } from '@playwright/test';
import { NavPage } from '../pages/NavPage.js';
import { DiscountPage } from '../pages/DiscountPage.js';
import { MainPage } from '../pages/MainPage.js'; 
import { ProductElement } from '../pages/ProductElementPage.js';

//import { mainModule } from 'process';

test.describe('Min/Max price filter - Verify the correct min/max price filter functionality', ()=>{ 
    let navPage, discountPage, mainPage, productElement;
    test.beforeEach(async ({ page }) => {
    navPage = new NavPage(page);
    discountPage = new DiscountPage(page);
    mainPage = new MainPage(page);
    productElement = new ProductElement(page);
  });
 
  test('Verify sorting by default min and max price - @UI @smoke @slow', { tags: ['@UI', '@smoke', '@slow'] }, async ({ page }) => {
    let max = '1111';
    let min  = '0';
    await page.goto('/q/query/zlavy?pageId=10000274');
    await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
    await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy');
    await productElement.checkFilteredPriceByMaxMin(min, max);
  });  


test('Verify sorting by min price - @UI @slow', { tags: ['@UI', '@slow'] }, async ({ page }) => {
  let max = '1111';
  let min  = '50';
  await page.goto(`/q/query/zlavy?pageId=10000274`);
  await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
  await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy'); 
  await discountPage.fillMinPrice(min);
  await discountPage.fillMaxPrice(max);
  await expect(page, 'User landed on discount page - URL verification').toHaveURL(`/q/query/zlavy?sort=null-desc&price=${min}+-+${max}`);
  await productElement.checkFilteredPriceByMaxMin(min, max);
});

test('Verify sorting by max price - @UI @slow', { tags: ['@UI', '@slow'] }, async ({ page }) => {
    let max = '50';
    let min  = '0';
    await page.goto('/q/query/zlavy?pageId=10000274');
    await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
    await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy');
    await discountPage.fillMaxPrice(max);
    await discountPage.fillMinPrice(min);
    await expect(page, 'User landed on discount page - URL verification').toHaveURL(`/q/query/zlavy?sort=null-desc&price=${min}+-+${max}`);
    await productElement.checkFilteredPriceByMaxMin(min, max);
});

test('Verify sorting by min and max price - @UI @slow', { tags: ['@UI', '@slow'] },  async ({ page }) => {
  let max = '100';
  let min  = '50';
  await page.goto('/q/query/zlavy?pageId=10000274');
  await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
  await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy');
  await discountPage.fillMaxPrice(max);
  await discountPage.fillMinPrice(min);
  await expect(page, 'User landed on discount page - URL verification').toHaveURL(`/q/query/zlavy?sort=null-desc&price=${min}+-+${max}`);
  await productElement.checkFilteredPriceByMaxMin(min, max);
});


test("API - Verify sorting by min price - @API @fast",{ tags: ['@API', '@fast'] }, async ({ page }) => {
  let max = '1111';
  let min  = '10';
  await page.goto('/q/query/zlavy?pageId=10000274');
  const apiResponsePromise = page.waitForResponse((response) => response.url().includes(`price=${min}+-+${max}`));
  await expect(page).toHaveURL('/q/query/zlavy?pageId=10000274');
  await expect(discountPage.discountUITitle).toHaveText('Zľavy');
  await discountPage.fillMinPrice(min);
  await discountPage.fillMaxPrice(max);
  await expect(page, 'User landed on discount page - URL verification').toHaveURL(`/q/query/zlavy?sort=null-desc&price=${min}+-+${max}`);
  const mainPrices = await productElement.returnMainPricesFromAPI(apiResponsePromise);
  await productElement.checkFilteredPriceByMaxMin(min, max, mainPrices);
});

test("API - Verify sorting by max price - @API @fast",{ tags: ['@API', '@fast'] }, async ({ page }) => {
  let max = '100';
  let min  = '0';
  await page.goto('/q/query/zlavy?pageId=10000274');
  const apiResponsePromise = page.waitForResponse((response) => response.url().includes(`price=${min}+-+${max}`));
  await expect(page).toHaveURL('/q/query/zlavy?pageId=10000274');
  await expect(discountPage.discountUITitle).toHaveText('Zľavy');
  await discountPage.fillMinPrice(min);
  await discountPage.fillMaxPrice(max);
  await expect(page, 'User landed on discount page - URL verification').toHaveURL(`/q/query/zlavy?sort=null-desc&price=${min}+-+${max}`);
  const mainPrices = await productElement.returnMainPricesFromAPI(apiResponsePromise);
  await productElement.checkFilteredPriceByMaxMin(min, max, mainPrices);
});

test("API - Verify sorting by min/max price - @API @smoke @fast",{ tags: ['@API', '@smoke', '@fast'] }, async ({ page }) => {
  let max = '100';
  let min  = '10';
  await page.goto('/q/query/zlavy?pageId=10000274');
  const apiResponsePromise = page.waitForResponse((response) => response.url().includes(`price=${min}+-+${max}`));
  await expect(page).toHaveURL('/q/query/zlavy?pageId=10000274');
  await expect(discountPage.discountUITitle).toHaveText('Zľavy');
  await discountPage.fillMinPrice(min);
  await discountPage.fillMaxPrice(max);
  await expect(page, 'User landed on discount page - URL verification').toHaveURL(`/q/query/zlavy?sort=null-desc&price=${min}+-+${max}`);
  const mainPrices = await productElement.returnMainPricesFromAPI(apiResponsePromise);
  await productElement.checkFilteredPriceByMaxMin(min, max, mainPrices);
});

})

