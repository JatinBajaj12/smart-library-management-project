import { X } from 'lucide-react';
export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-4 sm:rounded-xl sm:p-6" onClick={e => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-lg font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="-mr-1 shrink-0 rounded-lg p-1 hover:bg-slate-100"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
