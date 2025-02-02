import { test } from '../fixtures/test.fixture';
import { Components, TestSuites } from '../helpers/utils.helper';
import { description, parentSuite, suite, tms } from "allure-js-commons";

const JIRA_LINK = 'wwww.example.com/';
const DESCRIBE_NAME = 'EDITOR BASIC OPERATIONS';
const SUITE_NAME = 'Editor';

test.describe(DESCRIBE_NAME, {
    tag: [TestSuites.REGRESSION, TestSuites.SANITY, TestSuites.SMOKE, Components.EDITOR],
    annotation: [
        { type: "Jira Link", description: JIRA_LINK },
    ]
}, () => {
    test.beforeEach(async ({ editorPage }) => {
        await editorPage.goto();
    });

    test('Should Create And Validate Plain Text Note', async ({ editorPage, notesManagerComponent }) => {

        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");

        const noteTitle = 'Simple Note';
        const regularText = `${noteTitle}\nThis is a simple note.\nIt contains multiple lines.\nNo special formatting.`;
        await editorPage.createNewNote(regularText);
        await notesManagerComponent.validateNoteExists(noteTitle);
        await editorPage.validateNoteContent(regularText);
    });

    test('Should Search Notes And Validate Results Count', async ({ editorPage, notesManagerComponent }) => {
        
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");

        const notes = [
            'First test note',
            'Second note with different content',
            'Third note about testing',
            'Another note without test word'
        ];

        const startingNotesCount = await notesManagerComponent.getNoteCount();

        for (const note of notes) {
            await editorPage.createNewNote(note);
        }

        await notesManagerComponent.searchNotes('test');
        await notesManagerComponent.validateSearchResults('test', 3);
        await notesManagerComponent.clearSearch();
        await notesManagerComponent.validateNoteCount(notes.length + startingNotesCount);
    });
});
