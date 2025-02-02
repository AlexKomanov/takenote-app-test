import { test } from '../../fixtures/test.fixture';
import { Components, TestSuites } from '../../helpers/utils.helper';
import { parentSuite, suite, tms } from "allure-js-commons";

const JIRA_LINK = 'wwww.example.com/';
const DESCRIBE_NAME = 'SETTINGS FUNCTIONALITY';
const SUITE_NAME = 'Settings';
import { FooterOption } from '../../pages/editor.component';
import { SettingsToggle } from '../../pages/settings.component';

test.describe(DESCRIBE_NAME, {
    tag: [TestSuites.REGRESSION, Components.SETTINGS],
    annotation: [
        { type: "Jira Link", description: JIRA_LINK },
    ]
}, () => {
    test.beforeEach(async ({ settingsComponent: settingsPage }) => {
        await settingsPage.goto();
    });

    test('Should Toggle Dark Mode From Footer', async ({ settingsComponent: settingsPage, editorPage }) => {
        
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        await settingsPage.validateDarkMode(false);
        await editorPage.clickFooterOption(FooterOption.THEMES);
        await settingsPage.validateDarkMode(true);
        await editorPage.clickFooterOption(FooterOption.THEMES);
        await settingsPage.validateDarkMode(false);
    });

    test('Should Toggle Dark Mode From Settings', async ({ settingsComponent: settingsPage, editorPage }) => {
        
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        await editorPage.clickFooterOption(FooterOption.SETTINGS);
        await settingsPage.toggleOption(SettingsToggle.DARK_MODE);
        await settingsPage.validateDarkMode(true);
        await settingsPage.validateToggleState(SettingsToggle.DARK_MODE, true);
        await settingsPage.toggleOption(SettingsToggle.DARK_MODE);
        await settingsPage.validateDarkMode(false);
        await settingsPage.validateToggleState(SettingsToggle.DARK_MODE, false);
        
    });

    test('Should Sync Preview Mode State Between Footer And Settings', async ({ settingsComponent: settingsPage, editorPage }) => {
        
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");

        await editorPage.clickFooterOption(FooterOption.SETTINGS);
        await settingsPage.validateToggleState(SettingsToggle.MARKDOWN_PREVIEW, false);
        await settingsPage.closeSettings();
        await editorPage.clickFooterOption(FooterOption.PREVIEW);
        await editorPage.clickFooterOption(FooterOption.SETTINGS);
        await settingsPage.validateToggleState(SettingsToggle.MARKDOWN_PREVIEW, true);
        await settingsPage.closeSettings();
        await editorPage.clickFooterOption(FooterOption.EDIT_NOTE);
        await editorPage.clickFooterOption(FooterOption.SETTINGS);
        await settingsPage.validateToggleState(SettingsToggle.MARKDOWN_PREVIEW, false);
    });

});
