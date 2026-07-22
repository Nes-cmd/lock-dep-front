import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import CustomerLayout from './layouts/CustomerLayout';

// Admin Pages
import InventoryPage from './pages/admin/InventoryPage';
import ProvidersPage from './pages/admin/ProvidersPage';
import PricesPage from './pages/admin/PricesPage';

// Imports for Customer Pages
import ShopPage from './pages/customer/ShopPage';
import WalletPage from './pages/customer/WalletPage';
import OrderHistoryPage from './pages/customer/OrderHistoryPage';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Authentication Flow */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/inventory" replace />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="providers" element={<ProvidersPage />} />
          <Route path="prices" element={<PricesPage />} />
        </Route>

        {/* ================= CUSTOMER DASHBOARD (Upcoming) ================= */}
        {/* ================= CUSTOMER DASHBOARD ================= */}
<Route path="/customer" element={<CustomerLayout />}>
  <Route index element={<Navigate to="/customer/shop" replace />} />
  <Route path="shop" element={<ShopPage />} />
  <Route path="wallet" element={<WalletPage />} />
  <Route path="orders" element={<OrderHistoryPage />} />
</Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/admin/inventory" replace />} />
      </Routes>
    </Router>
  );
}

export default App;