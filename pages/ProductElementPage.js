import { expect } from "@playwright/test";


export class ProductElement {
  constructor(page) {
    this.page = page;
    this.price = page.locator('div.m-price__price.m-price__price--small');
    this.mainPriceValues = page.locator('div.m-price__price.m-price__price--small');
    this.discountedPriceValues = page.locator('[data-v-4edfeeba] .m-price__top .strikethrough.m-price__rrp.m-price__text');
    this.discountPercentage = page.locator('div[data-v-4edfeeba][data-v-10c1b198][data-qa-label="product-price-discount"].m-price__label');
  }

  async  getDiscountedPriceValuesFromCards() {
    const arrOfPrices = [];
    const arrOfDicountedPrices = [];
    const arrOfDicountPercentage = [];

    let countBeforeScroll1 = await this.mainPriceValues.count();
    let countBeforeScroll2 = await this.discountedPriceValues.count();
    let countBeforeScroll3 = await this.discountPercentage.count();

    console.log('Initial visible price elements:', countBeforeScroll1, countBeforeScroll2, countBeforeScroll3);
    expect(countBeforeScroll1, 'All product price elements were succesfully found').toEqual(6);
     // Scroll down to reveal the elements that are out of view
     await this.scrollDownToRevealElements();
     let countBeforeScrollMiddle = await this.mainPriceValues.count();
     console.log('Total discounted price elements in the middle scrolling:', countBeforeScrollMiddle);
     await this.scrollDownToRevealElements();


    const countAfterScroll = await this.mainPriceValues.count();
    const countAfterScrollDiscountedPrices = await this.discountedPriceValues.count();
    const countAfterScrollPercentage = await this.discountPercentage.count();
    console.log('Total price elements after scrolling:', countAfterScroll, countAfterScrollDiscountedPrices, countAfterScrollPercentage);
    await this.scrollDownToRevealElements();
    await this.scrollDownToRevealElements();

  if (countAfterScroll !== 48 || countAfterScrollDiscountedPrices !== 48 || countAfterScrollPercentage !== 48) {
    console.warn("Element count mismatch after scrolling");
  }

    for (let i = 0; i < 48; i++) {
      const price = await this.mainPriceValues.nth(i).textContent();
      const discountedPrice = await this.discountedPriceValues.nth(i).textContent();
      const percentage = await this.discountPercentage.nth(i).textContent();

      arrOfPrices.push(price);
      arrOfDicountedPrices.push(discountedPrice);
      arrOfDicountPercentage.push(percentage)
       }
      expect(arrOfPrices.length, 'All product element prices were succesfully found').toEqual(48);
      expect(arrOfDicountedPrices.length, 'All discounted prices were succesfully found').toEqual(48);
      expect(arrOfDicountPercentage.length, 'All percentage values were succesfully found').toEqual(48);

      console.log(arrOfPrices, arrOfDicountedPrices, arrOfDicountPercentage);
      return {
        prices: arrOfPrices,
        originalPrices: arrOfDicountedPrices,
        percentage: arrOfDicountPercentage
      };
  }

  async getMainPriceValuesFromCards() {
    const arrPrices = [];
    let countBeforeScroll = await this.price.count();
    console.log('Initial visible  price elements were found:', countBeforeScroll);

    // Scroll down to reveal the elements that are out of view
    await this.scrollDownToRevealElements();
    let countBeforeScrollMiddle = await this.price.count();
    console.log('Total discounted price elements in the middle scrolling:', countBeforeScrollMiddle);
    await this.scrollDownToRevealElements();
    const countAfterScroll = await this.price.count();
    console.log('Total discounted price elements after scrolling:', countAfterScroll);
    await this.scrollDownToRevealElements();

    for (let i = 0; i < countAfterScroll; i++) {
    const priceRetry = await this.mainPriceValues.nth(i).textContent();
    arrPrices.push(priceRetry);
       }
    expect(arrPrices.length, 'All product price elements were succesfully found').toEqual(48);
    return arrPrices;
  }


