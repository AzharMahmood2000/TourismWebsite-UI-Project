import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ activePage }) => {
  const getLinkClasses = (pageName) => {
    if (activePage === pageName) {
      return "flex items-center px-4 py-3 bg-[#EAEFEF] text-gray-900 rounded-lg relative";
    }
    return "flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors";
  };

  const getIconClasses = (pageName) => {
    if (activePage === pageName) {
      return "w-5 h-5 mr-3 text-[#A7412A]";
    }
    return "w-5 h-5 mr-3";
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const renderBottomButton = () => {
    return (
      <div className="p-4 mt-auto border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center py-3 px-4 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    );
  };

  return (
    <aside className="w-64 bg-[#F4F8F7] border-r border-gray-200 flex flex-col shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#A7412A]">Gamanaya</h1>
        <p className="text-xs text-gray-500 font-semibold tracking-wider mt-1 uppercase">Admin Portal</p>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-1">
        <Link to="/admin/dashboard" className={getLinkClasses('dashboard')}>
          {activePage === 'dashboard' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('dashboard')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className={`font-medium ${activePage === 'dashboard' ? 'text-[#A7412A]' : ''}`}>Overview</span>
        </Link>
        
        <Link to="/admin/destinations" className={getLinkClasses('destinations')}>
          {activePage === 'destinations' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('destinations')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className={`font-medium ${activePage === 'destinations' ? 'text-[#A7412A]' : ''}`}>Destinations</span>
        </Link>

        <Link to="/admin/packages" className={getLinkClasses('packages')}>
          {activePage === 'packages' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('packages')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className={`font-medium ${activePage === 'packages' ? 'text-[#A7412A]' : ''}`}>Packages</span>
        </Link>
        
        <Link to="/admin/gallery" className={getLinkClasses('gallery')}>
          {activePage === 'gallery' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('gallery')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
          </svg>
          <span className={`font-medium ${activePage === 'gallery' ? 'text-[#A7412A]' : ''}`}>Gallery</span>
        </Link>

        <Link to="/admin/bookings" className={getLinkClasses('bookings')}>
          {activePage === 'bookings' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('bookings')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={`font-medium ${activePage === 'bookings' ? 'text-[#A7412A]' : ''}`}>Bookings</span>
        </Link>

        <Link to="/admin/users" className={getLinkClasses('users')}>
          {activePage === 'users' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('users')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className={`font-medium ${activePage === 'users' ? 'text-[#A7412A]' : ''}`}>Customers</span>
        </Link>

        <Link to="/admin/reviews" className={getLinkClasses('reviews')}>
          {activePage === 'reviews' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('reviews')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className={`font-medium ${activePage === 'reviews' ? 'text-[#A7412A]' : ''}`}>Review</span>
        </Link>

        <Link to="/admin/messages" className={getLinkClasses('messages')}>
          {activePage === 'messages' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('messages')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className={`font-medium ${activePage === 'messages' ? 'text-[#A7412A]' : ''}`}>Messages</span>
        </Link>

        <div className="mt-8 mb-2 px-4">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Management</p>
        </div>

        <Link to="/admin/insights" className={getLinkClasses('insights')}>
          {activePage === 'insights' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('insights')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className={`font-medium ${activePage === 'insights' ? 'text-[#A7412A]' : ''}`}>Insights</span>
        </Link>

        <Link to="/admin/settings" className={getLinkClasses('settings')}>
          {activePage === 'settings' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>}
          <svg className={getIconClasses('settings')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className={`font-medium ${activePage === 'settings' ? 'text-[#A7412A]' : ''}`}>Settings</span>
        </Link>
      </nav>
      
      {renderBottomButton()}
    </aside>
  );
};

export default AdminSidebar;
