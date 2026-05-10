import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

interface EditorTab {
  id: string
  name: string
  content: string
  language: 'json' | 'yaml' | 'csv' | 'text'
  isDirty: boolean
}

interface EditorStore {
  tabs: EditorTab[]
  activeTabId: string | null
  addTab: (tab: Omit<EditorTab, 'isDirty' | 'id'>) => void
  removeTab: (id: string) => void
  updateTab: (id: string, content: string) => void
  setActiveTab: (id: string) => void
  getActiveTab: () => EditorTab | undefined
  clearAll: () => void
}

export const useEditorStore = create<EditorStore>(
  persist(
    immer((set, get) => ({
      tabs: [],
      activeTabId: null,
      addTab: (tab) => {
        const id = Math.random().toString(36).substring(7)
        set((state) => {
          state.tabs.push({
            ...tab,
            id,
            isDirty: false,
          })
          state.activeTabId = id
        })
      },
      removeTab: (id) =>
        set((state) => {
          state.tabs = state.tabs.filter((tab) => tab.id !== id)
          if (state.activeTabId === id) {
            state.activeTabId = state.tabs[0]?.id || null
          }
        }),
      updateTab: (id, content) =>
        set((state) => {
          const tab = state.tabs.find((t) => t.id === id)
          if (tab) {
            tab.content = content
            tab.isDirty = true
          }
        }),
      setActiveTab: (id) => set({ activeTabId: id }),
      getActiveTab: () => {
        const state = get()
        return state.tabs.find((tab) => tab.id === state.activeTabId)
      },
      clearAll: () =>
        set((state) => {
          state.tabs = []
          state.activeTabId = null
        }),
    })),
    {
      name: 'json-toolkit-editor',
    }
  )
)
