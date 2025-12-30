import { useState, useEffect } from "react";
import PageHeader from "../components/materialRequisition/PageHeader";
import MaterialTable from "../components/materialRequisition/MaterialTable";
import MaterialFormModal from "../components/materialRequisition/MaterialFormModal";
import { setPage } from "../store/pageSlice";
import { useDispatch } from "react-redux";

export default function MaterialRequisition() {
  const [open, setOpen] = useState(false);
  const [materials, setMaterials] = useState([]);

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
