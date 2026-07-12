import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';
import API_BASE_URL from '../api/api';
import AlertMessage from '../Components/AlertMessage';
import EmptyState from '../Components/EmptyState';
import LoadingState from '../Components/LoadingState';

const ManageBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) throw new Error("No admin token found.");
      
      const res = await fetch(`${API_BASE_URL}/api/bookings/admin/all`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error("Failed to load bookings");
      
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchBookings();
        setActionMessage({ type: 'success', title: 'Status Updated', text: 'Booking status was successfully updated.' });
      } else {
        setActionMessage({ type: 'error', title: 'Update Failed', text: 'Failed to update booking status.' });
      }
    } catch (err) {
      setActionMessage({ type: 'error', title: 'Update Error', text: 'An error occurred while updating the status.' });
    }
  };

  const handleDelete = async (id) => {
     if (!window.confirm("Are you sure you want to delete this booking?")) return;
     try {
       const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
       const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
         method: "DELETE",
         headers: { "Authorization": `Bearer ${token}` }
       });
       if (res.ok) {
         fetchBookings();
         setActionMessage({ type: 'success', title: 'Booking Deleted', text: 'The booking was permanently removed.' });
       } else {
         setActionMessage({ type: 'error', title: 'Deletion Failed', text: 'Failed to delete booking.' });
       }
     } catch (err) {
       setActionMessage({ type: 'error', title: 'Deletion Error', text: 'An error occurred while deleting the booking.' });
     }
  };

  const exportToCSV = () => {
    if (bookings.length === 0) {
      setActionMessage({ type: 'warning', title: 'Export Empty', text: 'No bookings available to export.' });
      return;
    }

    const headers = [
      "Booking ID", "Customer Name", "Phone", "Booking Type", "Destination / Package",
      "Travel Date", "Travelers", "Status", "Total Amount", "Created Date", "Admin Message"
    ];

    const generatePlaceName = (bk) => {
        const rawDest = bk.destination;
        let title = bk.destination?.title || bk.destination?.name ||
                  bk.destinationId?.title || bk.destinationId?.name ||
                  bk.destinationTitle || bk.package?.title || bk.packageId?.title;
        if (!title && typeof rawDest === 'string') {
            const isObjectId = /^[0-9a-fA-F]{24}$/.test(rawDest);
            if (!isObjectId) title = rawDest;
        }
        return title || "Destination details unavailable";
    };

    const escapeCSV = (val) => {
       if (val === null || val === undefined) return `""`;
       const str = String(val).replace(/"/g, '""');
       return `"${str}"`;
    };

    const rows = bookings.map(bk => {
      const customerName = bk.fullName || bk.user?.name || "Unknown";
      const phone = bk.phone || bk.user?.phone || "Not provided";
      const bookingType = bk.bookingMode || bk.bookingType || "single";
      const place = generatePlaceName(bk);
      const travelDateRaw = bk.travelDate ? new Date(bk.travelDate).toLocaleDateString() : 'TBD';
      const createdDateRaw = bk.createdAt ? new Date(bk.createdAt).toLocaleDateString() : 'TBD';
      const travelers = bk.travelers || 1;
      const status = (bk.status || "pending");
      const totalAmount = bk.totalAmount || bk.estimatedTotal || 0;
      const adminMessage = bk.adminMessage || "";
      
      return [
        bk._id,
        customerName,
        phone,
        bookingType,
        place,
        travelDateRaw,
        travelers,
        status,
        totalAmount,
        createdDateRaw,
        adminMessage
      ].map(escapeCSV).join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.map(escapeCSV).join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const yyyy = new Date().getFullYear();
    const mm = String(new Date().getMonth() + 1).padStart(2, '0');
    const dd = String(new Date().getDate()).padStart(2, '0');
    link.setAttribute("download", `bookings-report-${yyyy}-${mm}-${dd}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const totalBookings = bookings.length;
  const pending = bookings.filter(b => (b.status || "").toLowerCase() === "pending").length;
  const confirmed = bookings.filter(b => (b.status || "").toLowerCase() === "confirmed").length;
  const cancelled = bookings.filter(b => (b.status || "").toLowerCase() === "cancelled").length;
  const revenue = bookings
    .filter(b => ["confirmed", "completed"].includes((b.status || "").toLowerCase()))
    .reduce((sum, b) => sum + (b.totalAmount || b.estimatedTotal || 0), 0);

  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="bookings" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Top Header */}
        <AdminTopbar showSearch={true} searchPlaceholder="Search bookings by ID or name..." />

        {/* Page Content */}
        <div className="px-10 py-8 bg-[#FAFAFA] min-h-[calc(100vh-80px)]">
           {actionMessage && (
             <div className="mb-6"><AlertMessage type={actionMessage.type} title={actionMessage.title} message={actionMessage.text} onClose={() => setActionMessage(null)} /></div>
           )}
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
               <button onClick={fetchBookings} className="flex items-center bg-white border border-gray-200 hover:border-gray-300 text-gray-800 px-4 py-2 rounded shadow-sm font-medium transition-all text-sm">
                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                 </svg>
                 Refresh
               </button>
               <button onClick={exportToCSV} className="flex items-center bg-white border border-gray-200 hover:border-gray-300 text-gray-800 px-4 py-2 rounded shadow-sm font-medium transition-all text-sm">
                 <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                 </svg>
                 Export CSV
               </button>
             </div>
           </div>
           
           {/* Stat Cards */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">TOTAL BOOKINGS</p>
                <p className="text-[32px] font-bold text-gray-900 leading-none mb-2">{totalBookings}</p>
                <p className="text-xs font-semibold text-gray-400">All time</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">PENDING CONFIRMATION</p>
                <p className="text-[32px] font-bold text-[#b55845] leading-none mb-2">{pending}</p>
                <p className="text-xs font-medium text-[#E0AB93]">Action required</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">CONFIRMED</p>
                <p className="text-[32px] font-bold text-gray-900 leading-none mb-2">{confirmed}</p>
                <p className="text-xs font-medium text-gray-500">Scheduled travels</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">REVENUE</p>
                <p className="text-[32px] font-bold text-gray-900 leading-none mb-2">${(revenue || 0).toLocaleString()}</p>
                <p className="text-xs font-semibold text-green-600">Total Confirmed</p>
             </div>
           </div>

           {/* Table Component */}
           <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-8">
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

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-white border-b border-gray-200">
                      <tr>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">CUSTOMER</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">DESTINATION</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">TRAVEL DATE</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">STATUS</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">TOTAL PRICE</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">ACTIONS</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr><td colSpan="6" className="p-0"><LoadingState message="Loading bookings..." /></td></tr>
                      ) : error ? (
                        <tr><td colSpan="6" className="p-4">
                          <AlertMessage type="error" title="Failed to load bookings" message={error} onClose={() => setError("")} actionText="Try Again" onAction={fetchBookings} />
                        </td></tr>
                      ) : bookings.length === 0 ? (
                        <tr><td colSpan="6" className="p-6">
                          <EmptyState title="No bookings found" message="New bookings will appear here once users submit them." />
                        </td></tr>
                      ) : bookings.map((booking) => {
                         const customerName = booking.fullName || booking.user?.name || "Unknown";
                         const phone = booking.phone || booking.user?.phone || "Not provided";
                         const bookingType = booking.bookingMode || booking.bookingType || "single";
                         const rawDest = booking.destination;
                         let destinationName = booking.destination?.title || booking.destination?.name ||
                                               booking.destinationId?.title || booking.destinationId?.name ||
                                               booking.destinationTitle || booking.package?.title || booking.packageId?.title;
                         if (!destinationName && typeof rawDest === 'string') {
                             const isObjectId = /^[0-9a-fA-F]{24}$/.test(rawDest);
                             if (!isObjectId) destinationName = rawDest;
                         }
                         const placeName = destinationName || "Destination details unavailable";
                         const totalAmount = booking.totalAmount || booking.estimatedTotal || 0;
                         const status = (booking.status || "pending").toUpperCase();
                         const initials = customerName.substring(0, 2).toUpperCase();
                         const travelDateRaw = booking.travelDate ? new Date(booking.travelDate) : null;
                         const travelDateStr = travelDateRaw ? travelDateRaw.toLocaleDateString() : 'TBD';
                         
                         return (
                           <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded shadow-sm flex items-center justify-center font-bold text-gray-700 mr-4 bg-[#E3D1C7]">
                                  {initials}
                                </div>
                                <div>
                                  <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{customerName}</div>
                                  <div className="text-gray-500 text-[11px] mt-0.5">{phone}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 min-w-[180px]">
                              <div className="font-bold text-gray-900 text-sm max-w-[200px] truncate">{placeName}</div>
                              <div className="text-gray-500 text-[12px] italic mt-0.5 capitalize">{bookingType}</div>
                            </td>
                            <td className="px-6 py-4 min-w-[160px]">
                              <div className="text-gray-900 font-semibold text-sm">{travelDateStr}</div>
                              <div className="text-gray-500 text-[11px] mt-0.5">{booking.travelers} Travelers</div>
                            </td>
                            <td className="px-6 py-4 text-center text-[10px]">
                               <select 
                                 value={(booking.status || "pending").toLowerCase()} 
                                 onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                 className={`px-3 py-1.5 font-bold rounded-full border tracking-wide cursor-pointer appearance-none text-center outline-none ${
                                  status === 'CONFIRMED' 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : status === 'PENDING'
                                  ? 'bg-orange-50 text-orange-600 border-orange-200'
                                  : 'bg-red-50 text-red-600 border-red-200'
                                 }`}>
                                 <option value="pending">Pending</option>
                                 <option value="confirmed">Confirmed</option>
                                 <option value="completed">Completed</option>
                                 <option value="cancelled">Cancelled</option>
                               </select>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-900 font-bold text-sm whitespace-nowrap">LKR {totalAmount.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <button onClick={() => handleDelete(booking._id)} className="text-red-400 hover:text-red-600 transition-colors" title="Delete Booking">
                                 <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                 </svg>
                               </button>
                            </td>
                         </tr>
                         );
                      })}
                   </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-[#FAFAFA]">
                 <span className="text-[11px] font-medium text-gray-500">Showing {bookings.length} bookings</span>
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
                  {bookings.slice(0,3).map(b => (
                    <div key={b._id} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mr-4 border border-blue-100">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Booking {b.status}</p>
                        <p className="text-[11px] text-gray-500 mt-1">#{b._id.slice(-6)} - {new Date(b.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
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
