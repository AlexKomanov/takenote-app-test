import BasePage from './base.page';
import { expect, Page, test } from '@playwright/test';

export enum NoteOption {
    MARK_AS_FAVORITE = 'Mark as favorite',
    REMOVE_FAVORITE = 'Remove favorite',
    MOVE_TO_TRASH = 'Move to trash',
    RESTORE_FROM_TRASH = 'Restore from trash',
    DELETE_PERMANENTLY = 'Delete permanently',
    DOWNLOAD = 'Download',
    COPY_REFERENCE = 'Copy reference to note'
}

export enum NavigationOption {
    SCRATCHPAD = 'scratchpad',
    NOTES = 'notes',
    FAVORITES = 'favorites',
    TRASH = 'trash'
}

export default class NotesManagerComponent extends BasePage {
    private readonly searchInput = this.page.getByTestId('note-search');
    private readonly noteList = this.page.getByTestId('note-list');
    private readonly clearSearchButton = this.page.getByTestId('note-search-clear');
    private readonly noteListItem = this.page.locator('[data-testid*="note-list-item-"]');
    private readonly selectedNoteListItems = this.page.locator('[data-testid*="note-list-item-"].selected');
    private readonly categoryList = this.page.locator('.category-list');
    private readonly newCategoryButton = this.page.getByTestId('add-category-button');
    private readonly newCategoryLabel = this.page.getByTestId('new-category-label');
    private readonly categoryItems = this.page.getByTestId('category-list-div');
    private readonly syncNotesButton = this.page.getByTestId('topbar-action-sync-notes');
    private readonly emptyTrashButton = this.page.getByTestId('empty-trash-button');
    private readonly trashButton = this.page.getByTestId('trash');

    constructor(protected page: Page) {
        super(page);
    }

    public async emptyTrash() {
        await test.step('Empty trash', async () => {
            await this.emptyTrashButton.click();
        });
    }

    public async searchNotes(query: string) {
        await test.step('Enter search query', async () => {
            await this.searchInput.fill(query);
        });
    }

    public async clearSearch() {
        await test.step('Clear search input', async () => {
            await this.searchInput.clear();
            await expect(this.searchInput).toHaveValue('');
        });
    }

    public async validateSearchCleared() {
        await test.step('Validate search cleared', async () => {
            await expect(this.searchInput).toHaveValue('');
        });
    }

    public async validateSearchResults(query: string, expectedCount: number) {
        await test.step('Validate search results', async () => {
            await expect(this.noteListItem).toHaveCount(expectedCount);
            if (expectedCount > 0) {
                for (const note of await this.noteListItem.all()) {
                    await expect(note).toContainText(query, { ignoreCase: true });
                }
            }
        });
    }

    public async validateNoteCount(expectedCount: number) {
        await test.step('Validate note count', async () => {
            await expect(this.noteListItem).toHaveCount(expectedCount);
        });
    }

    public async getNoteCount() {
        return await test.step('Get note count', async () => {
            return await this.noteListItem.count();
        });
    }

    public async createCategory(name: string) {
        await test.step('Create new category', async () => {
            await this.newCategoryButton.click();
            await this.newCategoryLabel.fill(name);
            await this.newCategoryLabel.press('Enter');
        });

        await test.step('Sync notes', async () => {
            await this.syncNotesButton.click();
        });
    }

    public async validateCategoryExists(name: string) {
        await test.step('Validate category exists', async () => {
            const categoryItem = this.categoryItems.filter({ hasText: name });
            await expect(categoryItem).toBeVisible();
        });
    }

    public async validateCategoryNotExists(name: string) {
        await test.step('Validate category does not exist', async () => {
            const categoryItem = this.categoryItems.filter({ hasText: name });
            await expect(categoryItem).not.toBeVisible();
        });
    }

    public async selectCategory(name: string) {
        await test.step('Select category', async () => {
            const categoryItem = this.categoryItems.filter({ hasText: name });
            await categoryItem.click();
        });
    }

    public async moveNoteToCategory(noteTitle: string, categoryName: string) {
        await test.step('Move note to category', async () => {
            // Right click on note to open context menu
            const note = this.noteListItem.filter({ hasText: noteTitle });
            await note.click({ button: 'right' });
            
            // Click "Move to Category" option
            const moveToCategory = this.page.getByTestId('note-options-move-to-category-select');
            await moveToCategory.selectOption(categoryName);
        });
    }

    public async deleteCategory(name: string) {
        await test.step('Delete category', async () => {
            // Right click on category to open context menu
            const categoryItem = this.categoryItems.filter({ hasText: name });
            await categoryItem.click({ button: 'right' });
            
            // Click delete option
            const deleteOption = this.page.getByText('Delete permanently');
            await deleteOption.click();
        });
    }

    public async navigateTo(option: NavigationOption) {
        await test.step(`Navigate to ${option}`, async () => {
            await this.page.getByTestId(option).click();
        });
    }

    public async dragNoteToCategory(noteTitle: string, categoryName: string) {
        await test.step('Drag note to category', async () => {
            const note = this.noteListItem.filter({ hasText: noteTitle });
            const category = this.categoryItems.filter({ hasText: categoryName });
            await note.dragTo(category);
        });
    }

    public async dragNoteToTrash(noteTitle: string) {
        await test.step('Drag note to trash', async () => {
            const note = this.noteListItem.filter({ hasText: noteTitle });
            await note.dragTo(this.trashButton);
        });
    }

    public async validateNoteExists(noteTitle: string, exists: boolean = true) {
        await this.searchNotes(noteTitle);
        await test.step(`Validate note ${exists ? 'exists' : 'does not exist'}`, async () => {
            const note = this.noteListItem.filter({ hasText: noteTitle });
            await expect(note).toBeVisible({visible: exists});
        });
    }

    private async openNoteOptionsMenu(noteName: string) {
        await test.step('Open note options menu', async () => {
            const note = this.noteListItem.filter({ hasText: noteName });
            await note.click({ button: 'right' });
        });
    }

    public async selectNoteOption(option: NoteOption) {
        await test.step(`Select note option: ${option}`, async () => {
            await this.page
                .locator('[data-testid="note-options-nav"] .nav-item')
                .filter({ hasText: option })
                .click();
        });
    }

    public async performNoteAction(noteName: string, option: NoteOption) {
        await this.openNoteOptionsMenu(noteName);
        await this.selectNoteOption(option);
    }

    public async selectNotes(notes: string[]) {
        await test.step('Select multiple notes', async () => {
            for (const note of notes) {
                const noteItem = this.noteListItem.filter({ hasText: note });
                if (note === notes[0]) {
                    await noteItem.click();
                } else {
                    await noteItem.click({ modifiers: ['Meta'] });
                }
            }
        });
    }

    public async validateSelectedNoteCount(expectedCount: number) {
        await test.step('Validate selected note count', async () => {
            await expect(this.selectedNoteListItems).toHaveCount(expectedCount);
        });
    }

    public async validateNoteIsHighlighted(noteName: string) {
        await test.step(`Validate note '${noteName}' is highlighted`, async () => {
            await expect(this.selectedNoteListItems.locator('.truncate-text')).toContainText(noteName, { useInnerText: true });
        });
    }
}
