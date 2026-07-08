import React from 'react';
import { Link } from 'react-router-dom';

const bookingsData = [
  {
    initials: 'AS',
    color: 'bg-[#E3D1C7]',
    name: "Amara Silva",
    id: "#BK-90210",
    destination: "Ella Nature Park",
    type: "Eco-Luxury Stay",
    dates: "Oct 12 — Oct 18, 2024",
    nights: "6 Nights",
    status: "CONFIRMED",
    price: "$1,450.00"
  },
  {
    initials: 'JW',
    color: 'bg-[#F2D6B9]',
    name: "James Wickramage",
    id: "#BK-90211",
    destination: "Mirissa Coastal",
    type: "Whale Watching Tour",
    dates: "Oct 15 — Oct 16, 2024",
    nights: "1 Night",
    status: "PENDING",
    price: "$420.00"
  },
  {
    initials: 'EM',
    color: 'bg-[#F7D8D8]',
    name: "Elena Mendis",
    id: "#BK-90212",
    destination: "Kandy Highland",
    type: "Cultural Heritage",
    dates: "Oct 20 — Oct 25, 2024",
    nights: "5 Nights",
    status: "CONFIRMED",
    price: "$2,100.00"
  },
  {
    initials: 'SK',
    color: 'bg-[#D6DFDA]',
    name: "Saman Kumara",
    id: "#BK-90213",
    destination: "Yala Safari",
    type: "Wildlife Adventure",
    dates: "Oct 28 — Oct 30, 2024",
    nights: "2 Nights",
    status: "CANCELLED",
    price: "$890.00"
  }
];

