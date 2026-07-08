import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';

const packagesData = [
  {
    image: "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=200&q=80",
    title: "Misty Ella Retreat",
    subtitle: "Luxury Boutique Stay",
    id: "#PK-2024-001",
    category: "Adventure",
    status: "Hot Deal",
    duration: "5 Days,\n4 Nights",
    price: "$1,450"
  },
  {
    image: "https://images.unsplash.com/photo-1590454353457-3721381c810d?auto=format&fit=crop&w=200&q=80",
    title: "Mirissa Coastal Escape",
    subtitle: "Beachfront Relaxation",
    id: "#PK-2024-002",
    category: "Leisure",
    status: "Standard",
    duration: "7 Days,\n6 Nights",
    price: "$2,100"
  },
  {
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=200&q=80",
    title: "Cultural Triangle Discovery",
    subtitle: "Heritage & History",
    id: "#PK-2024-003",
    category: "Cultural",
    status: "Hot Deal",
    duration: "4 Days,\n3 Nights",
    price: "$980"
  },
  {
    image: "https://images.unsplash.com/photo-1563821033282-3e2b260e0d52?auto=format&fit=crop&w=200&q=80",
    title: "Nuwara Eliya Tea Trails",
    subtitle: "Highland Experience",
    id: "#PK-2024-004",
    category: "Wellness",
    status: "Standard",
    duration: "3 Days,\n2 Nights",
    price: "$750"
  }
];

const ManageTourPackage = () => {
  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="packages" />

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
            <input type="text" placeholder="Search packages, IDs..." className="w-full py-2.5 pl-10 pr-4 bg-[#F9FAFB] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition-all" />
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
        <div className="px-10 py-8 bg-[#FAFAFA] min-h-[calc(100vh-80px)]">
           <div className="flex justify-between items-start mb-8">
             <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Manage Tour Packages</h2>
                <p className="text-gray-500 mt-2 text-[15px]">Update and monitor your Sri Lankan boutique travel inventory.</p>
             </div>
             <button className="flex items-center bg-[#A7412A] hover:bg-[#8e3723] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow">
               <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
               </svg>
               Add Package
             </button>
           </div>
           
           {/* Stat Cards */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Total Packages</p>
                <p className="text-3xl font-bold text-gray-900">124</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Active Deals</p>
                <p className="text-3xl font-bold text-[#A7412A]">18</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">$1.2M</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Avg Rating</p>
                <div className="flex items-center">
                   <p className="text-3xl font-bold text-gray-900 mr-2">4.9</p>
                   <svg className="w-5 h-5 text-[#A7412A]" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
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
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Image</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Package Title</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Package ID</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Category</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Status</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Duration</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Price</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                      {packagesData.map((pkg, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-5">
                             <img src={pkg.image} alt={pkg.title} className="w-14 h-10 object-cover rounded shadow-sm" />
                           </td>
                           <td className="px-6 py-5">
                             <div className="font-bold text-gray-900 text-sm">{pkg.title}</div>
                             <div className="text-gray-500 text-xs mt-0.5">{pkg.subtitle}</div>
                           </td>
                           <td className="px-6 py-5">
                             <div className="bg-[#EAEFEF]/60 text-gray-700 text-xs font-medium px-2 py-1.5 rounded w-16 text-center leading-snug">
                               {pkg.id.split('-').map((part, i, arr) => (
                                 <span key={i}>{part}{i !== arr.length - 1 && '-'}<br/></span>
                               ))}
                             </div>
                           </td>
                           <td className="px-6 py-5">
                             <span className="text-gray-700 text-sm font-medium">{pkg.category}</span>
                           </td>
                           <td className="px-6 py-5">
                             <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                               pkg.status === 'Hot Deal' 
                               ? 'bg-orange-100 text-[#A7412A]' 
                               : 'bg-gray-200 text-gray-600'
                             }`}>
                               {pkg.status}
                             </span>
                           </td>
                           <td className="px-6 py-5">
                             <div className="text-gray-600 text-sm whitespace-pre-line">{pkg.duration}</div>
                           </td>
                           <td className="px-6 py-5">
                             <div className="font-bold text-gray-900">{pkg.price}</div>
                           </td>
                           <td className="px-6 py-5 text-right flex items-center justify-end h-full gap-3 mt-2">
                              <button className="text-gray-500 hover:text-[#A7412A] transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button className="text-gray-500 hover:text-red-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-[#FAFAFA]">
                 <span className="text-xs font-medium text-gray-500">Showing 1 to 4 of 124 packages</span>
                 <div className="flex items-center space-x-1.5">
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-[#A7412A] rounded text-white bg-[#A7412A] font-medium text-sm shadow-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium text-sm">2</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium text-sm">3</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                 </div>
              </div>
           </div>

           {/* Bottom Details */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-10">
              <div className="flex">
                 <div className="w-1 bg-[#A7412A] rounded-full mr-4"></div>
                 <div>
                   <h4 className="text-lg font-bold text-gray-900 mb-2">Inventory Health</h4>
                   <p className="text-gray-600 text-[14px] leading-relaxed pr-4">
                     All packages are currently up-to-date with 2024 seasonal pricing. 12 packages are nearing their expiration date and may require content refreshes or price adjustments for the upcoming winter peak season.
                   </p>
                 </div>
              </div>
              <div className="flex">
                 <div className="w-1 bg-[#A7412A] rounded-full mr-4"></div>
                 <div>
                   <h4 className="text-lg font-bold text-gray-900 mb-2">Category Performance</h4>
                   <p className="text-gray-600 text-[14px] leading-relaxed pr-4">
                     'Adventure' and 'Wellness' categories are seeing a 24% increase in interest this month. Consider adding more boutique stays in the Ella and Nuwara Eliya regions to meet the surging demand.
                   </p>
                 </div>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
};

export default ManageTourPackage;
