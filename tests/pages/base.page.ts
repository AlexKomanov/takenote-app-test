import test, { Page, expect } from '@playwright/test';

export default class BasePage {
    constructor(protected page: Page) {}

    public async goto() {
        await test.step('Navigate to app and wait for load', async () => {
            await this.page.goto('https://takenote.dev/app');
            await this.page.waitForLoadState('networkidle');
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

    protected async validateLocatorVisible(locator: any, message: string) {
        await test.step(`Validate visibility: ${message}`, async () => {
            await expect(locator, message).toBeVisible();
        });
    }

    protected async validateLocatorHasText(locator: any, text: string, message: string) {
        await test.step(`Validate text content: ${message}`, async () => {
            await expect(locator, message).toContainText(text);
        });
    }

    protected async validateLocatorHasClass(locator: any, className: string, message: string) {
        await test.step(`Validate class: ${message}`, async () => {
            await expect(locator, message).toHaveClass(new RegExp(className));
        });
    }

}
