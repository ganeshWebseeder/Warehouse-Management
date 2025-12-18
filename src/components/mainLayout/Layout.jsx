import DashboardNavbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";



export default function Layout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        
        {/* Navbar */}
        <DashboardNavbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
