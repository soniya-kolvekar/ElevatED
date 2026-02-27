"use client";

import React from "react";
import Link from "next/link";

export function DashboardFooter() {
    return (
        <div className="w-full mt-12 py-8 bg-[#f8f6f0] border-t border-[#e8e4db] px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-[#a5c3af] uppercase tracking-widest">
                © {new Date().getFullYear()} ELEVATED • CAMPUS PLACEMENT ERP
            </p>
            <div className="flex items-center gap-8 text-[10px] font-black text-[#a5c3af] uppercase tracking-widest">
                <Link href="#" className="hover:text-[#4a7c59] transition-colors duration-300">Privacy Engine</Link>
                <Link href="#" className="hover:text-[#4a7c59] transition-colors duration-300">Security Audit</Link>
                <Link href="#" className="hover:text-[#4a7c59] transition-colors duration-300">ATX Methodology</Link>
            </div>
        </div>
    );
}
