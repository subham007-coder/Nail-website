import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Table from '../components/shared/Table';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';

function Appointments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'customerName', title: 'Customer Name' },
    { key: 'service', title: 'Service' },
    { key: 'date', title: 'Date' },
    { key: 'time', title: 'Time' },
    { key: 'status', title: 'Status', 
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${row.status === 'Completed' ? 'bg-green-100 text-green-800' : 
            row.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'}`}>
          {row.status}
        </span>
      )
    },
    { key: 'actions', title: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleEdit(row)}
            className="p-1 text-gray-600 hover:text-pink-600"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row)}
            className="p-1 text-gray-600 hover:text-red-600"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      )
    },
  ];

  const sampleData = [
    {
      id: 'APT001',
      customerName: 'Sarah Smith',
      service: 'Classic Manicure',
      date: '2024-03-20',
      time: '10:00 AM',
      status: 'Upcoming'
    },
    // Add more sample data
  ];

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDelete = (appointment) => {
    // Add delete logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-900">Appointments</h1>
        <Button
          variant="primary"
          icon={<FiPlus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          New Appointment
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <Table 
          columns={columns} 
          data={sampleData}
          onRowClick={(row) => handleEdit(row)}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAppointment(null);
        }}
        title={selectedAppointment ? 'Edit Appointment' : 'New Appointment'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              {selectedAppointment ? 'Save Changes' : 'Create Appointment'}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                focus:ring-2 focus:ring-pink-100 outline-none transition-all"
            />
          </div>
          {/* Add more form fields */}
        </div>
      </Modal>
    </div>
  );
}

export default Appointments;