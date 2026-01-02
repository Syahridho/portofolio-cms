import { PublicSidebar } from "@/components/public-sidebar";
import { PublicMobileHeader } from "@/components/public-mobile-header";
import { LocaleProvider } from "@/lib/locale-provider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <div className="min-h-screen bg-background md:dark:bg-zinc-950 md:flex md:items-center md:justify-center">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-background md:overflow-hidden min-h-screen md:max-h-[85vh]">
          <PublicSidebar />
          <PublicMobileHeader />
          <main className="flex-1 overflow-y-auto md:h-[85vh]">
            <div className="p-6 md:p-12 lg:p-16 max-w-4xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </LocaleProvider>
  );
}
