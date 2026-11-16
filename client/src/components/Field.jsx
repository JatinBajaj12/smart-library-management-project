export default function Field({ label, error, as = 'input', children, ...props }) {
  const C = as;
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <C className="input" {...props}>{children}</C>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
