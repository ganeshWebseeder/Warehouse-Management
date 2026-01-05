import POItemRow from "./POItemRow";

export default function POTable({ data, onAction }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="w-full border-collapse">

        {/* TABLE HEADER */}
        <thead className="bg-[#FBF7F5] text-gray-600 text-sm">
          <tr>
            <th className="p-2">SR NO</th>
            <th className="p-2">Date</th>
            <th className="p-2">PO No</th>
            <th className="p-2">MR No</th>
            <th className="p-2">Vendor Name</th>
            <th className="p-2">Item Name</th>
            <th className="p-2">Item Code</th>
            <th className="p-2">Item Quantity</th>
            <th className="p-2">Item Pending Quantity</th>
            <th className="p-2">Total Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Approve</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={13}
                className="p-6 text-center text-gray-500"
              >
                No Purchase Orders Found
              </td>
            </tr>
          )}

          {data.map((row, index) => (
            <POItemRow
              key={row.id}
              row={row}
              index={index}
              onAction={onAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
