import { Page } from '@playwright/test';

export const config = {
    target: 'https://takenote.dev/app',
    phases: [
        {
            duration: '5s',
            arrivalRate: 1,
            rampTo: 2,
            name: 'testing'
        },
    ],
    engines: {
        playwright: {}
    }
};

export const scenarios = [{
    engine: 'playwright',
    testFunction: helloWorld
}];

async function helloWorld(page: Page) {
    await page.goto('https://takenote.dev/app');
    await page.getByTestId('sidebar-action-create-new-note').click();
    await page.locator('.CodeMirror-scroll').click();
    await page.getByRole('textbox').fill('This is a simple note.\nIt contains multiple lines.\nNo special formatting.');
    await page.getByTestId('topbar-action-sync-notes').click();
}