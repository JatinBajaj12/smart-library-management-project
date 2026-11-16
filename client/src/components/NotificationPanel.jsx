import { useNotificationStore } from '../stores/notificationStore';
export default function NotificationPanel({ className = '' }) {
  const { items, clear } = useNotificationStore();
  return (
    <div className={`card ${className}`}>
      <div className="mb-2 flex justify-between"><h3 className="font-semibold">Notifications</h3>
        {items.length > 0 && <button className="text-xs text-indigo-600" onClick={clear}>Clear</button>}</div>
      <ul className="max-h-72 space-y-2 overflow-y-auto text-sm">
        {items.map(n => <li key={n.id} className="rounded bg-slate-50 p-2">{n.message}<span className="block text-xs text-slate-400">{new Date(n.at).toLocaleTimeString()}</span></li>)}
        {!items.length && <li className="text-slate-400">No notifications yet</li>}
      </ul>
    </div>
  );
}
