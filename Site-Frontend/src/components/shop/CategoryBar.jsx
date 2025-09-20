import React from "react";

// Simple horizontal category list
function CategoryBar({ categories = [], activeId, onSelect }) {
  // Flatten one level if categories have children arrays
  const items = Array.isArray(categories)
    ? categories.flatMap((c) => (Array.isArray(c.children) && c.children.length ? c.children : [c]))
    : [];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-3">
      <div className="flex gap-2 min-w-max">
        {items.map((cat) => (
          <button
            key={cat?._id || cat?.id}
            onClick={() => onSelect?.(cat?._id || cat?.id, cat?.name?.en || cat?.name || cat?.title || "")}
            className={
              "px-3 py-1.5 rounded-full border text-sm transition " +
              ((cat?._id || cat?.id) === activeId
                ? "bg-rose-600 text-white border-rose-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-rose-400")
            }
            title={typeof cat?.name === "object" ? cat?.name?.en || "" : cat?.name}
          >
            {typeof cat?.name === "object" ? cat?.name?.en || cat?.name?.default || "" : cat?.name || "Unnamed"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;