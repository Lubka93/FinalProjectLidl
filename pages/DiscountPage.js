import { test,expect } from '@playwright/test';


export class DiscountPage {
    constructor(page) {
      this.page = page; 
      this.discountUITitle =  page.getByRole('heading', { name: 'Zľavy' });
      this.minPriceFilterInput = page.locator('#Cena-filter-input-min');
      this.maxPriceFilterInput = page.locator('#Cena-filter-input-max');
      this.openSortingFilterButton = page.getByRole('button', { name: /Zoradené podľa/i });
      this.highestDiscountFilterOption = page.getByRole('link', { name: 'Najvyššej zľavy' });
      this.pageBody = page.locator('body');
      this.filterLabel =  page.locator('span.s-sorts-flyout__label');
    }
  
async goToLoginPage() {
  await test.step('Go to the login page', async () => {  this.createArticleButton.click();
  })
}
    
async fillMinPrice (min) {
  await this.minPriceFilterInput.fill(min);
  await this.pageBody.click();
  await expect(this.minPriceFilterInput, `Min price filter is set at ${min}`).toHaveValue(min);
}

async fillMaxPrice (max) {
  await this.maxPriceFilterInput.fill(max);
  await this.pageBody.click();
  await expect(this.maxPriceFilterInput, `Max price filter is set at ${max}`).toHaveValue(max);
}

async selectHigherDiscount () {
  await this.openSortingFilterButton.click();
  await  this.highestDiscountFilterOption.click();
  await this.pageBody.click();
  await this.page.waitForTimeout(1000);
  await expect(this.filterLabel, 'Filter was set for the highest discount').toHaveText(' Najvyššej zľavy')
}
}
  