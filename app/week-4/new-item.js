"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => (prev < 20 ? prev + 1 : prev));
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-2xl shadow-md w-72 mx-auto">
      <h1 className="text-xl font-semibold text-gray-800">
        Shopping List Counter
      </h1>
      <h2 className="text-lg font-medium text-gray-700">Quantity</h2>

      <div className="flex items-center gap-4">
        <button
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

        <span className="text-2xl font-semibold text-gray-800 w-10 text-center">
          {quantity}
        </span>

        <button
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
    </div>
  );
}
