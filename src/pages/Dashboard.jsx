import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../store/pageSlice";

function Dashboard() {
  const dispatch = useDispatch();

  // 🔹 Set Navbar page title via Redux
  useEffect(() => {
    dispatch(
      setPage({
        title: "Dashboard",
        subTitle: "Overview",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen text-4xl font-bold text-black">
      Coming soon...!
    </div>
  );
}

export default Dashboard;
