import React, { useState } from 'react';
import { FiEye, FiPackage } from 'react-icons/fi';
import Table from '../components/shared/Table';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';

function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const columns = [
    { key: 'id', title: 'Order ID' },
    { key: 'customerName', title: 'Customer' },
    { 
      key: 'date', 
      title: 'Date',
      render: (row) => new Date(row.date).toLocaleDateString()
    },
    { 
      key: 'total', 
      title: 'Total',
      render: (row) => `₹${row.total}`
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${row.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
            row.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
            'bg-blue-100 text-blue-800'}`}>
          {row.status}
        </span>
      )
    },
    { 
      key: 'actions', 
      title: 'Actions',
      render: (row) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleViewOrder(row);
          }}
          className="p-1 text-gray-600 hover:text-pink-600"
        >
          <FiEye className="w-4 h-4" />
        </button>
      )
    },
  ];

  const sampleOrders = [
    {
      id: 'ORD001',
      customerName: 'Sarah Smith',
      date: '2024-03-15',
      total: 599,
      status: 'Processing',
      items: [
        { name: 'Classic French Tips', quantity: 1, price: 299 },
        { name: 'Glitter Ombre', quantity: 1, price: 300 }
      ]
    }
  ];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-900">Orders</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <Table 
          columns={columns} 
          data={sampleOrders}
          onRowClick={(row) => handleViewOrder(row)}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        title={`Order Details - ${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Customer Details</h3>
                <p className="text-gray-600">{selectedOrder.customerName}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Order Status</h3>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                    focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                  defaultValue={selectedOrder.status}
                >
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="2" className="px-6 py-4 text-right font-medium">Total</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{selectedOrder.total}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="primary">
                Update Order
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Orders;