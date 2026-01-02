import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function MaterialFormModal({
  onClose,
  onSave,
  mode = "create",
  initialData = null,
}) {
  const [form, setForm] = useState({
    mrNo: "",
    mrDate: "",
    from: "",
    itemsFor: "",
    itemCode: "",
    itemName: "",
    itemUnit: "",
    reqQty: "",
    stockInStore: "",
    approvedQty: "",
    inspection: "Pending",
    status: "Pending",
  });

  /* ===== PREFILL EDIT ===== */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        mrNo: initialData.mrNo || "",
        mrDate: initialData.mrDate || "",
        from: initialData.from || "",
        itemsFor: initialData.itemsFor || "",
        itemCode: initialData.itemCode || "",
        itemName: initialData.itemName || "",
        itemUnit: initialData.itemUnit || "",
        reqQty: initialData.reqQty ?? "",
        stockInStore: initialData.stockInStore ?? "",
        approvedQty: initialData.approvedQty ?? "",
        inspection: initialData.inspection || "Pending",
        status: initialData.status || "Pending",
      });
    }
  }, [mode, initialData]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      ...form,
      reqQty: Number(form.reqQty),
      stockInStore: Number(form.stockInStore),
      approvedQty: Number(form.approvedQty),
    });
  };

  return (
     /* ================= MODAL OVERLAY ================= */
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* ================= MODAL CONTAINER ================= */}
      <div className="bg-white w-200 max-w-3xl rounded-xl shadow-xl flex flex-col max-h-[80vh]">


        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {mode === "edit"
              ? "Edit Material Requisition"
              : "Create Material Requisition"}
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* BASIC DETAILS */}
          <div className="grid grid-cols-4 gap-4">
            <Field label="MR No">
              <Input value={form.mrNo} onChange={(v) => handleChange("mrNo", v)} />
            </Field>

            <Field label="MR Date">
              <Input
                type="date"
                value={form.mrDate}
                onChange={(v) => handleChange("mrDate", v)}
              />
            </Field>

            <Field label="From">
              <Input value={form.from} onChange={(v) => handleChange("from", v)} />
            </Field>

            <Field label="Items For">
              <Input
                value={form.itemsFor}
                onChange={(v) => handleChange("itemsFor", v)}
              />
            </Field>
          </div>

          {/* ITEM DETAILS */}
          <div className="grid grid-cols-4 gap-4">
            <Field label="Item Code">
              <Input
                value={form.itemCode}
                onChange={(v) => handleChange("itemCode", v)}
              />
            </Field>

            <Field label="Item Name">
              <Input
                value={form.itemName}
                onChange={(v) => handleChange("itemName", v)}
              />
            </Field>

            <Field label="Unit">
              <Input
                value={form.itemUnit}
                onChange={(v) => handleChange("itemUnit", v)}
              />
            </Field>

            <Field label="Required Qty">
              <Input
                type="number"
                value={form.reqQty}
                onChange={(v) => handleChange("reqQty", v)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Field label="Stock In Store">
              <Input
                type="number"
                value={form.stockInStore}
                onChange={(v) => handleChange("stockInStore", v)}
              />
            </Field>

            <Field label="Approved Qty">
              <Input
                type="number"
                value={form.approvedQty}
                onChange={(v) => handleChange("approvedQty", v)}
              />
            </Field>

            <Field label="Inspection">
              <Select
                value={form.inspection}
                onChange={(v) => handleChange("inspection", v)}
                options={["Pending", "Approved", "Done", "Not Required"]}
              />
            </Field>

            <Field label="Status">
              <Select
                value={form.status}
                onChange={(v) => handleChange("status", v)}
                options={[
                  "Pending",
                  "Approved",
                  "Partially Approved",
                  "Issued",
                  "Rejected",
                ]}
              />
            </Field>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {mode === "edit" ? "Update MR" : "Save MR"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE PARTS ================= */

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md px-3 py-2 text-sm w-full"
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md px-3 py-2 text-sm w-full"
    >
      {options.map((op) => (
        <option key={op}>{op}</option>
      ))}
    </select>
  );
}
