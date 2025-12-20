import TicketRow from "./TicketRow";

export default function TicketTable({ tickets, onView }) {
  return (
    <div className="bg-white border border-[#E6DAD6] rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        {/* ================= TABLE HEAD ================= */}
        <thead className="bg-[#FBF7F5] text-gray-600">
          <tr>
            <th className="text-left px-5 py-3">TICKET ID</th>
            <th className="text-left px-5 py-3">TITLE</th>
            <th className="text-left px-5 py-3">PRIORITY</th>
            <th className="text-left px-5 py-3">STATUS</th>
            <th className="text-left px-5 py-3">DATE</th>
            <th className="text-right px-5 py-3">ACTIONS</th>
          </tr>
        </thead>

        {/* ================= TABLE BODY ================= */}
        <tbody className="divide-y">
          {tickets.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No tickets created yet
              </td>
            </tr>
          )}

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
