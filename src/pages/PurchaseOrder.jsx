import { useState ,useEffect} from "react";
import PageHeader from "../components/purchaseOrder/PageHeader";
import POTable from "../components/purchaseOrder/POTable";
import POFormModal from "../components/purchaseOrder/POFormModal";
import { setPage } from "../store/pageSlice";
import { useDispatch } from "react-redux";


export default function PurchaseOrder() {
  const [open, setOpen] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

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
