import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import useSocket from '../hooks/useSocket';
import { useBookStore } from '../stores/bookStore';
export default function AppLayout() {
  useSocket();
  const { fetchBooks, fetchCategories } = useBookStore();
  useEffect(() => { fetchBooks(); fetchCategories(); }, [fetchBooks, fetchCategories]);
  return (
    <div className="app-shell flex flex-col overflow-hidden md:flex-row">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
