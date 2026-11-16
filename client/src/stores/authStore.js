import { create } from 'zustand';
import api from '../services/api';
export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem('token'), user: null, ready: false,
  async _auth(path, body) {
    const { data } = await api.post(path, body);
    localStorage.setItem('token', data.token);
    set({ token: data.token, user: data.user });
    return data.user;
  },
  login: body => get()._auth('/auth/login', body),
  register: body => get()._auth('/auth/register', body),
  async loadMe() {
    if (!get().token) return set({ ready: true });
    try { const { data } = await api.get('/auth/me'); set({ user: data.user, ready: true }); }
    catch { get().logout(); set({ ready: true }); }
  },
  logout() { localStorage.removeItem('token'); set({ token: null, user: null }); },
}));
