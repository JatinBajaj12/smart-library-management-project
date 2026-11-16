import { useEffect } from 'react';
import { useBorrowStore } from '../stores/borrowStore';
export default function MyBorrowsPage() {
  const { borrows, fetchMyBorrows, returnBook } = useBorrowStore();
  useEffect(() => { fetchMyBorrows(); }, [fetchMyBorrows]);
  const active = borrows.filter(b => b.status === 'borrowed');
  const history = borrows.filter(b => b.status === 'returned');
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold md:text-2xl">My Borrowed Books</h2>
      <div>
        <h3 className="mb-3 font-semibold">Currently Borrowed ({active.length})</h3>
        {active.length === 0 && <p className="text-slate-400">You have no books borrowed right now.</p>}
        <div className="space-y-3">
          {active.map(b => (
            <div key={b._id} className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-medium">{b.book.title}</p>
                <p className="text-sm text-slate-500">{b.book.author}</p>
                <p className="text-xs text-slate-400">Borrowed: {new Date(b.borrowedAt).toLocaleDateString()}</p>
              </div>
              <button className="btn !bg-amber-500 hover:!bg-amber-600 w-full shrink-0 justify-center sm:w-auto" onClick={() => returnBook(b._id)}>
                Return
              </button>
            </div>
          ))}
        </div>
      </div>
      {history.length > 0 && (
        <div>
          <h3 className="mb-3 font-semibold">History</h3>
          <div className="space-y-3">
            {history.map(b => (
              <div key={b._id} className="card flex flex-col gap-1 opacity-60 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium">{b.book.title}</p>
                  <p className="text-sm text-slate-500">{b.book.author}</p>
                  <p className="text-xs text-slate-400">
                    Borrowed: {new Date(b.borrowedAt).toLocaleDateString()} ·
                    Returned: {new Date(b.returnedAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium text-green-600">Returned</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
