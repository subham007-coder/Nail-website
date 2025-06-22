import React, { useEffect, useState } from 'react';

function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://nail-website-backend.onrender.com/api/contact-submissions')
      .then(res => res.json())
      .then(data => {
        setSubmissions(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-gray-900">Contact Form Submissions</h1>
      <div className="bg-white rounded-2xl shadow-soft p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub._id}>
                <td className="px-4 py-2">{new Date(sub.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{sub.name}</td>
                <td className="px-4 py-2">{sub.contactNumber}</td>
                <td className="px-4 py-2">{sub.email}</td>
                <td className="px-4 py-2">{sub.reason}</td>
                <td className="px-4 py-2">{sub.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactSubmissions;