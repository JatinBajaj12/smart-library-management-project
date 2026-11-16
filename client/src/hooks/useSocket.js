import { useEffect } from 'react';
import { createSocket } from '../services/socket';
import { useAuthStore } from '../stores/authStore';
import { useBookStore } from '../stores/bookStore';
import { useNotificationStore } from '../stores/notificationStore';
export default function useSocket() {
  const token = useAuthStore(s => s.token);
  useEffect(() => {
    if (!token) return;
    const { applyAdded, applyUpdated, applyDeleted, fetchBooks } = useBookStore.getState();
    const socket = createSocket(token);
    let first = true;
    socket.on('connect', () => { if (!first) fetchBooks(); first = false; });
    socket.on('bookAdded', applyAdded);
    socket.on('bookUpdated', applyUpdated);
    socket.on('bookDeleted', applyDeleted);
    socket.on('notification', useNotificationStore.getState().add);
    return () => socket.disconnect();
  }, [token]);
}
