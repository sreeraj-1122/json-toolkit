import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'

interface HistoryItem {
  id: string
  title: string
  content: string
  toolId: string
  timestamp: number
}

interface HistoryStore {
  items: HistoryItem[]
  addItem: (title: string, content: string, toolId: string) => void
  removeItem: (id: string) => void
  clearHistory: () => void
  getItems: (limit?: number) => HistoryItem[]
}

export const useHistoryStore = create<HistoryStore>(
  persist(
    (set, get) => ({
      items: [],
      addItem: (title, content, toolId) =>
        set((state) => ({
          items: [
            {
              id: uuid(),
              title,
              content,
              toolId,
              timestamp: Date.now(),
            },
            ...state.items.slice(0, 49),
          ],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearHistory: () => set({ items: [] }),
      getItems: (limit = 10) => get().items.slice(0, limit),
    }),
    {
      name: 'json-toolkit-history',
    }
  )
)
