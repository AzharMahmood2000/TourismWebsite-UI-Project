import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import API_BASE_URL from '../api/api';

const ManageDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    region: '',
    location: '',
    mapUrl: '',
    description: '',
    image: null,
    singleVisit: {
      pricePerPerson: '',
      duration: '',
      bestTime: '',
      guidedExpedition: true,
      addOns: []
    }
  });

  const getAuthToken = () => {
    try {
      return JSON.parse(localStorage.getItem('userInfo'))?.token;
    } catch {
      return null;
    }
  };

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/destinations`);
      if (!res.ok) throw new Error('Failed to fetch destinations');
      const data = await res.json();
      setDestinations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);
  const getImageSrc = (img) => {
    if (!img || typeof img !== 'string') return '';
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    return `${API_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`;
  };

  const generateSlug = (text) => {
    return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    const finalVal = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: finalVal };
      if (name === 'title' && !editingId) {
        updated.slug = generateSlug(finalVal);
      }
      return updated;
    });
  };

  const handleSingleVisitChange = (e) => {
    const { name, type, value, checked } = e.target;
    let finalVal = type === 'checkbox' ? checked : value;
    if (name === 'guidedExpedition') finalVal = value === 'yes';

    setFormData(prev => ({
      ...prev,
      singleVisit: {
        ...prev.singleVisit,
        [name]: finalVal
      }
    }));
  };

  const handleAddOnAdd = () => {
    setFormData(prev => ({
      ...prev,
      singleVisit: {
        ...prev.singleVisit,
        addOns: [...prev.singleVisit.addOns, { name: '', price: '' }]
      }
    }));
  };

  const handleAddOnRemove = (idx) => {
    setFormData(prev => ({
      ...prev,
      singleVisit: {
        ...prev.singleVisit,
        addOns: prev.singleVisit.addOns.filter((_, i) => i !== idx)
      }
    }));
  };

  const handleAddOnChange = (idx, field, val) => {
    setFormData(prev => {
      const newAddOns = [...prev.singleVisit.addOns];
      newAddOns[idx][field] = val;
      return {
        ...prev,
        singleVisit: {
          ...prev.singleVisit,
          addOns: newAddOns
        }
      };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleEdit = (dest) => {
    setEditingId(dest._id);
    setFormData({
      title: dest.title || '',
      slug: dest.slug || '',
      category: dest.category || '',
      region: dest.region || '',
      location: dest.location || '',
      mapUrl: dest.mapUrl || '',
      description: dest.description || '',
      image: dest.image || null,
      singleVisit: {
        pricePerPerson: dest.singleVisit?.pricePerPerson || '',
        duration: dest.singleVisit?.duration || '',
        bestTime: dest.singleVisit?.bestTime || '',
        guidedExpedition: dest.singleVisit?.guidedExpedition ?? true,
        addOns: dest.singleVisit?.addOns || []
      }
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;
    const token = getAuthToken();
    if (!token) return alert('No auth token found, please login');

    try {
      const res = await fetch(`${API_BASE_URL}/api/destinations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete destination');
      fetchDestinations();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleTogglePopular = async (dest) => {
    const isCurrentlyPopular = dest.isPopular === true;

    if (!isCurrentlyPopular) {
      const popularCount = destinations.filter(d => d.isPopular === true).length;
      if (popularCount >= 5) {
        return alert("Only 5 popular destinations are allowed.");
      }
    }

    const token = getAuthToken();
    if (!token) return alert('No auth token found, please login');

    try {
      const res = await fetch(`${API_BASE_URL}/api/destinations/${dest._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isPopular: !isCurrentlyPopular })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update popular status');
      fetchDestinations();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) return alert('No auth token found, please login');

    try {
      setAdding(true);

      let finalImageUrl = typeof formData.image === 'string' ? formData.image : '';

      if (formData.image instanceof File) {
        const uploadForm = new FormData();
        uploadForm.append('image', formData.image);

        const upRes = await fetch(`${API_BASE_URL}/api/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: uploadForm
        });

        const upData = await upRes.json();
        if (!upRes.ok) throw new Error(upData.message || 'Image upload failed');
        finalImageUrl = upData.url || upData.imageUrl || upData.image;
      }

      const url = editingId ? `${API_BASE_URL}/api/destinations/${editingId}` : `${API_BASE_URL}/api/destinations`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          image: finalImageUrl
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save destination failed');

      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: '', slug: '', category: '', region: '', location: '', mapUrl: '', description: '', image: null });
      fetchDestinations();
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  const filteredDestinations = destinations.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (d.title?.toLowerCase().includes(q) || d.name?.toLowerCase().includes(q) || d.region?.toLowerCase().includes(q) || d.location?.toLowerCase().includes(q));
  });

  const totalPages = Math.max(1, Math.ceil(filteredDestinations.length / itemsPerPage));
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="destinations" />

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
             
             <button onClick={() => {
               setEditingId(null);
               setFormData({ title: '', slug: '', category: '', region: '', location: '', mapUrl: '', description: '', image: null });
               setIsModalOpen(true);
             }} className="flex items-center bg-white border border-gray-200 hover:border-gray-300 text-gray-800 px-5 py-2.5 rounded shadow-sm font-medium transition-all text-sm mt-4">
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
                <p className="text-3xl font-bold text-[#a14028]">{destinations.length}</p>
             </div>
             <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex-1">
                <p className="text-[10px] text-[#E0AB93] font-bold uppercase tracking-wider mb-2">POPULAR DESTINATIONS</p>
                <p className="text-3xl font-bold text-[#6D4C41]">{destinations.filter(d => d.isPopular === true).length} <span className="text-sm font-normal text-gray-400">/ 5</span></p>
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
                    <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} placeholder="Find by name or region..." className="w-full py-2 pl-10 pr-4 bg-white border-b-2 border-transparent focus:border-gray-200 outline-none transition-all placeholder-gray-300 text-sm" />
                  </div>
                  <button onClick={() => { setSearchQuery(""); setCurrentPage(1); }} className="p-2 border border-gray-200 rounded text-gray-400 hover:text-gray-600 transition-colors">
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
                         <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider">POPULAR</th>
                         <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wider text-right">ACTIONS</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr><td colSpan="5" className="text-center py-10">Loading destinations...</td></tr>
                      ) : error ? (
                        <tr><td colSpan="5" className="text-center py-10 text-red-500">{error}</td></tr>
                      ) : paginatedDestinations.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-10">No destinations found on this page.</td></tr>
                      ) : paginatedDestinations.map((dest, idx) => (
                        <tr key={dest._id || idx} className="hover:bg-gray-50 transition-colors group">
                           <td className="px-6 py-4">
                             <div className="flex items-center">
                               <img src={getImageSrc(dest.image)} alt={dest.title} className="w-14 h-12 rounded object-cover mr-4 shadow-sm" />
                               <div>
                                 <div className="font-extrabold text-gray-900 text-[15px]">{dest.title || dest.name || 'Untitled Destination'}</div>
                                 <div className="text-gray-500 text-[11px] mt-0.5">{dest.region || dest.location || 'Not specified'}</div>
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-4">
                             <span className="bg-[#E4E3DE]/60 text-gray-600 px-3 py-1 text-[11px] font-bold rounded-full border border-transparent">
                               {dest.region || dest.location || 'Not specified'}
                             </span>
                           </td>
                           <td className="px-6 py-4">
                             <div className="text-gray-500 text-sm font-medium">{dest.category}</div>
                           </td>
                           <td className="px-6 py-4">
                             <div className="flex items-center">
                               <button
                                 onClick={() => handleTogglePopular(dest)}
                                 className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent focus:outline-none transition-colors duration-200 ease-in-out ${dest.isPopular ? "bg-[#C84F39]" : "bg-gray-200"}`}
                                 role="switch"
                                 aria-checked={dest.isPopular}
                               >
                                 <span className="sr-only">Toggle Popular status</span>
                                 <span
                                   aria-hidden="true"
                                   className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${dest.isPopular ? "translate-x-4" : "translate-x-0"}`}
                                 />
                               </button>
                               <span className="ml-2 text-xs font-bold text-gray-600">{dest.isPopular ? 'ON' : 'OFF'}</span>
                             </div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end space-x-4">
                                <button onClick={() => handleEdit(dest)} className="text-gray-400 hover:text-gray-800 transition-colors" title="Edit destination">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button onClick={() => handleDelete(dest._id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete destination">
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
                 <span className="text-[11px] font-semibold text-gray-500">
                   Showing {filteredDestinations.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredDestinations.length)} of {filteredDestinations.length} destinations
                 </span>
                 {totalPages > 1 && (
                   <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button 
                          key={i} 
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-7 h-7 flex items-center justify-center border rounded font-bold text-xs transition-colors ${currentPage === i + 1 ? 'border-[#A7412A] text-white bg-[#A7412A]' : 'border-transparent text-gray-700 hover:bg-gray-50'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage >= totalPages}
                        className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden relative">
              <div className="sticky top-0 bg-white z-20 px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Destination' : 'Add New Destination'}</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition bg-gray-50 rounded-full p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              
              <div className="overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300">
              <form onSubmit={handleSubmit} className="space-y-5">
                <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Basic Destination Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Title</label>
                    <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none" />
                    <p className="text-[10px] text-gray-400 mt-1">Enter the destination name. Example: Sigiriya, Ella, Galle Fort</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Slug</label>
                    <input required name="slug" value={formData.slug} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none" />
                    <p className="text-[10px] text-gray-400 mt-1">Use lowercase words with hyphens. Example: sigiriya, ella-rock, galle-fort</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Region</label>
                    <input required name="region" value={formData.region} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none" />
                    <p className="text-[10px] text-gray-400 mt-1">Enter province, district, or area. Example: Central Province, Uva, Southern Province</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Category</label>
                    <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none bg-white">
                      <option value="" disabled>Select Category</option>
                      <option value="Educational">Educational</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Wildlife">Wildlife</option>
                      <option value="Golden Beaches">Golden Beaches</option>
                      <option value="Ancient Heritage">Ancient Heritage</option>
                    </select>
                    <p className="text-[10px] text-gray-400 mt-1">Select the destination type from the list.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Location</label>
                    <input required name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none" placeholder="Sigiriya, Matale, Sri Lanka" />
                    <p className="text-[10px] text-gray-400 mt-1">Enter the exact place, city, district, or Google Maps searchable location.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Google Map URL</label>
                    <input name="mapUrl" value={formData.mapUrl} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none" placeholder="Paste Google Maps link here" />
                    <p className="text-[10px] text-gray-400 mt-1">Optional. If empty, map will use Location text.</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Description</label>
                  <textarea required name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none" rows="3"></textarea>
                  <p className="text-[10px] text-gray-400 mt-1">Write a short description about this place.</p>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-4">Single Visit Details</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Price Per Person</label>
                      <input type="number" required name="pricePerPerson" value={formData.singleVisit.pricePerPerson} onChange={handleSingleVisitChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none" placeholder="25000" />
                      <p className="text-[10px] text-gray-400 mt-1">Enter single place visit price per person in LKR.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Duration</label>
                      <input required name="duration" value={formData.singleVisit.duration} onChange={handleSingleVisitChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none" placeholder="1 Day · Sunrise to Sunset" />
                      <p className="text-[10px] text-gray-400 mt-1">Enter visit duration.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Best Time</label>
                      <input required name="bestTime" value={formData.singleVisit.bestTime} onChange={handleSingleVisitChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none" placeholder="Year-round" />
                      <p className="text-[10px] text-gray-400 mt-1">Enter best travel time.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Guided Expedition Available</label>
                      <select required name="guidedExpedition" value={formData.singleVisit.guidedExpedition ? 'yes' : 'no'} onChange={handleSingleVisitChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-[#A7412A] focus:border-[#A7412A] outline-none bg-white">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Add-on Options</label>
                    <button type="button" onClick={handleAddOnAdd} className="text-xs font-bold text-[#A7412A] hover:underline">+ Add Row</button>
                  </div>
                  {formData.singleVisit.addOns.map((addon, idx) => (
                    <div key={idx} className="flex space-x-3 mb-3">
                      <input required placeholder="Add-on name (e.g. Expert Local Guide)" value={addon.name} onChange={(e) => handleAddOnChange(idx, 'name', e.target.value)} className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded focus:ring-[#A7412A] outline-none" />
                      <input required type="number" placeholder="Price (e.g. 4000)" value={addon.price} onChange={(e) => handleAddOnChange(idx, 'price', e.target.value)} className="w-32 px-4 py-2 text-sm border border-gray-300 rounded focus:ring-[#A7412A] outline-none" />
                      <button type="button" onClick={() => handleAddOnRemove(idx)} className="px-3 text-red-500 hover:text-red-700 font-bold text-xl">×</button>
                    </div>
                  ))}
                  {formData.singleVisit.addOns.length === 0 && <p className="text-[10px] text-gray-400">No add-ons yet.</p>}
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Upload Image (.jpg/png/webp) {editingId && <span className="text-gray-400 font-normal normal-case ml-1">(Leave blank to keep current)</span>}
                  </label>
                  <input required={!editingId} type="file" accept="image/*" onChange={handleFileChange} className="w-full px-3 py-2 border border-gray-300 rounded text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#F2F6F6] file:text-[#A7412A] hover:file:bg-[#EAEFEF]" />
                </div>
                
                <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-100 flex justify-end space-x-3 mt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors">Cancel</button>
                  <button type="submit" disabled={adding} className="px-5 py-2 text-sm font-medium text-white bg-[#A7412A] hover:bg-[#8e3723] rounded transition-colors disabled:opacity-50">
                    {adding ? 'Saving...' : 'Save Destination'}
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageDestination;
