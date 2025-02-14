import Sidebar from "@/components/sidebar/Sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="max-md:hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default MainLayout;
