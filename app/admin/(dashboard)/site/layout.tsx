import AdminSiteSubnav from "./_components/AdminSiteSubnav";

export default function AdminSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminSiteSubnav />
      {children}
    </>
  );
}
