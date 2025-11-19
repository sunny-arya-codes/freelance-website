"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <div className="min-h-screen bg-background flex items-center justify-center">{children}</div>;
    }

    return (
        <div className="flex h-screen bg-background">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8 bg-muted/10">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
