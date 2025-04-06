//import { normalize } from "path";

export class MainPage {
    constructor(page) {
        this.page = page;
        this.homePageUser = page.getByRole('link', { name: 'user image lsjdflsadf' });
        this.globalFeed =  page.getByText('Global Feed');
        this.welcomeHeader01 = page.locator('//h3[text()="Môj Lidl Plus účet"]');
        this.welcomeHeader02 = page.locator('.ALoginTeaserLidlPlus__salutation');
        this.discountBlock = page.locator('.ACategoryOverviewSlider__Image').first();
    }

    async declinePopUp() {
      try {
        await dialog.waitFor({ state: 'visible', timeout: 2000 }); 
        console.log('Pop-up found, closing it...');
        await dialog.dismiss();
      } catch (error) {
        console.log('No pop-up found, continuing...');
      }
    }
  }

  
  