"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Briefcase,
    Users,
    CheckCircle,
    BarChart3,
    Settings,
    Sparkles,
    LogOut,
    PlusCircle,
    UserCircle,
    FileText,
    ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const navItems = [
    { name: "Post Job", icon: PlusCircle, href: "/recruiter/dashboard/post-job" },
    { name: "Job List", icon: FileText, href: "/recruiter/dashboard/jobs" },
    { name: "Drafts", icon: ClipboardList, href: "/recruiter/dashboard/drafts" },
    { name: "Candidates", icon: Users, href: "/recruiter/dashboard" },
    { name: "Shortlisted", icon: CheckCircle, href: "/recruiter/shortlisted" },
    { name: "Analytics", icon: BarChart3, href: "/recruiter/analytics" },
];

const systemItems = [
    { name: "Settings", icon: Settings, href: "/recruiter/settings" },
];

export default function RecruiterSidebar() {
    const pathname = usePathname();
    const { user, _hasHydrated, logout } = useAuthStore();

    const handleLogout = () => {
        document.cookie = "auth-role=; path=/; max-age=0";
        logout();
        window.location.href = "/";
    };

    return (
        <aside className="w-64 bg-[#f8fafa] border-r border-gray-100 flex flex-col h-screen sticky top-0 py-8 px-6">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-12">
                <div className="w-8 h-8 bg-jungle rounded-lg flex items-center justify-center text-white shadow-sm">
                    <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-800 leading-none">ElevatED</h1>
                    <p className="text-[10px] font-bold text-gray-400 mt-0.5 tracking-wider uppercase">Recruiter Pro</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.name === "Candidates" && pathname === "/recruiter/dashboard");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-jungle text-white shadow-soft font-medium"
                                    : "text-gray-500 hover:bg-white hover:shadow-sm"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5",
                                isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                            )} />
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    );
                })}

                <div className="pt-8 pb-2">
                    <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">System</p>
                </div>

                {systemItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-jungle text-white shadow-soft font-medium"
                                    : "text-gray-500 hover:bg-white hover:shadow-sm"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5",
                                isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                            )} />
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                {_hasHydrated && (
                    <Link href="/recruiter/settings" className="block group">
                        <div className="flex flex-col items-center gap-3 p-5 rounded-[2rem] bg-white/50 backdrop-blur-sm shadow-sm border border-white group-hover:bg-jungle/5 group-hover:border-jungle/20 transition-all duration-500">
                            <div className="w-20 h-20 rounded-3xl bg-tropicalTeal overflow-hidden flex items-center justify-center text-white text-3xl font-black ring-8 ring-white shadow-premium transition-transform group-hover:scale-105 duration-500">
                                {user?.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{user?.name?.charAt(0) || "R"}</span>
                                )}
                            </div>
                            <div className="w-full text-center px-2 mt-2">
                                <p className="text-xl font-black text-gray-900 tracking-tight leading-none break-words uppercase">
                                    {user?.name || "Recruiter"}
                                </p>
                                <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2 opacity-50">Talent Lead</p>
                            </div>
                        </div>
                    </Link>
                )}

                <button
                    onClick={handleLogout}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
