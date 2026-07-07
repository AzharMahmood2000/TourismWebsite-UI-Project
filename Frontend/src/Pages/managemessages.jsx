import React from 'react';
import { Link } from 'react-router-dom';

const messagesData = [
  {
    initials: "AS",
    name: "Anura Samaraweera",
    email: "anura.s@example.com",
    subject: "Custom Honeymoon Inquiry for Kandy",
    preview: "We are looking for a boutique experience with a private guide...",
    status: "NEW",
    date: "Oct 24, 2023",
    time: "10:30 AM",
    replied: false
  },
  {
    initials: "EL",
    name: "Elena Larsson",
    email: "e.larsson@nordic-travel.se",
    subject: "Group Booking Inquiry (15 pax)",
    preview: "Planning a yoga retreat in the southern coast for early 2024...",
    status: "READ",
    date: "Oct 23, 2023",
    time: "04:15 PM",
    replied: false
  },
  {
    initials: "JM",
    name: "Julian Miller",
    email: "julian.miller@voyage.com",
    subject: "Partnership Proposal: Content Creator",
    preview: "I will be visiting Sigiriya next month and would love to feature...",
    status: "REPLIED",
    date: "Oct 22, 2023",
    time: "09:00 AM",
    replied: true
  },
  {
    initials: "MK",
    name: "Minoli Karunaratne",
    email: "minoli.k@gmail.com",
    subject: "Question about Airport Pickup",
    preview: "Does the package include luxury sedan transport from BIA?",
    status: "READ",
    date: "Oct 21, 2023",
    time: "11:45 PM",
    replied: false
  },
  {
    initials: "DR",
    name: "David Richards",
    email: "d.richards@adventures.au",
    subject: "Villa Availability for Christmas",
    preview: "Looking for a 4-bedroom beachfront villa in Mirissa...",
    status: "REPLIED",
    date: "Oct 20, 2023",
    time: "02:30 PM",
    replied: true
  }
];

