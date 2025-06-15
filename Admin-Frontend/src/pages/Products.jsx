import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiImage } from 'react-icons/fi';
import Table from '../components/shared/Table';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const columns = [
    { 
      key: 'image', 
      title: 'Image',
      render: (row) => (
        <img 
          src={row.image} 
          alt={row.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
      )
    },
    { key: 'name', title: 'Name' },
    { key: 'category', title: 'Category' },
    { 
      key: 'price', 
      title: 'Price',
      render: (row) => `₹${row.price}`
    },
    { 
      key: 'stock', 
      title: 'Stock',
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${row.stock > 10 ? 'bg-green-100 text-green-800' : 
            row.stock === 0 ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'}`}>
          {row.stock === 0 ? 'Out of Stock' : row.stock}
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

  const sampleData = [
    {
      id: 1,
      name: 'Classic French Tips',
      category: 'French Nails',
      price: 299,
      stock: 15,
      image: 'path-to-image'
    },
    // Add more sample data
  ];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (product) => {
    // Add delete logic
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-900">Products</h1>
        <Button
          variant="primary"
          icon={<FiPlus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
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
          setSelectedProduct(null);
          setImagePreview('');
        }}
        title={selectedProduct ? 'Edit Product' : 'Add Product'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              {selectedProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                  focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                defaultValue={selectedProduct?.name}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                  focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                defaultValue={selectedProduct?.category}
              >
                <option>French Nails</option>
                <option>Gel Nails</option>
                <option>Acrylic Nails</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                  focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                defaultValue={selectedProduct?.price}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-400 
                  focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                defaultValue={selectedProduct?.stock}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 
                border-dashed rounded-lg hover:border-pink-400 transition-colors">
                <div className="space-y-2 text-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                  ) : (
                    <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium 
                      text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 
                      focus-within:ring-offset-2 focus-within:ring-pink-500">
                      <span>Upload a new image</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Products;