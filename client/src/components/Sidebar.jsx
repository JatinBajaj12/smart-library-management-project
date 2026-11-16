import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Library, BookOpen, BookMarked, ClipboardList, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  // Close the drawer with Escape, and whenever the screen grows to desktop size
  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 768px)');
    const onMq = e => e.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => { window.removeEventListener('keydown', onKey); mq.removeEventListener('change', onMq); };
  }, [open]);
  const adminLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/books', label: 'Manage Books', icon: Library },
    { to: '/borrows', label: 'Borrow Records', icon: ClipboardList },
  ];
  const studentLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/catalog', label: 'Catalog', icon: BookOpen },
    { to: '/my-borrows', label: 'My Borrows', icon: BookMarked },
  ];
  const links = user.role === 'admin' ? adminLinks : studentLinks;
  return (
    <>
      {/* Mobile top bar */}
      <div className="flex shrink-0 items-center justify-between bg-slate-900 px-4 py-3 md:hidden">
        <span className="text-lg font-bold text-white">📚 Smart Library</span>
        <button onClick={() => setOpen(!open)} className="-mr-2 rounded-lg p-2 text-slate-200" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {/* Overlay */}
      {open && <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setOpen(false)} />}
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-64 max-w-[80vw] shrink-0 flex-col overflow-y-auto bg-slate-900 p-4 text-slate-200 transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'} md:static md:w-56 md:max-w-none md:translate-x-0`}>
        <h1 className="mb-6 text-lg font-bold text-white md:mb-8">📚 Smart Library</h1>
        <nav className="flex-1 space-y-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-3 text-sm md:py-2 ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>
              <l.icon size={16} />{l.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-2 px-3 py-3 text-sm hover:text-white md:py-2">
          <LogOut size={16} />Logout
        </button>
      </aside>
    </>
  );
}
