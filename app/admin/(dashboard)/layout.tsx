import AdminSidebar from "./AdminSidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-dashboard flex min-h-screen">
      <AdminSidebar />
      <main className="admin-main flex-1">
        <div className="admin-main__inner">{children}</div>
      </main>
    </div>
  );
}
