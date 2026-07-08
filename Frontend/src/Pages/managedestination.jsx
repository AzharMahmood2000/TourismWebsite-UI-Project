import React from 'react';
import { Link } from 'react-router-dom';

const destinationsData = [
  {
    image: "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=150&q=80",
    title: "Ella Highlands",
    location: "Central Province, SL",
    region: "Mountainous",
    category: "Nature & Hike",
    status: "Published"
  },
  {
    image: "https://images.unsplash.com/photo-1590454353457-3721381c810d?auto=format&fit=crop&w=150&q=80",
    title: "Galle Fort",
    location: "Southern Province, SL",
    region: "Coastal",
    category: "Heritage",
    status: "Published"
  },
  {
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=150&q=80",
    title: "Sigiriya Rock",
    location: "Central Province, SL",
    region: "Cultural",
    category: "Adventure",
    status: "Draft"
  },
  {
    image: "https://images.unsplash.com/photo-1563821033282-3e2b260e0d52?auto=format&fit=crop&w=150&q=80",
    title: "Yala Safari",
    location: "Southern Province, SL",
    region: "Wildlife",
    category: "Safari",
    status: "Published"
  }
];

const ManageDestination = () => {
  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#F4F8F7] border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#A7412A]">Travelarch</h1>
          <p className="text-xs text-gray-500 font-semibold tracking-wider mt-1 uppercase">Gamanaya Admin</p>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-1">
          <Link to="/dashboard" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="font-medium">Overview</span>
          </Link>
          
          <Link to="/manage-destinations" className="flex items-center px-4 py-3 bg-[#EAEFEF] text-gray-900 rounded-lg relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>
            <svg className="w-5 h-5 mr-3 text-[#A7412A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium text-[#A7412A]">Destinations</span>
          </Link>

          <Link to="/manage-packages" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="font-medium">Packages</span>
          </Link>

          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Bookings</span>
          </a>

          <Link to="/admin/users" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium">Customers</span>
          </Link>

          <Link to="/manage-reviews" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-medium">Review</span>
          </Link>

          <Link to="/manage-messages" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="font-medium">Messages</span>
          </Link>

          <div className="mt-8 mb-2 px-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Management</p>
          </div>

          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="font-medium">Insights</span>
          </a>

          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Settings</span>
          </a>
        </nav>
        
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button className="w-full flex items-center justify-center py-3 px-4 bg-[#A7412A] text-white rounded-lg hover:bg-[#8e3723] transition-colors font-medium">
             Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Top Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-gray-200 sticky top-0 z-10 bg-[#F8FAFA]">
          <div className="relative w-[500px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input type="text" placeholder="Search users, bookings..." className="w-full py-2 pl-10 pr-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300" />
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-gray-700 relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#F8FAFA]"></span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="flex items-center space-x-3 border-l border-gray-300 pl-6">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Super Admin</p>
              </div>
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Admin avatar" className="w-8 h-8 rounded-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="px-10 py-8 bg-white min-h-[calc(100vh-73px)]">
           <div className="flex justify-between items-start mb-8">
             <div>
                <p className="text-[10px] font-bold text-[#A7412A] uppercase tracking-wider mb-2">Admin Dashboard</p>
                <h2 className="text-[40px] font-extrabold text-gray-900 leading-none mb-3 tracking-tight">Manage Destinations</h2>
                <p className="text-gray-500 text-sm max-w-xl leading-relaxed">Curate and manage your collection of premium travel experiences. Adjust regional details, status, and visual storytelling assets.</p>
             </div>
             
             <button className="flex items-center bg-white border border-gray-200 hover:border-gray-300 text-gray-800 px-5 py-2.5 rounded shadow-sm font-medium transition-all text-sm mt-4">
               <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
               </svg>
               New Destination
             </button>
           </div>
           
           {/* Stat Cards Row */}
           <div className="flex space-x-6 mb-8">
             <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex-1">
                <p className="text-[10px] text-[#E0AB93] font-bold uppercase tracking-wider mb-2">TOTAL LOCATIONS</p>
                <p className="text-3xl font-bold text-[#a14028]">124</p>
             </div>
             <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex-1">
                <p className="text-[10px] text-[#E0AB93] font-bold uppercase tracking-wider mb-2">ACTIVE EXPERIENCES</p>
                <p className="text-3xl font-bold text-[#6D4C41]">98</p>
             </div>
             <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex-[2]">
                <p className="text-[10px] text-[#E0AB93] font-bold uppercase tracking-wider mb-2">QUICK SEARCH</p>
                <div className="flex space-x-3 items-center mt-1">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                    <input type="text" placeholder="Find by name or region..." className="w-full py-2 pl-10 pr-4 bg-white border-b-2 border-transparent focus:border-gray-200 outline-none transition-all placeholder-gray-300 text-sm" />
                  </div>
                  <button className="p-2 border border-gray-200 rounded text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </button>
                </div>
             </div>
           </div>

           {/* Table */}
           <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-[#F2F6F6] border-b border-gray-200">
                      <tr>
                         <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">DESTINATION</th>
                         <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">REGION</th>
                         <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">CATEGORY</th>
                         <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">STATUS</th>
                         <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider text-right">ACTIONS</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {destinationsData.map((dest, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                           <td className="px-6 py-4">
                             <div className="flex items-center">
                               <img src={dest.image} alt={dest.title} className="w-14 h-12 rounded object-cover mr-4 shadow-sm" />
                               <div>
                                 <div className="font-extrabold text-gray-900 text-[15px]">{dest.title}</div>
                                 <div className="text-gray-500 text-[11px] mt-0.5">{dest.location}</div>
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-4">
                             <span className="bg-[#E4E3DE]/60 text-gray-600 px-3 py-1 text-[11px] font-bold rounded-full border border-transparent">
                               {dest.region}
                             </span>
                           </td>
                           <td className="px-6 py-4">
                             <div className="text-gray-500 text-sm font-medium">{dest.category}</div>
                           </td>
                           <td className="px-6 py-4">
                             <div className="flex items-center text-sm font-bold text-[#C84F39]">
                               <span className={`w-2 h-2 rounded-full mr-2 ${dest.status === 'Published' ? 'bg-[#C84F39]' : 'bg-gray-400'}`}></span>
                               <span className={dest.status === 'Published' ? 'text-[#C84F39]' : 'text-gray-500'}>{dest.status}</span>
                             </div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end space-x-4">
                                <button className="text-gray-400 hover:text-gray-800 transition-colors">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
                 <span className="text-[11px] font-semibold text-gray-500">Showing 1 to 4 of 124 destinations</span>
                 <div className="flex items-center space-x-1">
                    <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50 transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center border border-[#A7412A] rounded text-white bg-[#A7412A] font-bold text-xs">1</button>
                    <button className="w-7 h-7 flex items-center justify-center border border-transparent rounded text-gray-700 hover:bg-gray-50 transition-colors font-bold text-xs">2</button>
                    <button className="w-7 h-7 flex items-center justify-center border border-transparent rounded text-gray-700 hover:bg-gray-50 transition-colors font-bold text-xs">3</button>
                    <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50 transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default ManageDestination;
