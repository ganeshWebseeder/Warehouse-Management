import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Layout from "./components/mainLayout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminUsers from "./pages/AdminUserManagement.jsx";
import Support from "./pages/Support.jsx";
import PurchaseOrder from "./pages/PurchaseOrder.jsx";
import MaterialRequisition from "./pages/MaterialRequisition.jsx";

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

        <Route
          path="/support"
          element={
            <Layout>
              <Support />
            </Layout>
          }
        />

        <Route
          path="/purchaseorder"
          element={
            <Layout>
              <PurchaseOrder />
            </Layout>
          }
        />
      <Route
        path="/materialrequisition"
        element={
          <Layout>
            <MaterialRequisition />
          </Layout>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
