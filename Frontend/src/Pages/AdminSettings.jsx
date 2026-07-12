import React, { useState, useEffect } from 'react';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';
import API_BASE_URL from '../api/api';

import AdminAboutSettings from './AdminAboutSettings';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
// ... rest of the states
  const [settings, setSettings] = useState({
    siteName: "",
    siteTagline: "",
    supportEmail: "",
    phone: "",
    address: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      whatsapp: "",
      youtube: ""
    },
    currency: "LKR",
    bookingAutoConfirm: false,
    reviewAutoApprove: false
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/settings`);
      if (!res.ok) throw new Error("Failed to load settings.");
      const data = await res.json();
      if (data) {
        setSettings(prev => ({
          ...prev,
          ...data,
          socialLinks: {
            ...prev.socialLinks,
            ...(data.socialLinks || {})
          }
        }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Check if it's a social link
    if (["facebook", "instagram", "whatsapp", "youtube"].includes(name)) {
      setSettings(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value
        }
      }));
      return;
    }

    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(false);

      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo?.token;
      
      const res = await fetch(`${API_BASE_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      
      if (!res.ok) throw new Error("Failed to update settings.");
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    fetchSettings();
    setSuccess(false);
    setError(null);
  };

  return (
    <div className="flex h-screen bg-[#F4F8F7] font-sans text-gray-800">
      <AdminSidebar activePage="settings" />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F4F8F7]">
        <AdminTopbar title="Global Settings" />
        
        {activeTab === 'about' ? (
           <AdminAboutSettings onBack={() => setActiveTab('general')} />
        ) : (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">System Settings</h2>
                <p className="text-gray-500 mt-2 text-[15px]">Manage your global platform configurations.</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveTab('about')}
                  className="px-6 py-2 bg-blue-50 text-blue-700 border border-blue-200 font-bold rounded-lg shadow-sm hover:bg-blue-100 transition"
                >
                  About Us Settings
                </button>
                {success && (
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded shadow-sm border border-green-200 font-semibold animate-pulse">
                    Settings updated successfully.
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 text-red-700 px-4 py-2 rounded shadow-sm border border-red-200 font-semibold">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-20 bg-white rounded-xl shadow-sm border border-gray-200">
                <p className="text-gray-500 font-semibold text-lg">Loading settings...</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-8 pb-10">
                
                {/* Section 1: Website Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">Section 1: Website Information</h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Website Name</label>
                      <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Website Tagline</label>
                      <input type="text" name="siteTagline" value={settings.siteTagline} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition" />
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">Section 2: Contact Information</h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Support Email</label>
                      <input type="email" name="supportEmail" value={settings.supportEmail} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <input type="text" name="phone" value={settings.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition" />
                    </div>
                    <div className="md:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                      <input type="text" name="address" value={settings.address} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Social Media */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">Section 3: Social Media Links</h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Facebook URL</label>
                      <input type="url" name="facebook" value={settings.socialLinks.facebook} onChange={handleChange} placeholder="https://facebook.com/..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Instagram URL</label>
                      <input type="url" name="instagram" value={settings.socialLinks.instagram} onChange={handleChange} placeholder="https://instagram.com/..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number/Link</label>
                      <input type="text" name="whatsapp" value={settings.socialLinks.whatsapp} onChange={handleChange} placeholder="+94..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">YouTube Channel</label>
                      <input type="url" name="youtube" value={settings.socialLinks.youtube} onChange={handleChange} placeholder="https://youtube.com/..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition" />
                    </div>
                  </div>
                </div>

                {/* Section 4: System Preferences */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">Section 4: System Preferences</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Default Currency</label>
                      <select name="currency" value={settings.currency} onChange={handleChange} className="w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A7412A] outline-none transition cursor-pointer bg-white">
                        <option value="LKR">LKR (Sri Lankan Rupee)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                        <option value="GBP">GBP (British Pound)</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center pt-2 border-t border-gray-100">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" name="bookingAutoConfirm" checked={settings.bookingAutoConfirm} onChange={handleChange} className="sr-only" />
                          <div className={`block w-14 h-8 rounded-full transition ${settings.bookingAutoConfirm ? 'bg-[#A7412A]' : 'bg-gray-300'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${settings.bookingAutoConfirm ? 'translate-x-6' : ''}`}></div>
                        </div>
                        <div className="ml-4">
                          <span className="block text-sm font-bold text-gray-800">Booking Auto Confirm</span>
                          <span className="block text-xs text-gray-500">Automatically set new bookings to Confirmed status.</span>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center pt-2 border-t border-gray-100">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" name="reviewAutoApprove" checked={settings.reviewAutoApprove} onChange={handleChange} className="sr-only" />
                          <div className={`block w-14 h-8 rounded-full transition ${settings.reviewAutoApprove ? 'bg-[#A7412A]' : 'bg-gray-300'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${settings.reviewAutoApprove ? 'translate-x-6' : ''}`}></div>
                        </div>
                        <div className="ml-4">
                          <span className="block text-sm font-bold text-gray-800">Review Auto Approve</span>
                          <span className="block text-xs text-gray-500">Automatically display user reviews publicly upon submission.</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="px-8 py-3 bg-[#A7412A] disabled:bg-gray-400 hover:bg-[#8e3723] text-white font-bold rounded-lg shadow-md transition"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleReset}
                    className="px-8 py-3 bg-white text-gray-700 font-bold border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
                    Reset / Cancel
                  </button>
                </div>

              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminSettings;
