import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';
import API_BASE_URL from '../api/api';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    avatar: '',
    joinedDate: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) throw new Error("No authentication token found. Please sign in.");
        
        const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (!res.ok) throw new Error("Failed to load profile data.");
        const data = await res.json();
        
        setProfile({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          role: data.role || 'Admin',
          avatar: data.avatar || 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
          joinedDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A'
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to upload avatar.");
      
      const imageUrl = data.url || data.imageUrl || data.image;
      setProfile(prev => ({ ...prev, avatar: imageUrl }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          avatar: profile.avatar
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }
      
      setSuccess("Profile securely updated successfully.");
      
      // Update local storage name if needed
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        userInfo.name = profile.name;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const getImageUrl = (img) => {
    if (!img) return 'https://i.pravatar.cc/150?u=a042581f4e29026024d';
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    return `${API_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`;
  };

  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="" />

      <main className="flex-1 overflow-y-auto bg-white/50 backdrop-blur-sm">
        {/* Top Header Placeholder to match Dashboard */}
        <AdminTopbar showSearch={false} searchPlaceholder="Hidden" />

        <div className="px-10 py-10 max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">System Profile</h2>
            <p className="text-gray-500 mt-2 text-lg">Manage your personal admin account settings and authentication rules.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
              {success}
            </div>
          )}

          {loading ? (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm animate-pulse space-y-6 flex flex-col items-center">
               <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
               <div className="w-48 h-6 bg-gray-200 rounded"></div>
               <div className="w-full h-12 bg-gray-200 rounded max-w-lg"></div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden relative">
              <div className="h-32 bg-gradient-to-r from-gray-900 to-[#2A2B3A] absolute top-0 left-0 w-full z-0"></div>
              
              <div className="relative z-10 p-8 flex flex-col md:flex-row gap-10 mt-10">
                {/* Avatar Section */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white mb-4">
                    <img src={getImageUrl(profile.avatar)} alt="Avatar" className="w-full h-full object-cover" />
                    {uploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs font-bold text-center">Uploading...</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <input type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    <label htmlFor="avatarUpload" className="cursor-pointer bg-[#F2F6F6] text-[#A7412A] text-xs font-bold uppercase tracking-wider px-4 py-2 flex rounded-md border border-gray-200 transition-colors hover:bg-gray-100">
                      Change Photo
                    </label>
                  </div>
                  <div className="mt-8 text-center bg-gray-50 border border-gray-100 w-full py-4 rounded-lg">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Account Role</p>
                    <p className="text-gray-800 font-bold uppercase">{profile.role}</p>
                    <hr className="my-3 border-gray-200" />
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Date Joined</p>
                    <p className="text-gray-700 font-semibold">{profile.joinedDate}</p>
                  </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSave} className="flex-1 w-full space-y-6 pt-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Full Legal Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        value={profile.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A7412A] focus:border-transparent outline-none transition-all text-gray-800 font-medium" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={profile.email} 
                        readOnly
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 font-medium cursor-not-allowed outline-none" 
                      />
                      <p className="text-[10px] text-gray-400 mt-1 font-medium">To change your primary authenticated email, please contact IT support.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Phone Contact</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={profile.phone} 
                        onChange={handleChange} 
                        placeholder="+94 77 XXXXXXX"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A7412A] focus:border-transparent outline-none transition-all text-gray-800 font-medium" 
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 flex justify-end">
                    <button 
                      type="submit" 
                      disabled={saving || uploading}
                      className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#d66847] text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#d66847]/30 transition-all hover:bg-[#c55b3b] hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {saving ? 'Validating...' : 'Save Security Profile'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
