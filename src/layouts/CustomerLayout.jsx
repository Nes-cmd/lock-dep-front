import { Outlet } from 'react-router-dom';
import CustomerSidebar from '../components/customer/CustomerSidebar';

export default function CustomerLayout() {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Customer Sidebar */}
      <CustomerSidebar />

      {/* Dynamic Page Content Area */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}