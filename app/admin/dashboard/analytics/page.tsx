"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { ArrowDownTrayIcon, CalendarIcon, AcademicCapIcon, ViewColumnsIcon, ChartBarIcon, ChartPieIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function PlacementAnalytics() {
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

    // Top ATX Scores mock data (Area Chart)
    const atxScoresData = [
        { name: 'CSE', score: 810 },
        { name: 'IT', score: 780 },
        { name: 'ECE', score: 710 },
        { name: 'ME', score: 620 },
        { name: 'CE', score: 580 },
    ];

    // Company Diversity mock data (Donut Chart)
    const companyData = [
        { name: 'Product Based', value: 35, color: '#4a7c59' },    // Dark green
        { name: 'Service Based', value: 30, color: '#92bfa5' },    // Light green
        { name: 'Startups', value: 35, color: '#e6ecd8' },         // Beige
    ];

    // Recent Placements Data
    const placementsData = [
        { name: "Aditi Sharma", branch: "CSE", company: "Google", package: "42.5 LPA" },
        { name: "Rohan Verma", branch: "IT", company: "Atlassian", package: "38.0 LPA" },
        { name: "Sanya Kapoor", branch: "ECE", company: "Qualcomm", package: "24.5 LPA" },
        { name: "Vikram Singh", branch: "ME", company: "Tata Motors", package: "12.8 LPA" },
    ];

    // Grid Heatmap Data matching the exact hex colors from mockup
    const gridData = [
        {
            dept: "CSE",
            eligible: { val: 420, color: "bg-[#4a7c59]", text: "text-white" },
            applied: { val: 395, color: "bg-[#4a7c59]", text: "text-white" },
            shortlisted: { val: 280, color: "bg-[#69a297]", text: "text-white" },
            placed: { val: 215, color: "bg-[#4a7c59]", text: "text-white" }
        },
        {
            dept: "IT",
            eligible: { val: 310, color: "bg-[#69a297]", text: "text-white" },
            applied: { val: 285, color: "bg-[#69a297]", text: "text-white" },
            shortlisted: { val: 190, color: "bg-[#92bfa5]", text: "text-white" },
            placed: { val: 142, color: "bg-[#69a297]", text: "text-white" }
        },
        {
            dept: "ECE",
            eligible: { val: 280, color: "bg-[#92bfa5]", text: "text-white" },
            applied: { val: 240, color: "bg-[#92bfa5]", text: "text-white" },
            shortlisted: { val: 120, color: "bg-[#c1d2b8]", text: "text-[#1d3326]" },
            placed: { val: 95, color: "bg-[#92bfa5]", text: "text-white" }
        },
        {
            dept: "ME",
            eligible: { val: 210, color: "bg-[#92bfa5]", text: "text-white" },
            applied: { val: 150, color: "bg-[#c1d2b8]", text: "text-[#1d3326]" },
            shortlisted: { val: 65, color: "bg-[#e6ecd8]", text: "text-[#1d3326]" },
            placed: { val: 48, color: "bg-[#c1d2b8]", text: "text-[#1d3326]" }
        },
        {
            dept: "CE",
            eligible: { val: 155, color: "bg-[#c1d2b8]", text: "text-[#1d3326]" },
            applied: { val: 90, color: "bg-[#e6ecd8]", text: "text-[#1d3326]" },
            shortlisted: { val: 40, color: "bg-[#f1f3e8]", text: "text-[#1d3326]" },
            placed: { val: 32, color: "bg-[#e6ecd8]", text: "text-[#1d3326]" }
        },
    ];

    return (
        <div className="w-full pb-10 space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 mt-2">
                <div>
                    <h1 className="text-[32px] md:text-[36px] leading-tight font-extrabold text-[#051421] mb-2 tracking-tight">
                        Institutional Placement Analytics
                    </h1>
                    <p className="text-[15px] text-gray-500 font-medium">
                        Real-time branch performance and AI-powered ATX scoring insights
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {/* 2023-24 Dropdown */}
                    <div className="relative">
                        <select className="bg-white border border-gray-100 rounded-full px-5 py-2.5 text-[14px] font-bold text-[#4a7c59] appearance-none cursor-pointer pr-10 shadow-[0_2px_8px_rgba(0,0,0,0.02)] pl-10 focus:outline-none hover:bg-gray-50 transition-all">
                            <option>2023-24</option>
                            <option>2024-25</option>
                        </select>
                        <CalendarIcon className="w-[18px] h-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4a7c59] pointer-events-none" />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#4a7c59]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Fall Semester Dropdown */}
                    <div className="relative">
                        <select className="bg-white border border-gray-100 rounded-full px-5 py-2.5 text-[14px] font-bold text-[#4a7c59] appearance-none cursor-pointer pr-10 shadow-[0_2px_8px_rgba(0,0,0,0.02)] pl-10 focus:outline-none hover:bg-gray-50 transition-all">
                            <option>Fall Semester</option>
                            <option>Spring Semester</option>
                        </select>
                        <AcademicCapIcon className="w-[18px] h-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4a7c59] pointer-events-none" />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#4a7c59]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Export Button */}
                    <button onClick={() => handleExport("institutional_placement_analytics.csv")} className="px-6 py-2.5 bg-[#4a7c59] hover:bg-[#3b6347] text-white rounded-full text-[14px] font-bold transition-colors shadow-md shadow-[#4a7c59]/20 flex items-center gap-2">
                        <ArrowDownTrayIcon className="w-4 h-4" strokeWidth={2.5} /> Export Report
                    </button>
                </div>
            </div>

            {/* Top Row: Heatmap & ATX Score */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* Branch Heatmap (Left, spans 7 cols proportionally) */}
                <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-0 xl:col-span-8">
                    <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-3">
                            <ViewColumnsIcon className="w-6 h-6 text-[#4a7c59]" strokeWidth={2} />
                            <h2 className="text-[18px] font-extrabold text-[#051421]">Branch vs. Placement Status Heatmap</h2>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-gray-500">
                            LOW
                            <div className="flex gap-1 ml-1 mr-1">
                                <div className="w-3.5 h-3.5 bg-[#c1d2b8] rounded-sm"></div>
                                <div className="w-3.5 h-3.5 bg-[#92bfa5] rounded-sm"></div>
                                <div className="w-3.5 h-3.5 bg-[#69a297] rounded-sm"></div>
                                <div className="w-3.5 h-3.5 bg-[#4a7c59] rounded-sm"></div>
                            </div>
                            HIGH CONCENTRATION
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="grid grid-cols-5 gap-6 mb-4 text-[11px] font-black uppercase tracking-widest text-gray-400">
                            <div className="text-left py-2 px-2">DEPARTMENT</div>
                            <div className="text-center py-2 text-[#051421]">Eligible</div>
                            <div className="text-center py-2 text-[#051421]">Applied</div>
                            <div className="text-center py-2 text-[#051421]">Shortlisted</div>
                            <div className="text-center py-2 text-[#051421]">Placed</div>
                        </div>

                        <div className="space-y-4">
                            {gridData.map((row, idx) => (
                                <div key={idx} className="grid grid-cols-5 gap-6 items-center">
                                    <div className="text-[15px] font-extrabold text-[#051421] pl-2">{row.dept}</div>
                                    <div className={`py-3.5 rounded-full text-center font-black text-[17px] ${row.eligible.color} ${row.eligible.text}`}>
                                        {row.eligible.val}
                                    </div>
                                    <div className={`py-3.5 rounded-full text-center font-black text-[17px] ${row.applied.color} ${row.applied.text}`}>
                                        {row.applied.val}
                                    </div>
                                    <div className={`py-3.5 rounded-full text-center font-black text-[17px] ${row.shortlisted.color} ${row.shortlisted.text}`}>
                                        {row.shortlisted.val}
                                    </div>
                                    <div className={`py-3.5 rounded-full text-center font-black text-[17px] ${row.placed.color} ${row.placed.text}`}>
                                        {row.placed.val}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top ATX Scores (Right, spans 5 cols) */}
                <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-0 flex flex-col xl:col-span-4">
                    <div className="flex items-center gap-3 mb-6">
                        <ChartBarIcon className="w-6 h-6 text-[#4a7c59]" strokeWidth={2} />
                        <h2 className="text-[18px] font-extrabold text-[#051421]">Top ATX Scores</h2>
                    </div>

                    {/* Functional Area Chart inside the empty space from mockup */}
                    <div className="flex-1 min-h-[160px] w-full mt-2 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={atxScoresData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4a7c59" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#4a7c59" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontSize: '13px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#4a7c59" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#051421', fontWeight: '900' }} dy={10} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col items-center">
                        <div className="w-full flex justify-between items-center bg-[#f9fbf9] p-4 rounded-xl">
                            <span className="text-[14px] font-bold text-[#051421]">Avg. ATX Score</span>
                            <span className="text-[20px] font-black text-[#4a7c59]">742.5</span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium italic mt-5 leading-relaxed text-left w-full px-1">
                            ATX scoring combines academic performance, technical skills, and behavioral assessments.
                        </p>
                    </div>
                </div>

            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* Company Diversity (Left, 4 cols) */}
                <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-0 xl:col-span-4 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <ChartPieIcon className="w-6 h-6 text-[#4a7c59]" strokeWidth={2} />
                            <h2 className="text-[18px] font-extrabold text-[#051421]">Company Diversity</h2>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <div className="relative w-[140px] h-[140px] shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={companyData}
                                            innerRadius={45}
                                            outerRadius={65}
                                            paddingAngle={2}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {companyData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                                    <span className="text-[22px] font-black text-[#051421] leading-none mb-1">142</span>
                                    <span className="text-[8px] font-black tracking-widest text-gray-400 uppercase">COMPANIES</span>
                                </div>
                            </div>

                            <div className="space-y-5 ml-4 w-full">
                                {companyData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-[12px] font-semibold text-gray-600 truncate">{item.name}</span>
                                        </div>
                                        <span className="text-[13px] font-black text-[#051421]">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button onClick={() => alert("Loading full company list...")} className="w-full mt-8 py-3 bg-[#f8fbf9] hover:bg-[#ebf4ef] text-[#4a7c59] border-none rounded-full text-[13px] font-bold transition-colors">
                        View Company List
                    </button>
                </div>

                {/* Recent Placements (Right, 8 cols) */}
                <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-0 xl:col-span-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <UserGroupIcon className="w-6 h-6 text-[#4a7c59]" strokeWidth={2} />
                            <h2 className="text-[18px] font-extrabold text-[#051421]">Recent Placements</h2>
                        </div>
                        <button onClick={() => alert("Loading all placements...")} className="text-[13px] font-bold text-[#4a7c59] hover:text-[#3b6347]">View All</button>
                    </div>

                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="pb-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">STUDENT NAME</th>
                                    <th className="pb-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">BRANCH</th>
                                    <th className="pb-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">COMPANY</th>
                                    <th className="pb-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">PACKAGE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {placementsData.map((placement, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-5 text-[15px] font-bold text-[#051421]">{placement.name}</td>
                                        <td className="py-5">
                                            <span className="px-3 py-1 bg-[#f4f7f5] rounded-lg text-[11px] font-black tracking-widest uppercase text-gray-500">{placement.branch}</span>
                                        </td>
                                        <td className="py-5 text-[15px] font-medium text-gray-600">{placement.company}</td>
                                        <td className="py-5 text-right">
                                            <span className="text-[16px] font-black text-[#4a7c59] tracking-tight">{placement.package}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div className="text-center pt-2 pb-6">
                <p className="text-[12px] font-medium text-gray-400">
                    © 2024 ElevatED AI-Powered Campus Placement ERP. All analytics are generated based on active drive data.
                </p>
            </div>
        </div>
    );
}