const ManageMessages = () => {
  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#F4F8F7] border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#A7412A]">Gamanaya</h1>
          <p className="text-xs text-gray-500 font-semibold tracking-wider mt-1 uppercase">Admin Portal</p>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-1">
          <Link to="/dashboard" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="font-medium">Overview</span>
          </Link>
          
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Destinations</span>
          </a>

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

          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium">Customers</span>
          </a>

          <Link to="/manage-reviews" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="font-medium">Review</span>
          </Link>

          {/* Active Messages Item */}
          <Link to="/manage-messages" className="flex items-center px-4 py-3 bg-[#EAEFEF] text-gray-900 rounded-lg relative mt-1">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>
            <svg className="w-5 h-5 mr-3 text-[#A7412A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="font-medium text-[#A7412A]">Messages</span>
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
        
        <div className="p-4 mt-auto">
          <button className="w-full flex items-center justify-center py-3 px-4 bg-[#A7412A] text-white rounded-lg hover:bg-[#8e3723] transition-colors font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Booking
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Top Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-gray-200 sticky top-0 z-10 bg-white">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input type="text" placeholder="Search messages..." className="w-full py-2.5 pl-10 pr-4 bg-[#F9FAFB] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition-all" />
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-gray-700 relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
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
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Admin avatar" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
            </div>
          </div>
        </header>

        {/* Path/Title */}
        <div className="px-10 py-8 bg-white min-h-[calc(100vh-80px)]">
           <div className="flex justify-between items-start mb-8">
             <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Manage Messages</h2>
                <p className="text-gray-500 mt-2 text-[15px] max-w-2xl">Review and respond to guest inquiries and contact forms.</p>
             </div>
             <div className="flex space-x-3">
               <button className="flex items-center border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm bg-white">
                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                 </svg>
                 Filters
               </button>
               <button className="flex items-center text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm bg-[#A7412A] hover:bg-[#8e3723]">
                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                 </svg>
                 Export CSV
               </button>
             </div>
           </div>
           
           {/* Stat Cards */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             {/* Stat 1 */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Total Messages</p>
                <div className="flex items-end">
                  <span className="text-3xl font-extrabold text-gray-900 mr-2">1,284</span>
                  <span className="font-bold text-[#A7412A] text-sm mb-1">+12%</span>
                </div>
             </div>
             {/* Stat 2 */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Unread</p>
                <div className="flex items-end">
                  <span className="text-3xl font-extrabold text-[#A7412A] mr-2">24</span>
                  <span className="font-medium text-gray-600 text-sm mb-1">New today</span>
                </div>
             </div>
             {/* Stat 3 */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Avg. Response Time</p>
                <div className="flex items-end">
                  <span className="text-3xl font-extrabold text-gray-900 mr-2">4.2h</span>
                  <span className="font-bold text-[#A7412A] text-sm mb-1">Excellent</span>
                </div>
             </div>
             {/* Stat 4 */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Replied Rate</p>
                <div className="flex items-center mt-1">
                  <span className="text-3xl font-extrabold text-gray-900 mr-2">96.8%</span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
             </div>
           </div>

           {/* Table */}
           <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-[#FAFAFA] border-b border-gray-200">
                      <tr>
                         <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-2/5">Subject</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                      {messagesData.map((msg, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-6">
                             <div className="flex items-center">
                               <div className="w-10 h-10 bg-[#FAD8C3] text-[#A7412A] rounded-full flex items-center justify-center font-bold mr-3 shrink-0">{msg.initials}</div>
                               <div className="min-w-0">
                                 <h3 className="font-bold text-[14px] text-gray-900 truncate">{msg.name}</h3>
                                 <p className="text-[12px] text-gray-500 truncate mt-0.5">{msg.email}</p>
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-6">
                             <div>
                               <h4 className="font-bold text-gray-900 text-[14px]">{msg.subject}</h4>
                               <p className="text-[13px] text-gray-500 mt-1 truncate">{msg.preview}</p>
                             </div>
                           </td>
                           <td className="px-6 py-6">
                             <span className={`px-2.5 py-1 text-[11px] font-extrabold rounded-full tracking-wide ${
                               msg.status === 'NEW' || msg.status === 'REPLIED'
                               ? 'bg-orange-100 text-[#A7412A]' 
                               : 'bg-gray-200 text-gray-700'
                             }`}>
                               {msg.status}
                             </span>
                           </td>
                           <td className="px-6 py-6">
                             <div className="text-gray-900 font-bold text-[13px] whitespace-pre-line leading-snug">
                               {msg.date}<br/>
                               <span className="text-xs text-gray-500 font-normal">{msg.time}</span>
                             </div>
                           </td>
                           <td className="px-6 py-6 text-right">
                              <div className="flex items-center justify-end space-x-4">
                                {msg.replied && (
                                  <svg className="w-5 h-5 text-[#A7412A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                                <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </button>
                                {!msg.replied && (
                                  <button className="text-gray-600 hover:text-gray-900 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                    </svg>
                                  </button>
                                )}
                                <button className="text-gray-600 hover:text-red-600 transition-colors">
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
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-[#FAFAFA]">
                 <span className="text-xs font-bold text-gray-500">Showing 1 to 5 of 1284 messages</span>
                 <div className="flex items-center space-x-1.5">
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4" transform="rotate(180)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-[#A7412A] rounded text-white bg-[#A7412A] font-bold text-sm shadow-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-gray-700 bg-transparent hover:bg-gray-100 transition-colors font-bold text-sm">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-gray-700 bg-transparent hover:bg-gray-100 transition-colors font-bold text-sm">3</button>
                    <span className="text-gray-400 font-bold px-2">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-gray-700 bg-transparent hover:bg-gray-100 transition-colors font-bold text-sm">257</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                 </div>
              </div>
           </div>

           {/* Bottom Details */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-10">
              
              <div className="bg-[#F4F8F7] p-6 rounded-xl border border-gray-200 flex items-start space-x-4">
                 <div className="w-10 h-10 bg-[#FAD8C3] text-[#A7412A] rounded flex items-center justify-center shrink-0">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                   </svg>
                 </div>
                 <div>
                   <h4 className="text-lg font-extrabold text-gray-900 mb-2">Admin Tip</h4>
                   <p className="text-gray-600 text-[14px] leading-relaxed">
                     Response times under 6 hours significantly increase booking conversion rates. Use the "Templates" feature to respond faster to common inquiries.
                   </p>
                 </div>
              </div>

              <div className="bg-[#F4F8F7] p-6 rounded-xl border border-gray-200 flex items-start space-x-4">
                 <div className="w-10 h-10 bg-[#FAD8C3] text-[#A7412A] rounded flex items-center justify-center shrink-0">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                   </svg>
                 </div>
                 <div>
                   <h4 className="text-lg font-extrabold text-gray-900 mb-2">Privacy Notice</h4>
                   <p className="text-gray-600 text-[14px] leading-relaxed">
                     Guest contact details are encrypted. Ensure you only communicate through official channels to maintain security compliance.
                   </p>
                 </div>
              </div>

           </div>

        </div>
      </main>
    </div>
  );
};

export default ManageMessages;
