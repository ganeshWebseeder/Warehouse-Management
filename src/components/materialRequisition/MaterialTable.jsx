import MRItemRow from "./MaterialItemRow.jsx";

export default function MRTable({ data }) {
  return (
   <div className="bg-white border border-[#E6DAD6] rounded-xl overflow-hidden">

      <table className="w-full border-collapse">
        {/* ===== TABLE HEADER ===== */}
         <thead className="bg-[#FBF7F5] text-gray-600">
          <tr>
            <th className="p-2">SR NO</th>
            <th className="p-2">MR No</th>
            <th className="p-2">MR Date</th>
            <th className="p-2">From</th>
            <th className="p-2">Items For</th>
            <th className="p-2">Item Code</th>
            <th className="p-2">Item Name</th>
            <th className="p-2">Item Unit</th>
            <th className="p-2">Req Qty</th>
            <th className="p-2">Stock In Store</th>
            <th className="p-2">Approved Qty</th>
            <th className="p-2">Inspection</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
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
