import test, { Page, expect } from '@playwright/test';
import { AppState, Note, Category } from '../types/note.types';
import testData from '../data/test-data.json';

export class StorageHelper {
    constructor(private page: Page) {}

    public async initializeStorage(state: AppState = testData as AppState) {
        await test.step('Initialize storage with test data', async () => {
            await this.page.evaluate((data) => {
                localStorage.setItem('notes', JSON.stringify(data.notes));
                localStorage.setItem('categories', JSON.stringify(data.categories));
                localStorage.setItem('settings', JSON.stringify(data.settings));
            }, state);
        });
    }

    public async getNotes(): Promise<Note[]> {
        return await test.step('Get notes from storage', async () => {
            return this.page.evaluate(() => {
                return JSON.parse(localStorage.getItem('notes') || '[]');
            });
        });
    }

    public async verifyNoteExistsInLocalStorage(noteContent: string) {
        await test.step(`Verify note '${noteContent}' exists in storage`, async () => {
            await expect.poll(async () => {
                const notes = await this.getNotes();
                return notes.some(note => note.text.includes(noteContent));
            }).toBeTruthy();
        });
    }

    public async getCategories(): Promise<Category[]> {
        return await test.step('Get categories from storage', async () => {
            return this.page.evaluate(() => {
                return JSON.parse(localStorage.getItem('categories') || '[]');
            });
        });
    }

    public async verifyCategoryExistsInLocalStorage(categoryName: string) {
        await test.step(`Verify category '${categoryName}' exists in storage`, async () => {
            await expect.poll(async () => {
                const categories = await this.getCategories();
                return categories.some(category => category.name === categoryName);
            }).toBeTruthy();
        });
    }

    public async getNoteUUIDLink(noteTitle: string): Promise<string> {
        return await test.step(`Get UUID link for note '${noteTitle}'`, async () => {
            const notes = await this.getNotes();
            const note = notes.find(note => note.text.includes(noteTitle));
            if (!note) {
                throw new Error(`Note with title '${noteTitle}' not found`);
            }
            return note.id.substring(0, 6); // Returns first 6 characters of UUID
        });
    }
}
