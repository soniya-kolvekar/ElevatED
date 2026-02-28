"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Squares2X2Icon,
    AdjustmentsHorizontalIcon,
    DocumentTextIcon,
    ChartBarIcon,
    UsersIcon,
    Cog8ToothIcon,
    PresentationChartLineIcon
} from "@heroicons/react/24/outline";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: Squares2X2Icon },
        { name: "Analytics", href: "/admin/dashboard/analytics", icon: PresentationChartLineIcon },
        { name: "Policy Builder", href: "/admin/dashboard/policy-builder", icon: AdjustmentsHorizontalIcon },
        { name: "Audit Logs", href: "/admin/dashboard/audit-logs", icon: DocumentTextIcon },
        { name: "Reports", href: "/admin/dashboard/reports", icon: ChartBarIcon },
        { name: "Student Data", href: "/admin/dashboard/students", icon: UsersIcon },
        { name: "Settings", href: "/admin/dashboard/settings", icon: Cog8ToothIcon }
    ];

    return (
        <div className="flex h-screen bg-[#f4f7f5] font-sans text-gray-900 overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-[260px] bg-[#f8fbfa] border-r border-[#e9f0ec] flex flex-col shrink-0 px-6 py-8">
                {/* Logo Area */}
                <Link href="/admin/dashboard" className="flex items-center gap-3 mb-10 pl-2">
                    <div className="w-9 h-9 bg-[#457c5f] text-white flex items-center justify-center rounded-[8px] shadow-sm">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 5L12 11.82 5.18 8 12 4.27 18.82 8zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" /></svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-[15px] tracking-tight leading-tight text-[#0a192f]">ElevatED</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Portal</span>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="flex-1 space-y-1.5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.name === "Dashboard" && pathname === "/admin/dashboard");
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-[12px] text-[13px] font-bold transition-all ${isActive
                                    ? 'bg-[#eef5ef] text-[#457c5f]'
                                    : 'text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm hover:border hover:border-gray-100'
                                    }`}
                            >
                                <item.icon className="w-[18px] h-[18px] shrink-0" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom User Profile */}
                <div className="mt-auto pt-6 border-t border-[#e9f0ec] flex items-center gap-3 pl-2">
                    <div className="w-10 h-10 rounded-full bg-[#dfbca1] text-[#7a5c43] flex items-center justify-center font-bold text-[14px]">
                        AV
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[13px] font-extrabold text-[#0a192f]">Dr. Aris V.</span>
                        <span className="text-[11px] font-medium text-gray-400 leading-tight">Dean of Placements</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full min-h-0 bg-[#f4f7f5] p-6 lg:p-10">
                <div className="max-w-[1200px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
