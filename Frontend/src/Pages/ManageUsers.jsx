import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';
import API_BASE_URL from '../api/api';
import AlertMessage from '../Components/AlertMessage';
import EmptyState from '../Components/EmptyState';
import LoadingState from '../Components/LoadingState';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchUsers = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;
      if (!token) throw new Error("No token found");

      const res = await fetch(`${API_BASE_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error("Failed to load customers.");
      
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;
        if (!token) throw new Error("No token found");

        if (userInfo._id === id) {
           setActionMessage({ type: 'error', title: 'Action Denied', text: 'You cannot delete your own admin account.' });
           return;
        }

        const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!res.ok) {
           throw new Error("Failed to delete user");
        }
        
        fetchUsers();
        setActionMessage({ type: 'success', title: 'User Deleted', text: 'User has been permanently removed.' });
      } catch (err) {
        setActionMessage({ type: 'error', title: 'Deletion Failed', text: err.message });
      }
    }
  };
  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="users" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {/* Top Header */}
        <AdminTopbar showSearch={true} searchPlaceholder="Search users..." />

        {/* Page Content */}
        <div className="px-10 py-8 bg-[#FAFAFA] min-h-[calc(100vh-80px)]">
           {actionMessage && (
             <div className="mb-6"><AlertMessage type={actionMessage.type} title={actionMessage.title} message={actionMessage.text} onClose={() => setActionMessage(null)} /></div>
           )}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
             <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Manage Users</h2>
                <p className="text-gray-500 mt-2 text-[15px]">View and manage registered platform users</p>
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
                         <th className="px-6 py-4 text-sm font-bold text-gray-700">Joined Date</th>
                         <th className="px-6 py-4 text-sm font-bold text-gray-700">Status</th>
                         <th className="px-6 py-4 text-sm font-bold text-gray-700 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="p-0"><LoadingState message="Loading customers..." /></td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan="6" className="p-4"><AlertMessage type="error" title="Failed to load users" message={error} onClose={() => setError(null)} actionText="Try Again" onAction={fetchUsers} /></td>
                        </tr>
                      ) : users.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-6"><EmptyState title="No customers found" message="No user accounts are registered yet." /></td>
                        </tr>
                      ) : (
                        users.map((user) => {
                          const safeName = user.name || "Unnamed User";
                          const safeEmail = user.email || "No email";
                          const safePhone = user.phone || "Not provided";
                          const safeRole = user.role || "user";
                          const displayRole = safeRole.charAt(0).toUpperCase() + safeRole.slice(1);
                          const safeJoinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Unknown";
                          const safeStatus = "Active"; // Fallback as requested
                          const safeAvatar = user.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80";

                          return (
                            <tr key={user._id || user.email} className="hover:bg-gray-50 transition-colors">
                               <td className="px-6 py-4">
                                 <div className="flex items-center">
                                   <img src={safeAvatar} alt={safeName} className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200" />
                                   <span className="font-bold text-gray-900 text-sm whitespace-nowrap">{safeName}</span>
                                 </div>
                               </td>
                               <td className="px-6 py-4">
                                 <div className="text-gray-600 text-sm">{safeEmail}</div>
                               </td>
                               <td className="px-6 py-4">
                                 <div className="text-gray-600 text-sm whitespace-nowrap">{safePhone}</div>
                               </td>
                               <td className="px-6 py-4">
                                 <div className="text-gray-600 text-sm whitespace-nowrap">{safeJoinDate}</div>
                               </td>
                               <td className="px-6 py-4">
                                 <span className={`px-3 py-1 text-xs font-bold rounded-full border whitespace-nowrap ${
                                   safeStatus === 'Active' 
                                   ? 'bg-green-50 text-green-700 border-green-200' 
                                   : 'bg-red-50 text-red-700 border-red-200'
                                 }`}>
                                   {safeStatus}
                                 </span>
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end space-x-3">
                                    <button onClick={() => { setSelectedUser(user); setIsModalOpen(true); }} className="text-gray-400 hover:text-blue-600 transition-colors" title="View">
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    </button>
                                    <button onClick={() => handleDelete(user._id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                               </td>
                            </tr>
                          );
                        })
                      )}
                   </tbody>
                </table>
              </div>
           </div>
        </div>
      </main>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">User Details</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img src={selectedUser.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"} alt={selectedUser.name || "User avatar"} className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{selectedUser.name || "Unnamed User"}</h4>
                  <p className="text-sm text-gray-500">{selectedUser.email || "No email"}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 bg-gray-50 rounded-lg p-5 border border-gray-100">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-sm text-gray-800 font-medium">{selectedUser.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Joined Date</p>
                  <p className="text-sm text-gray-800 font-medium">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Unknown"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-green-50 text-green-700 border border-green-200 inline-block">Active</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Role</p>
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border inline-block ${
                    selectedUser.role === 'admin' 
                    ? 'bg-orange-50 text-[#A7412A] border-orange-200' 
                    : 'bg-teal-50 text-teal-700 border-teal-200'
                  }`}>
                    {selectedUser.role ? selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1) : "Not provided"}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Bookings</p>
                  <p className="text-sm text-gray-800 font-medium">Not provided</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Recent Bookings</p>
                  <p className="text-sm text-gray-800 font-medium">Not provided</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageUsers;
