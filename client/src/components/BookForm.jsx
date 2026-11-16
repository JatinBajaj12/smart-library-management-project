import { useState } from 'react';
import Field from './Field';
import { bookSchema, check } from '../utils/schemas';
export default function BookForm({ initial, categories, onSubmit, onCancel }) {
  const [f, setF] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const submit = e => {
    e.preventDefault();
    const { data, errors } = check(bookSchema, f);
    setErrors(errors || {});
    if (!errors) onSubmit({ ...data, publicationYear: data.publicationYear === '' ? undefined : data.publicationYear });
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      <Field label="Title" value={f.title} onChange={set('title')} error={errors.title} />
      <Field label="Author" value={f.author} onChange={set('author')} error={errors.author} />
      <Field label="ISBN" value={f.isbn} onChange={set('isbn')} error={errors.isbn} />
      <Field as="select" label="Category" value={f.category} onChange={set('category')} error={errors.category}>
        <option value="">Select...</option>{categories.map(c => <option key={c._id} value={c._id}>{c.categoryName}</option>)}
      </Field>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Publisher" value={f.publisher} onChange={set('publisher')} />
        <Field label="Year" type="number" value={f.publicationYear} onChange={set('publicationYear')} error={errors.publicationYear} />
        <Field label="Total copies" type="number" value={f.totalCopies} onChange={set('totalCopies')} error={errors.totalCopies} />
        <Field label="Available copies" type="number" value={f.availableCopies} onChange={set('availableCopies')} error={errors.availableCopies} />
      </div>
      <Field as="textarea" rows="3" label="Description" value={f.description} onChange={set('description')} />
      <div className="flex gap-2 sm:justify-end"><button type="button" className="btn-ghost flex-1 justify-center sm:flex-none" onClick={onCancel}>Cancel</button><button className="btn flex-1 justify-center sm:flex-none">Save</button></div>
    </form>
  );
}
