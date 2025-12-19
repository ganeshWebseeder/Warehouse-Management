import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Layout from "./components/mainLayout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminUsers from "./pages/AdminUserManagement.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Admin User Management */}
        <Route
          path="/admin-users"
          element={
            <Layout>
              <AdminUsers />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
