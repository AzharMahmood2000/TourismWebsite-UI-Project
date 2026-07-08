import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../api/api';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = 'Full name is required';

    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';

    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';

    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';

    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    if (errors.api) {
      setErrors((prev) => ({
        ...prev,
        api: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setSubmitting(true);
      setErrors({});

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('userInfo', JSON.stringify(data));

      login(data);

      navigate(from, { replace: true });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        api: error.message || 'Something went wrong. Please try again.',
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all duration-200 bg-white/60 focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300'
        : 'border-white/40 focus:ring-[#d66847]/40 focus:border-[#d66847]'
    }`;

  const strengthScore = (() => {
    const p = form.password;
    let s = 0;

    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;

    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strengthScore];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][strengthScore];

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
        className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #d66847 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #b5522f 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
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
          <p className="mt-1 text-xs text-white/40 uppercase tracking-widest">
            Premium Travel Experiences
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-[20px] p-8 sm:p-10"
          style={{
            background: 'rgba(255,255,255,0.09)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow:
              '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset',
          }}
        >
          <h1 className="text-center text-2xl font-extrabold text-white tracking-tight mb-1">
            Create Account
          </h1>

          <p className="text-center text-sm text-white/50 mb-8">
            Join thousands of happy travellers
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {errors.api && (
              <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                {errors.api}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label
                htmlFor="reg-name"
                className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2"
              >
                Full Name
              </label>

              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                placeholder="Ishara Perera"
                value={form.name}
                onChange={handleChange('name')}
                className={inputClass('name')}
              />

              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="reg-email"
                className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2"
              >
                Email Address
              </label>

              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange('email')}
                className={inputClass('email')}
              />

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="reg-password"
                className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 6 characters"
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Strength meter */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i <= strengthScore ? strengthColor : 'rgba(255,255,255,0.15)',
                        }}
                      />
                    ))}
                  </div>

                  <p className="text-[10px] font-semibold" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="reg-confirm"
                className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2"
              >
                Confirm Password
              </label>

              <input
                id="reg-confirm"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={handleChange('confirm')}
                className={inputClass('confirm')}
              />

              {errors.confirm && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.confirm}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="register-submit-btn"
              type="submit"
              disabled={submitting}
              className="group relative mt-2 w-full overflow-hidden rounded-[14px] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #d66847 0%, #b5522f 100%)',
                boxShadow: '0 4px 18px rgba(214, 104, 71, 0.45)',
              }}
            >
              <span className="relative z-10">
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating account…
                  </span>
                ) : (
                  'Create Account'
                )}
              </span>

              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                }}
              />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/50">
            Already have an account?{' '}
            <Link
              to="/login"
              state={{ from }}
              className="font-bold text-[#d66847] hover:text-[#e07a5a] transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          <Link to="/" className="hover:text-white/60 transition-colors">
            ← Back to Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}