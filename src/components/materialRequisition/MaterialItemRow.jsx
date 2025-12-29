export default function MaterialItemRow({ row, index }) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-2 text-center">{index + 1}</td>
      <td className="p-2">{row.mrNo}</td>
      <td className="p-2">{row.mrDate}</td>
      <td className="p-2">{row.from}</td>
      <td className="p-2">{row.itemsFor}</td>
      <td className="p-2">{row.itemCode}</td>
      <td className="p-2">{row.itemName}</td>
      <td className="p-2 text-center">{row.unit}</td>
      <td className="p-2 text-center">{row.reqQty}</td>
      <td className="p-2 text-center">{row.stockQty}</td>
      <td className="p-2 text-center">{row.approvedQty}</td>
      <td className="p-2 text-center">
        {row.inspectionRequired ? "Yes" : "No"}
      </td>

      {/* STATUS BADGE */}
      <td className="p-2 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              row.status === "Approved"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {row.status}
        </span>
      </td>

      {/* ACTION */}
      <td className="p-2 text-center">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => console.log("View MR", row)}
        >
          View
        </button>
      </td>
    </tr>
  );
}
