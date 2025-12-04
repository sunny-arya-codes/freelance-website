'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  FileText,
  Settings,
  ArrowRight
} from "lucide-react";

const AdminPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/admin/login');
    } else {
      setToken(storedToken);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const dashboardItems = [
    { name: "Profile", href: "/admin/profile", icon: User, description: "Manage personal details and bio", color: "bg-blue-500/10 text-blue-500" },
    { name: "Skills", href: "/admin/skills", icon: Code, description: "Update technical skills and proficiency", color: "bg-green-500/10 text-green-500" },
    { name: "Experience", href: "/admin/experience", icon: Briefcase, description: "Edit work history and roles", color: "bg-purple-500/10 text-purple-500" },
    { name: "Projects", href: "/admin/projects", icon: Settings, description: "Showcase your latest work", color: "bg-orange-500/10 text-orange-500" },
    { name: "Education", href: "/admin/education", icon: GraduationCap, description: "Manage educational background", color: "bg-pink-500/10 text-pink-500" },
    { name: "Training", href: "/admin/training", icon: FileText, description: "Certifications and workshops", color: "bg-yellow-500/10 text-yellow-500" },
    { name: "Achievements", href: "/admin/achievements", icon: Award, description: "Awards and recognitions", color: "bg-red-500/10 text-red-500" },
    { name: "Additional", href: "/admin/additional", icon: FileText, description: "Other information", color: "bg-teal-500/10 text-teal-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's an overview of your portfolio content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
