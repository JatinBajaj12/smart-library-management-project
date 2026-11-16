import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { loginSchema, registerSchema, check } from '../utils/schemas';
import { errMsg } from '../services/api';
import Field from '../components/Field';
import { home } from '../App';
export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { login, register } = useAuthStore();
  const nav = useNavigate();
  const set = k => e => setForm({ ...form, [k]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    setServerError('');
    const { data, errors } = check(mode === 'login' ? loginSchema : registerSchema, form);
    setErrors(errors || {});
    if (errors) return;
    try { nav(home(await (mode === 'login' ? login : register)(data)), { replace: true }); }
    catch (err) { setServerError(errMsg(err)); }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-4">
        <h1 className="text-center text-2xl font-bold">📚 Smart Library</h1>
        <h2 className="text-center text-slate-500 text-sm">{mode === 'login' ? 'Sign in to your account' : 'Create a student account'}</h2>
        {mode === 'register' && <Field label="Name" value={form.name} onChange={set('name')} error={errors.name} />}
        <Field label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
        <Field label="Password" type="password" value={form.password} onChange={set('password')} error={errors.password} autoComplete="current-password" />
        {serverError && <p className="rounded bg-red-50 p-2 text-sm text-red-600">{serverError}</p>}
        <button className="btn w-full justify-center py-2.5">{mode === 'login' ? 'Login' : 'Register'}</button>
        <p className="text-center text-sm">
          <button type="button" className="text-indigo-600 hover:underline"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrors({}); setServerError(''); }}>
            {mode === 'login' ? 'New student? Register here' : 'Already have an account? Login'}
          </button>
        </p>
      </form>
    </div>
  );
}
