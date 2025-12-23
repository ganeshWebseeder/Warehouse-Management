export default function PageHeader({ title, onAdd }) {
  return (
    <div className="bg-white rounded-lg p-4 flex justify-between items-center">

      {/* LEFT */}
      <h1 className="text-xl font-semibold">{title}</h1>

      {/* RIGHT FILTERS */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Start Date:</span>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">End Date:</span>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
          />
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">
          Search
        </button>

        <button
          onClick={onAdd}
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          + Create PO
        </button>
      </div>
    </div>
  );
}
