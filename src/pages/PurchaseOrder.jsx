import { useState ,useEffect} from "react";
import PageHeader from "../components/purchaseOrder/PageHeader";
import POTable from "../components/purchaseOrder/POTable";
import POFormModal from "../components/purchaseOrder/POFormModal";
import { setPage } from "../store/pageSlice";
import { useDispatch } from "react-redux";


export default function PurchaseOrder() {
  const [open, setOpen] = useState(false);
const [purchaseOrders, setPurchaseOrders] = useState([
  {
    id: 1,
    date: "2026-01-02",
    poNo: "PO-001",
    mrNo: "MR-001",
    vendorName: "ABC Cement Suppliers",
    itemName: "Cement OPC 53 Grade",
    itemCode: "ITM-1001",
    itemQty: 100,
    pendingQty: 40,
    totalAmount: 38000,
    status: "Pending",
  },
  {
    id: 2,
    date: "2026-01-04",
    poNo: "PO-002",
    mrNo: "MR-002",
    vendorName: "Steel World Pvt Ltd",
    itemName: "TMT Steel Rod 16mm",
    itemCode: "ITM-2001",
    itemQty: 500,
    pendingQty: 200,
    totalAmount: 31000,
    status: "Approved",
  },
  {
    id: 3,
    date: "2026-01-06",
    poNo: "PO-003",
    mrNo: "MR-003",
    vendorName: "ElectroMart",
    itemName: "Copper Electrical Wire",
    itemCode: "ITM-3001",
    itemQty: 800,
    pendingQty: 0,
    totalAmount: 36000,
    status: "Completed",
  },
  {
    id: 4,
    date: "2026-01-08",
    poNo: "PO-004",
    mrNo: "MR-004",
    vendorName: "PlumbTech Solutions",
    itemName: "PVC Pipe 4 inch",
    itemCode: "ITM-4001",
    itemQty: 120,
    pendingQty: 120,
    totalAmount: 21600,
    status: "Rejected",
  },
  {
    id: 5,
    date: "2026-01-10",
    poNo: "PO-005",
    mrNo: "MR-005",
    vendorName: "Paint House Ltd",
    itemName: "Wall Putty",
    itemCode: "ITM-5001",
    itemQty: 60,
    pendingQty: 20,
    totalAmount: 31200,
    status: "Partially Approved",
  },
]);


  const dispatch = useDispatch();
   useEffect(() => {
      dispatch(
        setPage({
          title: "Purchase Orders",
          subTitle: "Overview",
        })
      );
    }, [dispatch]);
  const handleSave = (poData) => {
    setPurchaseOrders((prev) => [
      ...prev,
      {
        id: Date.now(),
        poNo: `PO-${prev.length + 1}`,
        ...poData,
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
            title="Purchase Orders"
            onAdd={() => setOpen(true)}
          />
          <POTable data={purchaseOrders} />
        </>
      )}

      {/* ===== CREATE PO PAGE ===== */}
      {open && (
  <POFormModal
    onClose={() => setOpen(false)}
    onSave={handleSave}
  />
)}

    </div>
  );
}
