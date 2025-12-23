import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  X,
  LogOut,
  ChevronRight,
  Database,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ open, setOpen, expanded, setExpanded }) {
  const [mastersOpen, setMastersOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <>
      {/* ===== MOBILE OVERLAY ===== */}
      {open && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`
          fixed top-0 left-0 z-40 h-full bg-white border-r
          transition-all duration-300 ease-in-out
          flex flex-col overflow-hidden
          ${expanded ? "w-64" : "w-16"}
          ${open ? "left-0" : "-left-64"}
          md:left-0
        `}
      >
        {/* ===== HEADER ===== */}
        <div className="h-18 flex items-center gap-3 px-4 border-b">
          <img
            src="/WebSeederLogo.jpeg"
            alt="WebSeeder Logo"
            className="w-8 h-8 rounded-full"
          />

          {expanded && (
            <span className="text-sm font-semibold whitespace-nowrap">
              WebSeeder
            </span>
          )}

          <button className="ml-auto md:hidden" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* ===== MENU ===== */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" expanded={expanded} />
          <SidebarItem to="/admin-users" icon={Users} label="Admin Users" expanded={expanded} />

          {/* ===== MASTERS ===== */}
          <button
            onClick={() => setMastersOpen(!mastersOpen)}
            className={`
              w-full h-10 flex items-center rounded-lg
              text-sm font-medium text-gray-600
              hover:bg-gray-100 transition-all
              ${expanded ? "px-3 gap-3" : "justify-center"}
            `}
          >
            <Database size={20} />

            {expanded && <span>Masters</span>}

            {expanded && (
              <ChevronRight
                size={16}
                className={`ml-auto transition-transform ${
                  mastersOpen ? "rotate-90" : ""
                }`}
              />
            )}
          </button>

          {expanded && mastersOpen && (
            <div className="ml-9 mt-1 space-y-1 border-l pl-3">
              <DropdownItem to="/masters/item-master" label="Item Master" />
              <DropdownItem to="/masters/create-item" label="Create Item" />
              <DropdownItem to="/masters/unit-master" label="Unit Master" />
            </div>
          )}

          <SidebarItem to="/support" icon={FileText} label="Support" expanded={expanded} />
          <SidebarItem to="/purchaseorder" icon={FileText} label="PurchaseOrder" expanded={expanded} />
          <SidebarItem to="/settings" icon={Settings} label="Settings" expanded={expanded} />
        </nav>

        {/* ===== LOGOUT ===== */}
        <div className="border-t p-2">
          <button
            onClick={handleLogout}
            className={`
              w-full h-10 flex items-center rounded-lg
              text-sm font-medium text-red-600
              hover:bg-red-100 transition-all
              ${expanded ? "px-3 gap-3" : "justify-center"}
            `}
          >
            <LogOut size={20} />
            {expanded && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

/* ===== SIDEBAR ITEM ===== */
function SidebarItem({ to, icon: Icon, label, expanded }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
          h-10 flex items-center rounded-lg
          text-sm font-medium transition-all
          ${expanded ? "px-3 gap-3" : "justify-center"}
          ${isActive ? "bg-blue-50 text-slate-950" : "text-gray-600 hover:bg-gray-100"}
        `
      }
    >
      <Icon size={20} />
      {expanded && <span>{label}</span>}
    </NavLink>
  );
}

/* ===== DROPDOWN ITEM ===== */
function DropdownItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className="block px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100"
    >
      {label}
    </NavLink>
  );
}
