import { useState } from 'react';
import StatusBadge from './StatusBadge';
import { useBorrowStore } from '../stores/borrowStore';
import { useAuthStore } from '../stores/authStore';
export default function BookCard({ book, onView, borrowedId }) {
  const { borrow, returnBook } = useBorrowStore();
  const isStudent = useAuthStore(s => s.user?.role === 'student');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const handleBorrow = async () => {
    setLoading(true); setErr('');
    try { await borrow(book._id); } catch (e) { setErr(e.response?.data?.message || 'Error'); }
    setLoading(false);
  };
  const handleReturn = async () => {
    setLoading(true); setErr('');
    try { await returnBook(borrowedId); } catch (e) { setErr(e.response?.data?.message || 'Error'); }
    setLoading(false);
  };
  return (
    <div className="card flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="min-w-0 font-semibold leading-snug">{book.title}</h3>
        <StatusBadge available={book.availableCopies} />
      </div>
      <p className="text-sm text-slate-500">{book.author}</p>
      <p className="text-xs text-indigo-600">{book.category?.categoryName}</p>
      <p className="text-sm">{book.availableCopies} / {book.totalCopies} copies available</p>
      {err && <p className="text-xs text-red-600">{err}</p>}
      <div className="mt-auto flex gap-2 pt-1">
        <button className="btn-ghost flex-1 justify-center" onClick={() => onView(book)}>Details</button>
        {isStudent && (
          borrowedId
            ? <button className="btn flex-1 justify-center !bg-amber-500 hover:!bg-amber-600" onClick={handleReturn} disabled={loading}>Return</button>
            : <button className="btn flex-1 justify-center" onClick={handleBorrow} disabled={loading || book.availableCopies < 1}>
                {book.availableCopies < 1 ? 'Unavailable' : loading ? '...' : 'Borrow'}
              </button>
        )}
      </div>
    </div>
  );
}
