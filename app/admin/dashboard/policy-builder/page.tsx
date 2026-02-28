"use client";

import { useState } from "react";
import { PlusIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export default function PolicyBuilder() {
    const [cgpa, setCgpa] = useState(7.5);
    const [jobPolicy, setJobPolicy] = useState(true);
    const [atxGating, setAtxGating] = useState(false);
    const [branches, setBranches] = useState([
        { name: "CSE", active: true },
        { name: "ECE", active: true },
        { name: "IT", active: true },
        { name: "Mechanical", active: false },
        { name: "Civil", active: false },
        { name: "Chemical", active: false },
    ]);

    const toggleBranch = (name: string) => {
        setBranches(branches.map(b => b.name === name ? { ...b, active: !b.active } : b));
    };

    // Dynamic Mock Calculations
    const activeBranchCount = branches.filter(b => b.active).length;
    const baseEligible = 2000;

    // As CGPA threshold goes up, eligible students go down
    const cgpaFactor = Math.max(0, 10 - cgpa) / 10;

    // active branches increase the pool
    const branchFactor = activeBranchCount / branches.length;

    // Toggles restrict the pool
    const jobPolicyPenalty = jobPolicy ? 0.85 : 1.0;
    const atxGatingPenalty = atxGating ? 0.60 : 1.0;

    const totalEligible = Math.round(baseEligible * cgpaFactor * branchFactor * jobPolicyPenalty * atxGatingPenalty);
    const excludedBase = 2500 - totalEligible;

    // Sub-calculations for branches based on the total eligible
    const cseCount = Math.round(totalEligible * 0.45);
    const eceCount = Math.round(totalEligible * 0.35);
    const itCount = Math.round(totalEligible * 0.20);

    return (
        <div className="w-full pb-10 space-y-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 mt-2">
                <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#457c5f] font-bold mb-2 flex items-center gap-2">
                        <span className="text-gray-400">ADMIN CONSOLE</span>
                        <span className="text-gray-300">›</span>
                        <span>NEW ELIGIBILITY POLICY</span>
                    </div>
                    <h1 className="text-[28px] leading-tight font-extrabold text-[#0a192f] mb-1.5 tracking-tight">
                        Institutional Policy Builder
                    </h1>
                    <p className="text-[14px] text-gray-500 font-medium">
                        Configure real-time placement eligibility rules using AI-driven ATX parameters.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => alert("Draft discarded.")} className="px-5 py-2.5 bg-white border border-gray-200 rounded-[100px] text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        Discard Draft
                    </button>
                    <button onClick={() => alert("Policy saved and published successfully!")} className="px-5 py-2.5 bg-[#457c5f] hover:bg-[#346048] text-white rounded-[100px] text-[13px] font-bold transition-colors shadow-sm shadow-[#457c5f]/20">
                        Save & Publish
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">

                {/* Left Column: Form Controls */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Rule Configuration Card */}
                    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#f0f3f1]">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-6 h-6 rounded bg-[#f4f7f5] text-[#457c5f] flex items-center justify-center">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" /></svg>
                            </div>
                            <h2 className="text-[16px] font-bold text-[#0a192f]">Rule Configuration</h2>
                        </div>

                        <div className="space-y-8">
                            {/* Slider */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-[13px] font-bold text-[#0a192f]">Minimum CGPA Threshold</label>
                                    <span className="text-[22px] font-extrabold text-[#457c5f]">{cgpa.toFixed(1)}+</span>
                                </div>
                                <div className="relative pt-1">
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-100">
                                        <div style={{ width: `${(cgpa / 10) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#457c5f]"></div>
                                    </div>
                                    <input
                                        type="range" min="0" max="10" step="0.1"
                                        value={cgpa}
                                        onChange={(e) => setCgpa(parseFloat(e.target.value))}
                                        className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[11px] font-bold text-gray-400 px-1">
                                        <span>0.0</span>
                                        <span>2.5</span>
                                        <span>5.0</span>
                                        <span>7.5</span>
                                        <span>10.0</span>
                                    </div>
                                    {/* Custom slider thumb visual */}
                                    <div
                                        className="absolute top-1/2 -mt-2 w-4 h-4 bg-white border-[3px] border-[#457c5f] rounded-full shadow pointer-events-none"
                                        style={{ left: `calc(${(cgpa / 10) * 100}% - 8px)` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Branches */}
                            <div>
                                <label className="block text-[13px] font-bold text-[#0a192f] mb-3">Eligible Branches</label>
                                <div className="flex flex-wrap gap-2">
                                    {branches.map((branch) => (
                                        <button
                                            key={branch.name}
                                            onClick={() => toggleBranch(branch.name)}
                                            className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-colors ${branch.active
                                                ? 'bg-[#457c5f] text-white shadow-sm shadow-[#457c5f]/20'
                                                : 'bg-[#f4f7f5] text-gray-500 hover:bg-gray-200'
                                                }`}
                                        >
                                            {branch.name}
                                        </button>
                                    ))}
                                    <button onClick={() => alert("Opening Add Branch modal...")} className="px-4 py-1.5 rounded-full text-[12px] font-bold bg-[#f8fbfa] text-gray-500 border border-[#f0f3f1] flex items-center gap-1 hover:bg-[#f4f7f5] transition-colors">
                                        <PlusIcon className="w-3 h-3" /> Add More
                                    </button>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[13px] font-bold text-[#0a192f] mb-2">Max Backlogs Allowed</label>
                                    <div className="relative">
                                        <input type="number" defaultValue="0" min="0" className="w-full bg-[#f8fbfa] border border-[#f0f3f1] rounded-[10px] px-4 py-2.5 text-[14px] font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#457c5f]/20 focus:bg-white transition-all" />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none text-gray-400">
                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold text-[#0a192f] mb-2">Year of Graduation</label>
                                    <div className="relative">
                                        <select defaultValue="2025" className="w-full bg-[#f8fbfa] border border-[#f0f3f1] rounded-[10px] px-4 py-2.5 text-[14px] font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#457c5f]/20 focus:bg-white transition-all appearance-none cursor-pointer">
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attempt Restrictions Card */}
                    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#f0f3f1]">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 rounded bg-[#fff8e1] text-[#f59e0b] flex items-center justify-center">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h2 className="text-[16px] font-bold text-[#0a192f]">Attempt Restrictions</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1]">
                                <div>
                                    <div className="text-[13px] font-bold text-[#0a192f] mb-0.5">One Job Per Student Policy</div>
                                    <div className="text-[12px] text-gray-500 font-medium">Prevent students with existing offers from re-applying</div>
                                </div>
                                {/* Toggle */}
                                <button
                                    onClick={() => setJobPolicy(!jobPolicy)}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${jobPolicy ? 'bg-[#457c5f]' : 'bg-gray-200'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${jobPolicy ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1]">
                                <div>
                                    <div className="text-[13px] font-bold text-[#0a192f] mb-0.5">ATX Score Gating</div>
                                    <div className="text-[12px] text-gray-500 font-medium">Allow only students with ATX score &gt; 650</div>
                                </div>
                                {/* Toggle */}
                                <button
                                    onClick={() => setAtxGating(!atxGating)}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${atxGating ? 'bg-[#457c5f]' : 'bg-gray-200'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${atxGating ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Impact Preview */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] border border-[#f0f3f1] sticky top-4">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-[#eaeff5] text-[#3b82f6] flex items-center justify-center">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" /></svg>
                                </div>
                                <h3 className="text-[15px] font-bold text-[#0a192f]">Live Impact Preview</h3>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase bg-[#f0f5f2] text-[#457c5f]">
                                Live
                            </span>
                        </div>

                        <div className="text-center mb-10">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Eligible Students</p>
                            <h4 className="text-[54px] font-black text-[#0a192f] leading-none tracking-tighter mb-2">{totalEligible.toLocaleString()}</h4>
                            <p className={`text-[12px] font-bold flex items-center justify-center gap-1 ${totalEligible > 1000 ? 'text-[#1eb463]' : 'text-red-500'}`}>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                {totalEligible > 1000 ? '+12% vs last policy' : '-8% strict filter'}
                            </p>
                        </div>

                        {/* Breakdown Bars */}
                        <div className="space-y-5 mb-8">
                            <div>
                                <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1.5">
                                    <span>CSE</span>
                                    <span>{cseCount} Students</span>
                                </div>
                                <div className="w-full h-2.5 bg-[#f4f7f5] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#457c5f]" style={{ width: `${(cseCount / totalEligible) * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1.5">
                                    <span>ECE</span>
                                    <span>{eceCount} Students</span>
                                </div>
                                <div className="w-full h-2.5 bg-[#f4f7f5] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#8b5cf6]" style={{ width: `${(eceCount / totalEligible) * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1.5">
                                    <span>IT</span>
                                    <span>{itCount} Students</span>
                                </div>
                                <div className="w-full h-2.5 bg-[#f4f7f5] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#f59e0b]" style={{ width: `${(itCount / totalEligible) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Boxes */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-[#f8fbfa] rounded-xl p-4 border border-[#f0f3f1]">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Excluded</div>
                                <div className="text-[22px] font-black text-red-500 mb-1">{excludedBase}</div>
                                <div className="text-[10px] font-medium text-gray-500">Low CGPA/Backlogs</div>
                            </div>
                            <div className="bg-[#f8fbfa] rounded-xl p-4 border border-[#f0f3f1]">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">ATX Peak</div>
                                <div className="text-[22px] font-black text-[#8b5cf6] mb-1">{Math.round(totalEligible * 0.15)}</div>
                                <div className="text-[10px] font-medium text-gray-500">Top Tier Talent</div>
                            </div>
                        </div>

                        {/* Info Note */}
                        <div className="bg-[#f0f5f2] border border-[#d2dfd8] rounded-xl p-4 flex gap-3">
                            <InformationCircleIcon className="w-5 h-5 text-[#457c5f] shrink-0 mt-0.5" />
                            <p className="text-[11px] text-gray-600 font-medium italic leading-relaxed">
                                *The current threshold ensures a balanced student mix for the upcoming Microsoft and Google placement drives.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
