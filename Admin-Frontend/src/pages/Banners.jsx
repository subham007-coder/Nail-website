import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

function Banners() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    image: '',
    publicId: '',
    link: '',
    order: '',
    active: true,
    buttonText: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const data = await apiRequest('/v1/banners/');
      setBanners(data);
      setError('');
    } catch (error) {
      console.error('Error fetching banners:', error);
      setError('Failed to fetch banners');
    }
  };

  // Image upload handler - simplified for now since upload endpoint is not available
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      // For now, we'll use FileReader to create a data URL for preview
      // In production, you'd want to upload to a service like Cloudinary, AWS S3, etc.
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm({ 
          ...form, 
          image: event.target.result, 
          publicId: `temp_${Date.now()}` 
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image processing error:', error);
      setError('Image processing failed');
    } finally {
      setUploading(false);
    }
  };

  // Validation function
  const isFormValid = () => {
    return (
      form.title.trim() &&
      form.subtitle.trim() &&
      form.image.trim() &&
      form.link.trim() &&
      form.buttonText.trim() &&
      form.order !== '' && // allow 0 as valid
      !isNaN(form.order) // ensure order is a number
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isFormValid()) {
      setError('All fields are required and order must be a valid number.');
      return;
    }
    
    try {
      if (editingId) {
        await apiRequest(`/v1/banners/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        await apiRequest('/v1/banners/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      
      // Reset form
      setForm({ 
        title: '', 
        subtitle: '', 
        image: '', 
        publicId: '', 
        link: '', 
        order: 0, 
        active: true, 
        buttonText: '' 
      });
      setEditingId(null);
      setError('');
      
      // Refresh banners list
      await fetchBanners();
    } catch (error) {
      console.error('Submit error:', error);
      setError(`Failed to ${editingId ? 'update' : 'create'} banner. Please try again.`);
    }
  };

  const handleEdit = (banner) => {
    setForm(banner);
    setEditingId(banner._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      await apiRequest(`/v1/banners/${id}`, { method: 'DELETE' });
      await fetchBanners();
      setError('');
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete banner. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-gray-900">Banner Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-soft">
        {error && (
          <div className="text-red-600 text-sm mb-2">{error}</div>
        )}
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
            required
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={e => setForm({ ...form, subtitle: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          {/* Image Upload */}
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="px-4 py-2 border rounded w-full"
              disabled={uploading}
            />
            <input
              type="url"
              placeholder="Or paste image URL"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value, publicId: e.target.value ? `url_${Date.now()}` : '' })}
              className="px-4 py-2 border rounded w-full"
            />
            {uploading && <div className="text-xs text-gray-500 mt-1">Processing image...</div>}
            {form.image && (
              <img 
                src={form.image} 
                alt="Banner preview" 
                className="mt-2 w-32 h-16 object-cover rounded border"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
          <input
            type="text"
            placeholder="Link"
            required
            value={form.link}
            onChange={e => setForm({ ...form, link: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Order"
            required
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
            required
            placeholder="Button Text (e.g. Read More)"
            value={form.buttonText || ''}
            onChange={e => setForm({ ...form, buttonText: e.target.value })}
            className="px-4 py-2 border rounded"
          />
        </div>
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded"
          disabled={!isFormValid() || uploading}
        >
          {editingId ? 'Update' : 'Add'} Banner
        </button>
        {editingId && (
          <button 
            type="button" 
            className="ml-4 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors" 
            onClick={() => { 
              setEditingId(null); 
              setForm({ 
                title: '', 
                subtitle: '', 
                image: '', 
                publicId: '', 
                link: '', 
                order: 0, 
                active: true, 
                buttonText: '' 
              }); 
              setError('');
            }}
          >
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