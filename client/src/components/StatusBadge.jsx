export default function StatusBadge({ available }) {
  return <span className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${available > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{available > 0 ? 'Available' : 'Unavailable'}</span>;
}
