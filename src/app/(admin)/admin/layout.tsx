import HeaderAvatar from "@/components/admin/headerAvater";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="root">
      <header className="border-b">
        <div className="flex items-center p-4 justify-between">
          <h1 className="text-2xl font-bold">管理者画面</h1>
          <div>
            <HeaderAvatar />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
