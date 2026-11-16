export default function DataTable({ columns, rows, empty = 'No data' }) {
  return (
    <>
      {/* Table: only on large screens, where there is room next to the sidebar */}
      <div className="card hidden overflow-x-auto !p-0 lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase text-slate-500">
            <tr>{columns.map(c => <th key={c.label} className="whitespace-nowrap px-4 py-3">{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r._id} className="border-t">
                {columns.map(c => <td key={c.label} className={`px-4 py-3 ${c.nowrap ? 'whitespace-nowrap' : 'max-w-[18rem]'}`}>{c.render ? c.render(r) : r[c.key]}</td>)}
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={columns.length} className="p-6 text-center text-slate-400">{empty}</td></tr>}
          </tbody>
        </table>
      </div>
      {/* Phones and tablets: one card per row (two columns on tablets) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] lg:hidden">
        {!rows.length && <p className="col-span-full py-6 text-center text-slate-400">{empty}</p>}
        {rows.map(r => (
          <div key={r._id} className="card space-y-2 text-sm">
            {columns.filter(c => c.label !== 'Actions').map(c => (
              <div key={c.label} className="flex items-start justify-between gap-3">
                <span className="shrink-0 font-medium text-slate-500">{c.label}</span>
                <span className="min-w-0 text-right">{c.render ? c.render(r) : r[c.key]}</span>
              </div>
            ))}
            {columns.find(c => c.label === 'Actions') && (
              <div className="pt-2 border-t">{columns.find(c => c.label === 'Actions').render(r)}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
