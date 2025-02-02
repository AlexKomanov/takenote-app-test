import { Page, test } from '@playwright/test';

export class BrowserHelper {
    constructor(protected page: Page) {}

    async setOffline() {
        await test.step('Set browser to offline mode', async () => {
            await this.page.context().setOffline(true);
        });
    }

    async setOnline() {
        await test.step('Set browser to online mode', async () => {
            await this.page.context().setOffline(false);
        });
    }

    async reload() {
        await test.step('Reload page', async () => {
            await this.page.reload();
        });
    }
}
