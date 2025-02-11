import BasePage from './base.page';
import { expect, Page, test } from '@playwright/test';

export enum FooterOption {
    PREVIEW = 'Preview note',
    EDIT_NOTE = 'Edit note',
    ADD_TO_FAVORITES = 'Add note to favorites',
    DELETE = 'Delete note',
    DOWNLOAD = 'Download note',
    COPY = 'Copy note',
    SYNC = 'Sync notes',
    THEMES = 'Themes',
    SETTINGS = 'Settings',
}

export default class EditorComponent extends BasePage {
    private readonly newNoteButton = this.page.getByTestId('sidebar-action-create-new-note');
    private readonly editorTextArea = this.page.locator('.CodeMirror textarea');
    private readonly previewButton = this.page.getByTestId('preview-mode');
    private readonly previewArea = this.page.locator('.previewer');
    private readonly footerIcon = this.page.locator('span.sr-only');
    private readonly syncNotesButton = this.page.getByTestId('topbar-action-sync-notes');
    private readonly noteListItem = this.page.locator('[class="react-codemirror2 editor mousetrap"]');
    
    
    constructor(protected page: Page) {
        super(page);
    }

    public async clickFooterOption(option: FooterOption) {
        await test.step(`Click footer option: ${option}`, async () => {
            await this.footerIcon.filter({ hasText: option }).click();
        });
    }

    public async createNewNote(content: string, options?: { pasteContent?: boolean }) {
        await test.step('Clicking a "New Note" button', async () => {
            await this.newNoteButton.click();
        });
        
        await test.step(`Typing a new content: '${content}'`, async () => {
            await this.editorTextArea.pressSequentially(content, {delay: 50});
        });

        if (options?.pasteContent) {
            await test.step('Paste content', async () => {
                await this.pasteContent();
            });
        }

        await test.step('Sync notes', async () => {
            await this.syncNotesButton.click();
        });


    }

    public async togglePreview() {
        await test.step('Click preview button', async () => {
            await this.previewButton.click();
        });
    }

    public async validateNoteContent(expectedContent: string) {
        await test.step('Validate note content', async () => {
            await expect(this.noteListItem, 'Note content should match input')
                .toContainText(expectedContent, {useInnerText: true});
        });
    }

    public async validateNoteContentInPreview(expectedContent: string) {
        await test.step('Validate note content in preview', async () => {
            
            // Convert markdown to plain text for comparison
            const expectedPlainText = expectedContent
                .replace(/^#{1,6}\s(.*)$/gm, '$1')    // Headers
                .replace(/\*\*(.*?)\*\*/g, '$1')      // Bold
                .replace(/\*(.*?)\*/g, '$1')          // Italic
                .replace(/__(.*?)__/g, '$1')          // Alt Bold
                .replace(/_(.*?)_/g, '$1')            // Alt Italic
                .replace(/^[-*+]\s+/gm, '')           // Unordered lists
                .replace(/^\d+\.\s+/gm, '')           // Ordered lists
                .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')  // Links
                .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1') // Images
                .replace(/`{1,3}[^`]*`{1,3}/g, '')   // Code blocks
                .replace(/^>\s(.*)$/gm, '$1')         // Blockquotes
                .replace(/^[-*_]{3,}\s*$/gm, '')      // HR lines
                .replace(/\n{3,}/g, '\n\n')           // Extra newlines
                .trim();

            await expect(this.previewArea, 'Note content should match input')
                .toContainText(expectedPlainText, {useInnerText: true});
        });
    }

    public async validateLineNumbersVisible() {
        await test.step('Validate line numbers', async () => {
            const lineNumbers = this.page.locator('.CodeMirror-linenumber');
            await expect(lineNumbers).toBeVisible();
            const numbers = await lineNumbers.all();
            for (let i = 0; i < numbers.length; i++) {
                await expect(numbers[i]).toHaveText(String(i + 1));
            }
        });
    }

    public async validateNoteLink(noteId: string) {
        await test.step('Validate note link', async () => {
            const link = this.page.locator(`a[href*="${noteId}"]`);
            await expect(link).toBeVisible();
        });
    }

    public async validateCopiedLinkSyntax(noteId: string) {
        await test.step(`Validate copied link syntax is: {{${noteId}}}`, async () => {
            await expect.poll(async () => {
                return await this.getClipboardContent()
            },{
                timeout: 10000
            }).toBe(`{{${noteId}}}`);
        });
    }

    public async clickNoteLink(noteTitle: string) {
        await test.step('Click note link', async () => {
            const link = this.previewArea.locator('a', { hasText: noteTitle });
            await link.click();
        });
    }

}
