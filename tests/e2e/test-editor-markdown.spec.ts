import { test } from '../../fixtures/test.fixture';
import { Components, TestSuites } from '../../helpers/utils.helper';
import { parentSuite, suite, tms } from "allure-js-commons";
const fs = require('fs');
const path = require('path');

const JIRA_LINK = 'wwww.example.com/';
const DESCRIBE_NAME = 'EDITOR MARKDOWN FEATURES';
const SUITE_NAME = 'Editor';

test.describe(DESCRIBE_NAME, {
    tag: [TestSuites.REGRESSION, Components.EDITOR],
    annotation: [
        { type: "Jira Link", description: JIRA_LINK },
    ]
}, () => {
    test.beforeEach(async ({ editorPage }) => {
        await editorPage.goto();
    });

    test('Should Create And Preview Markdown Note', async ({ editorPage, notesManagerComponent }) => {
        
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        const noteTitle = 'Markdown Note';
        const markdownContent = `# ${noteTitle}\n\nThis is a **bold** text\n\n- List item 1\n- List item 2`;
        await editorPage.createNewNote(markdownContent);
        await notesManagerComponent.validateNoteExists(noteTitle);
        await editorPage.validateNoteContent(markdownContent);
        await editorPage.togglePreview();
        await editorPage.validateNoteContentInPreview(markdownContent);
    });

    test('Should Preview Complex Markdown File', async ({ editorPage }) => {
    
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        
        const complexMarkdownFile = fs.readFileSync(
            path.join(__dirname, '../fixtures/test-content.md'),
            'utf8'
        );

        await editorPage.createNewNote(complexMarkdownFile);
        await editorPage.togglePreview();
        await editorPage.validateNoteContentInPreview(complexMarkdownFile);
        await editorPage.togglePreview();
        await editorPage.validateNoteContent(complexMarkdownFile);
    });
});
