"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { DashboardSidebar } from "@/components/student/DashboardSidebar";
import { TopHeader } from "@/components/student/TopHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { user, loading } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    const hasResume = !!user?.resumeUrl;

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-eggshell flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-jungle border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // If the user is on the dashboard root and has no resume, we show the uplifted upload screen (no sidebar)
    // But if they are on a sub-page without a resume, we redirect them back to the dashboard root
    if (!hasResume && pathname !== "/student/dashboard") {
        router.push("/student/dashboard");
        return null;
    }

    if (!hasResume) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-[#F8F9FA]">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <TopHeader />
                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d1d5db;
                }
            `}</style>
        </div>
    );
}
