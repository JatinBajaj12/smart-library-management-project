import { create } from 'zustand';
import api from '../services/api';
export const useBookStore = create(set => ({
  books: [], categories: [],
  async fetchBooks() { const { data } = await api.get('/books'); set({ books: data }); },
  async fetchCategories() { const { data } = await api.get('/categories'); set({ categories: data }); },
  applyAdded: b => set(s => ({ books: s.books.some(x => x._id === b._id) ? s.books : [b, ...s.books] })),
  applyUpdated: b => set(s => ({ books: s.books.map(x => (x._id === b._id ? b : x)) })),
  applyDeleted: ({ _id }) => set(s => ({ books: s.books.filter(x => x._id !== _id) })),
}));
