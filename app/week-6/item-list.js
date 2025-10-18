"use client";
import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");
  let content;

  if (sortBy === "grouped") {
    const grouped = itemsData.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});

    const sortedCategories = Object.keys(grouped).sort();

    content = sortedCategories.map((category) => {
      const items = grouped[category].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return (
        <div key={category} className="mb-4">
          <h2 className="text-lg font-semibold capitalize mb-2">{category}</h2>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <Item {...item} />
              </li>
            ))}
          </ul>
        </div>
      );
    });
  } else {
    const sortedItems = [...itemsData].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    content = (
      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <li key={item.id}>
            <Item {...item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
            sortBy === "name"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
            sortBy === "category"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Sort by Category
        </button>

        <button
          onClick={() => setSortBy("grouped")}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
            sortBy === "grouped"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Group by Category
        </button>
      </div>
      {content}
    </div>
  );
}
