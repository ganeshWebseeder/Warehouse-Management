import MaterialItemRow from "./MaterialItemRow";

export default function MaterialTable({ data, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#FBF7F5] text-gray-600">
          <tr>
            <th className="px-5 py-3 text-right">SR NO</th>
            <th className="px-5 py-3 text-right">MR No</th>
            <th className="px-5 py-3 text-right">Item Name</th>
            <th className="px-5 py-3 text-right">Req Qty</th>
            <th className="px-5 py-3 text-right">Status</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <MaterialItemRow
              key={row.id}
              row={row}
              index={index}
              onView={onView}     // 👁
              onEdit={onEdit}     // ✏️
              onDelete={onDelete} // 🗑
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
