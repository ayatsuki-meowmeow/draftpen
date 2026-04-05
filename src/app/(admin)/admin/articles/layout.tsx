import AdminGuard from "@/components/admin/adminGuard";

export default function AdminArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminGuard>{children}</AdminGuard>
    </>
  );
}
