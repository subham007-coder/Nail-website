import React, { useMemo } from 'react';
import { Disclosure } from '@headlessui/react';
import RangeSlider from './RangeSlider';

/**
 * Sidebar filters for Shop page
 * - Shows Price Range
 * - Shows dynamic Categories (from API)
 */
function ShopFilters({
  filters,
  setFilters,
  categories = [],
  activeCategoryId = '',
  onCategorySelect,
}) {
  const handlePriceChange = (newValues) => {
    setFilters({ ...filters, priceRange: newValues });
  };

  // Flatten one level if categories have children
  const flatCategories = useMemo(() => {
    const items = Array.isArray(categories)
      ? categories.flatMap((c) =>
          Array.isArray(c.children) && c.children.length ? c.children : [c]
        )
      : [];
    return items;
  }, [categories]);

  return (
    <div className="space-y-8">
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

      {/* Categories */}
      {/* <Disclosure defaultOpen={true}>
        {({ open }) => (
          <div className="space-y-3">
            <Disclosure.Button className="flex justify-between w-full text-lg font-serif text-gray-900">
              <span>Categories</span>
              <span className="transform transition-transform duration-200">
                {open ? '−' : '+'}
              </span>
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2 space-y-2">
              {flatCategories.length === 0 ? (
                <p className="text-sm text-gray-500">No categories found.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {flatCategories.map((cat) => {
                    const cid = cat?._id || cat?.id;
                    const label =
                      (typeof cat?.name === 'object' ? cat?.name?.en : cat?.name) ||
                      cat?.title ||
                      'Unnamed';
                    const active = cid === activeCategoryId;
                    return (
                      <button
                        key={cid}
                        onClick={() => onCategorySelect?.(cid, label)}
                        className={
                          'w-full text-left px-3 py-2 rounded-lg border text-sm transition ' +
                          (active
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-rose-400')
                        }
                        title={label}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure> */}

      <Disclosure defaultOpen={true}>
  {({ open }) => (
    <div className="space-y-3">
      <Disclosure.Button className="flex justify-between w-full text-lg font-serif text-gray-900">
        <span>Categories</span>
        <span className="transform transition-transform duration-200">
          {open ? '−' : '+'}
        </span>
      </Disclosure.Button>
      <Disclosure.Panel className="mt-2 space-y-2">
        {flatCategories.length === 0 ? (
          <p className="text-sm text-gray-500">No categories found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {flatCategories.map((cat) => {
             // console.log("Category object:", cat); // <-- log each category

              const cid = cat?._id || cat?.id;
              const label =
                (typeof cat?.name === 'object' ? cat?.name?.en : cat?.name) ||
                cat?.title ||
                'Unnamed';
              const active = cid === activeCategoryId;

              return (
                <button
                  key={cid}
                  onClick={() => onCategorySelect?.(cid, label)}
                  className={
                    'flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg border text-sm transition ' +
                    (active
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-rose-400')
                  }
                  title={label}
                >
                  {/* Category image (optional) */}
                  {cat?.icon && (
                    <img
                      src={cat.icon}
                      alt={label}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  )}

                  {/* Category name */}
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </Disclosure.Panel>
    </div>
  )}
</Disclosure>

    </div>
  );
}

export default ShopFilters;