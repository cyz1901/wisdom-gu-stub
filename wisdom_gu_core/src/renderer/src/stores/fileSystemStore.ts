import { create } from 'zustand';

export interface Tab {
    title: string;
    path: string;
}


interface DataFileTabsStore {
    selectedTabPath: Tab;
    tabs: Tab[];
    content: { [path: string]: File | null };
    selectTab: (tabNanme: string, tabPath: string) => void;
    addTab: (title: string, path: string) => void
    addContent: (path: string, content: File | null) => void
}

export const useDataFileTabsStore = create<DataFileTabsStore>((set, get) => ({
    selectedTabPath: { title: '', path: '' },
    tabs: [],
    content: {},
    selectTab: (tabName: string, tabPath: string) => {
        set((state) => ({
            ...state,
            selectedTabPath: { title: tabName, path: tabPath },
        }));
    },
    addTab: (title, path) => {
        if (get().tabs.find(tab => tab.path === path)) return;
        set((state) => ({
            ...state,
            tabs: [...state.tabs, { title: title, path: path }],
        }));
    },
    addContent: (path, content) => {
        set((state) => ({
            ...state,
            content: { ...state.content, [path]: content },
        }));
    }
}));
