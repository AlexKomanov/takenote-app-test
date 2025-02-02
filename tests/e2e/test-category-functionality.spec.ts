import { test } from '../../fixtures/test.fixture';
import { Components, TestSuites } from '../../helpers/utils.helper';
import { parentSuite, suite, tms } from "allure-js-commons";

const JIRA_LINK = 'wwww.example.com/';
const DESCRIBE_NAME = 'CATEGORY FUNCTIONALITY';
const SUITE_NAME = 'Categories';
import { faker } from '@faker-js/faker';

const TEST_CATEGORIES = {
    PREDEFINED: ['WORK NOTES', 'PERSONAL TASKS', 'PROJECT IDEAS'],
    IMPORTANT: 'IMPORTANT NOTES',
    TO_DELETE: 'CATEGORY TO DELETE'
};

test.describe(DESCRIBE_NAME, {
    tag: [TestSuites.REGRESSION, Components.CATEGORY],
    annotation: [
        { type: "Jira Link", description: JIRA_LINK },
    ]
}, () => {
    test.beforeEach(async ({ notesManagerComponent }) => {
        await notesManagerComponent.goto();
    });

    test('Should Create And Validate A New Category With Random Name', async ({ notesManagerComponent }) => {
     
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");

        const randomCategoryName = `Category ${faker.number.int(10)}`;
        
        await notesManagerComponent.createCategory(randomCategoryName);
        await notesManagerComponent.validateCategoryExists(randomCategoryName);
    });

    test('Should Create And Validate Multiple Predefined Categories', async ({ notesManagerComponent }) => {
        
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");

        for (const categoryName of TEST_CATEGORIES.PREDEFINED) {
            await notesManagerComponent.createCategory(categoryName);
            await notesManagerComponent.validateCategoryExists(categoryName);
        }
    });

    test('Should Move A Note To A Specific Category', async ({ editorPage, notesManagerComponent }) => {
        
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        const noteContent = 'NOTE TO BE MOVED TO CATEGORY';
        
        await notesManagerComponent.createCategory(TEST_CATEGORIES.IMPORTANT);
        
        await editorPage.createNewNote(noteContent);
        await editorPage.validateNoteContent(noteContent);
        
        await notesManagerComponent.moveNoteToCategory(noteContent, TEST_CATEGORIES.IMPORTANT);
        
        await notesManagerComponent.selectCategory(TEST_CATEGORIES.IMPORTANT);
        await notesManagerComponent.validateNoteExists(noteContent);
    });

    test('Should Delete An Existing Category', async ({ notesManagerComponent }) => {
        
        await parentSuite(DESCRIBE_NAME);
        await suite(SUITE_NAME);
        await tms(JIRA_LINK, "JIRA_LINK");
        await notesManagerComponent.createCategory(TEST_CATEGORIES.TO_DELETE);
        await notesManagerComponent.validateCategoryExists(TEST_CATEGORIES.TO_DELETE);
        
        await notesManagerComponent.deleteCategory(TEST_CATEGORIES.TO_DELETE);
        await notesManagerComponent.validateCategoryNotExists(TEST_CATEGORIES.TO_DELETE);
    });
});
