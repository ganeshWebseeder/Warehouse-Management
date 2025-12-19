export default function TicketRow({ ticket, onView }) {
  const statusColor = {
    Open: "text-yellow-600",
    "In Progress": "text-blue-600",
    Resolved: "text-green-600",
    Closed: "text-gray-600",
  };

  return (
    <tr className="border-t">
      <td className="p-3">{ticket.id}</td>
      <td className="p-3">{ticket.title}</td>
      <td className="p-3 text-center">{ticket.priority}</td>
      <td className={`p-3 text-center ${statusColor[ticket.status]}`}>
        {ticket.status}
      </td>
      <td className="p-3 text-center">{ticket.createdAt}</td>
      <td className="p-3 text-center">
        <button
          onClick={() => onView(ticket)}
          className="text-blue-600 hover:underline"
        >
          View
        </button>
      </td>
    </tr>
  );
}
