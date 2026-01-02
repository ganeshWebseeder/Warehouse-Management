import { useState } from "react";
import { X } from "lucide-react";

export default function POFormModal({ onClose, onSave }) {

  /* ================= CUSTOMER INFO ================= */
  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [poDate, setPoDate] = useState("");

  /* ================= ITEMS ================= */
  const [items, setItems] = useState([
    { product: "", qty: 0, gst: 0, amount: 0, note: "" },
  ]);

  /* ================= EXTRA ================= */
  const [specialNotes, setSpecialNotes] = useState("");
  const [tds, setTds] = useState(0);
  const [discount, setDiscount] = useState(0);

  /* ================= ITEM HANDLERS ================= */
  const addRow = () => {
    setItems([
      ...items,
      { product: "", qty: 0, gst: 0, amount: 0, note: "" },
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  /* ================= CALCULATIONS ================= */
  const amount = items.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const tdsAmt = (amount * tds) / 100;
  const discountAmt = (amount * discount) / 100;
  const total = amount + tdsAmt - discountAmt;

  /* ================= SAVE ================= */
  const handleSave = () => {
    const poData = {
      vendor: customer,
      date: poDate,
      items,
      total,
      status: "Draft",
    };

    onSave(poData);
    onClose();
  };

  return (
    /* ================= MODAL OVERLAY ================= */
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* ================= MODAL CONTAINER ================= */}
      <div className="bg-white w-200 max-w-3xl rounded-xl shadow-xl flex flex-col max-h-[80vh]">

        {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Create Purchase Order</h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ---------- CUSTOMER INFO ---------- */}
          <section className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Customer Info</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Customer Name"
                value={customer}
                onChange={setCustomer}
              />
              <Input
                placeholder="Mobile Number"
                value={mobile}
                onChange={setMobile}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={setEmail}
              />
              <Input
                type="date"
                value={poDate}
                onChange={setPoDate}
              />
            </div>
          </section>

          {/* ---------- ITEMS ---------- */}
          <section className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Items</h3>

            <div className="grid grid-cols-6 gap-2 text-sm font-medium mb-2">
              <div>Item</div>
              <div>Qty</div>
              <div>GST %</div>
              <div>Amount</div>
              <div>Note</div>
              <div></div>
            </div>

            {items.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-2 mb-2"
              >
                <Input
                  placeholder="Item"
                  value={row.product}
                  onChange={(v) =>
                    updateItem(index, "product", v)
                  }
                />
                <Input
                  type="number"
                  placeholder="Qty"
                  value={row.qty}
                  onChange={(v) =>
                    updateItem(index, "qty", v)
                  }
                />
                <Input
                  type="number"
                  placeholder="GST %"
                  value={row.gst}
                  onChange={(v) =>
                    updateItem(index, "gst", v)
                  }
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={row.amount}
                  onChange={(v) =>
                    updateItem(index, "amount", v)
                  }
                />
                <Input
                  placeholder="Note"
                  value={row.note}
                  onChange={(v) =>
                    updateItem(index, "note", v)
                  }
                />
                <button
                  onClick={() => removeRow(index)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={addRow}
              className="text-blue-600 text-sm mt-2"
            >
              + Add Row
            </button>
          </section>

          {/* ---------- NOTES & SUMMARY ---------- */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <textarea
              className="border rounded-md p-3 text-sm"
              placeholder="Special Notes"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
            />

            <div className="border rounded-lg p-4 space-y-2 text-sm">
              <Summary label="Amount" value={amount} />
              <Summary label="TDS" value={tdsAmt} />
              <Summary label="Discount" value={discountAmt} />
              <Summary label="Total" value={total} bold />
            </div>
          </section>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL REUSABLE PARTS ================= */

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md px-3 py-2 text-sm w-full"
    />
  );
}

function Summary({ label, value, bold }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold" : ""}`}>
      <span>{label}</span>
      <span>₹{value.toFixed(2)}</span>
    </div>
  );
}
