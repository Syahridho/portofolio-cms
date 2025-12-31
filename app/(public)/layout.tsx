import { PublicSidebar } from "@/components/public-sidebar";
import { PublicMobileHeader } from "@/components/public-mobile-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen md:bg-zinc-50 md:dark:bg-zinc-950 md:flex md:items-center md:justify-center md:p-8">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-background md:border md:rounded-2xl md:shadow-sm md:overflow-hidden min-h-screen md:min-h-[85vh]">
        <PublicSidebar />
        <PublicMobileHeader />
        <main className="flex-1 overflow-y-auto md:h-[85vh]">
          <div className="p-6 md:p-12 lg:p-16 max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
