"use client";

import { Bell, Search, MessageSquare, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export function TopHeader() {
    const { user } = useAuthStore();

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-jungle transition-colors" />
                    <input
                        type="text"
                        placeholder="Search internships, skills, or companies..."
                        className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-jungle/20 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-jungle hover:bg-jungle/5 rounded-lg transition-all relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-jungle hover:bg-jungle/5 rounded-lg transition-all">
                        <MessageSquare className="w-5 h-5" />
                    </button>
                </div>

                <div className="h-8 w-[1px] bg-gray-100mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                        GOLD II
                    </div>
                </div>
            </div>
        </header>
    );
}