const ManageBookings = () => {
  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      {/* Sidebar - Matching exactly Dashboard.jsx */}
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
          
          <Link to="/manage-destinations" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Destinations</span>
          </Link>

          <Link to="/manage-packages" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="font-medium">Packages</span>
          </Link>

          <Link to="/manage-bookings" className="flex items-center px-4 py-3 bg-[#EAEFEF] text-gray-900 rounded-lg relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>
            <svg className="w-5 h-5 mr-3 text-[#A7412A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-[#A7412A]">Bookings</span>
          </Link>

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
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Top Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-gray-200 sticky top-0 z-10 bg-[#FAFAFA]">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input type="text" placeholder="Search users, bookings..." className="w-full py-2.5 pl-10 pr-4 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#A7412A] outline-none transition-all shadow-sm" />
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-gray-700 relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#FAFAFA]"></span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="flex items-center space-x-3 border-l pl-6 border-gray-300">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Super Admin</p>
              </div>
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Admin avatar" className="w-9 h-9 rounded-full object-cover border border-gray-200" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="px-10 py-8 bg-white min-h-[calc(100vh-80px)]">
           <div className="flex justify-between items-start mb-8">
             <div>
                <h2 className="text-[40px] font-extrabold text-gray-900 leading-none mb-3 tracking-tight">Manage Bookings</h2>
                <p className="text-gray-500 text-sm max-w-xl leading-relaxed">Oversee and manage customer travel itineraries and reservations.</p>
             </div>
             
             <div className="flex space-x-3 mt-4">
               <button className="flex items-center bg-white border border-gray-200 hover:border-gray-300 text-gray-800 px-4 py-2 rounded shadow-sm font-medium transition-all text-sm">
                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                 </svg>
                 Filter
               </button>
               <button className="flex items-center bg-white border border-gray-200 hover:border-gray-300 text-gray-800 px-4 py-2 rounded shadow-sm font-medium transition-all text-sm">
                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                 </svg>
                 Export
               </button>
             </div>
           </div>
           
           {/* Stat Cards */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">TOTAL BOOKINGS</p>
                <p className="text-[32px] font-bold text-gray-900 leading-none mb-2">1,284</p>
                <p className="text-xs font-semibold text-green-600">+12% from last month</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">PENDING CONFIRMATION</p>
                <p className="text-[32px] font-bold text-[#b55845] leading-none mb-2">42</p>
                <p className="text-xs font-medium text-[#E0AB93]">Action required</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">ACTIVE TRAVELS</p>
                <p className="text-[32px] font-bold text-gray-900 leading-none mb-2">156</p>
                <p className="text-xs font-medium text-gray-500">Currently in Sri Lanka</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">REVENUE (MONTHLY)</p>
                <p className="text-[32px] font-bold text-gray-900 leading-none mb-2">$24.5k</p>
                <p className="text-xs font-semibold text-green-600">+5% vs forecast</p>
             </div>
           </div>

           {/* Table Component */}
           <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-8">
              {/* Table Toolbar */}
              <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-white">
                <div className="relative w-full max-w-md">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input type="text" placeholder="Search by customer name, booking ID or destination..." className="w-full py-2.5 pl-10 pr-4 bg-[#F8F9FA] border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-300" />
                </div>
                <select className="bg-[#F8F9FA] border border-gray-200 text-gray-700 px-4 py-2.5 rounded text-sm font-medium focus:outline-none w-full md:w-auto min-w-[140px]">
                  <option>All Status</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-white border-b border-gray-200">
                      <tr>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">CUSTOMER</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">DESTINATION</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">TRAVEL DATES</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">STATUS</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">TOTAL PRICE</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">ACTIONS</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {bookingsData.map((booking, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-4">
                             <div className="flex items-center">
                               <div className={`w-10 h-10 rounded shadow-sm flex items-center justify-center font-bold text-gray-700 mr-4 ${booking.color}`}>
                                 {booking.initials}
                               </div>
                               <div>
                                 <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{booking.name}</div>
                                 <div className="text-gray-500 text-[11px] mt-0.5">{booking.id}</div>
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-4 min-w-[180px]">
                             <div className="font-bold text-gray-900 text-sm">{booking.destination}</div>
                             <div className="text-gray-500 text-[12px] italic mt-0.5">{booking.type}</div>
                           </td>
                           <td className="px-6 py-4 min-w-[160px]">
                             <div className="text-gray-900 font-semibold text-sm">{booking.dates}</div>
                             <div className="text-gray-500 text-[11px] mt-0.5">{booking.nights}</div>
                           </td>
                           <td className="px-6 py-4 text-center">
                             <span className={`px-3 py-1.5 text-[10px] font-bold rounded-full border tracking-wide ${
                               booking.status === 'CONFIRMED' 
                               ? 'bg-green-50 text-green-700 border-green-200' 
                               : booking.status === 'PENDING'
                               ? 'bg-orange-50 text-orange-600 border-orange-200'
                               : 'bg-red-50 text-red-600 border-red-200'
                             }`}>
                               {booking.status}
                             </span>
                           </td>
                           <td className="px-6 py-4">
                             <div className="text-gray-900 font-bold text-sm whitespace-nowrap">{booking.price}</div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="text-gray-400 hover:text-gray-800 transition-colors">
                                <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-[#FAFAFA]">
                 <span className="text-[11px] font-medium text-gray-500">Showing 1 to 4 of 1,284 bookings</span>
                 <div className="flex items-center space-x-1">
                    <button className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded text-white bg-[#8e3723] font-bold text-xs shadow-sm">1</button>
                    <button className="w-7 h-7 flex items-center justify-center rounded text-gray-700 hover:bg-gray-100 transition-colors font-bold text-xs">2</button>
                    <button className="w-7 h-7 flex items-center justify-center rounded text-gray-700 hover:bg-gray-100 transition-colors font-bold text-xs">3</button>
                    <button className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                 </div>
              </div>
           </div>

           {/* Bottom Widgets */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Booking Flow Visualization</h3>
                <div className="flex items-end justify-between h-48 mt-4 gap-4 px-2">
                   {/* Bar 1 */}
                   <div className="w-full flex flex-col items-center gap-2 group">
                     <div className="w-full bg-[#EAE2DE] rounded-sm h-[65%] group-hover:bg-[#d8cac5] transition-colors"></div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase">Mon</span>
                   </div>
                   {/* Bar 2 */}
                   <div className="w-full flex flex-col items-center gap-2 group">
                     <div className="w-full bg-[#E0CCC4] rounded-sm h-[40%] group-hover:bg-[#d2b7ac] transition-colors"></div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase">Tue</span>
                   </div>
                   {/* Bar 3 */}
                   <div className="w-full flex flex-col items-center gap-2 group">
                     <div className="w-full bg-[#E5CDC5] rounded-sm h-[85%] group-hover:bg-[#d5b0a3] transition-colors"></div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase">Wed</span>
                   </div>
                   {/* Bar 4 */}
                   <div className="w-full flex flex-col items-center gap-2 group">
                     <div className="w-full bg-[#A7412A] rounded-sm h-[75%] group-hover:bg-[#8e3723] transition-colors shadow-sm"></div>
                     <span className="text-[10px] font-bold text-gray-900 uppercase">Thu</span>
                   </div>
                   {/* Bar 5 */}
                   <div className="w-full flex flex-col items-center gap-2 group">
                     <div className="w-full bg-[#C29688] rounded-sm h-[55%] group-hover:bg-[#a57a6c] transition-colors"></div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase">Fri</span>
                   </div>
                   {/* Bar 6 */}
                   <div className="w-full flex flex-col items-center gap-2 group">
                     <div className="w-full bg-[#F5EFEF] rounded-sm h-[30%] group-hover:bg-[#e4dddd] transition-colors"></div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase">Sat</span>
                   </div>
                   {/* Bar 7 */}
                   <div className="w-full flex flex-col items-center gap-2 group">
                     <div className="w-full bg-[#FAFAFA] rounded-sm border border-gray-100 h-[25%] group-hover:bg-gray-100 transition-colors"></div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase">Sun</span>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Live Logs</h3>
                <div className="flex-1 space-y-6">
                  {/* Log 1 */}
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0 mr-4 border border-green-100">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Payment verified</p>
                      <p className="text-[11px] text-gray-500 mt-1">#BK-90212 - 2 mins ago</p>
                    </div>
                  </div>
                  {/* Log 2 */}
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 mr-4 border border-orange-100">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">New booking request</p>
                      <p className="text-[11px] text-gray-500 mt-1">#BK-90215 - 14 mins ago</p>
                    </div>
                  </div>
                  {/* Log 3 */}
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mr-4 border border-blue-100">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Customer message</p>
                      <p className="text-[11px] text-gray-500 mt-1">#BK-90110 - 1 hour ago</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 py-2.5 border border-gray-200 rounded font-bold text-gray-700 text-xs tracking-wide hover:bg-gray-50 transition-colors">
                  View All Activity
                </button>
             </div>
           </div>

        </div>
      </main>
    </div>
  );
};

export default ManageBookings;