  async checkFilteredPriceByMaxMin (min, max, arr = null) {
    const minNum = parseFloat(min);
    const maxNum = parseFloat(max);

    const arrayOfPrices =  arr ?? await this.getMainPriceValuesFromCards();
    const filteredArray = arrayOfPrices
    .map(price => parseFloat(price))
    .filter(price => price < minNum || price > maxNum); 
    console.log(filteredArray.length > 0 ? `Values outside of selected min/max filter: ${filteredArray}` : 'No values outside selected min/max price filter');
    expect(filteredArray.length, `There are no price values outside of ${min} and ${max} interval`).toBe(0);  
  }

  async checkFilteredElementsByDiscount(obj, type = null) {
    const arrayDiscountedPrices =  obj.prices.map(price => {
      if (typeof price === 'string') {
        return parseFloat(price.replace(/\s/g, '').replace(',', '.'));
      }
      return price;
    });

    const arrOfOriginalPrice = obj.originalPrices.map(original => {
      if (typeof original === 'string') {
        return parseFloat(original.replace(/\s/g, '').replace(',', '.'));
      }
      return original; 
    });
    
    const arrOfPercentage = obj.percentage.map(p => {
      if (typeof p === 'string') {
        if (p === 'Lacnejšie') {
          return 0;  // If the string is 'Lacnejšie', return 0        // to deal with 'Najlacnejšie' sticker which is for discount lower than 10%
        }
        return parseInt(p.replace('%', '').replace('-', ''));  
      }
      return p; 
    });
    
    let isSorted;

  if (type === 'desc') {
    // check descending
    isSorted = arrOfPercentage.every((val, i, arr) => {
      return i === 0 || val <= arr[i - 1];
    });
  } else if (type === 'asc') {
    //check ascending
    isSorted = arrOfPercentage.every((val, i, arr) => {
      return i === 0 || val >= arr[i - 1];
    });
  } else {
    throw new Error('Invalid sorting type, use "desc" or "asc".');
  }

   console.log(`Is sorted (${type}): ${isSorted}`);

    let allMatch = true;
    let expectedPercentage = null;

    for (let i = 0; i < arrOfOriginalPrice.length; i++) {
      const original = arrOfOriginalPrice[i];
      const discounted = arrayDiscountedPrices[i];
       expectedPercentage = Math.floor(((original - discounted) / original) * 100);    //If I want to round in clasic way!!!! ----> Math.floor(((original - discounted) / original) * 100);

     // If expectedPercentage is lower than 10, set it to 0   // to deal with 'Najlacnejšie' sticker which is for discount lower than 10%
     if (expectedPercentage < 10) {
      expectedPercentage = 0;
      }

       if (expectedPercentage !== arrOfPercentage[i])  {
        console.warn(`❌ Mismatch at index ${i}:`);
        console.warn(`Original: ${original}, Discounted: ${discounted}`);
        console.warn(`Expected: ${expectedPercentage}%, Found: ${arrOfPercentage[i]}%\n`);
        allMatch = false;
      }
    }
    
    return {
      areMatched: allMatch,
      areSorted: isSorted,
    }
  }
  
  
  async  scrollDownToRevealElements() {
    const viewportHeight = await this.page.evaluate('window.innerHeight');
    const scrollHeight = await this.page.evaluate('document.body.scrollHeight');
    
    let scrollPosition = 0;

    while (scrollPosition < scrollHeight) {
      await this.page.evaluate(() => {
        window.scrollBy(0, window.innerHeight / 10); 
      });
   await this.page.waitForTimeout(120); 
   scrollPosition += viewportHeight / 10; 
    }
  }
  
  async returnMainPricesFromAPI (response) {
  const apiResponse = await response;
  const responseBody = await apiResponse.json();
  console.log('API Response:', responseBody);
  const items = responseBody.items;
  const prices = items.map(item => item?.gridbox?.data?.price?.price);
  console.log('API array of main prices from API response body', prices);
  return prices;
  }

  async returnDiscountDetailsFromAPI (response) {
    const apiResponse = await response;
    const responseBody = await apiResponse.json();
    console.log('API Response:', responseBody);
    const items = responseBody.items;
    const discointedPricesAPI = items.map(item => item?.gridbox?.data?.price?.price);
    const originalPricesAPI = items.map(item => item?.gridbox?.data?.price?.discount?.deletedPrice);
    const percentageAPI = items.map(item => item?.gridbox?.data?.price?.discount?.percentageDiscount);
   
    return {
      prices: discointedPricesAPI, 
      originalPrices: originalPricesAPI, 
      percentage: percentageAPI
    }
    }
}
