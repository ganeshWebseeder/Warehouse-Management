export default function POItemRow({ row, index, onAction }) {
  return (
    <tr className="border-t text-center text-sm">

      <td className="p-2">{index + 1}</td>
      <td className="p-2">{row.date || "19/11/2025"}</td>
      <td className="p-2">{row.poNo}</td>
      <td className="p-2">{row.mrNo || "843"}</td>

      <td className="p-2">{row.vendor || "VENDOR NAME"}</td>
      <td className="p-2">{row.itemName || "ITEM NAME"}</td>
      <td className="p-2">{row.itemCode || "CODE"}</td>

      <td className="p-2">{row.qty || 1}</td>
      <td className="p-2">{row.qty || 1}</td>

      <td className="p-2">{row.total}</td>

      {/* STATUS */}
      <td className="p-2">
        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs">
          Approved
        </span>
      </td>

      {/* APPROVE TOGGLE */}
      <td className="p-2">
        <input type="checkbox" defaultChecked className="w-5 h-5" />
      </td>

      {/* ACTION */}
      <td className="p-2">
        <button
          onClick={onAction}
          className="text-blue-600 text-sm"
        >
          Action ▼
        </button>
      </td>
    </tr>
  );
}
