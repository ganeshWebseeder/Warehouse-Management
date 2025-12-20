import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../store/pageSlice";

import CreateTicketForm from "../components/support/CreateTicketForm";
import TicketTable from "../components/support/TicketTable";
import TicketDetailsModal from "../components/support/TicketDetailsModal";

export default function Support() {
  const dispatch = useDispatch();

  // 🔹 Update Navbar title using Redux
  useEffect(() => {
    dispatch(
      setPage({
        title: "Support",
        subTitle: "Help Desk",
      })
    );
  }, [dispatch]);

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
      <div className="flex justify-between items-center ml-16 md:ml-10 transition-all duration-300">
        <h1 className="text-2xl font-semibold text-black">
          Support / Help Desk
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
        >
          + Create Ticket
        </button>
      </div>

      {/* Create Ticket Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <CreateTicketForm
            onClose={() => setShowForm(false)}
            onSubmit={addTicket}
          />
        </div>
      )}

      {/* Ticket Table */}
      <TicketTable
        tickets={tickets}
        onView={(ticket) => setSelectedTicket(ticket)}
      />

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
