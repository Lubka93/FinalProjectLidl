import { test } from '@playwright/test';

export class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = page.locator('input[name="input-email"]');
      this.passwordInput = page.locator('input[name="Password"]').first();
      this.loginButton = page.locator('//span[text()="Prihlásiť sa"]');
      this.confirmConditionsButton = page.locator('#onetrust-accept-btn-handler');
    }
  
    async fillEmailInput(email) {  
      await test.step('Fill in the email input field', async () => {
      await this.emailInput.fill(email);
      });
    }
  
    async fillPasswordInput(password) {
      await test.step('Fill in the password input field', async () => {
      await this.passwordInput.fill(password);
      });
    }
    async clickOnLoginButton() {
      await test.step('Wait for the login button to be visible and enabled', async () => {    
      await this.loginButton.waitFor({ state: 'visible' });
      await this.loginButton.waitFor({ state: 'attached' });
      await this.loginButton.click();
      });
    }
    async confirmConditions() {
      try {
        await this.confirmConditionsButton.waitFor({ state: 'visible', timeout: 2000 }); 
        console.log('Pop-up found, closing it...');
        await this.confirmConditionsButton.click();  
      } catch (error) {
        console.log('No pop-up found, continuing...');
      }
    }
  }
  