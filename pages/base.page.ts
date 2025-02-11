import test, { Page } from '@playwright/test';

export default class BasePage {
    constructor(protected page: Page) {}

    public async goto() {
        await test.step('Navigate to app and wait for load', async () => {
            await this.page.goto('https://takenote.dev/app');
        });
    }

    public async pasteContent() {
        await test.step('Paste content', async () => {
            await this.page.keyboard.press('ControlOrMeta+V');
        });
    }

    public async getClipboardContent() {
        return await test.step('Get clipboard content', async () => {
            const handle = await this.page.evaluateHandle(() => navigator.clipboard.readText());
            return await handle.jsonValue();
        });
    }

}
