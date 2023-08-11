import { create } from 'zustand';

interface Tab {
    title: string;
    path: string;
}


interface DataFileTabsStore {
    tabs: Tab[];
    content: Map<string, string>
}

export const useDataFileTabsStore = create<DataFileTabsStore>(() => ({
    tabs: [],
    content: new Map<string, string>()
}));