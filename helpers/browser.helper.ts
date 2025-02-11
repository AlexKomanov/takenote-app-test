import { Page, test } from '@playwright/test';

export class BrowserHelper {
    constructor(protected page: Page) {}

    public async setOffline() {
        await test.step('Set browser to offline mode', async () => {
            await this.page.context().setOffline(true);
        });
    }

    public async setOnline() {
        await test.step('Set browser to online mode', async () => {
            await this.page.context().setOffline(false);
        });
    }

    public async reload() {
        await test.step('Reload page', async () => {
            await this.page.reload();
        });
    }
}
