import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/contact-submissions');
      setSubmissions(data);
    } catch (err) {
      console.error('Failed to fetch submissions:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    setDeletingId(id);
    try {
      await apiRequest(`/api/contact-submissions/${id}`, {
        method: 'DELETE',
      });
      setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
    } catch (err) {
      console.error('Failed to delete submission:', err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-gray-900">Contact Form Submissions</h1>
      <div className="bg-white rounded-2xl shadow-soft p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-pink-200">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id}>
                <td className="px-4 py-2">{new Date(sub.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{sub.name}</td>
                <td className="px-4 py-2">{sub.contactNumber}</td>
                <td className="px-4 py-2">{sub.email}</td>
                <td className="px-4 py-2">{sub.reason}</td>
                <td className="px-4 py-2">{sub.message}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(sub._id)}
                    disabled={deletingId === sub._id}
                    className="text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded transition-colors"
                  >
                    {deletingId === sub._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactSubmissions;
