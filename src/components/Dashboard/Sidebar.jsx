import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Settings,
  X
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          group fixed z-40 h-full bg-white border-r
          transition-all duration-300 ease-in-out
          overflow-hidden flex flex-col
          w-64
          ${open ? "left-0" : "-left-64"}
          md:left-0 md:w-16 md:hover:w-64
        `}
      >
        {/* Header */}
        <div className="h-15.5 flex items-center gap-3 px-4 border-b">
          
          {/* Logo (always visible) */}
          <img
            src="/WebSeederLogo.jpeg"
            alt="WebSeeder Logo"
            className="w-8 h-8 rounded-full"
          />

          {/* Website name */}
          <span
            className={`
              text-lg font-semibold text-blue-600 whitespace-nowrap
              transition-opacity duration-200
              ${open ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
            `}
          >
            WebSeeder
          </span>

          {/* Close button (mobile only) */}
          <button
            className="ml-auto md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 py-6 space-y-2">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active open={open} />
          <SidebarItem icon={<Users />} label="Customers" open={open} />
          <SidebarItem icon={<CreditCard />} label="Subscriptions" open={open} />
          <SidebarItem icon={<FileText />} label="Reports" open={open} />
          <SidebarItem icon={<Settings />} label="Settings" open={open} />
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({ icon, label, active, open }) {
  return (
    <div
      className={`
        flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer
        transition-colors
        ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}
      `}
    >
      {/* Icon always visible */}
      <div className="min-w-[24px] flex justify-center">
        {icon}
      </div>

      {/* Label visible on open OR hover */}
      <span
        className={`
          whitespace-nowrap transition-opacity duration-200
          ${open ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
        `}
      >
        {label}
      </span>
    </div>
  );
}
