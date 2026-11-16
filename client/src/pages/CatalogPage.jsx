import { useEffect, useMemo, useState } from 'react';
import { useBookStore } from '../stores/bookStore';
import { useBorrowStore } from '../stores/borrowStore';
import BookCard from '../components/BookCard';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
export default function CatalogPage() {
  const { books, categories } = useBookStore();
  const { borrows, fetchMyBorrows } = useBorrowStore();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [sel, setSel] = useState(null);
  useEffect(() => { fetchMyBorrows(); }, [fetchMyBorrows]);
  const borrowedMap = useMemo(() => {
    const m = {};
    borrows.filter(b => b.status === 'borrowed').forEach(b => { m[b.book._id] = b._id; });
    return m;
  }, [borrows]);
  const shown = useMemo(() => books.filter(b =>
    (!cat || b.category?._id === cat) &&
    `${b.title} ${b.author}`.toLowerCase().includes(q.toLowerCase())), [books, q, cat]);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="mr-auto text-xl font-bold md:text-2xl">Book Catalog</h2>
        <div className="flex w-full flex-wrap gap-2 lg:w-auto">
          <input className="input min-w-[8rem] flex-1 lg:w-48 lg:flex-none" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
          <select className="input min-w-[8rem] flex-1 lg:w-40 lg:flex-none" value={cat} onChange={e => setCat(e.target.value)}>
            <option value="">All categories</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.categoryName}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        {shown.map(b => <BookCard key={b._id} book={b} onView={setSel} borrowedId={borrowedMap[b._id]} />)}
      </div>
      {!shown.length && <p className="text-slate-400 text-center py-8">No books found.</p>}
      {sel && (
        <Modal title={sel.title} onClose={() => setSel(null)}>
          <div className="space-y-2 text-sm">
            <p><b>Author:</b> {sel.author}</p>
            <p><b>ISBN:</b> {sel.isbn}</p>
            <p><b>Category:</b> {sel.category?.categoryName}</p>
            <p><b>Publisher:</b> {sel.publisher || '-'} ({sel.publicationYear || '-'})</p>
            <p className="flex items-center gap-2"><b>Copies:</b> {sel.availableCopies}/{sel.totalCopies} <StatusBadge available={sel.availableCopies} /></p>
            <p className="pt-2 text-slate-600">{sel.description}</p>
          </div>
        </Modal>)}
    </div>
  );
}
