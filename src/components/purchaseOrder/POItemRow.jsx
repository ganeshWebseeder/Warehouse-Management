import { Eye, Pencil, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function POItemRow({ row, index, onAction }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <tr className="border-t text-center text-sm hover:bg-gray-50 transition">

      {/* SR NO */}
      <td className="p-2">{index + 1}</td>

      {/* PO DETAILS */}
      <td className="p-2">{row.date || "19/11/2025"}</td>
      <td className="p-2">{row.poNo}</td>
      <td className="p-2">{row.mrNo || "843"}</td>

      <td className="p-2">{row.vendor || "VENDOR NAME"}</td>
      <td className="p-2">{row.itemName || "ITEM NAME"}</td>
      <td className="p-2">{row.itemCode || "CODE"}</td>

      <td className="p-2">{row.qty || 1}</td>
      <td className="p-2">{row.pendingQty ?? row.qty ?? 1}</td>

      <td className="p-2">{row.total}</td>

      {/* STATUS */}
      <td className="p-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.status === "Approved"
              ? "bg-green-100 text-green-700"
              : row.status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status || "Approved"}
        </span>
      </td>

      {/* APPROVE TOGGLE */}
      <td className="p-2">
        <input
          type="checkbox"
          defaultChecked={row.status === "Approved"}
          className="w-5 h-5 cursor-pointer"
        />
      </td>

      {/* ===== RESPONSIVE ACTIONS ===== */}
      <td className="p-2 relative">
        {/* Desktop Icons */}
        <div className="hidden sm:flex justify-center gap-4 text-gray-500">
          <Eye
            size={16}
            className="cursor-pointer hover:text-black"
            title="View"
            onClick={() => onAction("view", row)}
          />
          <Pencil
            size={16}
            className="cursor-pointer hover:text-blue-600"
            title="Edit"
            onClick={() => onAction("edit", row)}
          />
          <Trash2
            size={16}
            className="cursor-pointer text-red-600"
            title="Delete"
            onClick={() => onAction("delete", row)}
          />
        </div>

        {/* Mobile 3-dot */}
        <div className="sm:hidden flex justify-center">
          <MoreVertical
            size={18}
            className="cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>

        {/* Mobile Dropdown */}
        {openMenu && (
          <div className="absolute right-4 mt-2 w-32 bg-white border rounded-lg shadow-lg z-30 sm:hidden">
            <button
              onClick={() => onAction("view", row)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Eye size={14} /> View
            </button>

            <button
              onClick={() => onAction("edit", row)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Pencil size={14} /> Edit
            </button>

            <button
              onClick={() => onAction("delete", row)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
