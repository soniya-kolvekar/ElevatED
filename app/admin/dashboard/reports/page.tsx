"use client";

import { DocumentArrowDownIcon, ChartPieIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export default function ReportsPage() {
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

    return (
        <div className="w-full pb-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 mt-2">
                <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#457c5f] font-bold mb-2 flex items-center gap-2">
                        <span className="text-gray-400">ADMIN CONSOLE</span>
                        <span className="text-gray-300">›</span>
                        <span>REPORTS DICTIONARY</span>
                    </div>
                    <h1 className="text-[28px] leading-tight font-extrabold text-[#0a192f] mb-1.5 tracking-tight">
                        Placement Reports & Analytics
                    </h1>
                    <p className="text-[14px] text-gray-500 font-medium">
                        Generate, view, and export detailed reports on student placement performance and company engagement.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => handleExport("placement_data.csv")} className="px-5 py-2.5 bg-[#457c5f] hover:bg-[#346048] text-white rounded-[100px] text-[13px] font-bold transition-colors shadow-sm shadow-[#457c5f]/20 flex items-center gap-2">
                        <DocumentArrowDownIcon className="w-4 h-4" /> Export All Data
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Placement Funnel Report Card */}
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#f0f3f1]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#f4f7f5] text-[#457c5f] flex items-center justify-center">
                                <ArrowTrendingUpIcon className="w-4 h-4" />
                            </div>
                            <h2 className="text-[16px] font-bold text-[#0a192f]">Placement Funnel</h2>
                        </div>
                        <button onClick={() => alert("Loading full Placement Funnel report...")} className="text-[12px] font-bold text-[#457c5f] hover:text-[#346048]">View Full</button>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1] flex justify-between items-center">
                            <span className="text-[13px] font-bold text-[#0a192f]">Registered Students</span>
                            <span className="text-[16px] font-black text-[#457c5f]">1,248</span>
                        </div>
                        <div className="p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1] flex justify-between items-center">
                            <span className="text-[13px] font-bold text-[#0a192f]">Eligible for Interviews</span>
                            <span className="text-[16px] font-black text-[#457c5f]">980</span>
                        </div>
                        <div className="p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1] flex justify-between items-center">
                            <span className="text-[13px] font-bold text-[#0a192f]">Offers Received</span>
                            <span className="text-[16px] font-black text-[#457c5f]">450</span>
                        </div>
                    </div>
                </div>

                {/* Company Engagement Card */}
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#f0f3f1]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#f4f7f5] text-[#457c5f] flex items-center justify-center">
                                <ChartPieIcon className="w-4 h-4" />
                            </div>
                            <h2 className="text-[16px] font-bold text-[#0a192f]">Top Recruiters</h2>
                        </div>
                        <button onClick={() => handleExport("top_recruiters.csv")} className="text-[12px] font-bold text-[#457c5f] hover:text-[#346048]">Export CSV</button>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-[12px]">MS</div>
                                <div>
                                    <h3 className="text-[13px] font-bold text-[#0a192f]">Microsoft</h3>
                                    <p className="text-[11px] text-gray-400 font-medium">Software Engineering</p>
                                </div>
                            </div>
                            <span className="text-[14px] font-black text-[#457c5f]">42 Offers</span>
                        </div>
                        <div className="p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-[12px]">GL</div>
                                <div>
                                    <h3 className="text-[13px] font-bold text-[#0a192f]">Google</h3>
                                    <p className="text-[11px] text-gray-400 font-medium">Data Science & ML</p>
                                </div>
                            </div>
                            <span className="text-[14px] font-black text-[#457c5f]">28 Offers</span>
                        </div>
                        <div className="p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-[12px]">AM</div>
                                <div>
                                    <h3 className="text-[13px] font-bold text-[#0a192f]">Amazon</h3>
                                    <p className="text-[11px] text-gray-400 font-medium">SDE & Operations</p>
                                </div>
                            </div>
                            <span className="text-[14px] font-black text-[#457c5f]">65 Offers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
