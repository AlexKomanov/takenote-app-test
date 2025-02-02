import { test as base } from '@playwright/test';
import EditorComponent from '../pages/editor.component';
import { BrowserHelper } from '../helpers/browser.helper';
import SettingsComponent from '../pages/settings.component';
import NotesManagerComponent from '../pages/notes-manager-component.page';
import { StorageHelper } from '../helpers/storage.helper';

type Fixtures = {
    editorPage: EditorComponent;
    notesManagerComponent: NotesManagerComponent;
    settingsComponent: SettingsComponent;
    storageHelper: StorageHelper;
    browserHelper: BrowserHelper;
};

export const test = base.extend<Fixtures>({
    editorPage: async ({ page }, use) => {
        await use(new EditorComponent(page));
    },
    notesManagerComponent: async ({ page }, use) => {
        await use(new NotesManagerComponent(page));
    },
    settingsComponent: async ({ page }, use) => {
        await use(new SettingsComponent(page));
    },
    storageHelper: async ({ page }, use) => {
        await use(new StorageHelper(page));
    },
    browserHelper: async ({ page }, use) => {
        await use(new BrowserHelper(page));
    }
});

