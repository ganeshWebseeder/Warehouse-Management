import { useState, useEffect } from "react";
import PageHeader from "../components/materialRequisition/PageHeader";
import MaterialTable from "../components/materialRequisition/MaterialTable";
import MaterialFormModal from "../components/materialRequisition/MaterialFormModal";
import { setPage } from "../store/pageSlice";
import { useDispatch } from "react-redux";

export default function MaterialRequisition() {
  const [open, setOpen] = useState(false);
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

  const handleSave = (materialData) => {
    setMaterials((prev) => [
      ...prev,
      {
        id: Date.now(),
        materialCode: `MAT-${prev.length + 1}`,
        ...materialData,
      },
    ]);

    setOpen(false);
  };

  return (
   
    <div className="p-6 ml-18 space-y-3">
      {/* ===== LIST PAGE ===== */}
      {!open && (
        <>
          <PageHeader
            title=" All Material Requisition"
            onAdd={() => setOpen(true)}
          />
          
          <MaterialTable data={materials} />
        </>
      )}

      {/* ===== CREATE MATERIAL PAGE ===== */}
      {open && (
        <MaterialFormModal
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
    
  );
}
