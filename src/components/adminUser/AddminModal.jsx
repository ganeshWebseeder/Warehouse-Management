import { useState } from "react";
import { X, User, Shield } from "lucide-react";

export default function AddAdminModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    password: "",
    modules: [],
  });

  const toggleModule = (module) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules.includes(module)
        ? prev.modules.filter((m) => m !== module)
        : [...prev.modules, module],
    }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    onSubmit({
      ...form,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-200 max-w-3xl rounded-xl shadow-xl flex flex-col max-h-[80vh]">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-black">
            Add New Admin
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* ===== BASIC INFORMATION ===== */}
          <div className="border border-[#E6DAD6] rounded-lg p-5">
            <div className="flex items-center gap-2 text-sm font-semibold mb-4">
              <User size={16} /> Basic Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                label="Email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <Input
                label="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <Select
                label="Status"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              />

              <div className="md:col-span-2">
                <Input
                  label="Password"
                  required
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* ===== MODULE ACCESS ===== */}
          <div className="border border-[#E6DAD6] rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Shield size={16} /> Module Access
              </div>
              <span className="text-xs text-gray-500">
                {form.modules.length} selected
              </span>
            </div>

            <div className="border border-[#E6DAD6] rounded-lg max-h-56 overflow-y-auto divide-y">
              {[
                "Dashboard",
                "Admin Users",
                "User Management",
                "Subscriptions",
                "Feedback",
                "Push Notifications",
              ].map((m) => (
                <label
                  key={m}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.modules.includes(m)}
                    onChange={() => toggleModule(m)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-black">
                      {m}
                    </p>
                    <p className="text-xs text-gray-500">
                      Access {m} module
                    </p>
                  </div>
                </label>
              ))}
            </div>
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
            className="px-4 py-2 bg-slate-950 text-white rounded-md hover:bg-slate-900"
          >
            Save Admin
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUTS ================= */

function Input({
  label,
  required,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="mt-1 w-full border border-[#E6DAD6] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
}

function Select({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 w-full border border-[#E6DAD6] rounded-md px-3 py-2 text-sm"
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>
  );
}
