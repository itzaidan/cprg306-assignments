"use client";
import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");

  const increment = () => {
    setQuantity((prev) => (prev < 20 ? prev + 1 : prev));
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const reset = () => {
    setQuantity(1);
    setName("");
    setCategory("produce");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    const item = { id, name, quantity, category };
    if (typeof onAddItem === "function") onAddItem(item);
    reset();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-2xl shadow-md w-80 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-4"
      >
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          className="w-full p-2 rounded-md border border-gray-300 text-black"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 text-black"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="household">Household</option>
          <option value="dry goods">Dry Goods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
        </select>

        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity === 1}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              quantity === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            -
          </button>

          <span className="text-2xl font-semibold text-gray-800 w-12 text-center">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increment}
            disabled={quantity === 20}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              quantity === 20
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            +
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            Add Item
          </button>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-red-500 transition-colors duration-200 hover:text-white"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
