import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { useToast } from '../contexts/ToastContext';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showSuccess, showError, showWarning } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/v1/insta-posts/');
      setPosts(data);
      setError('');
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      setError('Failed to fetch Instagram posts');
      showError('Failed to fetch Instagram posts');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      // For now, we'll use FileReader for image preview
      // In production, you'd upload to a service like Cloudinary, AWS S3, etc.
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm({ 
          ...form, 
          image: event.target.result, 
          publicId: `temp_${Date.now()}` 
        });
        showSuccess('Image loaded successfully');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image processing error:', error);
      setError('Image processing failed');
      showError('Image processing failed');
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
      showWarning('All fields are required.');
      return;
    }
    
    try {
      if (editingId) {
        await apiRequest(`/v1/insta-posts/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        showSuccess('Post updated successfully!');
      } else {
        await apiRequest('/v1/insta-posts/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        showSuccess('Post created successfully!');
      }
      setForm({ image: '', publicId: '', likes: '', comments: '' });
      setEditingId(null);
      fetchPosts();
    } catch (error) {
      console.error('Error submitting post:', error);
      showError(editingId ? 'Failed to update post' : 'Failed to create post');
    }
  };

  const handleEdit = (post) => {
    setForm(post);
    setEditingId(post._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    
    try {
      await apiRequest(`/v1/insta-posts/${id}`, { method: 'DELETE' });
      showSuccess('Post deleted successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      showError('Failed to delete post');
    }
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
          <thead className='bg-pink-200'>
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-center">Likes</th>
              <th className="px-4 py-2 text-center">Comments</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id}>
                <td className="px-4 py-2 text-left">
                  <img src={post.image} alt="" className="w-24 h-24 object-cover rounded" />
                </td>
                <td className="px-4 py-2 text-center">{post.likes}</td>
                <td className="px-4 py-2 text-center">{post.comments}</td>
                <td className="px-4 py-2 text-center">
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