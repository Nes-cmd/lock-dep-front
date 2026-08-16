import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AccessDeniedBanner from '../components/auth/AccessDeniedBanner';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <AccessDeniedBanner />
        <Outlet />
      </main>
    </div>
  );
}