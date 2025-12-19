import TicketRow from "./TicketRow";

export default function TicketTable({ tickets, onView }) {
  if (tickets.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No tickets created yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Ticket ID</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
