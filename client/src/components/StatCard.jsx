export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="card flex items-center gap-3 !p-3 sm:gap-4 sm:!p-5">
      <div className="shrink-0 rounded-lg bg-indigo-100 p-2 text-indigo-600 sm:p-3"><Icon size={22} /></div>
      <div className="min-w-0"><p className="text-xs leading-tight text-slate-500 sm:text-sm">{label}</p><p className="text-xl font-bold sm:text-2xl">{value ?? '-'}</p></div>
    </div>
  );
}
