//import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Layout from "./components/mainLayout/Layout.jsx";

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Login />} />

         <Route path="/dashboard" element={
          <Layout>
          
            </Layout>} />
      </Routes>
    
  );
}
export default App;