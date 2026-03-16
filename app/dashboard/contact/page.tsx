"use client";

import dynamic from "next/dynamic";

const ContactPageContent = dynamic(() => import("./ContactContent"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading...</div>,
});

export default function Page() {
  return <ContactPageContent />;
}
