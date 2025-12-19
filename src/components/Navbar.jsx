import { useState, useEffect } from "react";
import { Search, Bell, User, LogOut, Maximize, Minimize } from "lucide-react";
import { ChevronDown } from "lucide-react";

export default function DashboardNavbar({ onMenuClick }) {
  const [currentTime, setCurrentTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ⏰ Live Date & Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setCurrentTime(`${time} • ${date}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🚪 Sign out
  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-gray-800">Dashboard</span>
            <span>/</span>
            <span className="text-gray-500">Overview</span>
          </div>
        </div>

        <div className="flex items-center gap-10 flex-1 max-w-2xl mx-6">
          {/* Live Date & Time */}
          <div className="hidden md:block text-sm text-gray-500 whitespace-nowrap">
            {currentTime}
          </div>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search subscription, customers, leads..."
              className="
      w-full pl-10 pr-4 py-2 text-sm
      border border-gray-400
      rounded-lg
      focus:outline-none
      focus:ring-2 focus:ring-white
      focus:border-white
    "
            />
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-6 relative">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-md hover:bg-gray-100"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5 text-gray-600" />
            ) : (
              <Maximize className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notification */}
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          {/* ================= USER DROPDOWN ================= */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1"
            >
              {/* Top Avatar */}
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                <User size={18} />
              </div>

              {/* Name & Role */}
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <p className="text-xs font-semibold text-gray-800">John Doe</p>
                <p className="text-[10px] text-gray-500">Admin</p>
              </div>

              {/* ▼ Arrow (ONLY ADDITION) */}
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {/* ===== USER INFO (WITH ICON) ===== */}
                <div className="flex items-start gap-3 px-4 py-3 border-b">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                    <User size={18} />
                  </div>

                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-gray-800">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                    <span className="inline-block mt-1 text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                      Admin
                    </span>
                  </div>
                </div>

                {/* ===== ACTIONS ===== */}
                <ul className="text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                    <User size={14} />
                    <span>My Profile</span>
                  </li>

                  <li
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-red-400 hover:text-white cursor-pointer flex items-center gap-2 text-red-600"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
