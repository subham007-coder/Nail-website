import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

function Banners() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({ title: '', subtitle: '', image: '', link: '', order: 0, active: true });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const data = await apiRequest('/api/banners');
    setBanners(data);
  };

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/banners/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setForm({ ...form, image: data.url });
      }
    } catch {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await apiRequest(`/api/banners/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await apiRequest('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ title: '', subtitle: '', image: '', link: '', order: 0, active: true });
    setEditingId(null);
    fetchBanners();
  };

  const handleEdit = (banner) => {
    setForm(banner);
    setEditingId(banner._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this banner?')) return;
    await apiRequest(`/api/banners/${id}`, { method: 'DELETE' });
    fetchBanners();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-gray-900">Banner Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
            className="px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={e => setForm({ ...form, subtitle: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="px-4 py-2 border rounded w-full"
              disabled={uploading}
            />
            {uploading && <div className="text-xs text-gray-500 mt-1">Uploading...</div>}
            {form.image && (
              <img src={form.image} alt="Banner" className="mt-2 w-32 h-16 object-cover rounded" />
            )}
          </div>
          <input
            type="text"
            placeholder="Link (optional)"
            value={form.link}
            onChange={e => setForm({ ...form, link: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Order"
            value={form.order}
            onChange={e => setForm({ ...form, order: Number(e.target.value) })}
            className="px-4 py-2 border rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={e => setForm({ ...form, active: e.target.checked })}
            />
            Active
          </label>
          <input
            type="text"
            placeholder="Button Text (e.g. Read More)"
            value={form.buttonText || ''}
            onChange={e => setForm({ ...form, buttonText: e.target.value })}
            className="px-4 py-2 border rounded"
          />
        </div>
        <button className="bg-pink-600 text-white px-6 py-2 rounded">{editingId ? 'Update' : 'Add'} Banner</button>
        {editingId && (
          <button type="button" className="ml-4 text-gray-600" onClick={() => { setEditingId(null); setForm({ title: '', subtitle: '', image: '', link: '', order: 0, active: true }); }}>
            Cancel
          </button>
        )}
      </form>
      <div className="bg-white rounded-xl shadow-soft p-6">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th>Order</th>
              <th>Image</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Link</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map(banner => (
              <tr key={banner._id}>
                <td>{banner.order}</td>
                <td><img src={banner.image} alt="" className="w-24 h-12 object-cover rounded" /></td>
                <td>{banner.title}</td>
                <td>{banner.subtitle}</td>
                <td>{banner.link}</td>
                <td>{banner.active ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEdit(banner)} className="text-blue-600 mr-2">Edit</button>
                  <button onClick={() => handleDelete(banner._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Banners;