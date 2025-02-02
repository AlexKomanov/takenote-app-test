import { test } from '../fixtures/test.fixture';
import { Components, TestSuites } from '../helpers/utils.helper';
import { parentSuite, suite, tms } from "allure-js-commons";

const JIRA_LINK = 'wwww.example.com/';
const DESCRIBE_NAME = 'NOTE MANAGEMENT';
const SUITE_NAME = 'Notes';
import { NoteOption, NavigationOption } from '../pages/notes-manager-component.page';

test.describe(DESCRIBE_NAME, {
    tag: [TestSuites.REGRESSION, Components.NOTES_MANAGER],
    annotation: [
        { type: "Jira Link", description: JIRA_LINK },
    ]
}, () => {
    test.beforeEach(async ({ editorPage }) => {
        await editorPage.goto();
    });

    test('Should Add And Remove Note From Favorites', async ({ editorPage, notesManagerComponent }) => {
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        const noteName = 'Note to favorite';
        await editorPage.createNewNote(noteName);
        await notesManagerComponent.performNoteAction(noteName, NoteOption.MARK_AS_FAVORITE);
        
        await notesManagerComponent.navigateTo(NavigationOption.FAVORITES);
        await notesManagerComponent.searchNotes(noteName);
        await notesManagerComponent.validateNoteExists(noteName);
        
        await notesManagerComponent.performNoteAction(noteName, NoteOption.REMOVE_FAVORITE);
        await notesManagerComponent.searchNotes(noteName);
        await notesManagerComponent.validateNoteExists(noteName, false);
    });

    test('Should Move Note To Trash And Restore It', async ({ editorPage, notesManagerComponent }) => {
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        const noteName = 'Note to trash';
        await editorPage.createNewNote(noteName);
        await notesManagerComponent.performNoteAction(noteName, NoteOption.MOVE_TO_TRASH);
        
        await notesManagerComponent.navigateTo(NavigationOption.TRASH);
        await notesManagerComponent.searchNotes(noteName);
        await notesManagerComponent.validateNoteExists(noteName);
        
        await notesManagerComponent.performNoteAction(noteName, NoteOption.RESTORE_FROM_TRASH);
        await notesManagerComponent.navigateTo(NavigationOption.NOTES);
        await notesManagerComponent.searchNotes(noteName);
        await notesManagerComponent.validateNoteExists(noteName);
        
        await notesManagerComponent.performNoteAction(noteName, NoteOption.MOVE_TO_TRASH);
        await notesManagerComponent.navigateTo(NavigationOption.TRASH);
        await notesManagerComponent.performNoteAction(noteName, NoteOption.DELETE_PERMANENTLY);
        await notesManagerComponent.validateNoteExists(noteName, false);
    });

    test('Should Move Multiple Notes To Trash And Empty It', async ({ editorPage, notesManagerComponent }) => {
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        
        const notes = ['Note 1', 'Note 2', 'Note 3', 'Note 4'];
        for (const note of notes) {
            await editorPage.createNewNote(note);
        }

        await notesManagerComponent.selectNotes([notes[0], notes[1], notes[2]]);
        await notesManagerComponent.validateSelectedNoteCount(3);

        await notesManagerComponent.performNoteAction(notes[1], NoteOption.MOVE_TO_TRASH);
        await notesManagerComponent.navigateTo(NavigationOption.NOTES);
        await notesManagerComponent.searchNotes(notes[3]); 
        await notesManagerComponent.validateNoteExists(notes[3]);
        
        await notesManagerComponent.navigateTo(NavigationOption.TRASH);
        await notesManagerComponent.clearSearch();
        await notesManagerComponent.emptyTrash();
        await notesManagerComponent.validateNoteCount(0);
    });
});
