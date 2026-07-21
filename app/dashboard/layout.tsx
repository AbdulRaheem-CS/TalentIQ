import { Header } from "@/components/dashboard/header";
import { PageTransition } from "@/components/dashboard/page-transition";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-xl">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
