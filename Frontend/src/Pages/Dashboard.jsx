import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#F4F8F7] border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#A7412A]">Travelarch</h1>
          <p className="text-xs text-gray-500 font-semibold tracking-wider mt-1 uppercase">Gamanaya Admin</p>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-1">
          <a href="#" className="flex items-center px-4 py-3 bg-[#EAEFEF] text-gray-900 rounded-lg relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A7412A] rounded-r-md"></div>
            <svg className="w-5 h-5 mr-3 text-[#A7412A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="font-medium text-[#A7412A]">Overview</span>
          </a>
          
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
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input type="text" placeholder="Search packages, IDs..." className="w-full py-2 pl-10 pr-4 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-[#A7412A] focus:bg-white outline-none" />
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

        {/* Dashboard Content */}
        <div className="px-10 py-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Ayubowan, Admin</h2>
              <p className="text-gray-500 mt-2 text-lg">Here's a snapshot of Gamanaya's performance today.</p>
            </div>
            <button className="flex items-center bg-[#A7412A] hover:bg-[#8e3723] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Package
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Stat Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#A7412A]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">+2 this month</span>
              </div>
              <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Active Destinations</p>
              <h3 className="text-4xl font-extrabold text-gray-900">12</h3>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#A7412A]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">Stable</span>
              </div>
              <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">Curated Packages</p>
              <h3 className="text-4xl font-extrabold text-gray-900">08</h3>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#A7412A]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">+15% vs last week</span>
              </div>
              <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">New Bookings</p>
              <h3 className="text-4xl font-extrabold text-gray-900">24</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
                <a href="#" className="text-[#A7412A] text-sm font-semibold hover:underline flex items-center">
                  View all
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-transparent border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Itinerary</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm mr-3">
                            JD
                          </div>
                          <span className="font-semibold text-gray-800">James D.</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 font-medium w-32 inline-block">Southern Coast Escape</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium">
                        Oct 24, 2024
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Confirmed</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                    
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm mr-3">
                            MK
                          </div>
                          <span className="font-semibold text-gray-800">Maria K.</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 font-medium w-32 inline-block">Ella Highlands Retreat</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium">
                        Oct 22, 2024
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Pending</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-bold text-sm mr-3">
                            SC
                          </div>
                          <span className="font-semibold text-gray-800">Samuel C.</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 font-medium w-32 inline-block">Cultural Triangle Tour</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium">
                        Oct 21, 2024
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Confirmed</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
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
                  <h4 className="text-3xl font-extrabold text-gray-900">$12,450</h4>
                  <span className="text-green-600 text-sm font-semibold mb-1">+8.4%</span>
                </div>
                
                {/* Simple Bar Chart Visualization */}
                <div className="h-32 flex items-end justify-between gap-2">
                  <div className="w-full bg-orange-50 rounded-t-sm h-[30%] hover:bg-orange-100 transition-colors"></div>
                  <div className="w-full bg-orange-100 rounded-t-sm h-[40%] hover:bg-orange-200 transition-colors"></div>
                  <div className="w-full bg-orange-50 rounded-t-sm h-[25%] hover:bg-orange-100 transition-colors"></div>
                  <div className="w-full bg-orange-200 rounded-t-sm h-[55%] hover:bg-orange-300 transition-colors"></div>
                  <div className="w-full bg-orange-100 rounded-t-sm h-[35%] hover:bg-orange-200 transition-colors"></div>
                  <div className="w-full bg-[#D17E66] rounded-t-sm h-[70%] hover:bg-[#c26d55] transition-colors"></div>
                  <div className="w-full bg-[#A7412A] rounded-t-sm h-[85%] hover:bg-[#8e3723] transition-colors"></div>
                </div>
                <p className="text-gray-400 text-xs mt-4">Monthly performance analytics</p>
              </div>

              {/* Top Trend */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="h-36 bg-gray-900 relative">
                  <img src="/sigiriya-image.jpg" alt="Sigiriya" className="w-full h-full object-cover opacity-80" onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80"; // fallback
                  }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-[#A7412A] text-white text-xs font-bold px-2 py-1 rounded inline-block mb-1 shadow">TOP TREND</span>
                    <h3 className="text-white font-bold text-xl drop-shadow-md">Sigiriya Highlands</h3>
                  </div>
                </div>
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Bookings this week</p>
                    <h4 className="text-2xl font-bold text-gray-900">14</h4>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#A7412A] hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
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
