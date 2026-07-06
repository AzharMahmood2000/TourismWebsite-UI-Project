import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useAuth } from '../context/AuthContext';

/* ─────────────────────────────────────────
   Default Avatar SVG (shown when no photo)
───────────────────────────────────────── */
function DefaultAvatar({ size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="60" fill="#f1ede9" />
      <circle cx="60" cy="46" r="20" fill="#d66847" opacity="0.25" />
      <ellipse cx="60" cy="95" rx="32" ry="22" fill="#d66847" opacity="0.18" />
      <circle cx="60" cy="46" r="17" fill="#d66847" />
      <ellipse cx="60" cy="93" rx="28" ry="19" fill="#b5522f" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Auth Guard Card (unauthenticated state)
───────────────────────────────────────── */
function UnauthenticatedCard() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg,#1a0a05 0%,#2d1208 45%,#1c1c2e 100%)' }}
    >
      {/* Orbs */}
      <div aria-hidden className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle,#d66847 0%,transparent 65%)', filter: 'blur(60px)' }} />
      <div aria-hidden className="pointer-events-none fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle,#b5522f 0%,transparent 65%)', filter: 'blur(60px)' }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {/* Logo */}
        <Link to="/" className="inline-block text-2xl font-extrabold tracking-tight text-[#d66847] mb-2">
          Gamanaya.com
        </Link>
        <p className="text-xs text-white/40 uppercase tracking-widest mb-8">Premium Travel Experiences</p>

        {/* Card */}
        <div
          className="rounded-[20px] p-10"
          style={{
            background: 'rgba(255,255,255,0.09)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          }}
        >
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(135deg,#d66847 0%,#b5522f 100%)', boxShadow: '0 8px 24px rgba(214,104,71,0.4)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-white mb-3">Your Profile Awaits</h1>
          <p className="text-sm text-white/60 mb-8 leading-relaxed">
            Please log in or register to access your profile, manage your bookings, and personalise your travel experience.
          </p>

          <div className="space-y-3">
            <button
              id="profile-unauth-login-btn"
              onClick={() => navigate('/login', { state: { from: '/profile' } })}
              className="group relative w-full overflow-hidden rounded-[14px] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg,#d66847 0%,#b5522f 100%)', boxShadow: '0 4px 18px rgba(214,104,71,0.45)' }}
            >
              <span className="relative z-10">Log In</span>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)' }} />
            </button>

            <button
              id="profile-unauth-register-btn"
              onClick={() => navigate('/register', { state: { from: '/profile' } })}
              className="w-full rounded-[14px] px-6 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none active:scale-[0.98]"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.28)', color: 'rgba(255,255,255,0.9)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
            >
              Register
            </button>
          </div>
        </div>

        <p className="mt-6 text-xs text-white/30">
          <Link to="/" className="hover:text-white/60 transition-colors">← Back to Home</Link>
        </p>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Avatar Upload Component
───────────────────────────────────────── */
function AvatarUpload({ avatar, onAvatarChange }) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => onAvatarChange(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative mx-auto w-28 h-28 sm:w-36 sm:h-36">
      {/* Avatar ring */}
      <div
        className={`w-full h-full rounded-full overflow-hidden border-4 transition-all duration-200 cursor-pointer shadow-xl ${dragOver ? 'border-[#d66847] scale-105' : 'border-white'}`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        role="button"
        tabIndex={0}
        aria-label="Change profile picture"
        onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
        style={{ boxShadow: '0 8px 30px rgba(214,104,71,0.25)' }}
      >
        {avatar ? (
          <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <DefaultAvatar size={144} />
        )}
      </div>

      {/* Camera badge */}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        aria-label="Upload profile picture"
        className="absolute bottom-0 right-0 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-white transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d66847]"
        style={{ background: 'linear-gradient(135deg,#d66847 0%,#b5522f 100%)', boxShadow: '0 3px 10px rgba(214,104,71,0.5)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
        </svg>
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Info Row (read-only display)
───────────────────────────────────────── */
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-slate-100 last:border-0">
      <div className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#d66847]/8">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-slate-800 truncate">{value || <span className="text-slate-300 italic font-normal">Not provided</span>}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main ProfilePage Component
───────────────────────────────────────── */
export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* Local edit state mirrors user object */
  const [form, setForm] = useState({ name: '', phone: '', avatar: null });
  const [formErrors, setFormErrors] = useState({});

  /* When entering edit mode, seed form from current user */
  const enterEdit = () => {
    setForm({ name: user.name || '', phone: user.phone || '', avatar: user.avatar || null });
    setFormErrors({});
    setEditMode(true);
    setSaved(false);
  };

  const cancelEdit = () => setEditMode(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Display name is required.';
    if (form.phone && !/^[\d\s\-+()]{7,15}$/.test(form.phone.trim()))
      errs.phone = 'Enter a valid phone number.';
    return errs;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700)); /* simulate API call */
    updateProfile({ name: form.name.trim(), phone: form.phone.trim(), avatar: form.avatar });
    setSaving(false);
    setSaved(true);
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  /* ── Guard ── */
  if (!isAuthenticated) return <UnauthenticatedCard />;

  const initials = (user.name || 'U')
    .split(' ')
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div className="min-h-screen bg-[#fffaf8] font-sans">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

        {/* ── Page heading ── */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">My Profile</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your personal information and account settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* ════════════════════════════════════
              LEFT — Profile Card
          ════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: '#fff', border: '1px solid #f1ede9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
            >
              {/* Hero gradient strip */}
              <div
                className="h-24 relative"
                style={{ background: 'linear-gradient(135deg,#d66847 0%,#8b3820 100%)' }}
              >
                {/* Decorative pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 96" preserveAspectRatio="none" aria-hidden>
                  <circle cx="40" cy="40" r="60" fill="white" /><circle cx="360" cy="80" r="80" fill="white" />
                </svg>
              </div>

              {/* Avatar (overlaps the strip) */}
              <div className="flex flex-col items-center px-6 pb-6">
                <div className="-mt-14 mb-3">
                  <AvatarUpload
                    avatar={editMode ? form.avatar : user.avatar}
                    onAvatarChange={(dataUrl) => setForm((p) => ({ ...p, avatar: dataUrl }))}
                  />
                  {!editMode && (
                    <p className="text-center text-[10px] text-slate-400 mt-2">Click photo to change</p>
                  )}
                </div>

                {/* Name display / edit input */}
                {editMode ? (
                  <div className="w-full mb-1">
                    <input
                      id="profile-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); if (formErrors.name) setFormErrors((p) => ({ ...p, name: undefined })); }}
                      placeholder="Display name"
                      className={`w-full text-center text-lg font-bold rounded-xl border px-4 py-2.5 focus:outline-none transition-all ${formErrors.name ? 'border-red-400 text-red-700' : 'border-slate-200 text-slate-800 focus:border-[#d66847]'}`}
                    />
                    {formErrors.name && <p className="text-center text-[10px] text-red-500 mt-1 font-semibold">{formErrors.name}</p>}
                  </div>
                ) : (
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight text-center">{user.name}</h2>
                )}

                <p className="text-xs text-slate-400 font-medium mt-0.5 text-center">{user.email}</p>

                {/* Member badge */}
                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#d66847] bg-[#d66847]/8 px-3 py-1 rounded-full">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3" aria-hidden><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                  Premium Member
                </span>
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════
              RIGHT — Details & Actions
          ════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            {/* ── Personal Information Card ── */}
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: '#fff', border: '1px solid #f1ede9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Personal Information</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Your account details</p>
                </div>

                {!editMode && (
                  <button
                    id="profile-edit-btn"
                    type="button"
                    onClick={enterEdit}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d66847] hover:text-[#b5522f] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#d66847]/6"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg>
                    Edit Profile
                  </button>
                )}
              </div>

              {editMode ? (
                /* ── Edit Form ── */
                <div className="space-y-5">
                  {/* Phone */}
                  <div>
                    <label htmlFor="profile-phone" className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      id="profile-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => { setForm((p) => ({ ...p, phone: e.target.value })); if (formErrors.phone) setFormErrors((p) => ({ ...p, phone: undefined })); }}
                      placeholder="077-348 7980"
                      className={`w-full border rounded-xl px-4 py-3 text-xs font-semibold text-slate-700 placeholder-slate-300 focus:outline-none transition-all shadow-sm ${formErrors.phone ? 'border-red-400' : 'border-slate-200 focus:border-[#d66847]'}`}
                    />
                    {formErrors.phone && <p className="mt-1.5 text-[10px] text-red-500 font-semibold">{formErrors.phone}</p>}
                  </div>

                  {/* Email — read-only in edit mode too */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Email Address <span className="text-slate-400 ml-1 normal-case font-normal tracking-normal">(cannot be changed)</span>
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full border border-slate-100 rounded-xl px-4 py-3 text-xs font-semibold text-slate-400 bg-slate-50 cursor-not-allowed"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-1">
                    <button
                      id="profile-save-btn"
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 rounded-xl py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-70"
                      style={{ background: 'linear-gradient(135deg,#d66847 0%,#b5522f 100%)', boxShadow: '0 4px 14px rgba(214,104,71,0.35)' }}
                    >
                      {saving ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          Saving…
                        </span>
                      ) : 'Save Changes'}
                    </button>
                    <button
                      id="profile-cancel-btn"
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 rounded-xl py-3 text-xs font-bold uppercase tracking-widest text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all duration-200 active:scale-[0.98]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* ── View Mode ── */
                <div>
                  <InfoRow
                    icon={<svg viewBox="0 0 20 20" fill="none" stroke="#d66847" strokeWidth="1.8" className="w-4 h-4" aria-hidden><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    label="Full Name"
                    value={user.name}
                  />
                  <InfoRow
                    icon={<svg viewBox="0 0 20 20" fill="none" stroke="#d66847" strokeWidth="1.8" className="w-4 h-4" aria-hidden><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    label="Email Address"
                    value={user.email}
                  />
                  <InfoRow
                    icon={<svg viewBox="0 0 20 20" fill="none" stroke="#d66847" strokeWidth="1.8" className="w-4 h-4" aria-hidden><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    label="Phone Number"
                    value={user.phone}
                  />
                </div>
              )}
            </div>

            {/* ── Success toast ── */}
            <AnimatePresence>
              {saved && (
                <motion.div
                  key="saved"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Profile updated successfully!
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Booking History Card ── */}
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: '#fff', border: '1px solid #f1ede9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
            >
              <h3 className="text-base font-extrabold text-slate-900 mb-1">Recent Booking History</h3>
              <p className="text-xs text-slate-400 mb-5">Track your upcoming and past travels</p>

              <div className="space-y-4">
                {[
                  {
                    id: 'BK-8902',
                    destination: 'Nine Arches Bridge — Ella',
                    date: 'August 14, 2026',
                    travelers: 2,
                    price: 'Rs. 43,000.00',
                    status: 'Confirmed',
                    statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                  },
                  {
                    id: 'BK-5491',
                    destination: 'Yala National Park Safari',
                    date: 'September 22, 2026',
                    travelers: 4,
                    price: 'Rs. 72,500.00',
                    status: 'Pending Inquiry',
                    statusClass: 'bg-amber-50 text-amber-700 border-amber-100',
                  },
                ].map((bk) => (
                  <div
                    key={bk.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-[#d66847]/20 transition-all duration-200 gap-3"
                    style={{ background: '#fafaf8' }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{bk.id}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${bk.statusClass}`}>
                          {bk.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">{bk.destination}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Date: <span className="font-semibold text-slate-700">{bk.date}</span> &bull; Travelers: <span className="font-semibold text-slate-700">{bk.travelers}</span>
                      </p>
                    </div>
                    <div className="sm:text-right border-t sm:border-t-0 border-slate-200/50 pt-2 sm:pt-0">
                      <span className="text-[9px] block text-slate-400 font-bold uppercase tracking-wider">Estimated Total</span>
                      <span className="text-sm font-black text-slate-800">{bk.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Account Actions Card ── */}
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: '#fff', border: '1px solid #f1ede9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
            >
              <h3 className="text-base font-extrabold text-slate-900 mb-4">Account Actions</h3>
              <div className="flex flex-col gap-3">
                <button
                  id="profile-book-btn"
                  type="button"
                  onClick={() => navigate('/booking')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
                  style={{ background: 'linear-gradient(135deg,#1e1e1e 0%,#3a3a3a 100%)' }}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>
                  Make a Booking
                </button>

                <button
                  id="profile-logout-btn"
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-widest text-red-600 border border-red-200 hover:bg-red-50 transition-all duration-200 active:scale-[0.97]"
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden><path d="M13 7l5 3-5 3M18 10H8M8 3H5a2 2 0 00-2 2v10a2 2 0 002 2h3"/></svg>
                  Log Out
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
