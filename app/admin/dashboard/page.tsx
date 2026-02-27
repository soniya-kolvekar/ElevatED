"use client";

import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
    DocumentTextIcon,
    ArrowDownTrayIcon,
    UserGroupIcon,
    LightBulbIcon,
    DocumentDuplicateIcon,
    ShieldExclamationIcon,
    InformationCircleIcon
} from "@heroicons/react/24/outline";

export default function AnalyticsDashboard() {
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

    const [cgpa, setCgpa] = useState(7.5);
    const [backlogLimit, setBacklogLimit] = useState("1");
    // Mock Chart Data
    const chartData = [
        { name: 'CSE', engagement: 80, selection: 60 },
        { name: 'IT', engagement: 70, selection: 50 },
        { name: 'ECE', engagement: 45, selection: 30 },
        { name: 'MECH', engagement: 20, selection: 10 },
        { name: 'CIVIL', engagement: 15, selection: 5 },
        { name: 'EEE', engagement: 35, selection: 20 },
        { name: 'AI/ML', engagement: 90, selection: 75 },
        { name: 'DS', engagement: 85, selection: 65 },
    ];

    // Mock Recent Audits
    const recentAudits = [
        { action: "Policy Modified: CGPA Threshold", user: "admin_aris", time: "10:45 AM, 24 Oct", status: "SUCCESS" },
        { action: "Bulk Student Export", user: "coord_smith", time: "09:12 AM, 24 Oct", status: "PENDING" },
        { action: "ATX Scoring Recalibration", user: "system_ai", time: "04:30 AM, 24 Oct", status: "SUCCESS" },
        { action: "Failed Login Attempt", user: "ext_user_44", time: "02:15 AM, 24 Oct", status: "ALERT" },
    ];

    const getStatusColor = (status: string) => {
        if (status === 'SUCCESS') return 'bg-[#eefcf3] text-[#1eb463]';
        if (status === 'PENDING') return 'bg-[#f4f7f5] text-[#6b7280]';
        if (status === 'ALERT') return 'bg-[#fef2f2] text-[#ef4444]';
        return 'bg-gray-100 text-gray-500';
    };

    return (
        <div className="w-full pb-10 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-[26px] leading-tight font-black text-[#0a192f] mb-1 tracking-tight">
                        Placement Analytics Dashboard
                    </h1>
                    <p className="text-[13px] text-gray-400 font-medium">
                        Real-time ATX scoring and branch performance overview
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => alert("Loading advanced dashboard filters...")} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-[100px] text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                        Filter View
                    </button>
                    <button onClick={() => handleExport("dashboard_report.csv")} className="flex items-center gap-2 px-5 py-2 bg-[#457c5f] hover:bg-[#346048] text-white rounded-[100px] text-[12px] font-bold transition-colors shadow-sm">
                        <ArrowDownTrayIcon className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1]">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[12px] font-bold text-gray-500">Total Placed</span>
                        <UserGroupIcon className="w-4 h-4 text-[#457c5f]" />
                    </div>
                    <div className="text-[32px] font-black text-[#0a192f] mb-1">842</div>
                    <div className="text-[11px] font-bold text-[#1eb463] flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        +12% from last cycle
                    </div>
                </div>

                <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1]">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[12px] font-bold text-gray-500">Avg. ATX Score</span>
                        <LightBulbIcon className="w-4 h-4 text-[#457c5f]" />
                    </div>
                    <div className="text-[32px] font-black text-[#0a192f] mb-1">72.5</div>
                    <div className="text-[11px] font-bold text-[#1eb463] flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        +5.4% improvement
                    </div>
                </div>

                <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1]">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[12px] font-bold text-gray-500">Active Policies</span>
                        <DocumentDuplicateIcon className="w-4 h-4 text-[#457c5f]" />
                    </div>
                    <div className="text-[32px] font-black text-[#0a192f] mb-1">12</div>
                    <div className="text-[11px] font-bold text-gray-400">
                        Live configurations
                    </div>
                </div>

                <div className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1]">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[12px] font-bold text-gray-500">Pending Audits</span>
                        <ShieldExclamationIcon className="w-4 h-4 text-[#457c5f]" />
                    </div>
                    <div className="text-[32px] font-black text-[#0a192f] mb-1">24</div>
                    <div className="text-[11px] font-bold text-[#ef4444]">
                        ! 8 critical alerts
                    </div>
                </div>
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Policy Configuration Card */}
                <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1] col-span-1">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[15px] font-bold text-[#0a192f]">Policy Configuration</h2>
                        <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="space-y-6">
                        {/* CGPA Slider */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[12px] font-bold text-[#0a192f]">Min CGPA Threshold</label>
                                <span className="text-[12px] font-extrabold text-[#457c5f] bg-[#ebf3ee] px-2 py-0.5 rounded text-center">{cgpa.toFixed(1)}</span>
                            </div>
                            <div className="relative pt-1">
                                <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-gray-100">
                                    <div style={{ width: `${(cgpa / 10) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#457c5f]"></div>
                                </div>
                                <input
                                    type="range" min="0" max="10" step="0.1"
                                    value={cgpa}
                                    onChange={(e) => setCgpa(parseFloat(e.target.value))}
                                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                                />
                                <div
                                    className="absolute top-1/2 -mt-[5px] w-[14px] h-[14px] bg-white border-2 border-[#457c5f] rounded-full shadow pointer-events-none"
                                    style={{ left: `calc(${(cgpa / 10) * 100}% - 7px)` }}
                                ></div>
                            </div>
                        </div>

                        {/* Backlog Limit */}
                        <div>
                            <label className="text-[12px] font-bold text-[#0a192f] block mb-3">Backlog Limit</label>
                            <div className="flex gap-2">
                                {["0", "1", "2", "3+"].map(limit => (
                                    <button
                                        key={limit}
                                        onClick={() => setBacklogLimit(limit)}
                                        className={`flex-1 py-1.5 rounded-full text-[12px] font-bold transition-all border ${backlogLimit === limit
                                            ? 'border-[#457c5f] bg-white text-[#457c5f] shadow-sm'
                                            : 'border-transparent bg-[#f8fbfa] text-gray-500 hover:border-gray-200'
                                            }`}
                                    >
                                        {limit}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Target Branches */}
                        <div>
                            <label className="text-[12px] font-bold text-[#0a192f] block mb-3">Target Branches</label>
                            <div className="flex flex-wrap gap-2">
                                {["CSE", "IT", "ECE"].map(branch => (
                                    <span key={branch} className="px-3 py-1 bg-[#f4f7f5] text-[#457c5f] text-[11px] font-bold rounded flex items-center gap-1">
                                        {branch} <span className="text-gray-400 cursor-pointer hover:text-red-400">×</span>
                                    </span>
                                ))}
                                <button onClick={() => alert("Opening Add Branch modal...")} className="px-3 py-1 bg-white border border-gray-200 text-gray-400 text-[11px] font-bold rounded flex items-center gap-1 hover:bg-gray-50">
                                    + Add
                                </button>
                            </div>
                        </div>

                        {/* ATX Intelligence Weightage */}
                        <div>
                            <label className="text-[12px] font-bold text-[#0a192f] block mb-3">ATX Intelligence Weightage</label>
                            <div className="relative">
                                <select className="w-full bg-[#f8fbfa] border border-transparent rounded-[8px] px-3 py-2 text-[12px] font-bold text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#457c5f]">
                                    <option>High (Top 10% bias)</option>
                                    <option>Medium (Balanced)</option>
                                    <option>Low (Volume bias)</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => alert("Global policy updated successfully.")} className="w-full py-2.5 mt-2 bg-[#457c5f] hover:bg-[#346048] text-white text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                            Update Global Policy
                        </button>
                    </div>
                </div>

                {/* Heatmap Card */}
                <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1] col-span-2 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-[15px] font-bold text-[#0a192f]">Branch Performance Heatmap</h2>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#457c5f]"></div> High</span>
                            <span className="flex items-center gap-1 ml-1"><div className="w-2 h-2 rounded-full bg-[#e2e8d9]"></div> Low</span>
                        </div>
                    </div>
                    <p className="text-[12px] text-gray-400 font-medium mb-8">Selection rate % vs Branch engagement</p>

                    <div className="flex-1 w-full min-h-[200px] mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSelection" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#457c5f" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#457c5f" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#e2e8d9" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#e2e8d9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f3f1" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #f0f3f1', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 'bold', color: '#0a192f' }}
                                />
                                <Area type="monotone" dataKey="engagement" stroke="#e2e8d9" strokeWidth={3} fillOpacity={1} fill="url(#colorEngagement)" />
                                <Area type="monotone" dataKey="selection" stroke="#457c5f" strokeWidth={3} fillOpacity={1} fill="url(#colorSelection)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#f0f3f1]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[15px] font-bold text-[#0a192f]">Recent System Audit</h2>
                    <button onClick={() => alert("Loading full audit log history...")} className="text-[12px] font-bold text-[#457c5f] hover:text-[#346048]">
                        View All Logs
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-[#f0f3f1] w-[40%]">ACTION</th>
                                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-[#f0f3f1]">USER</th>
                                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-[#f0f3f1]">TIMESTAMP</th>
                                <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-[#f0f3f1] text-right">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f0f3f1]">
                            {recentAudits.map((audit, idx) => (
                                <tr key={idx} className="hover:bg-[#f8fbfa] transition-colors">
                                    <td className="py-4 text-[13px] font-bold text-[#0a192f] pr-4">{audit.action}</td>
                                    <td className="py-4 text-[12px] font-medium text-gray-600">{audit.user}</td>
                                    <td className="py-4 text-[12px] font-medium text-gray-500">{audit.time}</td>
                                    <td className="py-4 text-right">
                                        <span className={`px-2.5 py-1 rounded-[6px] text-[10px] font-black tracking-widest uppercase ${getStatusColor(audit.status)}`}>
                                            {audit.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-2">
                <p className="text-[10px] font-medium text-gray-400">
                    © 2024 ElevatED AI-Powered Campus Placement ERP. All analytics are generated based on active drive data.
                </p>
            </div>
        </div>
    );
}
