import MRItemRow from "./MaterialItemRow.jsx";

export default function MRTable({ data }) {
  return (
   <div className="bg-white border rounded-xl overflow-hidden">

      <table className="w-full border-sm">
        {/* ===== TABLE HEADER ===== */}
         <thead className="bg-[#FBF7F5] text-gray-600">
          <tr>
            <th className="text-right px-5 py-3">SR NO</th>
            <th className="text-right px-5 py-3">MR No</th>
            <th className="text-right px-5 py-3">MR Date</th>
            <th className="text-right px-5 py-3">From</th>
            <th className="text-right px-5 py-3">Items For</th>
            <th className="text-right px-5 py-3">Item Code</th>
            <th className="text-right px-5 py-3">Item Name</th>
            <th className="text-right px-5 py-3">Item Unit</th>
            <th className="text-right px-5 py-3">Req Qty</th>
            <th className="text-right px-5 py-3">Stock In Store</th>
            <th className="text-right px-5 py-3">Approved Qty</th>
            <th className="text-right px-5 py-3">Inspection</th>
            <th className="text-right px-5 py-3">Status</th>
            <th className="text-right px-5 py-3">Action</th>
          </tr>
        </thead>

        {/* ===== TABLE BODY ===== */}
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="14" className="p-6 text-center text-gray-500">
                No Material Requisitions Found
              </td>
            </tr>
          )}

          {data.map((row, index) => (
            <MRItemRow
              key={row.id}
              row={row}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
