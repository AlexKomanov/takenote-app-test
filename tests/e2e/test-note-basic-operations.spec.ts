import { test } from '../../fixtures/test.fixture';
import { Components, TestSuites } from '../../helpers/utils.helper';
import { parentSuite, suite, tms } from "allure-js-commons";

const JIRA_LINK = 'wwww.example.com/';
const DESCRIBE_NAME = 'NOTE BASIC OPERATIONS';
const SUITE_NAME = 'Notes';

import { NoteOption } from '../../pages/notes-manager-component.page';

test.describe(DESCRIBE_NAME, {
    tag: [TestSuites.REGRESSION, TestSuites.SANITY, TestSuites.SMOKE, Components.NOTES_MANAGER],
    annotation: [
        { type: "Jira Link", description: JIRA_LINK },
    ]
}, () => {
    test.beforeEach(async ({ editorPage }) => {
        await editorPage.goto();
    });

    test('Should Copy Note Reference To Clipboard', async ({ editorPage, notesManagerComponent, storageHelper }) => {
   
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        const noteName = 'Note to link to';
        await editorPage.createNewNote(noteName);
        await notesManagerComponent.performNoteAction(noteName, NoteOption.COPY_REFERENCE);
        
        const noteId = await storageHelper.getNoteUUIDLink(noteName);
        await editorPage.validateCopiedLinkSyntax(noteId);
    });

    test('Should Paste Note Reference Into Content', async ({ editorPage, notesManagerComponent, storageHelper }) => {
     
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        const noteName = 'Note to link to';
        await editorPage.createNewNote(noteName);
        await notesManagerComponent.performNoteAction(noteName, NoteOption.COPY_REFERENCE);
        const anotherNoteName = 'Another note\n';
        const clipboardContent = await editorPage.getClipboardContent();
        await editorPage.createNewNote(anotherNoteName, { pasteContent: true });
        await editorPage.validateNoteContent(anotherNoteName + clipboardContent);
    });

    test.fixme('Should Navigate To Source Note By Clicking Reference', {
        annotation: [
            {
                type: 'issue-link',
                description: 'https://jam.dev/c/a809fa00-f802-4edd-9833-6f9d49237184'
            },
            {
                type: 'issue-details',
                description: 'A link redirects to the incorrect note'
            }
        ]
    },
    async ({ editorPage, notesManagerComponent }) => {
       
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        const sourceNoteName = 'Source Note';
        await editorPage.createNewNote(sourceNoteName);
        await notesManagerComponent.performNoteAction(sourceNoteName, NoteOption.COPY_REFERENCE);

        const targetNoteName = 'Target Note with Link\n';
        await editorPage.createNewNote(targetNoteName, { pasteContent: true });
        
        await editorPage.togglePreview();
        await editorPage.clickNoteLink(sourceNoteName);
        await notesManagerComponent.validateNoteIsHighlighted(sourceNoteName);
    });
});
