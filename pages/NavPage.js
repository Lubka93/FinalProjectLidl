import { test } from '@playwright/test';

export class NavPage {
  constructor(page) {
    this.page = page;
    this.goToLoginPageButton = page.locator('span.m-icon.m-icon--user').first();

    this.onlineShopButton = page.getByText('Online Shop').first();
    this.sandwichMenuButton = page.locator('span.m-icon.m-icon--bars-horizontal');
    this.sandwitchMenuOnlineShop = page.locator('span.n-header__main-navigation-link-text').first();
    this.sadwitchMenuDiscount =  page.locator('a.n-header__main-navigation-link', { hasText: 'Zľavy' });
  }

  async goToLoginPage() {
    await test.step('Click on navigation button to go to Login Page', async () => {
    await this.goToLoginPageButton.click();
    });
  }

  async goToArticlePage() {
    await test.step('Click on Go to Article/Editor Page button', async () => {
    await this.goToArticlePageButton.click();
    });
  }
}
