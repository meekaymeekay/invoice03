import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import InvoiceForm from "./pages/InvoiceForm";
import SearchOrder from "./pages/SearchOrder";
import WorkOrder from "./pages/WorkOrder";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/invoice-form" element={<InvoiceForm />} />
          <Route path="/search-order" element={<SearchOrder />} />
          <Route path="/work-order" element={<WorkOrder />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
