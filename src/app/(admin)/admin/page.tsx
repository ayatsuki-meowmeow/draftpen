import AdminGuard from "@/components/admin/adminGuard";

function AdminPage() {
  return (
    <>
      <div className="flex flex-col text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to DraftPen!</h1>
      </div>
      <AdminGuard>
        <div className="p-4">
          <p>ログインできたっぽいね</p>
        </div>
      </AdminGuard>
    </>
  );
}

export default AdminPage;
