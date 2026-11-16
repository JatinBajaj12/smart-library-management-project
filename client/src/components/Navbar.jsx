import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';
import NotificationPanel from './NotificationPanel';
export default function Navbar() {
  const user = useAuthStore(s => s.user);
  const { unread, markRead } = useNotificationStore();
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-10 flex shrink-0 items-center justify-between gap-3 border-b bg-white px-4 py-3 md:px-6">
      <span className="min-w-0 flex-1 truncate text-sm text-slate-500">
        Welcome, <b>{user.name}</b>
        <span className="hidden sm:inline"> ({user.role})</span>
      </span>
      <button className="relative shrink-0 rounded-lg p-1" aria-label="Notifications" onClick={() => { setOpen(!open); markRead(); }}>
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 text-xs text-white">{unread}</span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <NotificationPanel className="absolute right-3 top-full z-40 mt-2 w-[calc(100vw-1.5rem)] max-w-sm shadow-lg" />
        </>
      )}
    </header>
  );
}
