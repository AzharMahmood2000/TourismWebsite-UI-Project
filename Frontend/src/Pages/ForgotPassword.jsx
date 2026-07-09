import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API_BASE_URL from '../api/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Action failed');
      }

      setSuccess("Password reset link sent to your email.");
      setEmail('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all duration-200 bg-white/60 focus:outline-none focus:ring-2 ${
    error
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
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #d66847 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-15"
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
        <div className="mb-8 text-center">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#d66847]">
            Gamanaya.com
          </Link>
          <p className="mt-1 text-xs text-white/40 uppercase tracking-widest">
            Premium Travel Experiences
          </p>
        </div>

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
            Forgot Password
          </h1>

          <p className="text-center text-sm text-white/50 mb-8">
            Enter your email to receive a reset link
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {success && (
              <div className="rounded-xl border border-green-400/40 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-300">
                {success}
              </div>
            )}
            
            {error && (
              <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={submitting || success}
              className="group relative w-full overflow-hidden rounded-[14px] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #d66847 0%, #b5522f 100%)',
                boxShadow: '0 4px 18px rgba(214, 104, 71, 0.45)',
              }}
            >
              <span className="relative z-10">
                {submitting ? 'Sending...' : 'Send Reset Link'}
              </span>
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                }}
              />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/50">
            Remembered your password?{' '}
            <Link to="/login" className="font-bold text-[#d66847] hover:text-[#e07a5a] transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
