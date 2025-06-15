import React from 'react';
import { Disclosure } from '@headlessui/react';
import RangeSlider from './RangeSlider';

const filterCategories = {
  availability: [
    { label: 'In stock', count: 179 },
    { label: 'Out of stock', count: 8 },
  ],
  type: [
    { label: 'Best Sellers', count: 25 },
    { label: 'Casual Wear Nails', count: 92 },
    { label: 'French Nails', count: 28 },
    { label: 'Ombre Nails', count: 9 },
  ],
  // ...add other categories
};

function ShopFilters({ filters, setFilters }) {
  const handlePriceChange = (newValues) => {
    setFilters({ ...filters, priceRange: newValues });
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="py-2">
        <h3 className="text-lg font-serif text-gray-900 mb-4">Price Range</h3>
        <RangeSlider
          min={0}
          max={699}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Filter Categories */}
      {Object.entries(filterCategories).map(([category, options]) => (
        <Disclosure key={category} defaultOpen={true}>
          {({ open }) => (
            <div className="space-y-2"> {/* Changed from <> to <div> */}
              <Disclosure.Button className="flex justify-between w-full text-lg font-serif text-gray-900">
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span className="transform transition-transform duration-200">
                  {open ? '−' : '+'}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="mt-4 space-y-2">
                {options.map((option) => (
                  <label key={option.label} className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-pink-600 
                               focus:ring-pink-500 focus:ring-offset-0"
                      checked={filters[category]?.includes(option.label)}
                      onChange={(e) => {
                        const newFilters = e.target.checked
                          ? [...(filters[category] || []), option.label]
                          : filters[category]?.filter((item) => item !== option.label);
                        setFilters({ ...filters, [category]: newFilters });
                      }}
                    />
                    <span className="ml-3 text-sm text-gray-600">
                      {option.label}
                      <span className="ml-1 text-gray-400">({option.count})</span>
                    </span>
                  </label>
                ))}
              </Disclosure.Panel>
            </div> /* Changed from </> to </div> */
          )}
        </Disclosure>
      ))}
    </div>
  );
}

export default ShopFilters;