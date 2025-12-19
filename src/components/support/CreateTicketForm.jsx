import { useState } from "react";

export default function CreateTicketForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "Low",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      id: "TKT-" + Math.floor(Math.random() * 10000),
      ...form,
      status: "Open",
      createdAt: new Date().toLocaleDateString(),
    };

    onSubmit(newTicket);
  };

  const inputStyle =
    "w-full border border-gray-300 bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300";

  return (
    <div className="border rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create Support Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Issue Title */}
        <input
          type="text"
          placeholder="Issue Title"
          className={inputStyle}
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Category */}
        <select
          className={inputStyle}
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option>Inventory Issue</option>
          <option>Stock Mismatch</option>
          <option>Order Processing</option>
          <option>System Bug</option>
          <option>Other</option>
        </select>

        {/* Priority */}
        <select
          className={inputStyle}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        {/* Description */}
        <textarea
          placeholder="Describe the issue..."
          className={`${inputStyle} min-h-[100px]`}
          required
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
