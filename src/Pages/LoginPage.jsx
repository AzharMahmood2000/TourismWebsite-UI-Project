import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    /* Simulate async auth — replace with real API call */
    await new Promise((r) => setTimeout(r, 900));
    login({ name: form.email.split('@')[0], email: form.email });
    navigate(from, { replace: true });
  };

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all duration-200 bg-white/60 focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300'
        : 'border-white/40 focus:ring-[#d66847]/40 focus:border-[#d66847]'
    }`;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{
        background: 'linear-gradient(135deg, #1a0a05 0%, #2d1208 40%, #1c1c2e 100%)',
      }}
    >
      {/* Decorative orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #d66847 0%, transparent 65%)', filter: 'blur(60px)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #b5522f 0%, transparent 65%)', filter: 'blur(60px)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#d66847]">
            Gamanaya.com
          </Link>
          <p className="mt-1 text-xs text-white/40 uppercase tracking-widest">Premium Travel Experiences</p>
        </div>

        {/* Card */}
        <div
          className="rounded-[20px] p-8 sm:p-10"
          style={{
            background: 'rgba(255,255,255,0.09)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset',
          }}
        >
          <h1 className="text-center text-2xl font-extrabold text-white tracking-tight mb-1">
            Welcome Back
          </h1>
          <p className="text-center text-sm text-white/50 mb-8">
            Sign in to continue your journey
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange('email')}
                className={inputClass('email')}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange('password')}
                  className={`${inputClass('password')} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={submitting}
              className="group relative w-full overflow-hidden rounded-[14px] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #d66847 0%, #b5522f 100%)',
                boxShadow: '0 4px 18px rgba(214, 104, 71, 0.45)',
              }}
            >
              <span className="relative z-10">
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Signing in…
                  </span>
                ) : 'Log In'}
              </span>
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
              />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/50">
            Don't have an account?{' '}
            <Link
              to="/register"
              state={{ from }}
              className="font-bold text-[#d66847] hover:text-[#e07a5a] transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          <Link to="/" className="hover:text-white/60 transition-colors">← Back to Home</Link>
        </p>
      </motion.div>
    </div>
  );
}
