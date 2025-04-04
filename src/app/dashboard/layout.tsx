import DashboardSideBar from "@/components/primative/dashboard/DashboardSideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <DashboardSideBar/>
      <main className=" p-6 w-full">{children}</main>
    </div>
  );
}
