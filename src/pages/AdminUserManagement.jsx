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

/* -------------------------------------------------
   MAIN COMPONENT
-------------------------------------------------- */
export default function AdminUsers() {
  const dispatch = useDispatch();

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [modalType, setModalType] = useState(null); // view | edit | delete

  useEffect(() => {
    dispatch(
      setPage({
        title: "Admin Users",
        subTitle: "User Management",
      })
    );
  }, [dispatch]);

  const openModal = (admin, type) => {
    setSelectedAdmin(admin);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedAdmin(null);
    setModalType(null);
  };

  return (
    <div className="p-6  bg-[#fffdfb] min-h-screen bg ml-16 md:ml-10 transition-all duration-300">
      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-xl p-6 mb-6 border border-[#E6DAD6]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">
            Admin User Management
          </h1>

          <button className="flex items-center gap-2 bg-slate-950 text-white px-4 py-2 rounded-lg hover:bg-slate-950/70">
            <Plus size={16} /> Add Admin User
          </button>
        </div>

        <div className="mt-4 border-b border-[#E6DAD6]">
          <button className="pb-2 font-medium border-b-2 border-slate-950">
            Admin Users
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Admins", value: 3 },
          { label: "Active Admins", value: 2 },
          { label: "Inactive Admins", value: 1 },
          { label: "Active Modules", value: 16 },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-[#E6DAD6] rounded-xl p-5"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ================= SEARCH ================= */}
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

      {/* ================= TABLE ================= */}
      <div className="bg-white border border-[#E6DAD6] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F5] text-gray-600">
            <tr>
              <th className="text-left px-6 py-4">ADMIN</th>
              <th className="text-left px-6 py-4">STATUS</th>
              <th className="text-left px-6 py-4">MODULE ACCESS</th>
              <th className="text-left px-6 py-4">CREATED</th>
              <th className="text-right px-6 py-4">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {ADMINS.map((admin, i) => (
              <AdminRow
                key={i}
                admin={admin}
                onView={() => openModal(admin, "view")}
                onEdit={() => openModal(admin, "edit")}
                onDelete={() => openModal(admin, "delete")}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {modalType && (
        <Modal onClose={closeModal}>
          {modalType === "view" && <ViewAdmin admin={selectedAdmin} />}
          {modalType === "edit" && <EditAdmin admin={selectedAdmin} />}
          {modalType === "delete" && (
            <DeleteAdmin admin={selectedAdmin} onClose={closeModal} />
          )}
        </Modal>
      )}
    </div>
  );
}

/* -------------------------------------------------
   ADMIN ROW
-------------------------------------------------- */
function AdminRow({ admin, onView, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-[#FBF7F5]/60 transition">
      {/* ADMIN */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield size={18} className="text-blue-700" />
          </div>

          <div>
            <p className="font-semibold">{admin.name}</p>
            <p className="text-xs text-gray-500">{admin.email}</p>
            <p className="text-xs text-gray-400">{admin.phone}</p>
          </div>
        </div>
      </td>

      {/* STATUS */}
      <td className="px-6">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            admin.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {admin.status}
        </span>
      </td>

      {/* MODULE ACCESS */}
      <td className="px-6">
        <div className="flex flex-wrap gap-2">
          {admin.modules.map((m, i) => (
            <span
              key={i}
              className="bg-[#F4F6FA] border border-gray-200 px-3 py-1 rounded-full text-xs"
            >
              {m}
            </span>
          ))}
          {admin.extra && (
            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
              {admin.extra}
            </span>
          )}
        </div>
      </td>

      {/* CREATED */}
      <td className="px-6 text-gray-500">12/20/2025</td>

      {/* ACTIONS */}
      <td className="px-6">
        <div className="flex justify-end gap-4 text-gray-500">
          <Eye onClick={onView} size={16} className="cursor-pointer hover:text-black" />
          <Pencil onClick={onEdit} size={16} className="cursor-pointer hover:text-black" />
          <Trash2 onClick={onDelete} size={16} className="cursor-pointer hover:text-red-600" />
        </div>
      </td>
    </tr>
  );
}

/* -------------------------------------------------
   MODAL WRAPPER
-------------------------------------------------- */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------
   MODAL CONTENT
-------------------------------------------------- */
function ViewAdmin({ admin }) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Admin Details</h2>
      <p><b>Name:</b> {admin.name}</p>
      <p><b>Email:</b> {admin.email}</p>
      <p><b>Phone:</b> {admin.phone}</p>
      <p><b>Status:</b> {admin.status}</p>
    </>
  );
}

function EditAdmin({ admin }) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Edit Admin</h2>
      <input defaultValue={admin.name} className="border w-full p-2 rounded mb-3" />
      <input defaultValue={admin.email} className="border w-full p-2 rounded mb-3" />
      <button className="bg-black text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </>
  );
}

function DeleteAdmin({ admin, onClose }) {
  return (
    <>
      <h2 className="text-lg font-semibold text-red-600 mb-4">
        Delete Admin
      </h2>
      <p>
        Are you sure you want to delete <b>{admin.name}</b>?
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="border px-4 py-2 rounded">
          Cancel
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </>
  );
}

/* -------------------------------------------------
   DUMMY DATA
-------------------------------------------------- */
const ADMINS = [
  {
    name: "John Manager",
    email: "john@admin.com",
    phone: "+91-9876543211",
    status: "active",
    modules: ["All Users", "Properties", "User Feedback"],
  },
  {
    name: "Sarah Support",
    email: "sarah@admin.com",
    phone: "+91-9876543212",
    status: "inactive",
    modules: ["User Feedback", "Push Notifications"],
  },
  {
    name: "Super Admin",
    email: "super@admin.com",
    phone: "+91-9876543210",
    status: "active",
    modules: ["All Users", "Administrators", "Subscriptions"],
    extra: "+3",
  },
];
