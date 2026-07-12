import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../api/api';

const AdminAboutSettings = ({ onBack }) => {
  const [aboutData, setAboutData] = useState({
    hero: { title: "", subtitle: "", image: "" },
    story: { title: "", subtitle: "", description: "", image: "" },
    mission: "",
    vision: "",
    members: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Modal logic for members
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editMemberId, setEditMemberId] = useState(null);
  const [memberFormData, setMemberFormData] = useState({
    name: "", position: "", image: "", description: "", displayOrder: 0, isActive: true
  });

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/about/admin`);
      if (!res.ok) throw new Error("Failed to load about data.");
      const data = await res.json();
      setAboutData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleTextChange = (e, section, field) => {
    if (section) {
      setAboutData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: e.target.value }
      }));
    } else {
      setAboutData(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const uploadImage = async (file) => {
    if (!file) return "";

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("About image upload failed:", data);
      throw new Error(data.message || "Image upload failed");
    }

    return (
      data.imageUrl ||
      data.url ||
      data.filePath ||
      data.path ||
      data.image ||
      ""
    );
  };

  const handleImageChange = async (e, section, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        if (section) {
          setAboutData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: imageUrl }
          }));
        }
      } catch (err) {
        console.error("About image upload failed:", err);
        alert(err.message);
      }
    }
  };

  const handleSaveMain = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(false);

      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo?.token;
      
      const res = await fetch(`${API_BASE_URL}/api/about`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          hero: aboutData.hero,
          story: aboutData.story,
          mission: aboutData.mission,
          vision: aboutData.vision
        })
      });
      
      if (!res.ok) throw new Error("Failed to update about pages.");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };


  // --- Members Functions ---

  const handleMemberModalOpen = (member = null) => {
    if (member) {
      setEditMemberId(member._id);
      setMemberFormData({ ...member });
    } else {
      setEditMemberId(null);
      setMemberFormData({ name: "", position: "", image: "", description: "", displayOrder: 0, isActive: true });
    }
    setShowMemberModal(true);
  };

  const handleMemberFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo?.token;
      
      const method = editMemberId ? "PUT" : "POST";
      const url = editMemberId 
        ? `${API_BASE_URL}/api/about/members/${editMemberId}`
        : `${API_BASE_URL}/api/about/members`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(memberFormData)
      });

      if (!res.ok) throw new Error("Failed to save member");
      
      const updatedMembers = await res.json();
      setAboutData(prev => ({ ...prev, members: updatedMembers }));
      setShowMemberModal(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleMemberDelete = async (memberId) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo?.token;
      
      const res = await fetch(`${API_BASE_URL}/api/about/members/${memberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete member");
      
      const updatedMembers = await res.json();
      setAboutData(prev => ({ ...prev, members: updatedMembers }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleMemberFile = async(e) => {
      const file = e.target.files[0];
      if (file) {
          try {
              const imgPath = await uploadImage(file);
              setMemberFormData(prev => ({ ...prev, image: imgPath.replace(/\\/g,"/") }));
          } catch (err) {
              console.error("About image upload failed:", err);
              alert(err.message);
          }
      }
  };


  const getImageUrl = (image) => {
    if (!image) return "/fallback-image.jpg";
    if (image.startsWith("http")) return image;
    return `${API_BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#F4F8F7] h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <button onClick={onBack} className="text-[#A7412A] font-bold text-sm mb-2 flex items-center hover:underline">
            {"< Back to Settings"}
          </button>
          <h2 className="text-3xl font-extrabold text-gray-900">About Us Settings</h2>
          <p className="text-gray-500 mt-2 text-[15px]">Manage content and team members for the About page.</p>
        </div>
        <div>
           <button onClick={handleSaveMain} disabled={isSaving} className="px-6 py-2 bg-[#A7412A] disabled:bg-gray-400 hover:bg-[#8e3723] text-white font-bold rounded-lg shadow-md transition">
              {isSaving ? "Saving..." : "Save Main Content"}
           </button>
        </div>
      </div>

      {success && (
         <div className="bg-green-50 text-green-700 px-4 py-2 rounded shadow-sm border border-green-200 font-semibold mb-6 animate-pulse">
           Changes saved successfully.
         </div>
      )}
      {error && (
         <div className="bg-red-50 text-red-700 px-4 py-2 rounded shadow-sm border border-red-200 font-semibold mb-6">
           {error}
         </div>
      )}

      {/* Main Form for Hero, Story, Mission, Vision */}
      <div className="space-y-8 pb-10">
        
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Hero Section</h3>
          </div>
          <div className="p-6 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Hero Title</label>
              <input type="text" value={aboutData.hero.title} onChange={e => handleTextChange(e, 'hero', 'title')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Hero Subtitle</label>
              <input type="text" value={aboutData.hero.subtitle} onChange={e => handleTextChange(e, 'hero', 'subtitle')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Hero Image</label>
              <input type="file" onChange={e => handleImageChange(e, 'hero', 'image')} className="mb-2 block" />
              {aboutData.hero.image && <img src={getImageUrl(aboutData.hero.image)} alt="Hero" className="h-32 object-contain rounded border" />}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Our Story Section</h3>
          </div>
          <div className="p-6 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Story Title</label>
                <input type="text" value={aboutData.story.title} onChange={e => handleTextChange(e, 'story', 'title')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Story Subtitle</label>
                <input type="text" value={aboutData.story.subtitle} onChange={e => handleTextChange(e, 'story', 'subtitle')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Story Description</label>
              <textarea rows="4" value={aboutData.story.description} onChange={e => handleTextChange(e, 'story', 'description')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Story Image</label>
              <input type="file" onChange={e => handleImageChange(e, 'story', 'image')} className="mb-2 block" />
              {aboutData.story.image && <img src={getImageUrl(aboutData.story.image)} alt="Story" className="h-32 object-contain rounded border" />}
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Mission & Vision</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mission</label>
              <textarea rows="4" value={aboutData.mission} onChange={e => handleTextChange(e, null, 'mission')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Vision</label>
              <textarea rows="4" value={aboutData.vision} onChange={e => handleTextChange(e, null, 'vision')} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none"></textarea>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Owners / Company Members</h3>
            <button onClick={() => handleMemberModalOpen()} className="bg-[#A7412A] text-white px-3 py-1 text-sm rounded font-bold hover:bg-[#8e3723]">+ Add Member</button>
          </div>
          <div className="p-6">
            {aboutData.members.length === 0 ? (
              <p className="text-gray-500">No members added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-3">Order</th>
                      <th className="p-3">Image</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Position</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aboutData.members.map(member => (
                      <tr key={member._id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{member.displayOrder}</td>
                        <td className="p-3">
                          {member.image ? <img src={getImageUrl(member.image)} alt={member.name} className="h-10 w-10 rounded-full object-cover" /> : <div className="h-10 w-10 bg-gray-200 rounded-full"></div>}
                        </td>
                        <td className="p-3 font-semibold">{member.name}</td>
                        <td className="p-3 text-sm">{member.position}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${member.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {member.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3">
                          <button onClick={() => handleMemberModalOpen(member)} className="text-blue-600 hover:underline mr-3 text-sm">Edit</button>
                          <button onClick={() => handleMemberDelete(member._id)} className="text-red-600 hover:underline text-sm">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Member Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="font-bold text-xl mb-4">{editMemberId ? "Edit Member" : "Add Member"}</h3>
            <form onSubmit={handleMemberFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Name</label>
                <input required type="text" value={memberFormData.name} onChange={e => setMemberFormData({...memberFormData, name: e.target.value})} className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-[#A7412A]" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Position / Role</label>
                <input required type="text" value={memberFormData.position} onChange={e => setMemberFormData({...memberFormData, position: e.target.value})} className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-[#A7412A]" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Short Description</label>
                <textarea rows="2" value={memberFormData.description} onChange={e => setMemberFormData({...memberFormData, description: e.target.value})} className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-[#A7412A]" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Upload Image</label>
                <input type="file" onChange={handleMemberFile} className="mb-2" />
                {memberFormData.image && <img src={getImageUrl(memberFormData.image)} className="h-16 w-16 object-cover rounded mt-2 border" alt="Preview"/>}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1">Display Order</label>
                  <input type="number" value={memberFormData.displayOrder} onChange={e => setMemberFormData({...memberFormData, displayOrder: e.target.value})} className="w-full px-3 py-2 border rounded outline-none focus:ring-1 focus:ring-[#A7412A]" />
                </div>
                <div className="flex-1 flex items-center pt-5">
                  <input type="checkbox" id="isActive" checked={memberFormData.isActive} onChange={e => setMemberFormData({...memberFormData, isActive: e.target.checked})} className="mr-2 h-4 w-4" />
                  <label htmlFor="isActive" className="text-sm font-bold">Active Member</label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button type="button" onClick={() => setShowMemberModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-bold text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#A7412A] text-white rounded hover:bg-[#8e3723] font-bold">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AdminAboutSettings;
