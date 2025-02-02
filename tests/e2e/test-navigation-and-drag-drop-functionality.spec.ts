import { test } from '../fixtures/test.fixture';
import { Components, TestSuites } from '../helpers/utils.helper';
import { parentSuite, suite, tms } from "allure-js-commons";

const JIRA_LINK = 'wwww.example.com/';
const DESCRIBE_NAME = 'NAVIGATION AND DRAG-DROP FUNCTIONALITY';
const SUITE_NAME = 'Navigation';
import { NoteOption } from '../pages/notes-manager-component.page';
import { NavigationOption } from '../pages/notes-manager-component.page';


test.describe(DESCRIBE_NAME, {
    tag: [TestSuites.REGRESSION, Components.NAVIGATION],
    annotation: [
        { type: "Jira Link", description: JIRA_LINK },
    ]
}, () => {
    test.beforeEach(async ({ notesManagerComponent }) => {
        await notesManagerComponent.goto();
    });

    test('Should Create Category And Move Note Using Drag And Drop', async ({ notesManagerComponent, editorPage }) => {
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        const noteTitle = 'Searchable Note Content';
        const categoryName = 'Test Category';
        await editorPage.createNewNote(noteTitle);

        await notesManagerComponent.createCategory(categoryName);
        await notesManagerComponent.dragNoteToCategory(noteTitle, categoryName);

        await notesManagerComponent.selectCategory(categoryName);
        await notesManagerComponent.validateNoteExists(noteTitle);
    });

    test('Should Move Note Using Drag And Drop To Trash And Delete It Permanently', async ({ notesManagerComponent, editorPage }) => {
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        const noteTitle = 'Note To Delete';

        await editorPage.createNewNote(noteTitle);
        await notesManagerComponent.validateNoteExists(noteTitle);
        await notesManagerComponent.dragNoteToTrash(noteTitle);
        await notesManagerComponent.navigateTo(NavigationOption.TRASH);
        await notesManagerComponent.validateNoteExists(noteTitle);
        await notesManagerComponent.performNoteAction(noteTitle, NoteOption.DELETE_PERMANENTLY);
        await notesManagerComponent.validateNoteExists(noteTitle, false);
    });
});
