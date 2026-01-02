import { Pencil, Trash2, Eye } from "lucide-react";

export default function MaterialItemRow({
  row,
  index,
  onView,
  onEdit,
  onDelete,
}) {
  const isLocked = row.status === "Issued";

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-5 py-3 text-right">{index + 1}</td>
      <td className="px-5 py-3 text-right">{row.mrNo}</td>
      <td className="px-5 py-3 text-right">{row.itemName}</td>
      <td className="px-5 py-3 text-right">{row.reqQty}</td>
      <td className="px-5 py-3 text-right">{row.status}</td>

      <td className="px-5 py-3 text-right">
        <div className="flex justify-end gap-3">

          {/* VIEW 👁 */}
          <button
            onClick={() => onView(row)}
            className="text-gray-600 hover:text-black"
            title="View"
          >
            <Eye size={16} />
          </button>

          {/* EDIT ✏️ */}
          <button
            onClick={() => onEdit(row)}
            disabled={isLocked}
            className={
              isLocked
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
            }
            title="Edit"
          >
            <Pencil size={16} />
          </button>

          {/* DELETE 🗑 */}
          <button
            onClick={() => onDelete(row.id)}
            disabled={isLocked}
            className={
              isLocked
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-600 hover:text-red-800"
            }
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
