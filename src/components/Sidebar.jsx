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
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const [mastersOpen, setMastersOpen] = useState(false);

  // ✅ FIXED LOGOUT (FORCE REDIRECT)
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          group fixed z-40 h-full bg-white border-r
          transition-[width,left] duration-300 ease-in-out
          overflow-hidden flex flex-col
          w-64
          ${open ? "left-0" : "-left-64"}
          md:left-0 md:w-16 md:hover:w-64
        `}
      >
        {/* ================= HEADER ================= */}
        <div className="h-16 flex items-center gap-3 px-4 border-b">
          <img
            src="/WebSeederLogo.jpeg"
            alt="WebSeeder Logo"
            className="w-8 h-8 rounded-full"
          />

          <span
            className={`
              text-sm font-medium whitespace-nowrap
              transition-all duration-200
              ${
                open
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0"
              }
            `}
          >
            WebSeeder
          </span>

          <button
            className="ml-auto md:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= MENU ================= */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          <SidebarItem
            to="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            open={open}
            setOpen={setOpen}
          />

          <SidebarItem
            to="/admin-users"
            icon={Users}
            label="Admin Users"
            open={open}
            setOpen={setOpen}
          />

          {/* ===== Masters Dropdown ===== */}
          <div
            onMouseEnter={() => !open && setMastersOpen(true)}
            onMouseLeave={() => !open && setMastersOpen(false)}
          >
            <button
              onClick={() => setMastersOpen(!mastersOpen)}
              className="
                w-full flex items-center gap-3 px-3 py-2 rounded-lg
                text-sm font-medium text-gray-600
                hover:bg-gray-100 transition-colors
              "
            >
              <Database size={18} />

              <span
                className={`
                  whitespace-nowrap
                  transition-opacity duration-200
                  ${open ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
                `}
              >
                Masters
              </span>

              <ChevronRight
                size={16}
                className={`
                  ml-auto transition-transform duration-200
                  ${mastersOpen ? "rotate-90" : ""}
                  ${open ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
                `}
              />
            </button>

            {mastersOpen && (
              <div className="ml-9 mt-1 space-y-1 border-l border-gray-200 pl-3">
                <DropdownItem to="/masters/item-master" label="Item Master" setOpen={setOpen} />
                <DropdownItem to="/masters/create-item" label="Create Item" setOpen={setOpen} />
                <DropdownItem to="/masters/unit-master" label="Unit Master" setOpen={setOpen} />
              </div>
            )}
          </div>

          <SidebarItem
            to="/support"
            icon={FileText}
            label="Support"
            open={open}
            setOpen={setOpen}
          />

          <SidebarItem
            to="/settings"
            icon={Settings}
            label="Settings"
            open={open}
            setOpen={setOpen}
          />
        </nav>

        {/* ================= LOGOUT ================= */}
        <div className="px-1 py-1 border-t">
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent overlay interference
              handleLogout();
            }}
            className="
              w-full flex items-center gap-3 px-3 py-2 rounded-lg
              text-sm font-medium text-red-600
              hover:bg-red-300 transition-colors
            "
          >
            <LogOut size={16} />

            <span
              className={`
                whitespace-nowrap
                transition-opacity transition-transform duration-200
                ${
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0"
                }
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({ to, icon: Icon, label, open, setOpen }) {
  return (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `
          flex items-center gap-3 px-3 py-2 rounded-lg
          text-sm font-medium transition-colors
          ${
            isActive
              ? "bg-blue-50 text-slate-950"
              : "text-gray-600 hover:bg-gray-100"
          }
        `
      }
    >
      <Icon size={18} />

      <span
        className={`
          whitespace-nowrap
          transition-opacity transition-transform duration-200
          ${
            open
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0"
          }
        `}
      >
        {label}
      </span>
    </NavLink>
  );
}

/* ================= DROPDOWN ITEM ================= */

function DropdownItem({ to, label, setOpen }) {
  return (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className="block px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100"
    >
      {label}
    </NavLink>
  );
}
