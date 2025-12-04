"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    User,
    Briefcase,
    GraduationCap,
    Code,
    Award,
    FileText,
    LogOut,
    Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Profile", href: "/admin/profile", icon: User },
    { name: "Skills", href: "/admin/skills", icon: Code },
    { name: "Experience", href: "/admin/experience", icon: Briefcase },
    { name: "Projects", href: "/admin/projects", icon: Settings }, // Using Settings icon as placeholder or maybe Folder
    { name: "Education", href: "/admin/education", icon: GraduationCap },
    { name: "Training", href: "/admin/training", icon: FileText },
    { name: "Achievements", href: "/admin/achievements", icon: Award },
    { name: "Additional", href: "/admin/additional", icon: FileText },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-screen w-64 bg-card border-r border-border">
            <div className="p-6 border-b border-border">
                <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">Manage your portfolio</p>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/admin/login';
                    }}
                    className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </div>
    );
}
