import { Header } from "@/components/main/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b-2 mb-4 flex flex-col justify-center h-20">
        <Header />
      </div>
      <div className="root">{children}</div>
    </>
  );
}
