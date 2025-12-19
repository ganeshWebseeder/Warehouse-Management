import { useState } from "react";
import DashboardNavbar from "../Navbar";
import Sidebar from "../Sidebar";

export default function Layout({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isOpen = expanded || hovered;

  return (
    <div className="h-screen bg-gray-100 relative overflow-hidden">
      
      {/* Sidebar (OVERLAY MODE) */}
      <Sidebar
        expanded={expanded}
        setExpanded={setExpanded}
        hovered={hovered}
        setHovered={setHovered}
      />

      {/* Navbar (FIXED, NEVER MOVES) */}
      <DashboardNavbar sidebarOpen={isOpen} />

      {/* MAIN CONTENT (NEVER MOVES) */}
      <main className="pt-16 p-6 min-h-screen">
        {children}
      </main>
    </div>
  );
}
