import { useState } from "react";
import DashboardNavbar from "../Navbar";
import Sidebar from "../Sidebar";

export default function Layout({ children }) {
  const [expanded, setExpanded] = useState(false); // click open/close
  const [hovered, setHovered] = useState(false);   // hover open

  const isOpen = expanded || hovered;

  return (
    <div className="h-screen bg-gray-100">
      <Sidebar
        expanded={expanded}
        setExpanded={setExpanded}
        hovered={hovered}
        setHovered={setHovered}
      />

      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: isOpen ? "16rem" : "4rem" }}
      >
        <DashboardNavbar onMenuClick={() => setExpanded(!expanded)} />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
