import { create } from 'zustand';
import api from '../services/api';
export const useBorrowStore = create(set => ({
  borrows: [],
  async fetchMyBorrows() { const { data } = await api.get('/borrows/my'); set({ borrows: data }); },
  async fetchAllBorrows() { const { data } = await api.get('/borrows/all'); set({ borrows: data }); },
  async borrow(bookId) {
    const { data } = await api.post('/borrows', { bookId });
    set(s => ({ borrows: [data, ...s.borrows] }));
    return data;
  },
  async returnBook(borrowId) {
    const { data } = await api.put(`/borrows/${borrowId}/return`);
    set(s => ({ borrows: s.borrows.map(b => b._id === borrowId ? data : b) }));
    return data;
  },
}));
