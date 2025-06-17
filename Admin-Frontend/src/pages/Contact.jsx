import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave } from 'react-icons/fi';
import Button from '../components/shared/Button';

function Contact() {
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('https://nail-website-backend.onrender.com/api/contact');
      const data = await response.json();
      setContactData(data);
      setEditedData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching contact data:', error);
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('https://nail-website-backend.onrender.com/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setContactData(updatedData);
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating contact data:', error);
    }
  };

  const handleSectionUpdate = async (section, data) => {
    try {
      const response = await fetch(`https://nail-website-backend.onrender.com/api/contact/${section}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchContactData(); // Refresh data after update
      }
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-900">Contact Page Management</h1>
        <Button
          variant="primary"
          icon={editMode ? <FiSave /> : <FiEdit2 />}
          onClick={() => editMode ? handleSave() : setEditMode(true)}
        >
          {editMode ? 'Save Changes' : 'Edit Page'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Header Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={editedData?.header?.title || ''}
                onChange={(e) => setEditedData({
                  ...editedData,
                  header: { ...editedData.header, title: e.target.value }
                })}
                disabled={!editMode}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 
                  focus:border-pink-400 focus:ring-2 focus:ring-pink-100 
                  outline-none transition-all disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={editedData?.header?.subtitle || ''}
                onChange={(e) => setEditedData({
                  ...editedData,
                  header: { ...editedData.header, subtitle: e.target.value }
                })}
                disabled={!editMode}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 
                  focus:border-pink-400 focus:ring-2 focus:ring-pink-100 
                  outline-none transition-all disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
          <div className="space-y-6">
            {editedData?.contactInfo?.map((info, index) => (
              <div key={index} className="space-y-4 pb-6 border-b last:border-0">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Icon Type</label>
                  <select
                    value={info.icon}
                    onChange={(e) => {
                      const newContactInfo = [...editedData.contactInfo];
                      newContactInfo[index] = { ...info, icon: e.target.value };
                      setEditedData({ ...editedData, contactInfo: newContactInfo });
                    }}
                    disabled={!editMode}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200"
                  >
                    <option value="mail">Mail</option>
                    <option value="phone">Phone</option>
                    <option value="chat">Chat</option>
                    <option value="location">Location</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={info.title}
                    onChange={(e) => {
                      const newContactInfo = [...editedData.contactInfo];
                      newContactInfo[index] = { ...info, title: e.target.value };
                      setEditedData({ ...editedData, contactInfo: newContactInfo });
                    }}
                    disabled={!editMode}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Items</label>
                  {info.items.map((item, itemIndex) => (
                    <input
                      key={itemIndex}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newContactInfo = [...editedData.contactInfo];
                        newContactInfo[index].items[itemIndex] = e.target.value;
                        setEditedData({ ...editedData, contactInfo: newContactInfo });
                      }}
                      disabled={!editMode}
                      className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Settings Section */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Form Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Enquiry Reasons</label>
              {editedData?.form?.reasons?.map((reason, index) => (
                <input
                  key={index}
                  type="text"
                  value={reason}
                  onChange={(e) => {
                    const newReasons = [...editedData.form.reasons];
                    newReasons[index] = e.target.value;
                    setEditedData({
                      ...editedData,
                      form: { ...editedData.form, reasons: newReasons }
                    });
                  }}
                  disabled={!editMode}
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200"
                />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Privacy Policy Text</label>
              <input
                type="text"
                value={editedData?.form?.privacyPolicyText || ''}
                onChange={(e) => setEditedData({
                  ...editedData,
                  form: { ...editedData.form, privacyPolicyText: e.target.value }
                })}
                disabled={!editMode}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;