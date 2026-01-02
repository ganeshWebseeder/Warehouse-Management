import { useState, useEffect } from "react";
import PageHeader from "../components/materialRequisition/PageHeader";
import MaterialTable from "../components/materialRequisition/MaterialTable";
import MaterialFormModal from "../components/materialRequisition/MaterialFormModal";
import { setPage } from "../store/pageSlice";
import { useDispatch } from "react-redux";

export default function MaterialRequisition() {
  /* ================= STATE ================= */
  const [open, setOpen] = useState(false);        // create modal
  const [editRow, setEditRow] = useState(null);  // edit modal
  const [viewRow, setViewRow] = useState(null);  // 👁 view modal

  const [materials, setMaterials] = useState([
    {
      id: 1,
      mrNo: "MR-001",
      mrDate: "2026-01-01",
      from: "Civil Dept",
      itemsFor: "Building A",
      itemCode: "ITM-1001",
      itemName: "Cement OPC 53",
      itemUnit: "Bags",
      reqQty: 100,
      stockInStore: 40,
      approvedQty: 60,
      inspection: "Pending",
      status: "Pending",
    },
    {
      id: 2,
      mrNo: "MR-002",
      mrDate: "2026-01-02",
      from: "Electrical Dept",
      itemsFor: "Block B",
      itemCode: "ITM-2001",
      itemName: "Copper Wire",
      itemUnit: "Meters",
      reqQty: 500,
      stockInStore: 300,
      approvedQty: 200,
      inspection: "Approved",
      status: "Approved",
    },
    {
      id: 3,
      mrNo: "MR-003",
      mrDate: "2026-01-03",
      from: "Plumbing Dept",
      itemsFor: "Hostel",
      itemCode: "ITM-3001",
      itemName: "PVC Pipe 4 inch",
      itemUnit: "Nos",
      reqQty: 80,
      stockInStore: 20,
      approvedQty: 60,
      inspection: "Done",
      status: "Issued",
    },
    {
      id: 4,
      mrNo: "MR-004",
      mrDate: "2026-01-04",
      from: "Mechanical Dept",
      itemsFor: "Workshop",
      itemCode: "ITM-4001",
      itemName: "Lubricant Oil",
      itemUnit: "Liters",
      reqQty: 50,
      stockInStore: 60,
      approvedQty: 0,
      inspection: "Not Required",
      status: "Rejected",
    },
    {
      id: 5,
      mrNo: "MR-005",
      mrDate: "2026-01-05",
      from: "Civil Dept",
      itemsFor: "Road Work",
      itemCode: "ITM-1002",
      itemName: "TMT Steel Rod 16mm",
      itemUnit: "Kg",
      reqQty: 1000,
      stockInStore: 700,
      approvedQty: 300,
      inspection: "Pending",
      status: "Partially Approved",
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPage({
        title: "Material Requisition",
        subTitle: "Overview",
      })
    );
  }, [dispatch]);

  /* ================= CREATE ================= */
  const handleCreate = (materialData) => {
    setMaterials((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...materialData,
      },
    ]);
    setOpen(false);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = (updatedData) => {
    setMaterials((prev) =>
      prev.map((row) =>
        row.id === editRow.id ? { ...row, ...updatedData } : row
      )
    );
    setEditRow(null);
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setMaterials((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="p-6 ml-18 space-y-3">

      {/* ===== HEADER ===== */}
      <PageHeader
        title="All Material Requisition"
        onAdd={() => setOpen(true)}
      />

      {/* ===== TABLE ===== */}
      <MaterialTable
        data={materials}
        onView={(row) => setViewRow(row)}   // 👁 VIEW
        onEdit={(row) => setEditRow(row)}   // ✏️ EDIT
        onDelete={handleDelete}             // 🗑 DELETE
      />

      {/* ===== CREATE MODAL ===== */}
      {open && (
        <MaterialFormModal
          mode="create"
          onClose={() => setOpen(false)}
          onSave={handleCreate}
        />
      )}

      {/* ===== EDIT MODAL ===== */}
      {editRow && (
        <MaterialFormModal
          mode="edit"
          initialData={editRow}
          onClose={() => setEditRow(null)}
          onSave={handleUpdate}
        />
      )}

      {/* ===== VIEW MODAL ===== */}
      {viewRow && (
        <MaterialFormModal
          mode="view"               // 👁 READ ONLY
          initialData={viewRow}
          onClose={() => setViewRow(null)}
          onSave={() => {}}          // not used
        />
      )}
    </div>
  );
}
