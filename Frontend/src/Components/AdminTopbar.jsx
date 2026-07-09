import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api/api';

const AdminTopbar = ({ title, showSearch = true, searchQuery, onSearch, searchPlaceholder = "Global search..." }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");
  const [adminRole, setAdminRole] = useState("ADMIN");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const [notifications, setNotifications] = useState({
    pendingBookings: 0,
    unreadMessages: 0,
    pendingReviews: 0,
    total: 0
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      setAdminName(userInfo?.name || userInfo?.username || "Admin");
      setAdminRole(userInfo?.role ? userInfo.role.toUpperCase() : "ADMIN");
      
      let img = userInfo?.avatarUrl || userInfo?.avatar || "";
      if (img && !img.startsWith('http') && !img.startsWith('data:')) {
        img = `${API_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`;
      }
      setAvatarUrl(img);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoadingNotifications(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const token = userInfo?.token;
        
        if (token) {
          const headers = { Authorization: `Bearer ${token}` };

          let pBookings = 0;
          let uMessages = 0;
          let pReviews = 0;

          const [statsRes, contactRes, reviewsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/admin/stats`, { headers }).catch(() => null),
            fetch(`${API_BASE_URL}/api/contact`, { headers }).catch(() => null),
            fetch(`${API_BASE_URL}/api/reviews/admin/all`, { headers }).catch(() => null)
          ]);

          if (statsRes && statsRes.ok) {
            const stats = await statsRes.json();
            pBookings = stats.pendingBookings || 0;
          }
          if (contactRes && contactRes.ok) {
            const contacts = await contactRes.json();
            const msgs = Array.isArray(contacts) ? contacts : (contacts.messages || []);
            uMessages = msgs.filter(m => m.status === 'New' || m.status === 'Unread' || m.isRead === false).length;
          }
          if (reviewsRes && reviewsRes.ok) {
            const reviews = await reviewsRes.json();
            const rList = Array.isArray(reviews) ? reviews : (reviews.reviews || []);
            pReviews = rList.filter(r => r.status === 'Pending' || r.status === 'pending').length;
          }

          setNotifications({
            pendingBookings: pBookings,
            unreadMessages: uMessages,
            pendingReviews: pReviews,
            total: pBookings + uMessages + pReviews
          });
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoadingNotifications(false);
      }
    };

    fetchNotifications();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'A';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="flex items-center justify-between px-10 py-5 border-b border-gray-200 sticky top-0 z-10 bg-white/50 backdrop-blur-sm">
      <div className={`relative w-96 ${!showSearch ? 'opacity-0 pointer-events-none' : ''}`}>
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          type="text" 
          value={searchQuery}
          onChange={onSearch}
          placeholder={searchPlaceholder} 
          className="w-full py-2.5 pl-10 pr-4 bg-[#F9FAFB] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition-all disabled:bg-transparent disabled:border-none" 
          disabled={!showSearch}
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="text-gray-500 hover:text-gray-700 relative flex items-center justify-center p-1"
          >
            {notifications.total > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/4 -translate-y-1/4 ring-2 ring-white">
                {notifications.total}
              </span>
            )}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
              </div>
              
              {loadingNotifications ? (
                <div className="px-4 py-4 text-sm text-gray-500 text-center">Checking notifications...</div>
              ) : notifications.total === 0 ? (
                <div className="px-4 py-4 text-sm text-gray-500 text-center">No new notifications</div>
              ) : (
                <div className="flex flex-col">
                  {notifications.pendingBookings > 0 && (
                    <button 
                      onClick={() => { setIsDropdownOpen(false); navigate('/admin/bookings'); }}
                      className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between text-sm transition-colors text-left"
                    >
                      <span className="text-gray-700 font-medium">Pending Bookings</span>
                      <span className="bg-orange-100 text-orange-800 py-0.5 px-2 rounded-full text-[10px] font-bold">{notifications.pendingBookings}</span>
                    </button>
                  )}
                  {notifications.unreadMessages > 0 && (
                    <button 
                      onClick={() => { setIsDropdownOpen(false); navigate('/admin/messages'); }}
                      className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between text-sm transition-colors text-left"
                    >
                      <span className="text-gray-700 font-medium">Unread Messages</span>
                      <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-[10px] font-bold">{notifications.unreadMessages}</span>
                    </button>
                  )}
                  {notifications.pendingReviews > 0 && (
                    <button 
                      onClick={() => { setIsDropdownOpen(false); navigate('/admin/reviews'); }}
                      className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between text-sm transition-colors text-left"
                    >
                      <span className="text-gray-700 font-medium">Pending Reviews</span>
                      <span className="bg-purple-100 text-purple-800 py-0.5 px-2 rounded-full text-[10px] font-bold">{notifications.pendingReviews}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        <div 
          onClick={() => navigate("/admin/profile")}
          className="flex items-center space-x-3 border-l pb-1 pl-6 border-gray-300 cursor-pointer hover:bg-gray-50/50 hover:opacity-90 rounded transition-all"
        >
          <div className="text-right hidden md:block mt-1">
            <p className="text-sm font-semibold text-gray-800">{adminName}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{adminRole}</p>
          </div>
          
          {avatarUrl ? (
             <img src={avatarUrl} alt="Admin avatar" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
          ) : (
             <div className="w-10 h-10 bg-orange-100 text-[#A7412A] rounded-full flex items-center justify-center font-bold text-sm border border-gray-200">
               {getInitials(adminName)}
             </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
