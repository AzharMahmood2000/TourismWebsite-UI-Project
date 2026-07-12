import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';
import AlertMessage from '../Components/AlertMessage';
import EmptyState from '../Components/EmptyState';
import LoadingState from '../Components/LoadingState';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const res = await fetch("http://localhost:5000/api/contact", {
        headers: { Authorization: `Bearer ${userInfo?.token}` }
      });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const res = await fetch(`http://localhost:5000/api/contact/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${userInfo?.token}` }
      });
      if (res.ok) fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userInfo?.token}` }
      });
      if (res.ok) fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const totalMessages = messages.length;
  const unreadMessages = messages.filter(m => !m.isRead && m.status === 'New').length;
  const readMessages = messages.filter(m => m.isRead || m.status !== 'New').length;

  const filteredMessages = messages.filter(m => 
    (m.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.subject || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const messagesPerPage = 5;
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * messagesPerPage;
  const currentMessages = filteredMessages.slice(startIndex, startIndex + messagesPerPage);

  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="messages" />

      {/* View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 relative">
            <button 
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedMessage.subject || "No Subject"}</h3>
            <div className="text-sm text-gray-500 mb-6">
              <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
              {selectedMessage.phone && <p><strong>Phone:</strong> {selectedMessage.phone}</p>}
              {selectedMessage.preferredTravelCategory && (
                <p><strong>Preferred Travel Category:</strong> <span className="text-[#A7412A] font-semibold">{selectedMessage.preferredTravelCategory}</span></p>
              )}
              <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-gray-800 text-sm border border-gray-100">
              {selectedMessage.message}
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Top Header */}
        <AdminTopbar 
          showSearch={true}
          searchPlaceholder="Search messages..."
          searchQuery={searchQuery}
          onSearch={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

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
                  <span className="text-3xl font-extrabold text-gray-900 mr-2">{totalMessages}</span>
                </div>
             </div>
             {/* Stat 2 */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Unread</p>
                <div className="flex items-end">
                  <span className="text-3xl font-extrabold text-[#A7412A] mr-2">{unreadMessages}</span>
                </div>
             </div>
             {/* Stat 3 */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Read</p>
                <div className="flex items-end">
                  <span className="text-3xl font-extrabold text-gray-900 mr-2">{readMessages}</span>
                </div>
             </div>
             {/* Stat 4 */}
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">Replied Rate</p>
                <div className="flex items-center mt-1">
                  <span className="text-3xl font-extrabold text-gray-900 mr-2">
                    {totalMessages > 0 ? Math.round((readMessages / totalMessages) * 100) : 0}%
                  </span>
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
                      {loading ? (
                        <tr><td colSpan="5" className="p-0"><LoadingState message="Loading messages..." /></td></tr>
                      ) : error ? (
                        <tr><td colSpan="5" className="p-4"><AlertMessage type="error" title="Failed to load messages" message={error} onClose={() => setError("")} actionText="Try Again" onAction={fetchMessages} /></td></tr>
                      ) : filteredMessages.length === 0 ? (
                        <tr><td colSpan="5" className="p-6"><EmptyState title="No messages found" message="You have no messages matching your criteria." /></td></tr>
                      ) : (
                        currentMessages.map((msg) => (
                          <tr key={msg._id} className="hover:bg-gray-50 transition-colors">
                             <td className="px-6 py-6">
                               <div className="flex items-center">
                                 <div className="w-10 h-10 bg-[#FAD8C3] text-[#A7412A] rounded-full flex items-center justify-center font-bold mr-3 shrink-0">
                                   {msg.name ? msg.name.substring(0, 2).toUpperCase() : "?"}
                                 </div>
                                 <div className="min-w-0">
                                   <h3 className="font-bold text-[14px] text-gray-900 truncate">{msg.name}</h3>
                                   <p className="text-[12px] text-gray-500 truncate mt-0.5">{msg.email}</p>
                                 </div>
                               </div>
                             </td>
                             <td className="px-6 py-6">
                               <div>
                                 <h4 className="font-bold text-gray-900 text-[14px]">{msg.subject || "No Subject"}</h4>
                                 <p className="text-[13px] text-gray-500 mt-1 truncate max-w-xs">{msg.message}</p>
                               </div>
                             </td>
                             <td className="px-6 py-6">
                               <span className={`px-2.5 py-1 text-[11px] font-extrabold rounded-full tracking-wide ${
                                 !msg.isRead && msg.status === 'New'
                                 ? 'bg-orange-100 text-[#A7412A]' 
                                 : 'bg-gray-200 text-gray-700'
                               }`}>
                                 {msg.isRead ? "READ" : msg.status.toUpperCase()}
                               </span>
                             </td>
                             <td className="px-6 py-6">
                               <div className="text-gray-900 font-bold text-[13px] whitespace-pre-line leading-snug">
                                 {new Date(msg.createdAt).toLocaleDateString()}<br/>
                                 <span className="text-xs text-gray-500 font-normal">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                               </div>
                             </td>
                             <td className="px-6 py-6 text-right">
                                <div className="flex items-center justify-end space-x-4">
                                  <button onClick={() => setSelectedMessage(msg)} title="View Message" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  </button>
                                  {(!msg.isRead && msg.status === 'New') && (
                                    <button onClick={() => handleMarkAsRead(msg._id)} title="Mark as Read" className="text-gray-600 hover:text-green-600 transition-colors">
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </button>
                                  )}
                                  <button onClick={() => handleDelete(msg._id)} title="Delete Message" className="text-gray-600 hover:text-red-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                             </td>
                          </tr>
                        ))
                      )}
                   </tbody>
                </table>
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-[#FAFAFA]">
                   <span className="text-xs font-bold text-gray-500">
                     Showing {startIndex + 1} to {Math.min(startIndex + messagesPerPage, filteredMessages.length)} of {filteredMessages.length} messages
                   </span>
                   <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4" transform="rotate(180)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      <span className="text-sm font-bold text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                   </div>
                </div>
              )}
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
