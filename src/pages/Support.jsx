import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../store/pageSlice";

import CreateTicketForm from "../components/support/CreateTicketForm";
import TicketTable from "../components/support/TicketTable";
import TicketDetailsModal from "../components/support/TicketDetailsModal";

export default function Support() {
  const dispatch = useDispatch();

  /* ================= PAGE TITLE ================= */
  useEffect(() => {
    dispatch(
      setPage({
        title: "Support",
        subTitle: "Help Desk",
      })
    );
  }, [dispatch]);

  /* ================= STATE ================= */
  const [tickets, setTickets] = useState([
    {
      id: "TKT-1001",
      title: "Inventory mismatch",
      category: "Inventory Issue",
      priority: "High",
      status: "Open",
      createdAt: "10/01/2026",
      description: "Stock quantity showing incorrect values.",
    },
    {
      id: "TKT-1002",
      title: "Unable to create PO",
      category: "Order Processing",
      priority: "Medium",
      status: "In Progress",
      createdAt: "11/01/2026",
      description: "Create PO button not responding.",
    },
    {
      id: "TKT-1003",
      title: "System crash on login",
      category: "System Bug",
      priority: "Critical",
      status: "Resolved",
      createdAt: "12/01/2026",
      description: "Application crashes after login.",
    },
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTicket, setEditTicket] = useState(null);

  /* ================= ADD / UPDATE ================= */
  const addTicket = (ticket) => {
    setTickets((prev) => [ticket, ...prev]);
    setShowForm(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      setTickets((prev) => prev.filter((t) => t.id !== id));
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (ticket) => {
    setEditTicket(ticket);
    setShowForm(true);
  };

  return (
    <div className="p-6 space-y-6 ml-18">

      {/* Header */}
      <div className="flex justify-between items-center ml-16 md:ml-10">
        <h1 className="text-2xl font-semibold text-black">
          Support / Help Desk
        </h1>

        <button
          onClick={() => {
            setEditTicket(null);
            setShowForm(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
        >
          + Create Ticket
        </button>
      </div>

      {/* Create / Edit Ticket Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <CreateTicketForm
            initialData={editTicket}
            onClose={() => {
              setShowForm(false);
              setEditTicket(null);
            }}
            onSubmit={addTicket}
          />
        </div>
      )}

      {/* Ticket Table */}
      <TicketTable
        tickets={tickets}
        onView={(ticket) => setSelectedTicket(ticket)}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
