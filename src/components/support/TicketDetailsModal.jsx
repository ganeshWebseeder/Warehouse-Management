export default function TicketDetailsModal({ ticket, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">Ticket Details</h2>

        <p className="text-sm"><b>ID:</b> {ticket.id}</p>
        <p className="text-sm"><b>Title:</b> {ticket.title}</p>
        <p className="text-sm"><b>Category:</b> {ticket.category}</p>
        <p className="text-sm"><b>Priority:</b> {ticket.priority}</p>
        <p className="text-sm"><b>Status:</b> {ticket.status}</p>
        <p className="text-sm mt-2"><b>Description:</b></p>
        <p className="text-sm text-gray-700">{ticket.description}</p>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
