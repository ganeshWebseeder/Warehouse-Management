import { Search, Plus, Eye, Pencil, Trash2, Shield } from "lucide-react";

export default function AdminUsers() {
  return (
    <div className="p-6 bg-[#fffdfb] min-h-screen">

      {/* Header */}
      <div className="bg-white rounded-xl p-6 mb-6 border border-[#E6DAD6]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">
            Admin User Management
          </h1>

          <button className="flex items-center gap-2 bg-slate-950 text-white px-4 py-2 rounded-lg hover:bg-slate-950/60">
            <Plus size={16} /> Add Admin User
          </button>
        </div>

        <div className="mt-4 border-b border-[#E6DAD6]">
          <button className="pb-2 text-slate-950 font-medium border-b-2 border-slate-950">
            Admin Users
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Admins", value: 3 },
          { label: "Active Admins", value: 2 },
          { label: "Inactive Admins", value: 1 },
          { label: "Active Modules", value: 13 },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-[#E6DAD6] rounded-xl p-5">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-semibold text-black">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-[#E6DAD6] mb-4 flex gap-3">
        <div className="flex items-center gap-2 flex-1 border border-[#E6DAD6] rounded-lg px-3">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search admins..."
            className="w-full py-2 outline-none text-sm"
          />
        </div>

        <select className="border border-[#E6DAD6] rounded-lg px-3 text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6DAD6] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F5] text-gray-600">
            <tr>
              <th className="text-left px-5 py-3">ADMIN</th>
              <th className="text-left px-5 py-3">STATUS</th>
              <th className="text-left px-5 py-3">MODULE ACCESS</th>
              <th className="text-left px-5 py-3">CREATED</th>
              <th className="text-right px-5 py-3">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {/* Row */}
            <AdminRow
              name="John Manager"
              email="john@admin.com"
              status="active"
              modules={["User Management", "Property Lists", "Feedback"]}
            />

            <AdminRow
              name="Sarah Support"
              email="sarah@admin.com"
              status="inactive"
              modules={["Feedback", "Push Notifications"]}
            />

            <AdminRow
              name="Super Admin"
              email="super@admin.com"
              status="active"
              modules={["User Management", "Admin Users", "Subscriptions"]}
              extra="+3"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminRow({ name, email, status, modules, extra }) {
  return (
    <tr>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EAD6CF] flex items-center justify-center">
            <Shield size={18} className="text-slate-950" />
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-gray-500 text-xs">{email}</p>
          </div>
        </div>
      </td>

      <td className="px-5">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="px-5">
        <div className="flex gap-2 flex-wrap">
          {modules.map((m, i) => (
            <span
              key={i}
              className="bg-[#FBF7F5] border border-[#E6DAD6] text-black px-3 py-1 rounded-full text-xs"
            >
              {m}
            </span>
          ))}
          {extra && (
            <span className="bg-gray-100 px-2 rounded-full text-xs">
              {extra}
            </span>
          )}
        </div>
      </td>

      <td className="px-5 text-gray-500">12/19/2025</td>

      <td className="px-5">
        <div className="flex justify-end gap-3 text-gray-500">
          <Eye size={16} />
          <Pencil size={16} />
          <Trash2 size={16} />
        </div>
      </td>
    </tr>
  );
}
