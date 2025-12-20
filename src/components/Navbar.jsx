import { useState, useEffect } from "react";
import {
  Search,
  Bell,
  User,
  LogOut,
  Maximize,
  Minimize,
  ChevronDown,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function DashboardNavbar() {
  const { title, subTitle } = useSelector((state) => state.page);

  const [currentTime, setCurrentTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* Live Date & Time */
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

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

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
      <div className="flex items-center justify-between px-4 py-3">

        {/* LEFT — PAGE TITLE (FROM REDUX) */}
        <div className="flex items-center gap-2 text-sm text-gray-600 ml-20">
          <span className="font-medium text-gray-800">{title}</span>
          {subTitle && (
            <>
              <span>/</span>
              <span className="text-gray-500">{subTitle}</span>
            </>
          )}
        </div>

        {/* CENTER */}
        <div className="flex items-center gap-10 flex-1 max-w-2xl mx-6">
          <div className="hidden md:block text-sm text-gray-500">
            {currentTime}
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search subscription, customers, leads..."
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 relative">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5 text-gray-600" />
            ) : (
              <Maximize className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>

          {/* USER DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-2 py-1"
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                <User size={18} />
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <p className="text-xs font-semibold text-gray-800">John Doe</p>
                <p className="text-[10px] text-gray-500">Admin</p>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                <ul className="text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    My Profile
                  </li>
                  <li
                    onClick={handleSignOut}
                    className="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span className="ml-2">Sign Out</span>
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
