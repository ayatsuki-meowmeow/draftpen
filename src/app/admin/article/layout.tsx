import AdminGuard from "@/components/admin/adminGuard";

export default function AdminArticlesLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminGuard>
        {children}
      </AdminGuard>
    </>
  )
}
