import { Eye } from "lucide-react";

export default function TicketRow({ ticket, onView }) {
  const priorityStyle = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  const statusStyle = {
    Open: "bg-blue-100 text-blue-600",
    "In Progress": "bg-yellow-100 text-yellow-600",
    Resolved: "bg-green-100 text-green-600",
    Closed: "bg-gray-100 text-gray-600",
  };

  return (
    <tr className="hover:bg-[#FBF7F5]/60 transition">
      {/* TICKET ID */}
      <td className="px-5 py-4 font-medium text-gray-800">
        #{ticket.id}
      </td>

      {/* TITLE */}
      <td className="px-5 py-4">
        <p className="font-medium text-gray-900">
          {ticket.title}
        </p>
        {ticket.description && (
          <p className="text-xs text-gray-500">
            {ticket.description}
          </p>
        )}
      </td>

      {/* PRIORITY */}
      <td className="px-5 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            priorityStyle[ticket.priority]
          }`}
        >
          {ticket.priority}
        </span>
      </td>

      {/* STATUS */}
      <td className="px-5 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusStyle[ticket.status]
          }`}
        >
          {ticket.status}
        </span>
      </td>

      {/* CREATED DATE */}
      <td className="px-5 py-4 text-gray-500">
        {ticket.createdAt}
      </td>

      {/* ACTION */}
      <td className="px-5 py-4">
        <div className="flex justify-end">
          <Eye
            size={16}
            className="cursor-pointer text-gray-500 hover:text-black"
            onClick={() => onView(ticket)}
          />
        </div>
      </td>
    </tr>
  );
}
