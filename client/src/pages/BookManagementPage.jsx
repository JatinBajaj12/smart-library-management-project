import { useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Tags } from 'lucide-react';
import api, { errMsg } from '../services/api';
import { useBookStore } from '../stores/bookStore';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import BookForm from '../components/BookForm';
import CategoryManager from '../components/CategoryManager';
import StatusBadge from '../components/StatusBadge';
const empty = { title: '', author: '', isbn: '', category: '', publisher: '', publicationYear: '', totalCopies: 1, availableCopies: 1, description: '' };
export default function BookManagementPage() {
  const { books, categories, applyAdded, applyUpdated, applyDeleted } = useBookStore();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [modal, setModal] = useState(null);
  const [err, setErr] = useState('');
  const rows = useMemo(() => books.filter(b =>
    (!cat || b.category?._id === cat) &&
    `${b.title} ${b.author} ${b.isbn}`.toLowerCase().includes(q.toLowerCase())), [books, q, cat]);
  const close = () => { setModal(null); setErr(''); };
  const save = async data => {
    try {
      const book = modal.book;
      if (book) applyUpdated((await api.put(`/books/${book._id}`, data)).data);
      else applyAdded((await api.post('/books', data)).data);
      close();
    } catch (e) { setErr(errMsg(e)); }
  };
  const del = async () => {
    try { await api.delete(`/books/${modal.book._id}`); applyDeleted(modal.book); close(); }
    catch (e) { setErr(errMsg(e)); }
  };
  const columns = [
    { label: 'Title', key: 'title' },
    { label: 'Author', key: 'author' },
    { label: 'ISBN', key: 'isbn', nowrap: true },
    { label: 'Category', render: b => b.category?.categoryName },
    { label: 'Copies', nowrap: true, render: b => `${b.availableCopies}/${b.totalCopies}` },
    { label: 'Status', render: b => <StatusBadge available={b.availableCopies} /> },
    { label: 'Actions', nowrap: true, render: b => (
      <div className="flex gap-3">
        <button title="Edit" aria-label="Edit" className="p-1" onClick={() => setModal({ type: 'form', book: b })}><Pencil size={16} /></button>
        <button title="Delete" aria-label="Delete" className="p-1 text-red-600" onClick={() => setModal({ type: 'delete', book: b })}><Trash2 size={16} /></button>
      </div>
    )},
  ];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="mr-auto text-xl font-bold md:text-2xl">Book Management</h2>
        <div className="flex w-full flex-wrap gap-2 lg:w-auto">
          <input className="input min-w-[8rem] flex-1 lg:w-48 lg:flex-none" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
          <select className="input min-w-[8rem] flex-1 lg:w-40 lg:flex-none" value={cat} onChange={e => setCat(e.target.value)}>
            <option value="">All categories</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.categoryName}</option>)}
          </select>
          <button className="btn-ghost flex-1 justify-center sm:flex-none" onClick={() => setModal({ type: 'cats' })}><Tags size={16} />Categories</button>
          <button className="btn flex-1 justify-center sm:flex-none" onClick={() => setModal({ type: 'form' })}><Plus size={16} />Add book</button>
        </div>
      </div>
      <DataTable columns={columns} rows={rows} empty="No books found" />
      {modal?.type === 'form' && (
        <Modal title={modal.book ? 'Edit book' : 'Add book'} onClose={close}>
          {err && <p className="mb-2 text-sm text-red-600">{err}</p>}
          <BookForm initial={modal.book ? { ...empty, ...modal.book, category: modal.book.category?._id || '' } : empty} categories={categories} onSubmit={save} onCancel={close} />
        </Modal>)}
      {modal?.type === 'delete' && (
        <Modal title="Delete book" onClose={close}>
          <p className="mb-4 text-sm">Delete <b>{modal.book.title}</b>? This cannot be undone.</p>
          {err && <p className="mb-2 text-sm text-red-600">{err}</p>}
          <div className="flex justify-end gap-2">
            <button className="btn-ghost" onClick={close}>Cancel</button>
            <button className="btn !bg-red-600" onClick={del}>Delete</button>
          </div>
        </Modal>)}
      {modal?.type === 'cats' && <Modal title="Categories" onClose={close}><CategoryManager /></Modal>}
    </div>
  );
}
