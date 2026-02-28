"use client";

import { useState } from "react";
import {
    MagnifyingGlassIcon, ArrowDownTrayIcon, FunnelIcon,
    CheckCircleIcon, InformationCircleIcon
} from "@heroicons/react/24/outline";
import { RefreshCcw } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";

export default function AuditLogs() {
    const handleExport = (filename: string) => {
        const csvContent = "data:text/csv;charset=utf-8,Demo Data\n1,2,3";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Table Filters State
    const [statusFilter, setStatusFilter] = useState("All Activity");
    const [actionFilter, setActionFilter] = useState("Policy Override");
    const [roleFilter, setRoleFilter] = useState("Admin & Recruiter");

    // Global Store Data
    const { auditLogs } = useAdminStore();

    return (
        <div className="w-full pb-10 space-y-6">

            {/* Header / Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 mt-2">
                <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#457c5f] font-bold mb-2 flex items-center gap-2">
                        <span className="text-gray-400">ADMIN CONSOLE</span>
                        <span className="text-gray-300">›</span>
                        <span className="text-gray-400">GOVERNANCE</span>
                        <span className="text-gray-300">›</span>
                        <span>AUDIT LOGS</span>
                    </div>
                    <h1 className="text-[28px] leading-tight font-extrabold text-[#0a192f] mb-1.5 tracking-tight">
                        Audit & Governance Logs
                    </h1>
                    <p className="text-[14px] text-gray-500 font-medium">
                        A complete immutable record of all placement activities, policy overrides, and system modifications within the ElevatED platform.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => handleExport("audit_logs.csv")} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-[100px] text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <ArrowDownTrayIcon className="w-4 h-4" /> Export CSV
                    </button>
                    <button onClick={() => alert("Syncing latest audit logs...")} className="flex items-center gap-2 px-5 py-2 bg-[#457c5f] hover:bg-[#346048] text-white rounded-[100px] text-[12px] font-bold transition-colors shadow-sm">
                        <RefreshCcw className="w-4 h-4" /> Real-time Sync
                    </button>
                </div>
            </div>

            {/* Layout Split: Left (Search/Table) + Right (Governance Info) */}
            <div className="grid lg:grid-cols-4 gap-6">

                {/* Left Side: Table & Search */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Search and Filters */}
                    <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1] space-y-4">
                        <div className="w-full relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search logs, users, or policies..."
                                className="w-full pl-12 pr-4 py-3 bg-[#f4f7f5] border border-transparent rounded-[12px] text-[13px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#457c5f]/30 focus:bg-white focus:border-gray-200 transition-all placeholder:text-gray-500"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#f0f3f1]">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 text-[12px]">
                                    <span className="font-semibold text-gray-500">Status:</span>
                                    <select className="bg-transparent font-bold text-[#457c5f] focus:outline-none cursor-pointer appearance-none pr-4 relative">
                                        <option>All Activity</option>
                                    </select>
                                    <span className="text-[#457c5f] text-[10px] -ml-4 pointer-events-none">▼</span>
                                </div>
                                <div className="flex items-center gap-2 text-[12px]">
                                    <span className="font-semibold text-gray-500">Action Type:</span>
                                    <select className="bg-transparent font-bold text-[#457c5f] focus:outline-none cursor-pointer appearance-none pr-4 relative">
                                        <option>Policy Override</option>
                                    </select>
                                    <span className="text-[#457c5f] text-[10px] -ml-4 pointer-events-none">▼</span>
                                </div>
                                <div className="flex items-center gap-2 text-[12px]">
                                    <span className="font-semibold text-gray-500">Role:</span>
                                    <select className="bg-transparent font-bold text-[#457c5f] focus:outline-none cursor-pointer appearance-none pr-4 relative">
                                        <option>Admin & Recruiter</option>
                                    </select>
                                    <span className="text-[#457c5f] text-[10px] -ml-4 pointer-events-none">▼</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[12px]">
                                <span className="font-semibold text-gray-500">Date Range:</span>
                                <span className="font-bold text-[#457c5f] flex items-center gap-1 cursor-pointer">
                                    Last 24 Hours <span className="text-[12px]">📅</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1] overflow-hidden">
                        <div className="p-4 bg-[#f8fbfa] border-b border-[#f0f3f1] flex justify-between items-center">
                            <h3 className="text-[14px] font-bold text-[#0a192f]">System Activity Log</h3>
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 italic">
                                <CheckCircleIcon className="w-3.5 h-3.5 text-green-500" /> Log integrity verified via Ledger
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#f0f3f1] bg-white">
                                        <th className="px-5 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[20%]">Timestamp</th>
                                        <th className="px-5 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[30%]">User Entity</th>
                                        <th className="px-5 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[20%]">Action Category</th>
                                        <th className="px-5 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[30%]">Target Resource</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f0f3f1]">
                                    {auditLogs.map((log, index) => (
                                        <tr key={index} className="hover:bg-[#f8fbfa] transition-colors">
                                            <td className="px-5 py-4 text-[12px] font-medium text-gray-500 font-mono">
                                                {log.timestamp}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-7 h-7 rounded-full bg-[#f4f7f5] text-gray-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                                                        {log.initials}
                                                    </div>
                                                    <div>
                                                        <div className="text-[13px] font-bold text-[#0a192f] leading-tight">{log.user}</div>
                                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{log.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-black tracking-wider ${log.categoryColor}`}>
                                                    {log.category.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-[12px] font-medium text-gray-600">
                                                {log.target}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="px-5 py-4 border-t border-[#f0f3f1] flex flex-wrap items-center justify-between bg-white text-[12px]">
                            <span className="text-gray-500 font-medium">Showing 1 to 5 of 1,248 entries</span>
                            <div className="flex items-center gap-1 font-bold mt-3 md:mt-0">
                                <button className="px-3 py-1.5 text-gray-400 hover:text-gray-900 transition-colors">Prev</button>
                                <button className="w-7 h-7 rounded-[6px] bg-[#457c5f] text-white flex items-center justify-center shadow-sm">1</button>
                                <button className="w-7 h-7 rounded-[6px] hover:bg-[#f4f7f5] text-gray-600 flex items-center justify-center transition-colors">2</button>
                                <button className="w-7 h-7 rounded-[6px] hover:bg-[#f4f7f5] text-gray-600 flex items-center justify-center transition-colors">3</button>
                                <span className="text-gray-400 px-1">...</span>
                                <button className="w-7 h-7 rounded-[6px] hover:bg-[#f4f7f5] text-gray-600 flex items-center justify-center transition-colors">250</button>
                                <button className="px-3 py-1.5 text-[#0a192f] hover:bg-[#f4f7f5] rounded-[6px] transition-colors ml-1">Next</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Governance Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1]">
                        <h3 className="text-[14px] font-bold text-[#0a192f] mb-6 flex items-center gap-2">
                            Governance Snapshot
                        </h3>

                        {/* Compliance Score */}
                        <div className="mb-8">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[12px] font-medium text-gray-500">Overall Compliance Score</span>
                                <span className="text-[12px] font-bold text-[#1eb463]">98.4%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="bg-[#1eb463] h-full rounded-full w-[98.4%]"></div>
                            </div>
                        </div>

                        {/* Badges Section */}
                        <div className="mb-8">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Active Policy Validation Badges</h4>
                            <div className="flex flex-col gap-2">
                                <span className="px-3 py-2 bg-[#eefcf3] text-[#1eb463] border border-[#d6f0df] rounded-[8px] text-[10px] font-bold flex items-center gap-2 uppercase tracking-wider">
                                    <div className="w-4 h-4 bg-[#c8e6d3] text-[#1eb463] rounded-sm flex items-center justify-center">✓</div>
                                    ATX_INTEGRITY
                                </span>
                                <span className="px-3 py-2 bg-[#f4f7f5] text-[#457c5f] border border-[#e9f0ec] rounded-[8px] text-[10px] font-bold flex items-center gap-2 uppercase tracking-wider">
                                    <span className="text-[12px]">§</span> BYLAW_4.2
                                </span>
                                <span className="px-3 py-2 bg-[#f8fbfa] text-gray-600 border border-[#f0f3f1] rounded-[8px] text-[10px] font-bold flex items-center gap-2 uppercase tracking-wider">
                                    <span className="text-[12px]">🔒</span> ISO_27001
                                </span>
                                <span className="px-3 py-2 bg-[#fff1f2] text-[#f43f5e] border border-[#ffe4e6] rounded-[8px] text-[10px] font-bold flex items-center gap-2 uppercase tracking-wider">
                                    <span className="text-[10px] text-[#fb7185]">▲</span> OVERRIDE_AUTH
                                </span>
                            </div>
                        </div>

                        {/* Audit Health Card */}
                        <div className="bg-[#f8fbfa] rounded-[16px] p-4 border border-[#f0f3f1] mt-4">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-4 h-4 bg-[#457c5f] text-white rounded-[4px] flex items-center justify-center text-[10px]">✓</div>
                                <span className="text-[13px] font-bold text-[#0a192f]">Audit Health</span>
                            </div>
                            <p className="text-[11px] text-gray-500 leading-relaxed font-medium mb-4">
                                System logs are being asynchronously replicated to the secondary node for redundancy.
                            </p>
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 pt-3 border-t border-[#f0f3f1]">
                                <span>Uptime</span>
                                <span className="text-[#1eb463]">99.999%</span>
                            </div>
                        </div>

                        {/* New Policy Button */}
                        <button onClick={() => alert("Opening New Policy form...")} className="w-full py-3 mt-6 border border-dashed border-[#d1d5db] text-gray-500 rounded-[12px] text-[12px] font-bold hover:bg-[#f8fbfa] hover:text-[#0a192f] hover:border-gray-400 transition-colors flex items-center justify-center gap-1">
                            + Configure New Policy
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
