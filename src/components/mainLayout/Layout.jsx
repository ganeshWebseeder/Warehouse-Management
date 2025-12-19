import { useState } from "react";
import DashboardNavbar from "../Navbar";
import Sidebar from "../Sidebar";

export default function Layout({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-screen bg-gray-100">
      
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: expanded ? "16rem" : "4rem" }}
      >
        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
