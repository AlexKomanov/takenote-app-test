import { test } from '../fixtures/test.fixture';
import { Components, TestSuites } from '../helpers/utils.helper';
import { parentSuite, suite, tms } from "allure-js-commons";

const JIRA_LINK = 'wwww.example.com/';
const DESCRIBE_NAME = 'STORAGE FUNCTIONALITY';
const SUITE_NAME = 'Storage';

test.describe(DESCRIBE_NAME, {
    tag: [TestSuites.REGRESSION, Components.STORAGE],
    annotation: [
        { type: "Jira Link", description: JIRA_LINK },
    ]
}, () => {
    test.beforeEach(async ({ editorPage, storageHelper, browserHelper }) => {
        await editorPage.goto();
        await storageHelper.initializeStorage();
        await browserHelper.reload();
    });

    test('Should Create And Persist Notes And Categories In Both Online And Offline Modes', async ({ editorPage, notesManagerComponent, storageHelper, browserHelper }) => {
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");

        const noteContent = 'New Test Note';
        await editorPage.createNewNote(noteContent);
        await editorPage.validateNoteContent(noteContent);
        await storageHelper.verifyNoteExistsInLocalStorage(noteContent);    

        const categoryName = 'Test Category';
        await notesManagerComponent.createCategory(categoryName);
        await notesManagerComponent.validateCategoryExists(categoryName);
        await storageHelper.verifyCategoryExistsInLocalStorage(categoryName);

        const secondCategoryName = 'Second Category';
        await notesManagerComponent.createCategory(secondCategoryName);
        await notesManagerComponent.validateCategoryExists(secondCategoryName);
        await storageHelper.verifyCategoryExistsInLocalStorage(secondCategoryName);

        await browserHelper.setOffline();
        const offlineNoteContent = 'Offline Note';
        await editorPage.createNewNote(offlineNoteContent);
        await editorPage.validateNoteContent(offlineNoteContent);
        await storageHelper.verifyNoteExistsInLocalStorage(offlineNoteContent);
    });
});
