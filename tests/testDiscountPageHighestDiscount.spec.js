
import { test, expect } from '@playwright/test';
import { NavPage } from '../pages/NavPage.js';
import { DiscountPage } from '../pages/DiscountPage.js';
import { MainPage } from '../pages/MainPage.js'; 
import { ProductElement } from '../pages/ProductElementPage.js';


test.describe('The highest discount filter - Verify the correct discount filter functionality', ()=>{ 
    let navPage, discountPage, mainPage, productElement;
    test.beforeEach(async ({ page }) => {
    navPage = new NavPage(page);
    discountPage = new DiscountPage(page);
    mainPage = new MainPage(page);
    productElement = new ProductElement(page);
  });
 
  test('Verify sorting by only the highest discount in deafault DESC set using UI and default min/max price - @UI @smoke @high @slow', { tags: ['@UI', '@smoke', '@high', '@slow'] }, async ({ page }) => {
  
    await page.goto('/q/query/zlavy?pageId=10000274');
    await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
    await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy');
    await discountPage.selectHigherDiscount();
    await expect(page).toHaveURL(/\/q\/query\/zlavy\?sort=percentageDiscount-desc&discountFlag=1/);
    const getElementsObject = await productElement.getDiscountedPriceValuesFromCards();
    let result =  await productElement.checkFilteredElementsByDiscount(getElementsObject, 'desc');
    expect(result.areSorted, 'Product cards are sorted from highest to lowest by percentage').toBe(true);
    expect(result.areMatched, 'Percentage values are corretly calculated for all elements').toBe(true);
  }); 


  test('T253 Verify sorting by only the highest discount in DESC mode set using URL params and default min/max price - @UI @slow', { tags: ['@UI', '@slow'] }, async ({ page }) => {
    await page.goto('/q/query/zlavy?pageId=10000274');
    await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
    await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy');
    await page.goto('/q/query/zlavy?offset=0&sort=percentageDiscount-desc&discountFlag=1&price=100&price=10');
    await expect(page).toHaveURL('/q/query/zlavy?offset=0&sort=percentageDiscount-desc&discountFlag=1&price=100&price=10');
    const getElementsObject = await productElement.getDiscountedPriceValuesFromCards();
    let result =  await productElement.checkFilteredElementsByDiscount(getElementsObject, 'desc');
    expect(result.areSorted, 'Product cards are sorted from highest to lowest by percentage').toBe(true);
    expect(result.areMatched, 'Percentage values are corretly calculated for all elements').toBe(true);
  });
  
  test('Verify sorting by only the highest discount in ASC mode set by using URL params and default min/max price -"Najlacnejšie" sticker verification - @smoke @slow',{ tags: ['@smoke', '@slow'] }, async ({ page }) => {
    await page.goto('/q/query/zlavy?pageId=10000274');
    await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
    await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy');
    await page.goto('https://www.lidl.sk/q/query/zlavy?sort=percentageDiscount-acs&discountFlag=1&price=100&price=10&category=M%C3%B3da');
    await expect(page).toHaveURL('https://www.lidl.sk/q/query/zlavy?sort=percentageDiscount-acs&discountFlag=1&price=100&price=10&category=M%C3%B3da');
    const getElementsObject = await productElement.getDiscountedPriceValuesFromCards();
    let result =  await productElement.checkFilteredElementsByDiscount(getElementsObject, 'asc');
    expect(result.areSorted, 'Product cards are sorted from highest to lowest by percentage').toBe(true);
    expect(result.areMatched, 'Percentage values are corretly calculated for all elements').toBe(true);
  }); 

  test('Verify sorting by the highest discount and min price - @UI @slow', { tags: ['@UI', '@slow'] }, async ({ page }) => {
    let max = '1111';
    let min  = '10';

    await page.goto('/q/query/zlavy?pageId=10000274');
    await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
    await discountPage.fillMaxPrice(max);
    await discountPage.fillMinPrice(min);
    await expect(page, 'User set min/max value').toHaveURL(`/q/query/zlavy?sort=null-desc&price=${min}+-+${max}`);
    await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy');
    await productElement.checkFilteredPriceByMaxMin(min, max);
    
  await discountPage.selectHigherDiscount();
  await expect(page).toHaveURL(/\/q\/query\/zlavy\?sort=percentageDiscount-desc&discountFlag=1/);
  const getElementsObject = await productElement.getDiscountedPriceValuesFromCards()
  let result =  await productElement.checkFilteredElementsByDiscount(getElementsObject, 'desc');
  expect(result.areSorted, 'Product cards are sorted from highest to lowest by percentage').toBe(true);
  expect(result.areMatched, 'Percentage values are corretly calculated for all elements').toBe(true);
  }); 

test('Verify sorting by the highest discount and max price - @UI @slow', { tags: ['@UI', '@slow'] }, async ({ page }) => {
    let max = '100';
    let min  = '0';

    await page.goto('/q/query/zlavy?pageId=10000274');
    await expect(page, 'User landed on discount page - URL verification').toHaveURL('/q/query/zlavy?pageId=10000274');
    await discountPage.fillMaxPrice(max);
    await discountPage.fillMinPrice(min);
    await expect(page, 'User set min/max value').toHaveURL(`/q/query/zlavy?sort=null-desc&price=${min}+-+${max}`);
    await expect(discountPage.discountUITitle, 'User landed on discount page - UI verification').toHaveText('Zľavy');
    await productElement.checkFilteredPriceByMaxMin(min, max);
    
  await discountPage.selectHigherDiscount();
  await expect(page).toHaveURL(/\/q\/query\/zlavy\?sort=percentageDiscount-desc&discountFlag=1/);
  const getElementsObject = await productElement.getDiscountedPriceValuesFromCards()
  let result =  await productElement.checkFilteredElementsByDiscount(getElementsObject, 'desc');
  expect(result.areSorted, 'Product cards are sorted from highest to lowest by percentage').toBe(true);
  expect(result.areMatched, 'Percentage values are corretly calculated for all elements').toBe(true);
}); 

test("API - Verify sorting by the highest discount and min price - @API @fast", { tags: ['@API', '@fast'] }, async ({ page }) => {
    let max = '1111';
    let min  = '10';
    await page.goto('/q/query/zlavy?pageId=10000274');
  
    await expect(page).toHaveURL('/q/query/zlavy?pageId=10000274');
    await expect(discountPage.discountUITitle).toHaveText('Zľavy');
    const apiResponsePromise = page.waitForResponse((response) => response.url().includes(`price=${min}+-+${max}`));
    await discountPage.fillMinPrice(min);
    await discountPage.fillMaxPrice(max);
    const mainPrices = await productElement.returnMainPricesFromAPI(apiResponsePromise);
    await productElement.checkFilteredPriceByMaxMin(min, max, mainPrices);
    const apiDiscountPromise = page.waitForResponse((response) => response.url().includes(`sort=percentageDiscount-desc`));
    await discountPage.selectHigherDiscount();
    const discountDetails = await productElement.returnDiscountDetailsFromAPI(apiDiscountPromise);
    let result =  await productElement.checkFilteredElementsByDiscount(discountDetails, 'desc');
    expect(result.areSorted, 'Product cards are sorted from highest to lowest by percentage').toBe(true);
    expect(result.areMatched, 'Percentage values are corretly calculated for all elements').toBe(true);
});

test("API - Verify sorting by the highest discount and max price - @API @fast", { tags: ['@API', '@fast'] }, async ({ page }) => {
  let max = '100';
  let min  = '0';
  await page.goto('/q/query/zlavy?pageId=10000274');

  await expect(page).toHaveURL('/q/query/zlavy?pageId=10000274');
  await expect(discountPage.discountUITitle).toHaveText('Zľavy');
  const apiResponsePromise = page.waitForResponse((response) => response.url().includes(`price=${min}+-+${max}`));
  await discountPage.fillMinPrice(min);
  await discountPage.fillMaxPrice(max);


  const mainPrices = await productElement.returnMainPricesFromAPI(apiResponsePromise);
  await productElement.checkFilteredPriceByMaxMin(min, max, mainPrices);
  const apiDiscountPromise = page.waitForResponse((response) => response.url().includes(`sort=percentageDiscount-desc`));
  await discountPage.selectHigherDiscount();

  const discountDetails = await productElement.returnDiscountDetailsFromAPI(apiDiscountPromise);
  let result =  await productElement.checkFilteredElementsByDiscount(discountDetails, 'desc');
   expect(result.areSorted, 'Product cards are sorted from highest to lowest by percentage').toBe(true);
   expect(result.areMatched, 'Percentage values are corretly calculated for all elements').toBe(true);
});

test("API - Verify sorting by the highest discount and min/max price - @API @smoke @fast",{ tags: ['@API', '@smoke', '@fast'] }, async ({ page }) => {
  let max = '100';
  let min  = '10';
  await page.goto('/q/query/zlavy?pageId=10000274');
  await expect(page).toHaveURL('/q/query/zlavy?pageId=10000274');
  await expect(discountPage.discountUITitle).toHaveText('Zľavy');
  const apiResponsePromise = page.waitForResponse((response) => response.url().includes(`price=${min}+-+${max}`));
  await discountPage.fillMinPrice(min);
  await discountPage.fillMaxPrice(max);
  const mainPrices = await productElement.returnMainPricesFromAPI(apiResponsePromise);
  await productElement.checkFilteredPriceByMaxMin(min, max, mainPrices);
  const apiDiscountPromise = page.waitForResponse((response) => response.url().includes(`sort=percentageDiscount-desc`));
  await discountPage.selectHigherDiscount();
  const discountDetails = await productElement.returnDiscountDetailsFromAPI(apiDiscountPromise);
  let result =  await productElement.checkFilteredElementsByDiscount(discountDetails, 'desc');
  expect(result.areSorted, 'Product cards are sorted from highest to lowest by percentage').toBe(true);
  expect(result.areMatched, 'Percentage values are corretly calculated for all elements').toBe(true);
});
})

