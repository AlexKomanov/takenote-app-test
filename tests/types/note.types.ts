export interface Note {
    id: string;
    text: string;
    category: string;
    scratchpad?: boolean;
    favorite: boolean;
    created: string;
    lastUpdated: string;
}

export interface Category {
    id: string;
    name: string;
    draggedOver: boolean;
}

export interface CodeMirrorOptions {
    mode: string;
    theme: string;
    lineNumbers: boolean;
    lineWrapping: boolean;
    styleActiveLine: {
        nonEmpty: boolean;
    };
    viewportMargin: null;
    keyMap: string;
    dragDrop: boolean;
    direction: string;
    scrollPastEnd: boolean;
}

export interface Settings {
    previewMarkdown: boolean;
    darkTheme: boolean;
    sidebarVisible: boolean;
    notesSortKey: 'lastUpdated';
    codeMirrorOptions: CodeMirrorOptions;
    loading: boolean;
}

export interface AppState {
    notes: Note[];
    categories: Category[];
    settings: Settings;
}
