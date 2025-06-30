import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

function InstaFeed() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    image: '',
    publicId: '',
    likes: '',
    comments: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await apiRequest('/api/insta-posts');
    setPosts(data);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/insta-posts/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url && data.public_id) {
        setForm({ ...form, image: data.url, publicId: data.public_id });
      }
    } catch {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const isFormValid = () => {
    return (
      form.image.trim() &&
      form.publicId.trim() &&
      form.likes.trim() &&
      form.comments.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isFormValid()) {
      setError('All fields are required.');
      return;
    }
    if (editingId) {
      await apiRequest(`/api/insta-posts/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await apiRequest('/api/insta-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ image: '', publicId: '', likes: '', comments: '' });
    setEditingId(null);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setForm(post);
    setEditingId(post._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await apiRequest(`/api/insta-posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-gray-900">Instagram Feed Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-soft">
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleImageUpload}
              className="px-4 py-2 border rounded w-full"
              disabled={uploading}
            />
            {uploading && <div className="text-xs text-gray-500 mt-1">Uploading...</div>}
            {form.image && (
              <img src={form.image} alt="Insta" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>
          <input
            type="text"
            required
            placeholder="Likes (e.g. 2.5k)"
            value={form.likes}
            onChange={e => setForm({ ...form, likes: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          <input
            type="text"
            required
            placeholder="Comments (e.g. 120)"
            value={form.comments}
            onChange={e => setForm({ ...form, comments: e.target.value })}
            className="px-4 py-2 border rounded"
          />
        </div>
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded"
          disabled={!isFormValid() || uploading}
        >
          {editingId ? 'Update' : 'Add'} Post
        </button>
        {editingId && (
          <button type="button" className="ml-4 text-gray-600" onClick={() => { setEditingId(null); setForm({ image: '', publicId: '', likes: '', comments: '' }); }}>
            Cancel
          </button>
        )}
      </form>
      <div className="bg-white rounded-xl shadow-soft p-6">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th>Image</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id}>
                <td><img src={post.image} alt="" className="w-24 h-24 object-cover rounded" /></td>
                <td>{post.likes}</td>
                <td>{post.comments}</td>
                <td>
                  <button onClick={() => handleEdit(post)} className="text-blue-600 mr-2">Edit</button>
                  <button onClick={() => handleDelete(post._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstaFeed;