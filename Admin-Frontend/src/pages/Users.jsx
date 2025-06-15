import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone } from 'react-icons/fi';
import Table from '../components/shared/Table';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' },
    { 
      key: 'status', 
      title: 'Status',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 
            'bg-red-100 text-red-800'}`}>
          {row.status}
        </span>
      )
    },
    { 
      key: 'actions', 
      title: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="p-1 text-gray-600 hover:text-pink-600"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
            className="p-1 text-gray-600 hover:text-red-600"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    },
  ];

  const sampleUsers = [
    {
      id: 1,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+91 9876543210',
      status: 'Active'
    }
  ];

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    // Add delete logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-900">Users</h1>
        <Button
          variant="primary"
          icon={<FiPlus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <Table 
          columns={columns} 
          data={sampleUsers}
          onRowClick={(row) => handleEdit(row)}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        title={selectedUser ? 'Edit User' : 'Add User'}
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              {selectedUser ? 'Save Changes' : 'Create User'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                focus:ring-2 focus:ring-pink-100 outline-none transition-all"
              defaultValue={selectedUser?.name}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                focus:ring-2 focus:ring-pink-100 outline-none transition-all"
              defaultValue={selectedUser?.email}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                focus:ring-2 focus:ring-pink-100 outline-none transition-all"
              defaultValue={selectedUser?.phone}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                focus:ring-2 focus:ring-pink-100 outline-none transition-all"
              defaultValue={selectedUser?.status}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Users;