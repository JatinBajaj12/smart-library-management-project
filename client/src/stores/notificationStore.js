import { create } from 'zustand';
export const useNotificationStore = create(set => ({
  items: [], unread: 0,
  add: n => set(s => ({ items: [n, ...s.items].slice(0, 30), unread: s.unread + 1 })),
  markRead: () => set({ unread: 0 }),
  clear: () => set({ items: [], unread: 0 }),
}));
