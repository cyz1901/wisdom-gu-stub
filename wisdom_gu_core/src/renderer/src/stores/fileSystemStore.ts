import { create } from 'zustand';

export interface Tab {
    title: string;
    path: string;
}

interface DataFileTabsStore {
    selectedTabPath: Tab;
    tabs: Tab[];
    content: Map<string, string>;
    selectTab: (tabNanme: string, tabPath: string) => void;
    addTab: (title: string, path: string) => void
}

export const useDataFileTabsStore = create<DataFileTabsStore>((set, get) => ({
    //初始化 selectedTabPath
    selectedTabPath: { title: '', path: '' },
    tabs: [],
    content: new Map<string, string>(),
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
}));
