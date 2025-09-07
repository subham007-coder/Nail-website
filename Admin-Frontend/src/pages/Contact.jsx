import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave } from 'react-icons/fi';
import Button from '../components/shared/Button';
import { apiRequest } from '../utils/api';

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
      const data = await apiRequest('/v1/contacts');
      setContactData(data);
      setEditedData(data);
    } catch (error) {
      console.error('Error fetching contact data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = await apiRequest('/v1/contacts', {
        method: 'PUT',
        body: JSON.stringify(editedData),
        headers: { 'Content-Type': 'application/json' },
      });
      setContactData(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating contact data:', error);
    }
  };

  const handleSectionUpdate = async (section, data) => {
    try {
      await apiRequest(`/v1/contacts/${section}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      fetchContactData();
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/contacts/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditedData(prev => ({ ...prev, formImage: data.url }));
      }
    } catch (err) {
      alert('Image upload failed');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-900">Contact Page Management</h1>
        <Button
          variant="primary"
          icon={editMode ? <FiSave /> : <FiEdit2 />}
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
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
                onChange={(e) =>
                  setEditedData({ ...editedData, header: { ...editedData.header, title: e.target.value } })
                }
                disabled={!editMode}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={editedData?.header?.subtitle || ''}
                onChange={(e) =>
                  setEditedData({ ...editedData, header: { ...editedData.header, subtitle: e.target.value } })
                }
                disabled={!editMode}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Form Section Content</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Heading</label>
              <input
                type="text"
                value={editedData?.formSection?.heading || ''}
                onChange={(e) =>
                  setEditedData({ ...editedData, formSection: { ...editedData.formSection, heading: e.target.value } })
                }
                disabled={!editMode}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subheading</label>
              <input
                type="text"
                value={editedData?.formSection?.subheading || ''}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    formSection: { ...editedData.formSection, subheading: e.target.value },
                  })
                }
                disabled={!editMode}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={editedData?.formSection?.description || ''}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    formSection: { ...editedData.formSection, description: e.target.value },
                  })
                }
                disabled={!editMode}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={!editMode}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200"
              />
              {editedData?.formImage && (
                <img
                  src={editedData.formImage}
                  alt="Form Section"
                  className="mt-2 w-32 h-32 object-contain rounded"
                />
              )}
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
                      form: { ...editedData.form, reasons: newReasons },
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
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    form: { ...editedData.form, privacyPolicyText: e.target.value },
                  })
                }
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
