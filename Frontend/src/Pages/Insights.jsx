import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';
import API_BASE_URL from '../api/api';

const Insights = () => {
  const navigate = useNavigate();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const token = userInfo?.token;
        if (!token) throw new Error("No authorization token");

        const res = await fetch(`${API_BASE_URL}/api/admin/insights`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error("Failed to load insights");
        const data = await res.json();
        setInsights(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const formatCurrency = (val) => {
    return 'Rs. ' + (val || 0).toLocaleString();
  };

  const getBookingAmount = (booking) => booking.estimatedTotal || 0;
  
  const getCustomerName = (booking) => booking.fullName || booking.user?.name || "Unknown Customer";
  
  const getPlaceName = (booking) => 
    booking.destination?.title || booking.destination?.name ||
    booking.packageId?.title || booking.packageId?.name ||
    booking.package?.title || booking.package?.name || "Not specified";

  const getReviewerName = (rev) => rev.reviewerName || rev.user?.name || "Anonymous Traveler";
  const getMessageName = (msg) => msg.name || "Unknown Sender";

  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="insights" />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F4F8F7]">
        <AdminTopbar title="System Insights" />
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Business Insights</h2>
              <p className="text-gray-500 mt-2 text-[15px]">Data-driven performance overview for Gamanaya.</p>
            </div>
            <div className="text-sm font-semibold text-gray-500 bg-white px-4 py-2 rounded shadow-sm border border-gray-200">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-20">
              <p className="text-gray-500 font-semibold text-lg">Loading insights...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center p-20 bg-red-50 text-red-600 rounded-xl border border-red-200">
              <p className="font-semibold text-lg">Failed to load insights.</p>
            </div>
          ) : insights ? (
            <div className="space-y-8">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <p className="text-xs uppercase font-bold text-gray-500 mb-2">Total Revenue</p>
                  <p className="text-2xl font-black text-[#A7412A]">{formatCurrency(insights.summary.totalRevenue)}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <p className="text-xs uppercase font-bold text-gray-500 mb-2">Average Booking Value</p>
                  <p className="text-2xl font-black text-gray-800">{formatCurrency(insights.summary.averageBookingValue)}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <p className="text-xs uppercase font-bold text-gray-500 mb-2">Total Bookings</p>
                  <p className="text-2xl font-black text-gray-800">{insights.summary.totalBookings || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <p className="text-xs uppercase font-bold text-gray-500 mb-2">Total Users</p>
                  <p className="text-2xl font-black text-gray-800">{insights.summary.totalUsers || 0}</p>
                </div>
              </div>

              {/* Status & Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Booking Status Analysis</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-yellow-600 flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>Pending</span>
                    <span className="font-bold">{insights.bookingStatus.pending || 0}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4"><div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, ((insights.bookingStatus.pending || 0) / (insights.summary.totalBookings || 1)) * 100)}%` }}></div></div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-green-600 flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Confirmed</span>
                    <span className="font-bold">{insights.bookingStatus.confirmed || 0}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, ((insights.bookingStatus.confirmed || 0) / (insights.summary.totalBookings || 1)) * 100)}%` }}></div></div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-blue-600 flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>Completed</span>
                    <span className="font-bold">{insights.bookingStatus.completed || 0}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, ((insights.bookingStatus.completed || 0) / (insights.summary.totalBookings || 1)) * 100)}%` }}></div></div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-red-600 flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>Cancelled</span>
                    <span className="font-bold">{insights.bookingStatus.cancelled || 0}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, ((insights.bookingStatus.cancelled || 0) / (insights.summary.totalBookings || 1)) * 100)}%` }}></div></div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 text-center border-b pb-2">Monthly Booking Trend</h3>
                  <div className="flex items-center justify-around">
                    <div className="text-center">
                      <p className="text-gray-500 text-xs uppercase font-bold mb-1">Last Month</p>
                      <p className="text-3xl font-black text-gray-400">{insights.bookingTrend.lastMonth || 0}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      {insights.bookingTrend.growthPercentage > 0 ? (
                        <>
                          <div className="bg-green-100 text-green-700 p-2 rounded-full mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                          </div>
                          <span className="font-bold text-green-700">+{insights.bookingTrend.growthPercentage.toFixed(1)}%</span>
                        </>
                      ) : insights.bookingTrend.growthPercentage < 0 ? (
                        <>
                          <div className="bg-red-100 text-red-700 p-2 rounded-full mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                          </div>
                          <span className="font-bold text-red-700">{insights.bookingTrend.growthPercentage.toFixed(1)}%</span>
                        </>
                      ) : (
                        <>
                          <div className="bg-gray-100 text-gray-700 p-2 rounded-full mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" /></svg>
                          </div>
                          <span className="font-bold text-gray-700">0%</span>
                        </>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 text-xs uppercase font-bold mb-1">This Month</p>
                      <p className="text-3xl font-black text-[#A7412A]">{insights.bookingTrend.thisMonth || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Performance & Engagement */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Top Performance</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="text-xs uppercase font-bold text-gray-500">Most Booked Destination</p>
                        <p className="font-bold text-gray-900 mt-1">{insights.topPerformance.topDestination.name}</p>
                      </div>
                      <div className="bg-[#A7412A] text-white text-xs font-bold px-2 py-1 rounded">{insights.topPerformance.topDestination.bookings || 0} Bookings</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="text-xs uppercase font-bold text-gray-500">Most Booked Tour Package</p>
                        <p className="font-bold text-gray-900 mt-1">{insights.topPerformance.topPackage.name}</p>
                      </div>
                      <div className="bg-[#A7412A] text-white text-xs font-bold px-2 py-1 rounded">{insights.topPerformance.topPackage.bookings || 0} Bookings</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="text-xs uppercase font-bold text-gray-500">Popular Package Category</p>
                        <p className="font-bold text-gray-900 mt-1">{insights.topPerformance.popularCategory.name}</p>
                      </div>
                      <div className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded">{insights.topPerformance.popularCategory.count || 0} Listed</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Customer Engagement</h3>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <p className="text-2xl font-black text-purple-700">{insights.engagement.pendingReviews || 0}</p>
                      <p className="text-xs font-bold text-purple-600 mt-1 uppercase">Pending</p>
                      <p className="text-[10px] text-purple-500 mt-2 leading-tight">Reviews waiting for approval</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <p className="text-2xl font-black text-orange-700">{insights.engagement.unreadMessages || 0}</p>
                      <p className="text-xs font-bold text-orange-600 mt-1 uppercase">Unread</p>
                      <p className="text-[10px] text-orange-500 mt-2 leading-tight">Messages waiting for response</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-center">
                      <p className="text-sm font-bold text-gray-700">{insights.engagement.approvedReviews || 0} Approved</p>
                      <p className="text-xs text-gray-500 mt-1">{insights.engagement.hiddenReviews || 0} Hidden</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-center">
                      <p className="text-sm font-bold text-gray-700">{insights.engagement.readMessages || 0}</p>
                      <p className="text-xs text-gray-500 mt-1">Read Messages</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Bookings */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                      <h4 className="font-bold text-gray-800 text-sm">Recent Bookings</h4>
                      <button onClick={() => navigate('/admin/bookings')} className="text-xs font-bold text-[#A7412A] hover:underline">View All &rarr;</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {insights.recentActivity.recentBookings.length > 0 ? (
                        insights.recentActivity.recentBookings.map(b => (
                          <div key={b._id} className="p-4 text-sm">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-bold text-gray-900 truncate max-w-[150px]">{getCustomerName(b)}</p>
                              <p className="font-semibold text-[#A7412A]">{formatCurrency(getBookingAmount(b))}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-xs text-gray-500 truncate max-w-[150px]">{getPlaceName(b)}</p>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                b.status === "Confirmed" ? "bg-green-100 text-green-700" :
                                b.status === "Completed" ? "bg-blue-100 text-blue-700" :
                                b.status === "Cancelled" ? "bg-red-100 text-red-700" :
                                "bg-yellow-100 text-yellow-700"
                              }`}>{b.status || "Pending"}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-sm text-gray-500">0 recent bookings.</div>
                      )}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                      <h4 className="font-bold text-gray-800 text-sm">Recent Reviews</h4>
                      <button onClick={() => navigate('/admin/reviews')} className="text-xs font-bold text-[#A7412A] hover:underline">View All &rarr;</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {insights.recentActivity.recentReviews.length > 0 ? (
                        insights.recentActivity.recentReviews.map(r => (
                          <div key={r._id} className="p-4 text-sm">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-bold text-gray-900 truncate max-w-[150px]">{getReviewerName(r)}</p>
                              <div className="flex text-yellow-400">
                                {[...Array(r.rating || 5)].map((_, i) => <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-xs text-gray-500 truncate max-w-[150px]">{r.reviewTitle || "Travel Review"}</p>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                r.status === "Approved" ? "bg-green-100 text-green-700" :
                                r.status === "Hidden" ? "bg-gray-200 text-gray-700" :
                                "bg-purple-100 text-purple-700"
                              }`}>{r.status || "Pending"}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-sm text-gray-500">0 recent reviews.</div>
                      )}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                      <h4 className="font-bold text-gray-800 text-sm">Recent Messages</h4>
                      <button onClick={() => navigate('/admin/messages')} className="text-xs font-bold text-[#A7412A] hover:underline">View All &rarr;</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {insights.recentActivity.recentMessages.length > 0 ? (
                        insights.recentActivity.recentMessages.map(m => (
                          <div key={m._id} className="p-4 text-sm">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-bold text-gray-900 truncate max-w-[150px]">{getMessageName(m)}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-xs text-gray-500 truncate max-w-[150px]">{m.subject || m.category || "Contact Message"}</p>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                m.isRead || m.status === 'Read' || m.status === 'Replied' ? "bg-gray-100 text-gray-600" : "bg-orange-100 text-orange-700"
                              }`}>{m.isRead || m.status === 'Read' || m.status === 'Replied' ? "Read" : "Unread"}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-sm text-gray-500">0 recent messages.</div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Quick Actions Base */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                <button onClick={() => navigate('/admin/dashboard')} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded shadow-sm transition">
                  Overview Dashboard
                </button>
                <button onClick={() => navigate('/admin/bookings')} className="px-5 py-2.5 bg-[#A7412A] hover:bg-[#8e3723] text-white font-bold text-sm rounded shadow-sm transition">
                  Manage Bookings
                </button>
                <button onClick={() => navigate('/admin/reviews')} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded shadow-sm transition">
                  Verify Reviews
                </button>
                <button onClick={() => navigate('/admin/messages')} className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded shadow-sm transition">
                  Reply to Messages
                </button>
              </div>

            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default Insights;
