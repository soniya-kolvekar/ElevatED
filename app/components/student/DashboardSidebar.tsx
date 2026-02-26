"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Target,
    Briefcase,
    BarChart3,
    TrendingUp,
    Settings,
    User,
    LogOut,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/student/dashboard" },
    { name: "ATX Score", icon: Target, href: "/student/dashboard/atx" },
    { name: "Match Opportunities", icon: Briefcase, href: "/student/dashboard/matches" },
    { name: "Skill Gap Analysis", icon: BarChart3, href: "/student/dashboard/skills" },
    { name: "Readiness Growth", icon: TrendingUp, href: "/student/dashboard/simulator" },
    { name: "Resume Analysis", icon: FileText, href: "/student/dashboard/resume" },
    { name: "Settings", icon: Settings, href: "/student/dashboard/settings" },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        document.cookie = "auth-role=; path=/; max-age=0";
        logout();
        window.location.href = "/";
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-jungle rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        E
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-jungle to-tropicalTeal">
                        ElevatED
                    </span>
                </Link>
            </div>

            <div className="px-6 mb-8">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-tropicalTeal/10 flex items-center justify-center text-tropicalTeal font-bold">
                        {user?.name?.charAt(0) || "S"}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">{user?.name || "Student"}</p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                            {user?.role || "Senior CS Student"}
                        </p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-jungle/10 text-jungle font-semibold"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5",
                                isActive ? "text-jungle" : "text-gray-400 group-hover:text-gray-600"
                            )} />
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-gray-50">
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>

                <div className="mt-4">
                    <button className="w-full py-3 bg-jungle text-white rounded-xl text-sm font-bold shadow-soft hover:bg-jungle/90 transition-all">
                        View Public Profile
                    </button>
                </div>
            </div>
        </aside>
    );
}
