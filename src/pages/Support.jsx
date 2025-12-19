import { useState } from "react";
import CreateTicketForm from "../components/support/CreateTicketForm";
import TicketTable from "../components/support/TicketTable";
import TicketDetailsModal from "../components/support/TicketDetailsModal";

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addTicket = (ticket) => {
    setTickets([ticket, ...tickets]);
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Support / Help Desk</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-black"
        >
          + Create Ticket
        </button>
      </div>

      {/* Create Ticket */}
      {showForm && (
        <CreateTicketForm
          onClose={() => setShowForm(false)}
          onSubmit={addTicket}
        />
      )}

      {/* Ticket Table */}
      <TicketTable
        tickets={tickets}
        onView={(ticket) => setSelectedTicket(ticket)}
      />

      {/* Ticket Details */}
      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
