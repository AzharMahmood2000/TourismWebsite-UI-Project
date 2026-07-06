import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * AuthenticationOverlay
 *
 * Renders a full-viewport backdrop-blur dark overlay with a centred
 * glassmorphism card.  The booking form behind it is visible but
 * pointer-events are disabled (inert attribute + CSS).
 *
 * Props:
 *   returnPath  – where to redirect after successful login (default '/booking')
 */
export default function AuthenticationOverlay({ returnPath = '/booking' }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const firstFocusRef = useRef(null);

  /* ── Lock body scroll while overlay is active ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ── Auto-focus the first button on mount ── */
  useEffect(() => {
    firstFocusRef.current?.focus();
  }, []);

  /* ── Trap keyboard focus inside the card ── */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const focusable = () =>
      Array.from(
        card.querySelectorAll(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      );

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const goToLogin = () =>
    navigate('/login', { state: { from: returnPath } });

  const goToRegister = () =>
    navigate('/register', { state: { from: returnPath } });

  const goHome = () => navigate('/');

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Authentication required"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
    >
      {/* Dark scrim */}
      <div className="absolute inset-0 bg-slate-900/60" aria-hidden="true" />

      {/* Decorative floating orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #d66847 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      {/* ── Glassmorphism Card ── */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="relative z-10 mx-4 w-full max-w-md rounded-[20px] p-8 sm:p-10"
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset',
        }}
      >
        {/* Lock icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #d66847 0%, #b5522f 100%)',
            boxShadow: '0 8px 24px rgba(214, 104, 71, 0.4)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </motion.div>

        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
          Secure Booking Initialization
        </h2>

        {/* Divider */}
        <div className="my-4 mx-auto w-12 h-0.5 rounded-full" style={{ background: 'rgba(214, 104, 71, 0.6)' }} />

        {/* Description */}
        <p className="text-center text-sm leading-relaxed text-white/80" id="auth-overlay-message">
          Please log in or register to continue booking your travel experience.
        </p>

        {/* Trust badges */}
        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
          {[
            { icon: '🔒', label: 'SSL Secured' },
            { icon: '✓', label: 'Instant Confirm' },
            { icon: '★', label: 'Premium Access' },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              <span className="text-[#d66847]">{icon}</span>
              {label}
            </span>
          ))}
        </div>

        {/* ── CTA Buttons ── */}
        <div className="mt-8 space-y-3">
          {/* Primary: Log In */}
          <button
            ref={firstFocusRef}
            id="auth-overlay-login-btn"
            type="button"
            onClick={goToLogin}
            className="group relative w-full overflow-hidden rounded-[14px] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d66847] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #d66847 0%, #b5522f 100%)',
              boxShadow: '0 4px 18px rgba(214, 104, 71, 0.45)',
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L8.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zM17 10a1 1 0 01-1 1h-6a1 1 0 110-2h6a1 1 0 011 1z" clipRule="evenodd" />
              </svg>
              Login
            </span>
            {/* Hover shine */}
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
            />
          </button>

          {/* Secondary: Register */}
          <button
            id="auth-overlay-register-btn"
            type="button"
            onClick={goToRegister}
            className="w-full rounded-[14px] px-6 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1.5px solid rgba(255,255,255,0.28)',
              color: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
          >
            <span className="flex items-center justify-center gap-2">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              Register
            </span>
          </button>
        </div>

        {/* Back to Home link */}
        <div className="mt-6 text-center">
          <button
            id="auth-overlay-home-link"
            type="button"
            onClick={goHome}
            className="text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:underline"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
