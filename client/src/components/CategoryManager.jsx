import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import api, { errMsg } from '../services/api';
import { useBookStore } from '../stores/bookStore';
export default function CategoryManager() {
  const { categories, fetchCategories } = useBookStore();
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const run = async fn => { setErr(''); try { await fn(); await fetchCategories(); } catch (e) { setErr(errMsg(e)); } };
  return (
    <div className="space-y-3">
      <form className="flex gap-2" onSubmit={e => { e.preventDefault(); run(async () => { await api.post('/categories', { categoryName: name }); setName(''); }); }}>
        <input className="input" placeholder="New category" value={name} onChange={e => setName(e.target.value)} /><button className="btn shrink-0">Add</button>
      </form>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <ul className="divide-y text-sm">{categories.map(c => (
        <li key={c._id} className="flex items-center justify-between gap-3 py-2"><span className="min-w-0">{c.categoryName}</span>
          <button className="shrink-0 p-1 text-red-600" aria-label="Delete category" onClick={() => run(() => api.delete(`/categories/${c._id}`))}><Trash2 size={16} /></button></li>
      ))}</ul>
    </div>
  );
}
