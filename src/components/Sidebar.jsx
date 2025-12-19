import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Database,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Sidebar({
  expanded,
  setExpanded,
  hovered,
  setHovered,
}) {
  const navigate = useNavigate();
  const [mastersOpen, setMastersOpen] = useState(false);

  // sidebar is open if clicked OR hovered
  const isOpen = expanded || hovered;

  const handleLogout = () => {
    localStorage.clear();
    setExpanded(false);
    navigate("/");
  };

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        fixed z-40 h-full bg-white border-r
        transition-all duration-300 ease-in-out
        overflow-hidden flex flex-col
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      {/* ================= HEADER ================= */}
      <div
        className={`
          flex items-center px-3 pt-3
          ${isOpen ? "justify-start" : "justify-center"}
        `}
      >
        <img
          src="./WebSeederLogo.jpeg"
          alt="WebSeeder Logo"
          className="rounded-full shadow-md w-10 h-10"
        />

        {isOpen && (
          <motion.span
            key="webseeder-name"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="ml-2 font-semibold text-sm text-gray-800 whitespace-nowrap"
          >
            WebSeeder
          </motion.span>
        )}
      </div>

      <div className="w-full border-t border-gray-200 mt-3" />

      {/* ================= MENU ================= */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        <SidebarItem
          to="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          isOpen={isOpen}
          setExpanded={setExpanded}
        />

        <SidebarItem
          to="/admin-users"
          icon={Users}
          label="Admin Users"
          isOpen={isOpen}
          setExpanded={setExpanded}
        />

        {/* ===== Masters Dropdown ===== */}
        <div>
          <button
            onClick={() => setMastersOpen(!mastersOpen)}
            className="
              w-full flex items-center gap-3 px-3 py-2 rounded-lg
              text-sm font-medium text-gray-600
              hover:bg-gray-100 transition-colors
            "
          >
            <Database size={18} />

            {isOpen && (
              <>
                <span className="whitespace-nowrap">Masters</span>
                <ChevronRight
                  size={16}
                  className={`ml-auto transition-transform ${
                    mastersOpen ? "rotate-90" : ""
                  }`}
                />
              </>
            )}
          </button>

          {isOpen && mastersOpen && (
            <div className="ml-9 mt-1 space-y-1 border-l border-gray-200 pl-3">
              <DropdownItem
                to="/masters/item-master"
                label="Item Master"
                setExpanded={setExpanded}
              />
              <DropdownItem
                to="/masters/create-item"
                label="Create Item"
                setExpanded={setExpanded}
              />
              <DropdownItem
                to="/masters/unit-master"
                label="Unit Master"
                setExpanded={setExpanded}
              />
            </div>
          )}
        </div>

        <SidebarItem
          to="/support"
          icon={FileText}
          label="Support"
          isOpen={isOpen}
          setExpanded={setExpanded}
        />

        <SidebarItem
          to="/settings"
          icon={Settings}
          label="Settings"
          isOpen={isOpen}
          setExpanded={setExpanded}
        />
      </nav>

      {/* ================= LOGOUT ================= */}
      <div className="px-2 py-3 border-t">
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-3 px-3 py-2 rounded-lg
            text-sm font-medium text-red-600
            hover:bg-red-300 transition-colors
          "
        >
          <LogOut size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

/* ----------------------------------
   Sidebar Item
----------------------------------- */
function SidebarItem({ to, icon: Icon, label, isOpen, setExpanded }) {
  return (
    <NavLink
      to={to}
      onClick={() => setExpanded(false)}
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
      {isOpen && <span className="whitespace-nowrap">{label}</span>}
    </NavLink>
  );
}

/* ----------------------------------
   Dropdown Item
----------------------------------- */
function DropdownItem({ to, label, setExpanded }) {
  return (
    <NavLink
      to={to}
      onClick={() => setExpanded(false)}
      className="
        block px-3 py-1.5 rounded-md
        text-sm text-gray-600
        hover:bg-gray-100
      "
    >
      {label}
    </NavLink>
  );
}
