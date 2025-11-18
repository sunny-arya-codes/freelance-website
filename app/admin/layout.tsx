
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel for Sunni Kumar's portfolio.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
