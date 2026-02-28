"use client";

import { BellIcon, ShieldCheckIcon, UserCircleIcon, AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";

export default function SettingsPage() {
    return (
        <div className="w-full pb-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 mt-2">
                <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#457c5f] font-bold mb-2 flex items-center gap-2">
                        <span className="text-gray-400">ADMIN CONSOLE</span>
                        <span className="text-gray-300">›</span>
                        <span>CONFIGURATION</span>
                    </div>
                    <h1 className="text-[28px] leading-tight font-extrabold text-[#0a192f] mb-1.5 tracking-tight">
                        Platform Settings
                    </h1>
                    <p className="text-[14px] text-gray-500 font-medium">
                        Manage your institutional preferences, security settings, and notifications.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button onClick={() => alert("Platform settings saved successfully!")} className="px-5 py-2.5 bg-[#457c5f] hover:bg-[#346048] text-white rounded-[100px] text-[13px] font-bold transition-colors shadow-sm shadow-[#457c5f]/20">
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Side Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    <button onClick={() => alert("Loading Account Profile...")} className="w-full flex items-center gap-3 px-4 py-3 bg-[#eef5ef] text-[#457c5f] rounded-[12px] text-[13px] font-bold transition-all border border-[#d2dfd8]">
                        <UserCircleIcon className="w-5 h-5 shrink-0" />
                        Account Profile
                    </button>
                    <button onClick={() => alert("Loading Security & Access Settings...")} className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm hover:border hover:border-[#e9f0ec] rounded-[12px] text-[13px] font-bold transition-all transparent border border-transparent">
                        <ShieldCheckIcon className="w-5 h-5 shrink-0" />
                        Security & Access
                    </button>
                    <button onClick={() => alert("Loading Notification Preferences...")} className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm hover:border hover:border-[#e9f0ec] rounded-[12px] text-[13px] font-bold transition-all transparent border border-transparent">
                        <BellIcon className="w-5 h-5 shrink-0" />
                        Notifications
                    </button>
                    <button onClick={() => alert("Loading System Configurations...")} className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm hover:border hover:border-[#e9f0ec] rounded-[12px] text-[13px] font-bold transition-all transparent border border-transparent">
                        <AdjustmentsVerticalIcon className="w-5 h-5 shrink-0" />
                        System Config
                    </button>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Academic Session Panel */}
                    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#f0f3f1]">
                        <h2 className="text-[16px] font-bold text-[#0a192f] mb-6">Academic Configuration</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[13px] font-bold text-[#0a192f] mb-2">Current Placement Session</label>
                                    <div className="relative">
                                        <select defaultValue="2024-2025" className="w-full bg-[#f8fbfa] border border-[#f0f3f1] rounded-[10px] px-4 py-2.5 text-[14px] font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#457c5f]/20 focus:bg-white transition-all appearance-none cursor-pointer">
                                            <option value="2023-2024">2023-2024</option>
                                            <option value="2024-2025">2024-2025</option>
                                            <option value="2025-2026">2025-2026</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold text-[#0a192f] mb-2">Default ATX Calculation Engine</label>
                                    <div className="relative">
                                        <select defaultValue="v2" className="w-full bg-[#f8fbfa] border border-[#f0f3f1] rounded-[10px] px-4 py-2.5 text-[14px] font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#457c5f]/20 focus:bg-white transition-all appearance-none cursor-pointer">
                                            <option value="v1">Legacy Engine (v1)</option>
                                            <option value="v2">AI-Driven Engine (v2) - Active</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Email Settings Panel */}
                    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#f0f3f1]">
                        <h2 className="text-[16px] font-bold text-[#0a192f] mb-6">Communications</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1]">
                                <div>
                                    <div className="text-[13px] font-bold text-[#0a192f] mb-0.5">Automated Student Alerts</div>
                                    <div className="text-[12px] text-gray-500 font-medium">Send emails when eligibility status changes</div>
                                </div>
                                {/* Toggle */}
                                <button
                                    onClick={(e) => {
                                        e.currentTarget.classList.toggle('bg-[#457c5f]');
                                        e.currentTarget.classList.toggle('bg-gray-200');
                                        const span = e.currentTarget.querySelector('span');
                                        if (span) {
                                            span.classList.toggle('translate-x-5');
                                            span.classList.toggle('translate-x-0');
                                        }
                                    }}
                                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-[#457c5f]"
                                >
                                    <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5"></span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#f8fbfa] rounded-xl border border-[#f0f3f1]">
                                <div>
                                    <div className="text-[13px] font-bold text-[#0a192f] mb-0.5">Recruiter Digest</div>
                                    <div className="text-[12px] text-gray-500 font-medium">Weekly summary of student performance directed to recruiters</div>
                                </div>
                                {/* Toggle */}
                                <button
                                    onClick={(e) => {
                                        e.currentTarget.classList.toggle('bg-[#457c5f]');
                                        e.currentTarget.classList.toggle('bg-gray-200');
                                        const span = e.currentTarget.querySelector('span');
                                        if (span) {
                                            span.classList.toggle('translate-x-5');
                                            span.classList.toggle('translate-x-0');
                                        }
                                    }}
                                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-gray-200"
                                >
                                    <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
