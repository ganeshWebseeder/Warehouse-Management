import { useState, useEffect } from "react";
import PageHeader from "../components/purchaseOrder/PageHeader";
import POTable from "../components/purchaseOrder/POTable";
import POFormModal from "../components/purchaseOrder/POFormModal";
import { setPage } from "../store/pageSlice";
import { useDispatch } from "react-redux";

export default function PurchaseOrder() {
  const dispatch = useDispatch();

  /* ================= STATE ================= */
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit | view
  const [selectedPO, setSelectedPO] = useState(null);

  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 1,
      date: "2026-01-02",
      poNo: "PO-001",
      mrNo: "MR-001",
      vendor: "ABC Cement Suppliers",
      itemName: "Cement OPC 53 Grade",
      itemCode: "ITM-1001",
      qty: 100,
      pendingQty: 40,
      total: 38000,
      status: "Pending",
    },
    {
      id: 2,
      date: "2026-01-04",
      poNo: "PO-002",
      mrNo: "MR-002",
      vendor: "Steel World Pvt Ltd",
      itemName: "TMT Steel Rod 16mm",
      itemCode: "ITM-2001",
      qty: 500,
      pendingQty: 200,
      total: 31000,
      status: "Approved",
    },
    {
      id: 3,
      date: "2026-01-06",
      poNo: "PO-003",
      mrNo: "MR-003",
      vendor: "ElectroMart",
      itemName: "Copper Electrical Wire",
      itemCode: "ITM-3001",
      qty: 800,
      pendingQty: 0,
      total: 36000,
      status: "Completed",
    },
    {
      id: 4,
      date: "2026-01-08",
      poNo: "PO-004",
      mrNo: "MR-004",
      vendor: "PlumbTech Solutions",
      itemName: "PVC Pipe 4 inch",
      itemCode: "ITM-4001",
      qty: 120,
      pendingQty: 120,
      total: 21600,
      status: "Rejected",
    },
    {
      id: 5,
      date: "2026-01-10",
      poNo: "PO-005",
      mrNo: "MR-005",
      vendor: "Paint House Ltd",
      itemName: "Wall Putty",
      itemCode: "ITM-5001",
      qty: 60,
      pendingQty: 20,
      total: 31200,
      status: "Partially Approved",
    },
  ]);

  /* ================= PAGE TITLE ================= */
  useEffect(() => {
    dispatch(
      setPage({
        title: "Purchase Orders",
        subTitle: "Overview",
      })
    );
  }, [dispatch]);

  /* ================= ACTION HANDLER ================= */
  const handleAction = (type, row) => {
    if (type === "view") {
      setMode("view");
      setSelectedPO(row);
      setOpen(true);
    }

    if (type === "edit") {
      setMode("edit");
      setSelectedPO(row);
      setOpen(true);
    }

    if (type === "delete") {
      if (window.confirm("Are you sure you want to delete this PO?")) {
        setPurchaseOrders((prev) =>
          prev.filter((po) => po.id !== row.id)
        );
      }
    }
  };

  /* ================= SAVE (CREATE + EDIT) ================= */
  const handleSave = (poData) => {
    if (mode === "edit" && selectedPO) {
      setPurchaseOrders((prev) =>
        prev.map((po) =>
          po.id === selectedPO.id ? { ...po, ...poData } : po
        )
      );
    } else {
      setPurchaseOrders((prev) => [
        ...prev,
        {
          id: Date.now(),
          poNo: `PO-${prev.length + 1}`,
          status: "Pending",
          ...poData,
        },
      ]);
    }

    setOpen(false);
    setSelectedPO(null);
    setMode("create");
  };

  return (
    <div className="p-6 ml-18 space-y-3">

      {/* LIST PAGE */}
      {!open && (
        <>
          <PageHeader
            title="Purchase Orders"
            onAdd={() => {
              setMode("create");
              setSelectedPO(null);
              setOpen(true);
            }}
          />

          <POTable
            data={purchaseOrders}
            onAction={handleAction}
          />
        </>
      )}

      {/* MODAL */}
      {open && (
        <POFormModal
          mode={mode}
          initialData={selectedPO}
          onClose={() => {
            setOpen(false);
            setSelectedPO(null);
            setMode("create");
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
