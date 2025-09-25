import React from "react";
import { Disclosure } from "@headlessui/react";
import RangeSlider from "./RangeSlider";

function ShopFilters({
  filters,
  setFilters,
  categories = [],
  activeCategoryId = "",
  onCategorySelect,
}) {
  const handlePriceChange = (newValues) => {
    setFilters({ ...filters, priceRange: newValues });
  };

  // Recursive category render function
  const renderCategories = (cats = [], level = 0, parentIcon = null) => {
    return (
      <div className="flex flex-col gap-2 pl-2">
        {cats.map((cat) => {
          const cid = cat?._id || cat?.id;
          const label =
            (typeof cat?.name === "object" ? cat?.name?.en : cat?.name) ||
            cat?.title ||
            "Unnamed";
          const active = cid === activeCategoryId;

          // যদি icon না থাকে, parentIcon ব্যবহার করো
          const iconToUse = cat?.icon || parentIcon;

          return (
            <Disclosure key={cid} defaultOpen={false}>
              {({ open }) => (
                <div className="space-y-1">
                  <Disclosure.Button
                    onClick={() => {
                      // শুধু leaf node হলে select হবে
                      if (!cat.children?.length) {
                        onCategorySelect?.(cid, label);
                      }
                    }}
                    className={
                      "flex items-center justify-between gap-2 w-full px-3 py-2 rounded-lg border text-sm transition " +
                      (active
                        ? "bg-rose-600 text-white border-rose-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-rose-400")
                    }
                    title={label}
                  >
                    <div className="flex items-center gap-2">
                      {/* যেকোনো level এ icon আসবে (যদি না থাকে parentIcon use করবে) */}
                      {iconToUse && (
                        <img
                          src={iconToUse}
                          alt={label}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      )}
                      {label}
                    </div>
                    {cat?.children?.length > 0 && (
                      <span className="transform transition-transform duration-200">
                        {open ? "−" : "+"}
                      </span>
                    )}
                  </Disclosure.Button>

                  {cat?.children?.length > 0 && (
                    <Disclosure.Panel className="ml-4 border-l pl-3 space-y-1">
                      {renderCategories(cat.children, level + 1, iconToUse)}
                    </Disclosure.Panel>
                  )}
                </div>
              )}
            </Disclosure>
          );
        })}
      </div>
    );
  };

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
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <div className="space-y-3">
            <Disclosure.Button className="flex justify-between w-full text-lg font-serif text-gray-900">
              <span>Categories</span>
              <span className="transform transition-transform duration-200">
                {open ? "−" : "+"}
              </span>
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2 space-y-2">
              {categories.length === 0 ? (
                <p className="text-sm text-gray-500">No categories found.</p>
              ) : (
                renderCategories(categories, 0, null)
              )}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}

export default ShopFilters;