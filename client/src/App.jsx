import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import AppLayout from './layouts/AppLayout';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import BookManagementPage from './pages/BookManagementPage';
import CatalogPage from './pages/CatalogPage';
import MyBorrowsPage from './pages/MyBorrowsPage';
import AdminBorrowsPage from './pages/AdminBorrowsPage';
export const home = u => (u?.role === 'admin' ? '/dashboard' : '/dashboard');
function Guard({ role, children }) {
  const user = useAuthStore(s => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;
  return children;
}
export default function App() {
  const { ready, loadMe, user } = useAuthStore();
  useEffect(() => { loadMe(); }, [loadMe]);
  if (!ready) return <p className="p-8">Loading...</p>;
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
      <Route element={<Guard><AppLayout /></Guard>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/books" element={<Guard role="admin"><BookManagementPage /></Guard>} />
        <Route path="/borrows" element={<Guard role="admin"><AdminBorrowsPage /></Guard>} />
        <Route path="/catalog" element={<Guard role="student"><CatalogPage /></Guard>} />
        <Route path="/my-borrows" element={<Guard role="student"><MyBorrowsPage /></Guard>} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
