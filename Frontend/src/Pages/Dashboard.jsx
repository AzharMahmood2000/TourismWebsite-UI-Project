import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';
import API_BASE_URL, { authHeaders } from '../api/api';

/* ── Helper: status badge colors (PascalCase) ── */
const statusBadge = (status) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'Cancelled':
      return 'bg-red-100 text-red-700';
    case 'Completed':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

/* ── Helper: initials from name ── */
const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

/* ── Helper: avatar bg color by index ── */
const avatarColors = [
  'bg-orange-100 text-orange-800',
  'bg-gray-200 text-gray-700',
  'bg-red-100 text-red-800',
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
          headers: authHeaders(),
        });
        if (!res.ok) throw new Error('Failed to load dashboard data');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  /* ── Derived values ── */
  const adminName = (() => {
    try {
      const u = JSON.parse(localStorage.getItem('userInfo'));
      return u?.name || 'Admin';
    } catch { return 'Admin'; }
  })();

  const bookingGrowth = (() => {
    if (!stats) return null;
    const thisM = stats.bookingsThisMonth ?? 0;
    const lastM = stats.bookingsLastMonth ?? 0;
    if (lastM === 0) return thisM > 0 ? '+100%' : '0%';
    const pct = Math.round(((thisM - lastM) / lastM) * 100);
    return pct >= 0 ? `+${pct}%` : `${pct}%`;
  })();

  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="dashboard" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <AdminTopbar showSearch={true} />

        {/* Dashboard Content */}
        <div className="px-10 py-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Ayubowan, {adminName}</h2>
              <p className="text-gray-500 mt-2 text-lg">Here's a snapshot of Gamanaya's performance today.</p>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Loading skeleton for stat cards */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="w-32 h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="w-16 h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Stat Card 1 — Destinations */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#A7412A]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {stats?.totalReviews ?? 0} reviews
                  </span>
                </div>
                <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Active Destinations</p>
                <h3 className="text-4xl font-extrabold text-gray-900">{stats?.totalDestinations ?? 0}</h3>
              </div>

              {/* Stat Card 2 — Packages */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#A7412A]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {stats?.totalUsers ?? 0} users
                  </span>
                </div>
                <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Curated Packages</p>
                <h3 className="text-4xl font-extrabold text-gray-900">{String(stats?.totalPackages ?? 0).padStart(2, '0')}</h3>
              </div>

              {/* Stat Card 3 — Bookings */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#A7412A]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    bookingGrowth && bookingGrowth.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {bookingGrowth ?? '—'} vs last month
                  </span>
                </div>
                <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Total Bookings</p>
                <h3 className="text-4xl font-extrabold text-gray-900">{stats?.totalBookings ?? 0}</h3>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
                <Link to="/admin/manage-bookings" className="text-[#A7412A] text-sm font-semibold hover:underline flex items-center">
                  View all
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-transparent border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Itinerary</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      [1, 2, 3].map((i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="px-6 py-4"><div className="w-28 h-4 bg-gray-200 rounded"></div></td>
                          <td className="px-6 py-4"><div className="w-32 h-4 bg-gray-200 rounded"></div></td>
                          <td className="px-6 py-4"><div className="w-20 h-4 bg-gray-200 rounded"></div></td>
                          <td className="px-6 py-4"><div className="w-16 h-4 bg-gray-200 rounded"></div></td>
                          <td className="px-6 py-4"><div className="w-20 h-4 bg-gray-200 rounded"></div></td>
                        </tr>
                      ))
                    ) : stats?.recentBookings?.length > 0 ? (
                      stats.recentBookings.map((booking, idx) => {
                        const customerName = booking.fullName || booking.user?.name || 'Unknown Customer';
                        const placeName =
                          booking.destination?.title ||
                          booking.destination?.name ||
                          booking.packageId?.title ||
                          booking.packageId?.name ||
                          booking.destinationTitle ||
                          booking.packageTitle ||
                          'Not specified';
                        const status = booking.status || 'Pending';
                        const amount = booking.estimatedTotal || 0;
                        const travelDate = booking.travelDate
                          ? new Date(booking.travelDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : '—';

                        return (
                          <tr key={booking._id || idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full ${avatarColors[idx % avatarColors.length]} flex items-center justify-center font-bold text-sm mr-3`}>
                                  {getInitials(customerName)}
                                </div>
                                <span className="font-semibold text-gray-800">{customerName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gray-600 font-medium w-32 inline-block truncate">{placeName}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 font-medium">
                              {travelDate}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 ${statusBadge(status)} text-xs font-bold rounded-full`}>{status}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-700 font-semibold">
                              Rs. {amount.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400 text-sm">
                          No bookings found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* Revenue Growth */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Revenue Growth</h3>
                <div className="flex items-end gap-2 mb-6">
                  <h4 className="text-3xl font-extrabold text-gray-900">
                    {loading ? '—' : `Rs. ${(stats?.totalRevenue ?? 0).toLocaleString()}`}
                  </h4>
                  {!loading && bookingGrowth && (
                    <span className={`text-sm font-semibold mb-1 ${
                      bookingGrowth.startsWith('+') ? 'text-green-600' : bookingGrowth.startsWith('-') ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {bookingGrowth}
                    </span>
                  )}
                </div>

                {/* Booking Status Breakdown Bars */}
                {!loading && stats && (
                  <div className="space-y-3 mb-4">
                    {[
                      { label: 'Confirmed', count: stats.confirmedBookings, color: 'bg-green-400' },
                      { label: 'Pending', count: stats.pendingBookings, color: 'bg-yellow-400' },
                      { label: 'Completed', count: stats.completedBookings, color: 'bg-blue-400' },
                      { label: 'Cancelled', count: stats.cancelledBookings, color: 'bg-red-400' },
                    ].map((item) => {
                      const maxCount = stats.totalBookings || 1;
                      const pct = Math.max(5, Math.round((item.count / maxCount) * 100));
                      return (
                        <div key={item.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500 font-medium">{item.label}</span>
                            <span className="text-gray-700 font-bold">{item.count}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className={`${item.color} h-2 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <p className="text-gray-400 text-xs mt-4">Booking status breakdown</p>
              </div>

              {/* Quick Stats Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="h-36 bg-gray-900 relative">
                  <img src="/sigiriya-image.jpg" alt="Sigiriya" className="w-full h-full object-cover opacity-80" onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80";
                  }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-[#A7412A] text-white text-xs font-bold px-2 py-1 rounded inline-block mb-1 shadow">THIS MONTH</span>
                    <h3 className="text-white font-bold text-xl drop-shadow-md">
                      {loading ? '...' : `${stats?.bookingsThisMonth ?? 0} new bookings`}
                    </h3>
                  </div>
                </div>
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Messages received</p>
                    <h4 className="text-2xl font-bold text-gray-900">{loading ? '—' : (stats?.totalMessages ?? 0)}</h4>
                  </div>
                  <Link to="/admin/manage-bookings" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#A7412A] hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
