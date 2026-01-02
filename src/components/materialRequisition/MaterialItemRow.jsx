import { Eye, Pencil, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function MaterialItemRow({ row, index }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-2 text-center">{index + 1}</td>
      <td className="p-2">{row.mrNo}</td>
      <td className="p-2">{row.mrDate}</td>
      <td className="p-2">{row.from}</td>
      <td className="p-2">{row.itemsFor}</td>
      <td className="p-2">{row.itemCode}</td>
      <td className="p-2">{row.itemName}</td>
      <td className="p-2 text-center">{row.unit}</td>
      <td className="p-2 text-center">{row.reqQty}</td>
      <td className="p-2 text-center">{row.stockQty}</td>
      <td className="p-2 text-center">{row.approvedQty}</td>

      <td className="p-2 text-center">
        {row.inspectionRequired ? "Yes" : "No"}
      </td>

      <td className="p-2 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.status === "Approved"
              ? "bg-green-100 text-green-700"
              : row.status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      </td>

      {/* ===== ACTIONS ===== */}
      <td className="p-2 text-center relative">
        {/* Desktop Icons */}
        <div className="hidden sm:flex justify-center gap-4 text-gray-500">
          <Eye
            size={16}
            className="cursor-pointer hover:text-black"
            onClick={() => console.log("View MR", row)}
          />
          <Pencil
            size={16}
            className="cursor-pointer hover:text-blue-600"
            onClick={() => console.log("Edit MR", row)}
          />
          <Trash2
            size={16}
            className="cursor-pointer text-red-600"
            onClick={() => console.log("Delete MR", row)}
          />
        </div>

        {/* Mobile 3-dot Menu */}
        <div className="sm:hidden flex justify-center">
          <MoreVertical
            size={18}
            className="cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>

        {/* Dropdown Menu */}
        {openMenu && (
          <div className="absolute right-6 mt-2 w-32 bg-white border rounded-lg shadow-lg z-20 sm:hidden">
            <button
              onClick={() => console.log("View MR", row)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Eye size={16} /> View
            </button>
            <button
              onClick={() => console.log("Edit MR", row)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              onClick={() => console.log("Delete MR", row)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 className="cursor-pointer text-red-600" size={16} /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
