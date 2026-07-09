import React, { useState, useEffect } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';
import API_BASE_URL from '../api/api';

const normalizeCategory = (value) => {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const ManageTourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const initialFormState = {
    title: "", slug: "", category: "", shortDescription: "", description: "", coverImage: "", 
    galleryImages: "", duration: "", pricePerPerson: "", location: "Sri Lanka", 
    minTravelers: 1, maxTravelers: 10, availableFrom: "", availableTo: "", 
    pickupLocation: "", meetingPoint: "", destinations: "", highlights: "",
    inclusions: "", exclusions: "", isActive: true, isFeatured: false,
    itinerary: []
  };
  const [formData, setFormData] = useState(initialFormState);

  const getToken = () => {
    try {
      return JSON.parse(localStorage.getItem('userInfo'))?.token;
    } catch { return null; }
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/api/packages/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to load packages");
      const data = await res.json();
      setPackages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const token = getToken();
      const uploadData = new FormData();
      uploadData.append('image', file);
      
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      
      const imgPath = data.imageUrl || data.url || data.filePath || data.image;
      
      if (fieldName === 'coverImage') {
         setFormData(prev => ({ ...prev, coverImage: imgPath }));
      } else {
         setFormData(prev => ({ 
           ...prev, 
           galleryImages: prev.galleryImages ? prev.galleryImages + ', ' + imgPath : imgPath 
         }));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddItinerary = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: "", title: "", description: "", places: "" }]
    }));
  };

  const handleRemoveItinerary = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.itinerary];
      updated[index][field] = value;
      return { ...prev, itinerary: updated };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Parse comma separated strings to arrays
    const formattedData = {
      ...formData,
      category: formData.category ? normalizeCategory(formData.category) : "",
      galleryImages: formData.galleryImages ? formData.galleryImages.split(',').map(s => s.trim()).filter(Boolean) : [],
      destinations: formData.destinations ? formData.destinations.split(',').map(s => s.trim()).filter(Boolean) : [],
      highlights: formData.highlights ? formData.highlights.split(',').map(s => s.trim()).filter(Boolean) : [],
      inclusions: formData.inclusions ? formData.inclusions.split(',').map(s => s.trim()).filter(Boolean) : [],
      exclusions: formData.exclusions ? formData.exclusions.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    try {
      const token = getToken();
      const url = editingPackageId 
        ? `${API_BASE_URL}/api/packages/${editingPackageId}`
        : `${API_BASE_URL}/api/packages`;
      
      const res = await fetch(url, {
        method: editingPackageId ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formattedData)
      });
      
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to save package");
      }
      
      setIsModalOpen(false);
      fetchPackages();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/api/packages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete package");
      fetchPackages();
    } catch (err) {
      alert(err.message);
    }
  };

  const openEditModal = (pkg) => {
    setEditingPackageId(pkg._id);
    setFormData({
      title: pkg.title || "",
      slug: pkg.slug || "",
      category: pkg.category || "",
      shortDescription: pkg.shortDescription || "",
      description: pkg.description || "",
      coverImage: pkg.coverImage || pkg.image || "",
      galleryImages: (pkg.galleryImages || []).join(', '),
      duration: pkg.duration || "",
      pricePerPerson: pkg.pricePerPerson || pkg.price || "",
      location: pkg.location || "Sri Lanka",
      minTravelers: pkg.minTravelers || 1,
      maxTravelers: pkg.maxTravelers || 10,
      availableFrom: pkg.availableFrom ? new Date(pkg.availableFrom).toISOString().split('T')[0] : "",
      availableTo: pkg.availableTo ? new Date(pkg.availableTo).toISOString().split('T')[0] : "",
      pickupLocation: pkg.pickupLocation || "",
      meetingPoint: pkg.meetingPoint || "",
      destinations: (pkg.destinations || []).join(', '),
      highlights: (pkg.highlights || []).join(', '),
      inclusions: (pkg.inclusions || []).join(', '),
      exclusions: (pkg.exclusions || []).join(', '),
      isActive: pkg.isActive ?? true,
      isFeatured: pkg.isFeatured ?? false,
      itinerary: pkg.itinerary || []
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingPackageId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const existingCategories = [
    ...new Map(
      packages
        .map((pkg) => pkg.category)
        .filter(Boolean)
        .map((cat) => [cat.trim().toLowerCase(), normalizeCategory(cat)])
    ).values()
  ];

  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="packages" />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F4F8F7]">
        <AdminTopbar />
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Manage Tour Packages</h2>
            <p className="text-gray-500 mt-2 text-[15px]">Update and monitor your travel packages.</p>
          </div>
          <button onClick={openAddModal} className="flex items-center bg-[#A7412A] hover:bg-[#8e3723] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow">
            + Add Package
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-[#FAFAFA] border-b border-gray-200">
                  <tr>
                     <th className="px-6 py-4 text-xs font-bold text-gray-700">Image</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-700">Package Title</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-700">Duration</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-700">Price</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-700">Status</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-700 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">Loading packages...</td></tr>
                  ) : error ? (
                    <tr><td colSpan="6" className="px-6 py-8 text-center text-red-500 font-semibold">{error}</td></tr>
                  ) : packages.length === 0 ? (
                    <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No packages found.</td></tr>
                  ) : packages.map(pkg => (
                    <tr key={pkg._id} className="hover:bg-gray-50 transition-colors">
                       <td className="px-6 py-4">
                         {(pkg.coverImage || pkg.image) ? (
                           <img src={(pkg.coverImage || pkg.image).startsWith('http') ? (pkg.coverImage || pkg.image) : `${API_BASE_URL}${(pkg.coverImage || pkg.image).startsWith('/') ? '' : '/'}${pkg.coverImage || pkg.image}`} alt={pkg.title} className="w-14 h-10 object-cover rounded shadow-sm" />
                         ) : (
                           <div className="w-14 h-10 bg-gray-200 rounded"></div>
                         )}
                       </td>
                       <td className="px-6 py-4">
                         <div className="font-bold text-gray-900 text-sm">{pkg.title}</div>
                         <div className="text-gray-500 text-[10px] mt-0.5">{pkg.category} | {pkg.slug}</div>
                       </td>
                       <td className="px-6 py-4 font-medium text-sm text-gray-700">{pkg.duration}</td>
                       <td className="px-6 py-4 font-bold text-gray-900">${pkg.pricePerPerson || pkg.price}</td>
                       <td className="px-6 py-4">
                         <div className="flex flex-col gap-1">
                           <span className={`px-2 w-fit py-0.5 text-[10px] font-bold rounded-full ${pkg.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {pkg.isActive ? 'Active' : 'Inactive'}
                           </span>
                           {pkg.isFeatured && (
                             <span className="px-2 w-fit py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700">
                               Featured
                             </span>
                           )}
                         </div>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-3">
                           <button onClick={() => openEditModal(pkg)} className="text-gray-500 hover:text-blue-600">
                             Edit
                           </button>
                           <button onClick={() => handleDelete(pkg._id)} className="text-gray-500 hover:text-red-600">
                             Delete
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

      {/* Package Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-xl my-8">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-900">
                {editingPackageId ? "Edit Tour Package" : "Add New Tour Package"}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6">
              {/* Section 1: Basic Package Details */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-[#A7412A] uppercase tracking-wider mb-4 border-b pb-2">1. Basic Package Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Title *</label>
                    <input type="text" value={formData.title} onChange={handleTitleChange} required className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                    <p className="text-[10px] text-gray-500 mt-1">Example: Sri Lanka 5 Days Cultural Tour</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Slug *</label>
                    <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                    <p className="text-[10px] text-gray-500 mt-1">Example: sri-lanka-5-days-cultural-tour</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                    <input 
                      type="text" 
                      list="category-suggestions" 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})} 
                      className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" 
                    />
                    <datalist id="category-suggestions">
                      {existingCategories.map((cat, idx) => (
                        <option key={idx} value={cat} />
                      ))}
                    </datalist>
                    <p className="text-[10px] text-gray-500 mt-1">Example: Adventure, Cultural, Family, Honeymoon</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Duration *</label>
                    <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                    <p className="text-[10px] text-gray-500 mt-1">Example: 5 Days / 4 Nights</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Short Description</label>
                    <textarea value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} rows="2" className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                    <p className="text-[10px] text-gray-500 mt-1">Small text for package cards.</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Description *</label>
                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required rows="4" className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Booking */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-[#A7412A] uppercase tracking-wider mb-4 border-b pb-2">2. Pricing & Booking Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Price Per Person (USD) *</label>
                    <input type="number" value={formData.pricePerPerson} onChange={e => setFormData({...formData, pricePerPerson: e.target.value})} required min="0" className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Min Travelers</label>
                    <input type="number" value={formData.minTravelers} onChange={e => setFormData({...formData, minTravelers: e.target.value})} min="1" className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Max Travelers</label>
                    <input type="number" value={formData.maxTravelers} onChange={e => setFormData({...formData, maxTravelers: e.target.value})} min="1" className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Available From (Optional)</label>
                    <input type="date" value={formData.availableFrom} onChange={e => setFormData({...formData, availableFrom: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Available To (Optional)</label>
                    <input type="date" value={formData.availableTo} onChange={e => setFormData({...formData, availableTo: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                  </div>
                  <div className="md:col-span-3 grid grid-cols-2 gap-6">
                     <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Pickup Location</label>
                        <input type="text" value={formData.pickupLocation} onChange={e => setFormData({...formData, pickupLocation: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Meeting Point</label>
                        <input type="text" value={formData.meetingPoint} onChange={e => setFormData({...formData, meetingPoint: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                     </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Package Features */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-[#A7412A] uppercase tracking-wider mb-4 border-b pb-2">3. Package Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Destinations Covered</label>
                    <textarea value={formData.destinations} onChange={e => setFormData({...formData, destinations: e.target.value})} rows="2" className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                    <p className="text-[10px] text-gray-500 mt-1">Example: Sigiriya, Kandy, Ella</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Highlights</label>
                    <textarea value={formData.highlights} onChange={e => setFormData({...formData, highlights: e.target.value})} rows="2" className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                    <p className="text-[10px] text-gray-500 mt-1">Example: Luxury hotel stay, Private transport</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Inclusions</label>
                    <textarea value={formData.inclusions} onChange={e => setFormData({...formData, inclusions: e.target.value})} rows="2" className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                    <p className="text-[10px] text-gray-500 mt-1">Example: Hotel accommodation, Breakfast</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Exclusions</label>
                    <textarea value={formData.exclusions} onChange={e => setFormData({...formData, exclusions: e.target.value})} rows="2" className="w-full border rounded px-3 py-2 text-sm focus:ring-[#A7412A]" />
                    <p className="text-[10px] text-gray-500 mt-1">Example: Flight tickets, Personal expenses</p>
                  </div>
                </div>
              </div>

              {/* Section 4: Itinerary */}
              <div className="mb-8">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                  <h4 className="text-sm font-bold text-[#A7412A] uppercase tracking-wider">4. Itinerary</h4>
                  <button type="button" onClick={handleAddItinerary} className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded font-bold transition">
                    + Add Day
                  </button>
                </div>
                {formData.itinerary.map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded mb-4 relative">
                    <button type="button" onClick={() => handleRemoveItinerary(index)} className="absolute top-4 right-4 text-red-500 font-bold text-xs hover:underline">Remove</button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Day (e.g. Day 1) *</label>
                        <input type="text" required value={item.day} onChange={e => handleItineraryChange(index, 'day', e.target.value)} className="w-full border rounded px-2 py-1 text-xs" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Title *</label>
                        <input type="text" required value={item.title} onChange={e => handleItineraryChange(index, 'title', e.target.value)} className="w-full border rounded px-2 py-1 text-xs" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Description</label>
                        <textarea value={item.description} onChange={e => handleItineraryChange(index, 'description', e.target.value)} rows="2" className="w-full border rounded px-2 py-1 text-xs" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-gray-600 mb-1">Places (Optional)</label>
                        <input type="text" value={item.places} onChange={e => handleItineraryChange(index, 'places', e.target.value)} className="w-full border rounded px-2 py-1 text-xs" />
                      </div>
                    </div>
                  </div>
                ))}
                {formData.itinerary.length === 0 && <p className="text-xs text-gray-500 italic">No itinerary days added yet.</p>}
              </div>

              {/* Section 5: Media */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-[#A7412A] uppercase tracking-wider mb-4 border-b pb-2">5. Media</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Cover Image (Single File Upload)</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'coverImage')} className="w-full text-sm mb-2" />
                    {formData.coverImage && <div className="text-[10px] text-green-600 break-all bg-green-50 p-2 rounded">{formData.coverImage}</div>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Gallery Images (Upload one by one)</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'galleryImages')} className="w-full text-sm mb-2" />
                    {formData.galleryImages && <div className="text-[10px] text-blue-600 break-all bg-blue-50 p-2 rounded">{formData.galleryImages}</div>}
                  </div>
                </div>
              </div>

              {/* Section 6: Status Controls */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-[#A7412A] uppercase tracking-wider mb-4 border-b pb-2">6. Status Controls</h4>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center text-sm font-semibold text-gray-800">
                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="mr-3 w-4 h-4 accent-[#A7412A]" />
                    Is Active (Visible on Frontend)
                  </label>
                  <label className="flex items-center text-sm font-semibold text-gray-800">
                    <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="mr-3 w-4 h-4 accent-[#A7412A]" />
                    Is Featured Package
                  </label>
                </div>
              </div>


              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded shadow-sm border border-gray-300 text-gray-700 font-bold hover:bg-white transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="px-8 py-2.5 rounded shadow-sm bg-[#A7412A] hover:bg-[#8e3723] text-white font-bold transition-colors text-sm">
                  {isSaving ? "Saving System Data..." : "Save Complete Package"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTourPackages;
