import React, { useState, useEffect } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';
import AlertMessage from '../Components/AlertMessage';
import EmptyState from '../Components/EmptyState';
import LoadingState from '../Components/LoadingState';

const ManageGallery = () => {
  const [activeTab, setActiveTab] = useState('Hero Place Images');

  // Hero States
  const [heroSlides, setHeroSlides] = useState([]);
  const [heroLoading, setHeroLoading] = useState(true);
  const [showHeroForm, setShowHeroForm] = useState(false);
  const [currentHeroEditId, setCurrentHeroEditId] = useState(null);
  const [heroForm, setHeroForm] = useState({
    title: "", subtitle: "", image: "", location: "", category: "", displayOrder: 0, isActive: true
  });
  
  // Curated States
  const [curatedEscapes, setCuratedEscapes] = useState([]);
  const [curatedLoading, setCuratedLoading] = useState(true);
  const [showCuratedForm, setShowCuratedForm] = useState(false);
  const [currentCuratedEditId, setCurrentCuratedEditId] = useState(null);
  const [curatedForm, setCuratedForm] = useState({
    sourceType: "destination", sourceId: "", title: "", description: "", badge: "", image: "", displayOrder: 0, isActive: true
  });

  // References
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);

  // Shared States
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [imageUploading, setImageUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const [destRes, pkgRes] = await Promise.all([
          fetch("http://localhost:5000/api/destinations"),
          fetch("http://localhost:5000/api/packages")
        ]);
        if (destRes.ok) setDestinations(await destRes.json());
        if (pkgRes.ok) setPackages(await pkgRes.json());
      } catch (e) {
        console.error(e);
      }
    };
    fetchReferences();
  }, []);

  const getImageSrc = (img) => {
    if (!img || typeof img !== 'string') return '/fallback-image.jpg';
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    return `http://localhost:5000${img.startsWith('/') ? img : `/${img}`}`;
  };

  // FETCH HERO
  const fetchHeroSlides = async () => {
    try {
      setHeroLoading(true);
      const userInfoString = localStorage.getItem("userInfo");
      const token = userInfoString ? JSON.parse(userInfoString).token : "";
      const res = await fetch("http://localhost:5000/api/gallery/hero-slides/admin/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to load gallery hero slides.");
      const data = await res.json();
      setHeroSlides(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setHeroLoading(false);
    }
  };

  // FETCH CURATED
  const fetchCuratedEscapes = async () => {
    try {
      setCuratedLoading(true);
      const userInfoString = localStorage.getItem("userInfo");
      const token = userInfoString ? JSON.parse(userInfoString).token : "";
      const res = await fetch("http://localhost:5000/api/gallery/curated-escapes/admin/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to load curated escapes.");
      const data = await res.json();
      setCuratedEscapes(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setCuratedLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'Hero Place Images') fetchHeroSlides();
    else fetchCuratedEscapes();
  }, [activeTab]);

  const handleHeroInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHeroForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCuratedInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "sourceType") {
      setCuratedForm((prev) => ({ 
        ...prev, 
        sourceType: value, 
        sourceId: "", title: "", description: "", image: "", badge: "" 
      }));
      setPreviewImage("");
    } else if (name === "sourceId") {
      const selectedId = value;
      let selectedItem = null;
      if (curatedForm.sourceType === "destination") {
        selectedItem = destinations.find(d => d._id === selectedId);
      } else {
        selectedItem = packages.find(p => p._id === selectedId);
      }

      if (selectedItem) {
        setCuratedForm(prev => ({
          ...prev,
          sourceId: selectedId,
          title: selectedItem.title || selectedItem.name || "",
          description: selectedItem.description || selectedItem.shortDescription || "",
          image: selectedItem.image || selectedItem.coverImage || "",
          badge: selectedItem.category || ""
        }));
        setPreviewImage(selectedItem.image || selectedItem.coverImage || "");
      } else {
        setCuratedForm(prev => ({ ...prev, sourceId: selectedId }));
      }
    } else {
      setCuratedForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleImageUpload = async (e, formType) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      const userInfoString = localStorage.getItem("userInfo");
      const token = userInfoString ? JSON.parse(userInfoString).token : "";
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error("Image upload failed");
      const data = await res.json();
      const uploadedImage = data.url || data.imageUrl || data.filePath || data.path || "";
      
      if (formType === 'hero') setHeroForm((prev) => ({ ...prev, image: uploadedImage }));
      else setCuratedForm((prev) => ({ ...prev, image: uploadedImage }));
      
      setPreviewImage(uploadedImage);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setImageUploading(false);
    }
  };

  const resetHeroForm = () => {
    setShowHeroForm(false);
    setCurrentHeroEditId(null);
    setHeroForm({ title: "", subtitle: "", image: "", location: "", category: "", displayOrder: 0, isActive: true });
    setPreviewImage("");
    setMessage({ text: "", type: "" });
  };

  const resetCuratedForm = () => {
    setShowCuratedForm(false);
    setCurrentCuratedEditId(null);
    setCuratedForm({ sourceType: "destination", sourceId: "", title: "", description: "", badge: "", image: "", displayOrder: 0, isActive: true });
    setPreviewImage("");
    setMessage({ text: "", type: "" });
  };

  const handleAddNewInteraction = () => {
    if (activeTab === 'Hero Place Images') {
      resetHeroForm();
      setShowHeroForm(true);
    } else {
      resetCuratedForm();
      setShowCuratedForm(true);
    }
  };

  const handleHeroEditClick = (slide) => {
    setShowHeroForm(true);
    setCurrentHeroEditId(slide._id);
    setHeroForm({
      title: slide.title || "", subtitle: slide.subtitle || "", image: slide.image || "",
      location: slide.location || "", category: slide.category || "", displayOrder: slide.displayOrder || 0,
      isActive: slide.isActive !== false
    });
    setPreviewImage(slide.image || "");
    setMessage({ text: "", type: "" });
  };

  const handleCuratedEditClick = (escape) => {
    setShowCuratedForm(true);
    setCurrentCuratedEditId(escape._id);
    setCuratedForm({
      sourceType: escape.sourceType || "destination", sourceId: escape.sourceId || "", title: escape.title || "", 
      description: escape.description || "", badge: escape.badge || "", image: escape.image || "", 
      displayOrder: escape.displayOrder || 0, isActive: escape.isActive !== false
    });
    setPreviewImage(escape.image || "");
    setMessage({ text: "", type: "" });
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const userInfoString = localStorage.getItem("userInfo");
      const token = userInfoString ? JSON.parse(userInfoString).token : "";
      const endpoint = type === 'hero' ? 'hero-slides' : 'curated-escapes';
      const res = await fetch(`http://localhost:5000/api/gallery/${endpoint}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Failed to delete ${type}.`);
      if (type === 'hero') fetchHeroSlides();
      else fetchCuratedEscapes();
      setMessage({ type: 'success', text: 'Item deleted.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage({ text: "", type: "" });
      if (!heroForm.title || heroForm.title.trim() === "") throw new Error("Title is required.");
      if (!heroForm.image || heroForm.image.trim() === "") throw new Error("Please upload a hero image.");

      const userInfoString = localStorage.getItem("userInfo");
      const token = userInfoString ? JSON.parse(userInfoString).token : "";
      const isEditing = Boolean(currentHeroEditId);
      const url = isEditing 
        ? `http://localhost:5000/api/gallery/hero-slides/${currentHeroEditId}`
        : `http://localhost:5000/api/gallery/hero-slides`;
      
      const payload = { ...heroForm, displayOrder: Number(heroForm.displayOrder || 0), isActive: Boolean(heroForm.isActive) };
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(()=>({}));
        console.error("Hero slide save failed:", errData);
        throw new Error("Failed to save gallery hero slide.");
      }
      setMessage({ text: "Hero Place Image saved successfully.", type: "success" });
      fetchHeroSlides();
      setTimeout(() => resetHeroForm(), 1500);
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleCuratedSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage({ text: "", type: "" });
      if (!curatedForm.sourceId || curatedForm.sourceId.trim() === "") {
        throw new Error("Please select a destination or tour package.");
      }
      if (!curatedForm.title || curatedForm.title.trim() === "") throw new Error("Title is required.");

      const userInfoString = localStorage.getItem("userInfo");
      const token = userInfoString ? JSON.parse(userInfoString).token : "";
      const isEditing = Boolean(currentCuratedEditId);
      const url = isEditing 
        ? `http://localhost:5000/api/gallery/curated-escapes/${currentCuratedEditId}`
        : `http://localhost:5000/api/gallery/curated-escapes`;
      
      const payload = { ...curatedForm, displayOrder: Number(curatedForm.displayOrder || 0), isActive: Boolean(curatedForm.isActive) };
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(()=>({}));
        console.error("Curated escape save failed:", errData);
        throw new Error("Failed to save curated escape. Check if Source ID is valid ObjectId.");
      }
      setMessage({ text: "Curated Escape saved successfully.", type: "success" });
      fetchCuratedEscapes();
      setTimeout(() => resetCuratedForm(), 1500);
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="gallery" />
      <main className="flex-1 overflow-y-auto bg-white">
        <AdminTopbar showSearch={true} searchPlaceholder="Search gallery..." />
        
        <div className="px-10 py-8 bg-[#FAFAFA] min-h-[calc(100vh-80px)]">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Gallery Management</h2>
                    <p className="text-gray-500 mt-2 text-[15px] max-w-2xl">
                        Manage gallery hero images and curated escape experiences.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button 
                        onClick={handleAddNewInteraction}
                        className="flex items-center text-white bg-[#A7412A] hover:bg-[#8e3522] px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Item
                    </button>
                </div>
            </div>

            <div className="flex border-b border-gray-200 mb-8 space-x-8">
                <button 
                  onClick={() => { setActiveTab('Hero Place Images'); resetHeroForm(); }}
                  className={`pb-4 font-medium text-[15px] transition-colors relative ${activeTab === 'Hero Place Images' ? 'text-[#A7412A]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Hero Place Images
                  {activeTab === 'Hero Place Images' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A7412A]"></div>}
                </button>
                <button 
                  onClick={() => { setActiveTab('Curated Escapes'); resetCuratedForm(); }}
                  className={`pb-4 font-medium text-[15px] transition-colors relative ${activeTab === 'Curated Escapes' ? 'text-[#A7412A]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Curated Escapes
                  {activeTab === 'Curated Escapes' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A7412A]"></div>}
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 min-h-[400px]">
                
                {/* HERO PLACE IMAGES TAB */}
                {activeTab === 'Hero Place Images' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                {showHeroForm ? (currentHeroEditId ? 'Edit Hero Place Image' : 'Add Hero Place Image') : 'Hero Place Images'}
                            </h3>
                            {showHeroForm && (
                                <button onClick={resetHeroForm} className="text-sm font-medium text-gray-500 hover:text-gray-700">Cancel / Back to List</button>
                            )}
                        </div>
                        
                        {!showHeroForm ? (
                            heroLoading ? (
                                <div className="py-10"><LoadingState message="Loading hero slides..." /></div>
                            ) : heroSlides.length === 0 ? (
                                <EmptyState title="No hero place images found" message="Upload stunning hero images to feature on the gallery landing view." />
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-[#FAFAFA] border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700">Image</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700">Title</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700">Location</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700">Order</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700">Status</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {heroSlides.map(slide => (
                                                <tr key={slide._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4"><img src={getImageSrc(slide.image)} alt={slide.title} className="w-16 h-10 object-cover rounded shadow-sm" /></td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{slide.title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{slide.location || '-'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{slide.displayOrder}</td>
                                                    <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-bold rounded-sm uppercase ${slide.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'}`}>{slide.isActive ? 'Active' : 'Inactive'}</span></td>
                                                    <td className="px-6 py-4 flex flex-col gap-1.5 items-end">
                                                        <button onClick={() => handleHeroEditClick(slide)} className="text-[10px] bg-blue-50 text-blue-700 px-3 py-1.5 rounded font-bold hover:bg-blue-100 w-16 text-center">Edit</button>
                                                        <button onClick={() => handleDelete(slide._id, 'hero')} className="text-[10px] bg-red-50 text-red-700 px-3 py-1.5 rounded font-bold hover:bg-red-100 w-16 text-center">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        ) : (
                            <form onSubmit={handleHeroSubmit} className="space-y-6 max-w-3xl">
                                {message.text && (
                                  <AlertMessage type={message.type} title={message.type === 'error' ? 'Error' : 'Success'} message={message.text} onClose={() => setMessage({text: "", type: ""})} />
                                )}
                                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Place Title</label><input type="text" name="title" required value={heroForm.title} onChange={handleHeroInputChange} className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]" placeholder="e.g. Sigiriya Rock Fortress" /></div>
                                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label><textarea name="subtitle" value={heroForm.subtitle} onChange={handleHeroInputChange} rows="2" className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]" placeholder="e.g. Ascend ancient..."></textarea></div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-2">Location</label><input type="text" name="location" value={heroForm.location} onChange={handleHeroInputChange} className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]" /></div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-2">Category</label><input type="text" name="category" value={heroForm.category} onChange={handleHeroInputChange} className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]" /></div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                                    <input type="number" name="displayOrder" value={heroForm.displayOrder} onChange={handleHeroInputChange} className="w-1/3 px-4 py-2 border rounded-lg bg-[#FAFAFA]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Image</label>
                                    <div className="flex items-center space-x-6">
                                        <div className="shrink-0 w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed overflow-hidden relative">
                                            {previewImage ? <img src={getImageSrc(previewImage)} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex mt-12 justify-center text-gray-400">IMG</div>}
                                            {imageUploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold">Uploading...</div>}
                                        </div>
                                        <div>
                                            <input type="file" id="heroImageInput" className="hidden" onChange={(e) => handleImageUpload(e, 'hero')} />
                                            <label htmlFor="heroImageInput" className="cursor-pointer px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50">Change Image</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" name="isActive" id="isActiveHero" checked={heroForm.isActive} onChange={handleHeroInputChange} className="h-4 w-4" />
                                    <label htmlFor="isActiveHero" className="ml-2 text-sm text-gray-700">Active</label>
                                </div>
                                <div className="flex justify-end pt-4 border-t"><button type="submit" disabled={saving || imageUploading} className="px-6 py-2.5 rounded-lg text-white font-medium bg-[#A7412A] hover:bg-[#8e3522]">{saving ? 'Saving...' : 'Save Place Image'}</button></div>
                            </form>
                        )}
                    </div>
                )}

                {/* CURATED ESCAPES TAB */}
                {activeTab === 'Curated Escapes' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                {showCuratedForm ? (currentCuratedEditId ? 'Edit Curated Escape' : 'Add Curated Escape') : 'Curated Escapes'}
                            </h3>
                            {showCuratedForm && (
                                <button onClick={resetCuratedForm} className="text-sm font-medium text-gray-500 hover:text-gray-700">Cancel / Back to List</button>
                            )}
                        </div>
                        
                        {!showCuratedForm ? (
                            curatedLoading ? (
                                <div className="py-10"><LoadingState message="Loading escapes..." /></div>
                            ) : curatedEscapes.length === 0 ? (
                                <EmptyState title="No curated escapes found" message="Pull items from packages or destinations to populate the gallery grid." />
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-[#FAFAFA] border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700">Image</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700">Title</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700">Source Type</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700">Order</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-700 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {curatedEscapes.map(escape => (
                                                <tr key={escape._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4"><img src={getImageSrc(escape.image)} alt={escape.title} className="w-16 h-10 object-cover rounded shadow-sm" /></td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{escape.title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{escape.sourceType}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{escape.displayOrder}</td>
                                                    <td className="px-6 py-4 flex flex-col gap-1.5 items-end">
                                                        <button onClick={() => handleCuratedEditClick(escape)} className="text-[10px] bg-blue-50 text-blue-700 px-3 py-1.5 rounded font-bold hover:bg-blue-100 w-16 text-center">Edit</button>
                                                        <button onClick={() => handleDelete(escape._id, 'curated')} className="text-[10px] bg-red-50 text-red-700 px-3 py-1.5 rounded font-bold hover:bg-red-100 w-16 text-center">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        ) : (
                            <form onSubmit={handleCuratedSubmit} className="space-y-6 max-w-3xl">
                                {message.text && (
                                  <AlertMessage type={message.type} title={message.type === 'error' ? 'Error' : 'Success'} message={message.text} onClose={() => setMessage({text: "", type: ""})} />
                                )}
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Source Type</label>
                                        <select name="sourceType" value={curatedForm.sourceType} onChange={handleCuratedInputChange} className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]">
                                            <option value="destination">Destination</option>
                                            <option value="package">Package</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Item</label>
                                        <select name="sourceId" required value={curatedForm.sourceId} onChange={handleCuratedInputChange} className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]">
                                            <option value="">Select a {curatedForm.sourceType === 'destination' ? 'Destination' : 'Package'}...</option>
                                            {curatedForm.sourceType === 'destination' ? (
                                                destinations.map(d => (
                                                    <option key={d._id} value={d._id}>{d.title || d.name}</option>
                                                ))
                                            ) : (
                                                packages.map(p => (
                                                    <option key={p._id} value={p._id}>{p.title || p.name}</option>
                                                ))
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Title</label><input type="text" name="title" required value={curatedForm.title} onChange={handleCuratedInputChange} className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]" /></div>
                                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Description</label><textarea name="description" value={curatedForm.description} onChange={handleCuratedInputChange} rows="2" className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]" ></textarea></div>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Badge / Label</label>
                                        <input type="text" name="badge" value={curatedForm.badge} onChange={handleCuratedInputChange} className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]" placeholder="e.g. Signature" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                                        <input type="number" name="displayOrder" value={curatedForm.displayOrder} onChange={handleCuratedInputChange} className="w-full px-4 py-2 border rounded-lg bg-[#FAFAFA]" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Curated Image</label>
                                    <div className="flex items-center space-x-6">
                                        <div className="shrink-0 w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed overflow-hidden relative">
                                            {previewImage ? <img src={getImageSrc(previewImage)} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex mt-12 justify-center text-gray-400">IMG</div>}
                                            {imageUploading && <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-xs font-bold">Uploading...</div>}
                                        </div>
                                        <div>
                                            <input type="file" id="curatedImageInput" className="hidden" onChange={(e) => handleImageUpload(e, 'curated')} />
                                            <label htmlFor="curatedImageInput" className="cursor-pointer px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50">Change Image</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" name="isActive" id="isActiveCurated" checked={curatedForm.isActive} onChange={handleCuratedInputChange} className="h-4 w-4" />
                                    <label htmlFor="isActiveCurated" className="ml-2 text-sm text-gray-700">Active</label>
                                </div>
                                <div className="flex justify-end pt-4 border-t"><button type="submit" disabled={saving || imageUploading} className="px-6 py-2.5 rounded-lg text-white font-medium bg-[#A7412A] hover:bg-[#8e3522]">{saving ? 'Saving...' : 'Save Curated Escape'}</button></div>
                            </form>
                        )}
                    </div>
                )}
            </div>

        </div>
      </main>
    </div>
  );
};

export default ManageGallery;
