import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';

const reviewsData = [
  {
    initials: "ED",
    name: "Elena Dubois",
    location: "Paris,\nFrance",
    rating: 5,
    title: "Unforgettable Sunset at Sigiriya",
    content: `"The attention to detail was immaculate. From the cold towels`,
    journey: "Sigiriya\nCultural Trip",
    date: "Oct 24,\n2023"
  },
  {
    initials: "MK",
    name: "Marcus Kael",
    location: "Berlin,\nGermany",
    rating: 4,
    title: "The Train Journey was Magic",
    content: `"The tea estates of Ella are even more beautiful than the photos....`,
    journey: "Ella Highland\nTrail",
    date: "Oct 21,\n2023"
  },
  {
    initials: "SA",
    name: "Sarah Ahmed",
    location: "Dubai, UAE",
    rating: 5,
    title: "Peaceful Beach Escape",
    content: `"Mirissa was the perfect end to our honeymoon. The beach villa...`,
    journey: "Mirissa\nSerenity Stay",
    date: "Oct 18,\n2023"
  }
];

const renderStars = (rating) => {
  return (
    <div className="flex text-[#A7412A]">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-3.5 h-3.5 ${star <= rating ? 'fill-current' : 'text-gray-300 stroke-current fill-transparent'}`} viewBox="0 0 20 20">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={star <= rating ? "0" : "1"} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ManageReview = () => {
  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="reviews" />

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
            <input type="text" placeholder="Global search..." className="w-full py-2.5 pl-10 pr-4 bg-[#F9FAFB] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition-all" />
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

            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Admin avatar" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
          </div>
        </header>

        {/* Path/Title */}
        <div className="px-10 py-8 bg-[#FAFAFA] min-h-[calc(100vh-80px)]">
           <div className="flex justify-between items-start mb-8">
             <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Manage Reviews</h2>
                <p className="text-gray-500 mt-2 text-[15px] max-w-2xl">Monitor and curate guest experiences across all destinations. Your response maintains the premium Gamanaya standard.</p>
             </div>
             <div className="flex space-x-3">
               <button className="flex items-center border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm bg-white">
                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                 </svg>
                 Advanced Filters
               </button>
               <button className="flex items-center border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm bg-white">
                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                 </svg>
                 Export CSV
               </button>
             </div>
           </div>
           
           {/* Filters Bar */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
             {/* Filter 1 */}
             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-2">Filter By Rating</p>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  {renderStars(4)}
                  <span className="ml-2">& Up</span>
                </div>
             </div>
             {/* Filter 2 */}
             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center relative">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-2">Destination Journey</p>
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 cursor-pointer">
                  <span>All Locations</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
             </div>
             {/* Filter 3 */}
             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-2">Review Status</p>
                <div className="flex items-center space-x-2 text-[10px] font-bold tracking-wider">
                   <span className="bg-[#A7412A] text-white px-2 py-0.5 rounded shadow-sm">PUBLISHED</span>
                   <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded shadow-sm">PENDING</span>
                </div>
             </div>
             {/* Filter 4 */}
             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-2">Quick Stats</p>
                <p className="text-sm font-medium text-gray-700"><strong className="text-[#A7412A] font-bold text-lg mr-1">4.8</strong> Global Average</p>
             </div>
           </div>

           {/* Table */}
           <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-[#FAFAFA] border-b border-gray-200">
                      <tr>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Reviewer</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700 w-1/3">Rating & Title</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Journey</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700">Date</th>
                         <th className="px-6 py-4 text-xs font-bold text-gray-700 text-center">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                      {reviewsData.map((rev, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-5">
                             <div className="flex">
                               <div className="w-10 h-10 bg-[#FAD8C3] text-[#A7412A] rounded-full flex items-center justify-center font-bold mr-3 shrink-0">{rev.initials}</div>
                               <div>
                                 <h3 className="font-bold text-sm text-gray-900">{rev.name}</h3>
                                 <p className="text-xs text-gray-500 whitespace-pre-line leading-tight mt-0.5">{rev.location}</p>
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-5">
                             <div className="mb-2">{renderStars(rev.rating)}</div>
                             <h4 className="font-bold text-gray-900 text-sm">{rev.title}</h4>
                             <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{rev.content}</p>
                           </td>
                           <td className="px-6 py-5">
                             <div className="bg-[#EAEFEF] text-gray-600 px-3 py-2 rounded flex items-center w-fit text-xs font-medium border border-gray-200/50">
                               <svg className="w-3.5 h-3.5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                               </svg>
                               <span className="whitespace-pre-line leading-snug">{rev.journey}</span>
                             </div>
                           </td>
                           <td className="px-6 py-5">
                             <div className="text-gray-600 text-sm whitespace-pre-line leading-snug">{rev.date}</div>
                           </td>
                           <td className="px-6 py-5 text-center">
                              {/* Left empty as per the design */}
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-[#FAFAFA]">
                 <span className="text-xs font-medium text-gray-500">Showing 1 to 3 of 148 reviews</span>
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
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 pb-10">
              
              {/* Chart Card */}
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-50/50 to-transparent rounded-full -mr-10 -mt-10 blur-xl pointer-events-none"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-8 relative z-10">Sentiment Overview</h3>
                <div className="flex items-end justify-between h-40 mt-10 relative z-10 w-full px-4 mb-4">
                   <div className="flex-1 flex flex-col items-center">
                     <div className="w-[85%] bg-[#F2E5DE] rounded-t-sm transition-all" style={{height: '80%'}}></div>
                     <span className="text-xs text-gray-500 mt-4 font-medium uppercase">MON</span>
                   </div>
                   <div className="flex-1 flex flex-col items-center">
                     <div className="w-[85%] bg-[#F2E5DE] rounded-t-sm transition-all" style={{height: '75%'}}></div>
                     <span className="text-xs text-gray-500 mt-4 font-medium uppercase">TUE</span>
                   </div>
                   <div className="flex-1 flex flex-col items-center">
                     <div className="w-[85%] bg-[#F2E5DE] rounded-t-sm transition-all" style={{height: '60%'}}></div>
                     <span className="text-xs text-gray-500 mt-4 font-medium uppercase">WED</span>
                   </div>
                   <div className="flex-1 flex flex-col items-center">
                     <div className="w-[85%] bg-[#F2E5DE] rounded-t-sm transition-all" style={{height: '95%'}}></div>
                     <span className="text-xs text-gray-500 mt-4 font-medium uppercase">THU</span>
                   </div>
                   <div className="flex-1 flex flex-col items-center">
                     <div className="w-[85%] bg-[#F2E5DE] rounded-t-sm transition-all" style={{height: '70%'}}></div>
                     <span className="text-xs text-gray-500 mt-4 font-medium uppercase">FRI</span>
                   </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-[#A7412A] p-8 rounded-2xl text-white shadow-sm flex flex-col">
                 <h3 className="text-xl font-bold mb-3">Review Summary</h3>
                 <p className="text-[13px] opacity-90 leading-relaxed mb-8">
                   AI-generated insights based on recent 5-star feedback across Sri Lanka.
                 </p>
                 <ul className="space-y-5 mb-10 text-[14px]">
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-white/90 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     Excellent Guide Punctuality
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-white/90 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     High praise for curated menus
                   </li>
                   <li className="flex items-start text-white opacity-95">
                     <svg className="w-5 h-5 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                     Ella traffic concerns noted
                   </li>
                 </ul>
                 <div className="mt-auto">
                   <button className="w-full border border-white/40 rounded-lg py-3 hover:bg-white/10 transition-colors font-medium text-sm">
                     View Full Report
                   </button>
                 </div>
              </div>

           </div>

        </div>
      </main>
    </div>
  );
};

export default ManageReview;
