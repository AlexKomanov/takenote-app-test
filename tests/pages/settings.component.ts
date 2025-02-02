import BasePage from './base.page';
import { expect, Page, test } from '@playwright/test';

export enum SettingsToggle {
    ACTIVE_LINE_HIGHLIGHT = 'Active line highlight',
    LINE_NUMBERS = 'Display line numbers',
    SCROLL_PAST_END = 'Scroll past end',
    MARKDOWN_PREVIEW = 'Markdown preview',
    DARK_MODE = 'Dark mode'
}

export enum SortStrategy {
    TITLE = 'Title',
    DATE_CREATED = 'Date Created',
    LAST_UPDATED = 'Last Updated'
}

export enum TextDirection {
    LTR = 'Left to right',
    RTL = 'Right to left'
}


export default class SettingsComponent extends BasePage {
    private readonly settingsPanel = this.page.locator('.settings-modal');
    private readonly settingPanelCloseButton = this.settingsPanel.locator('.close-button')
    private readonly previewToggle = this.page.getByTestId('preview-toggle');
    private readonly settingsOption = this.page.locator('[class="settings-option"]');
    private readonly lineNumbersToggle = this.page.getByTestId('line-numbers-toggle');
    private readonly sortBySelect = this.page.getByTestId('sort-by');
    private readonly sortDirectionButton = this.page.getByTestId('sort-direction');

    constructor(protected page: Page) {
        super(page);
    }

    public async goto() {
        await test.step('Open settings', async () => {
            await this.page.goto('https://takenote.dev/app');
            await this.page.waitForLoadState('networkidle');
        });
    }

    public async toggleMarkdownPreview() {
        await test.step('Toggle markdown preview', async () => {
            await this.previewToggle.click();
        });
    }

    public async validateMarkdownPreviewEnabled() {
        await test.step('Validate markdown preview enabled', async () => {
            await expect(this.previewToggle).toBeChecked();
        });
    }

    public async toggleOption(option: SettingsToggle) {
        await test.step(`Toggle ${option}`, async () => {
            await this.settingsOption
                .filter({ hasText: option })
                .locator('span')
                .click();
        });
    }

    public async validateDarkMode(enabled: boolean) {
        await test.step(`Validate dark mode ${enabled ? 'enabled' : 'disabled'}`, async () => {
            if (enabled) {
                await expect(this.page.locator('[id="root"] .app')).toHaveClass(/dark/);
            } else {
                await expect(this.page.locator('[id="root"] .app')).not.toHaveClass(/dark/);
            }
        });
    }
    public async closeSettings() {
        await test.step('Close settings panel', async () => {
            await this.settingPanelCloseButton.click();
            await expect(this.settingsPanel).not.toBeVisible();
        });
    }

    public async validateToggleState(toggle: SettingsToggle, enabled: boolean) {
        await test.step(`Validate ${toggle} is ${enabled ? 'enabled' : 'disabled'}`, async () => {
            const toggleElement = this.settingsOption.filter({ hasText: toggle }).locator('input');
            if (enabled) {
                await expect(toggleElement).toBeChecked();
            } else {
                await expect(toggleElement).not.toBeChecked();
            }
        });
    }

}
