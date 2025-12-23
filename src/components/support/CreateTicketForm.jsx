import { useState } from "react";
import { X, FileText, Settings } from "lucide-react";

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
    onClose();
  };

  return (
    /* ===== MODAL OVERLAY ===== */
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      {/* ===== MODAL CONTAINER ===== */}
      <div className="bg-white w-200 max-w-3xl rounded-xl shadow-xl flex flex-col max-h-[80vh]">
        
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Create Support Ticket</h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* ===== Ticket Information ===== */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold mb-4">
              <FileText size={16} />
              Ticket Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Issue Title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <Select
                label="Category"
                required
                options={[
                  "Inventory Issue",
                  "Stock Mismatch",
                  "Order Processing",
                  "System Bug",
                  "Other",
                ]}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />

              <Select
                label="Priority"
                options={["Low", "Medium", "High", "Critical"]}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Description / Remark"
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* ===== Guidelines ===== */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Settings size={16} />
              Guidelines
            </div>
            <ul className="text-xs text-gray-500 list-disc ml-5 space-y-1">
              <li>Please provide clear issue details</li>
              <li>Attach screenshots if possible</li>
              <li>High priority issues are handled first</li>
            </ul>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
          >
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUTS ================= */

function Input({ label, required, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        onChange={onChange}
        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
}

function Select({ label, options, required, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        onChange={onChange}
        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Textarea({ label, required, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[100px] bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
}
