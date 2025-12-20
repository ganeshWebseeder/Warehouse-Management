import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../store/pageSlice";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Shield,
  X,
} from "lucide-react";

import AddAdminModal from "../components/adminUser/AddminModal.jsx";

export default function AdminUsers() {
  const dispatch = useDispatch();

  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [admins, setAdmins] = useState([]);

  // Action modal state
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [actionType, setActionType] = useState(null); // view | edit | delete

  useEffect(() => {
    dispatch(
      setPage({
        title: "Admin Users",
        subTitle: "User Management",
      })
    );
  }, [dispatch]);

  const handleAddAdmin = (newAdmin) => {
    setAdmins((prev) => [
      ...prev,
      {
        ...newAdmin,
        id: Date.now(),
        createdAt: "12/20/2025",
        role: "Admin",
      },
    ]);
  };

  const openAction = (admin, type) => {
    setSelectedAdmin(admin);
    setActionType(type);
  };

  const closeAction = () => {
    setSelectedAdmin(null);
    setActionType(null);
  };

  const handleDelete = () => {
    setAdmins((prev) =>
      prev.filter((a) => a.id !== selectedAdmin.id)
    );
    closeAction();
  };

  const handleUpdateAdmin = (updatedAdmin) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === updatedAdmin.id ? updatedAdmin : a
      )
    );
    closeAction();
  };

  return (
    <div className="p-6 bg-[#fffdfb] min-h-screen ml-18">
      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-xl p-6 mb-6 border border-[#E6DAD6]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Admin User Management
          </h1>

          <button
            onClick={() => setShowAddAdmin(true)}
            className="flex items-center gap-2 bg-slate-950 text-white px-4 py-2 rounded-lg hover:bg-slate-950/60"
          >
            <Plus size={16} /> Add Admin User
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
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
            {admins.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No admin users added yet
                </td>
              </tr>
            )}

            {admins.map((admin) => (
              <AdminRow
                key={admin.id}
                admin={admin}
                onView={() => openAction(admin, "view")}
                onEdit={() => openAction(admin, "edit")}
                onDelete={() => openAction(admin, "delete")}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ADD ADMIN MODAL ================= */}
      {showAddAdmin && (
        <AddAdminModal
          onClose={() => setShowAddAdmin(false)}
          onSubmit={handleAddAdmin}
        />
      )}

      {/* ================= ACTION MODALS ================= */}
      {actionType && (
        <Modal onClose={closeAction}>
          {actionType === "view" && <ViewAdmin admin={selectedAdmin} />}
          {actionType === "edit" && (
            <EditAdmin
              admin={selectedAdmin}
              onSave={handleUpdateAdmin}
              onCancel={closeAction}
            />
          )}
          {actionType === "delete" && (
            <DeleteAdmin
              admin={selectedAdmin}
              onCancel={closeAction}
              onConfirm={handleDelete}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

/* ================= ROW ================= */

function AdminRow({ admin, onView, onEdit, onDelete }) {
  return (
    <tr>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EAD6CF] flex items-center justify-center">
            <Shield size={18} />
          </div>
          <div>
            <p className="font-medium">{admin.name}</p>
            <p className="text-xs text-gray-500">{admin.email}</p>
          </div>
        </div>
      </td>

      <td className="px-5">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            admin.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {admin.status}
        </span>
      </td>

      <td className="px-5">
        <div className="flex gap-2 flex-wrap">
          {(admin.modules || []).map((m, i) => (
            <span
              key={i}
              className="bg-[#FBF7F5] border border-[#E6DAD6] px-3 py-1 rounded-full text-xs"
            >
              {m}
            </span>
          ))}
        </div>
      </td>

      <td className="px-5 text-gray-500">{admin.createdAt}</td>

      <td className="px-5">
        <div className="flex justify-end gap-4 text-gray-500">
          <Eye onClick={onView} size={16} className="cursor-pointer hover:text-black" />
          <Pencil onClick={onEdit} size={16} className="cursor-pointer hover:text-black" />
          <Trash2 onClick={onDelete} size={16} className="cursor-pointer hover:text-red-600" />
        </div>
      </td>
    </tr>
  );
}

/* ================= MODAL ================= */

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ================= MODAL CONTENT ================= */

function ViewAdmin({ admin }) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Admin Details</h2>
      <p><b>Name:</b> {admin.name}</p>
      <p><b>Email:</b> {admin.email}</p>
      <p><b>Status:</b> {admin.status}</p>
      <p><b>Role:</b> {admin.role}</p>
    </>
  );
}

/* ===== UPDATED EDIT MODAL WITH MORE CONTENT ===== */

function EditAdmin({ admin, onSave, onCancel }) {
  const [form, setForm] = useState({ ...admin });

  const modulesList = [
    "User Management",
    "Admin Users",
    "Subscriptions",
    "Reports",
    "Support",
    "Settings",
  ];

  const toggleModule = (module) => {
    setForm((prev) => ({
      ...prev,
      modules: prev.modules?.includes(module)
        ? prev.modules.filter((m) => m !== module)
        : [...(prev.modules || []), module],
    }));
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">
        Update Admin User
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          placeholder="Full Name"
        />

        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
          placeholder="Email"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded"
        >
          <option>Admin</option>
          <option>Super Admin</option>
          <option>Support</option>
        </select>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Module Access</p>
        <div className="grid grid-cols-2 gap-2">
          {modulesList.map((module) => (
            <label key={module} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.modules?.includes(module)}
                onChange={() => toggleModule(module)}
              />
              {module}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onCancel} className="border px-4 py-2 rounded">
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Update Admin
        </button>
      </div>
    </>
  );
}

function DeleteAdmin({ admin, onCancel, onConfirm }) {
  return (
    <>
      <h2 className="text-lg font-semibold text-red-600 mb-4">
        Delete Admin
      </h2>
      <p>
        Are you sure you want to delete <b>{admin.name}</b>?
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onCancel} className="border px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </>
  );
}
