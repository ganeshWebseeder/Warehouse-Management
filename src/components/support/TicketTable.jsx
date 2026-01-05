import { Eye, Pencil, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function TicketTable({
  tickets,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="w-full border-collapse text-sm">

        {/* HEADER */}
        <thead className="bg-[#FBF7F5] text-gray-600">
          <tr>
            <th className="p-2">Ticket ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {tickets.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-gray-500">
                No tickets found
              </td>
            </tr>
          )}

          {tickets.map((ticket) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= ROW ================= */

function TicketRow({ ticket, onView, onEdit, onDelete }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <tr className="border-t text-center hover:bg-gray-50 transition">

      <td className="p-2">{ticket.id}</td>
      <td className="p-2">{ticket.title}</td>
      <td className="p-2">{ticket.category}</td>
      <td className="p-2">{ticket.priority}</td>
      <td className="p-2">{ticket.status}</td>
      <td className="p-2">{ticket.createdAt}</td>

      {/* ===== ACTIONS (SAME AS PO TABLE) ===== */}
      <td className="p-2 relative">

        {/* Desktop Icons */}
        <div className="hidden sm:flex justify-center gap-4 text-gray-500">
          <Eye
            size={16}
            className="cursor-pointer hover:text-black"
            title="View"
            onClick={() => onView(ticket)}
          />
          <Pencil
            size={16}
            className="cursor-pointer hover:text-blue-600"
            title="Edit"
            onClick={() => onEdit(ticket)}
          />
          <Trash2
            size={16}
            className="cursor-pointer text-red-600"
            title="Delete"
            onClick={() => onDelete(ticket.id)}
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
              onClick={() => onView(ticket)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Eye size={14} /> View
            </button>

            <button
              onClick={() => onEdit(ticket)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Pencil size={14} /> Edit
            </button>

            <button
              onClick={() => onDelete(ticket.id)}
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
