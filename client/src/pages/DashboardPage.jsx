import { useEffect, useState } from 'react';
import { Library, BookCheck, Users, BookMarked } from 'lucide-react';
import api from '../services/api';
import StatCard from '../components/StatCard';
import NotificationPanel from '../components/NotificationPanel';
import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';
export default function DashboardPage() {
  const isAdmin = useAuthStore(s => s.user.role === 'admin');
  const count = useNotificationStore(s => s.items.length);
  const [s, setS] = useState(null);
  useEffect(() => { api.get('/dashboard/stats').then(r => setS(r.data)); }, [count]);
  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl font-bold md:text-2xl">Dashboard</h2>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <StatCard label="Total books" value={s?.totalBooks} icon={Library} />
        <StatCard label="Available" value={s?.availableBooks} icon={BookCheck} />
        {isAdmin && <StatCard label="Students" value={s?.totalStudents} icon={Users} />}
        <StatCard label={isAdmin ? 'Active borrows' : 'My borrows'} value={s?.activeBorrows} icon={BookMarked} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="card">
          <h3 className="mb-2 font-semibold">Recently added</h3>
          <ul className="space-y-1 text-sm">
            {s?.recentBooks.map(b => (
              <li key={b._id} className="flex flex-col">
                <span className="font-medium">{b.title}</span>
                <span className="text-xs text-slate-400">— {b.author}</span>
              </li>
            ))}
          </ul>
        </div>
        {isAdmin && (
          <div className="card">
            <h3 className="mb-2 font-semibold">Recent activity</h3>
            <ul className="space-y-1 text-sm">
              {s?.recentActivity.map((a, i) => (
                <li key={i}>{a.message}
                  <span className="block text-xs text-slate-400">{new Date(a.at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <NotificationPanel />
      </div>
    </div>
  );
}
