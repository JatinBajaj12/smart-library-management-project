import { useEffect } from 'react';
import { useBorrowStore } from '../stores/borrowStore';
export default function AdminBorrowsPage() {
  const { borrows, fetchAllBorrows } = useBorrowStore();
  useEffect(() => { fetchAllBorrows(); }, [fetchAllBorrows]);
  const active = borrows.filter(b => b.status === 'borrowed');
  const history = borrows.filter(b => b.status === 'returned');
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold md:text-2xl">Borrow Records</h2>
      <div>
        <h3 className="mb-3 font-semibold">Currently Borrowed ({active.length})</h3>
        {/* Desktop table */}
        <div className="card hidden overflow-x-auto !p-0 lg:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500">
              <tr>
                <th className="whitespace-nowrap px-4 py-3">Book</th>
                <th className="whitespace-nowrap px-4 py-3">Student</th>
                <th className="whitespace-nowrap px-4 py-3">Email</th>
                <th className="whitespace-nowrap px-4 py-3">Borrowed On</th>
              </tr>
            </thead>
            <tbody>
              {active.map(b => (
                <tr key={b._id} className="border-t">
                  <td className="max-w-[18rem] px-4 py-3">{b.book.title}</td>
                  <td className="max-w-[18rem] px-4 py-3">{b.student.name}</td>
                  <td className="max-w-[18rem] px-4 py-3">{b.student.email}</td>
                  <td className="max-w-[18rem] px-4 py-3">{new Date(b.borrowedAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {!active.length && <tr><td colSpan={4} className="p-6 text-center text-slate-400">No active borrows</td></tr>}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] lg:hidden">
          {!active.length && <p className="col-span-full py-4 text-center text-slate-400">No active borrows</p>}
          {active.map(b => (
            <div key={b._id} className="card space-y-1 text-sm">
              <p><b>Book:</b> {b.book.title}</p>
              <p><b>Student:</b> {b.student.name}</p>
              <p><b>Email:</b> {b.student.email}</p>
              <p><b>Borrowed:</b> {new Date(b.borrowedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
      {history.length > 0 && (
        <div>
          <h3 className="mb-3 font-semibold">Return History</h3>
          <div className="card hidden overflow-x-auto !p-0 lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3">Book</th>
                  <th className="whitespace-nowrap px-4 py-3">Student</th>
                  <th className="whitespace-nowrap px-4 py-3">Borrowed</th>
                  <th className="whitespace-nowrap px-4 py-3">Returned</th>
                </tr>
              </thead>
              <tbody>
                {history.map(b => (
                  <tr key={b._id} className="border-t opacity-60">
                    <td className="max-w-[18rem] px-4 py-3">{b.book.title}</td>
                    <td className="max-w-[18rem] px-4 py-3">{b.student.name}</td>
                    <td className="max-w-[18rem] px-4 py-3">{new Date(b.borrowedAt).toLocaleDateString()}</td>
                    <td className="max-w-[18rem] px-4 py-3">{new Date(b.returnedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] lg:hidden">
            {history.map(b => (
              <div key={b._id} className="card space-y-1 text-sm opacity-60">
                <p><b>Book:</b> {b.book.title}</p>
                <p><b>Student:</b> {b.student.name}</p>
                <p><b>Borrowed:</b> {new Date(b.borrowedAt).toLocaleDateString()}</p>
                <p><b>Returned:</b> {new Date(b.returnedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
