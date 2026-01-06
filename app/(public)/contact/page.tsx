import React from "react";
import ContactClient from "./ContactClient"; // Import komponen client yang baru dibuat

// Metadata HANYA boleh ada di file server component (tanpa "use client")
export const metadata = {
  title: "Kontak | Syahridho Arjuna Syahputra",
  description: "Hubungi saya melalui form kontak",
};

export default function ContactPage() {
  return (
    <>
      <ContactClient />
    </>
  );
}
