import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

function AppointmentSubmissions() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/appointment-submissions');
      setAppointments(data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    setDeletingId(id);
    try {
      await apiRequest(`/api/appointment-submissions/${id}`, {
        method: 'DELETE',
      });
      setAppointments((prev) => prev.filter((apt) => apt._id !== id));
    } catch (err) {
      console.error('Failed to delete appointment:', err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-gray-900">Appointment Submissions</h1>
      <div className="bg-white rounded-2xl shadow-soft p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-pink-200">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt._id}>
                <td className="px-4 py-2">{new Date(apt.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{apt.name}</td>
                <td className="px-4 py-2">{apt.phone}</td>
                <td className="px-4 py-2">{apt.email}</td>
                <td className="px-4 py-2">{apt.service}</td>
                <td className="px-4 py-2">{apt.location}</td>
                <td className="px-4 py-2">{apt.address}</td>
                <td className="px-4 py-2">{apt.appointmentTime}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(apt._id)}
                    disabled={deletingId === apt._id}
                    className="text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded transition-colors"
                  >
                    {deletingId === apt._id ? 'Deleting...' : 'Delete'}
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

export default AppointmentSubmissions;