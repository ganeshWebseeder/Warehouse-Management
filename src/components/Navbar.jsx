import { Search, Bell, ChevronDown } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        
        {/* Left: Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium text-gray-800">Dashboard</span>
          <span>/</span>
          <span className="text-gray-500">Overview</span>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search subscription, customers, leads..."
            className="w-full pl-10 pr-16 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 border px-2 py-0.5 rounded">
            Ctrl+B
          </span>
        </div>

        {/* Right: Date, icons & profile */}
        <div className="flex items-center gap-6">
          
          {/* Date & Time */}
          <div className="hidden md:block text-sm text-gray-500">
            10:49 AM &nbsp;•&nbsp; Thu, Dec 18
          </div>

          {/* Notification */}
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm">
              JD
            </div>
            <div className="hidden md:block text-sm">
              <p className="font-medium text-gray-800 leading-none">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

        </div>
      </div>
    </header>
  );
}
