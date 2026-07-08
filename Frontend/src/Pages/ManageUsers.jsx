import React from 'react';
import { Link } from 'react-router-dom';

const dummyUsers = [
  {
    name: "Admin User",
    email: "admin@gamanaya.com",
    phone: "0771234567",
    role: "Admin",
    joinedDate: "Jan 15, 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Azhar Mahmood",
    email: "azhar@example.com",
    phone: "0777654321",
    role: "User",
    joinedDate: "Feb 10, 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Nimal Perera",
    email: "nimal@example.com",
    phone: "0712345678",
    role: "User",
    joinedDate: "Mar 05, 2026",
    status: "Inactive",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Fathima Rizla",
    email: "rizla@example.com",
    phone: "0769876543",
    role: "User",
    joinedDate: "Apr 12, 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  }
];

const ManageUsers = () => {
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

          <Link to="/manage-bookings" className="flex items-center px-4 py-3 text-gray-600 hover:bg-[#EAEFEF] rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Bookings</span>
          </Link>

          <Link to="/admin/users" className="flex items-center px-4 py-3 bg-[#EAEFEF] text-gray-900 rounded-lg relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>
            <svg className="w-5 h-5 mr-3 text-[#A7412A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium text-[#A7412A]">Customers</span>
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
        
        <div className="p-4 mt-auto">
          <button className="w-full flex items-center justify-center py-3 px-4 bg-[#A7412A] text-white rounded-lg hover:bg-[#8e3723] transition-colors font-medium">
             Log Out
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
            <input type="text" placeholder="Search users..." className="w-full py-2.5 pl-10 pr-4 bg-[#F9FAFB] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition-all" />
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-gray-700 relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center space-x-3 border-l pl-6 border-gray-300">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Admin avatar" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="px-10 py-8 bg-[#FAFAFA] min-h-[calc(100vh-80px)]">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
             <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Manage Users</h2>
                <p className="text-gray-500 mt-2 text-[15px]">View and manage registered platform users</p>
             </div>
             
             <div className="flex space-x-4 items-center">
               <span className="text-sm font-medium text-gray-600">Role:</span>
               <select className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium shadow-sm outline-none focus:ring-1 focus:ring-[#A7412A]">
                 <option>All Roles</option>
                 <option>Admin</option>
                 <option>User</option>
               </select>

               <button className="flex items-center bg-[#A7412A] hover:bg-[#8e3723] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow">
                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                 </svg>
                 Add User
               </button>
             </div>
           </div>

           {/* Table */}
           <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                   <thead className="bg-[#F8F9FA] border-b border-gray-200">
                      <tr>
                         <th className="px-6 py-4 text-sm font-bold text-gray-700">User</th>
                         <th className="px-6 py-4 text-sm font-bold text-gray-700">Email</th>
                         <th className="px-6 py-4 text-sm font-bold text-gray-700">Phone</th>
                         <th className="px-6 py-4 text-sm font-bold text-gray-700">Role</th>
                         <th className="px-6 py-4 text-sm font-bold text-gray-700">Joined Date</th>
                         <th className="px-6 py-4 text-sm font-bold text-gray-700">Status</th>
                         <th className="px-6 py-4 text-sm font-bold text-gray-700 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                      {dummyUsers.map((user, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-4">
                             <div className="flex items-center">
                               <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200" />
                               <span className="font-bold text-gray-900 text-sm whitespace-nowrap">{user.name}</span>
                             </div>
                           </td>
                           <td className="px-6 py-4">
                             <div className="text-gray-600 text-sm">{user.email}</div>
                           </td>
                           <td className="px-6 py-4">
                             <div className="text-gray-600 text-sm whitespace-nowrap">{user.phone}</div>
                           </td>
                           <td className="px-6 py-4">
                             <span className={`px-3 py-1 text-xs font-bold rounded-full border whitespace-nowrap ${
                               user.role === 'Admin' 
                               ? 'bg-orange-50 text-[#A7412A] border-orange-200' 
                               : 'bg-teal-50 text-teal-700 border-teal-200'
                             }`}>
                               {user.role}
                             </span>
                           </td>
                           <td className="px-6 py-4">
                             <div className="text-gray-600 text-sm whitespace-nowrap">{user.joinedDate}</div>
                           </td>
                           <td className="px-6 py-4">
                             <span className={`px-3 py-1 text-xs font-bold rounded-full border whitespace-nowrap ${
                               user.status === 'Active' 
                               ? 'bg-green-50 text-green-700 border-green-200' 
                               : 'bg-red-50 text-red-700 border-red-200'
                             }`}>
                               {user.status}
                             </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end space-x-3">
                                <button className="text-gray-400 hover:text-blue-600 transition-colors" title="View">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </button>
                                <button className="text-gray-400 hover:text-[#A7412A] transition-colors" title="Edit">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                </button>
                                <button className="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
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
           </div>
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
