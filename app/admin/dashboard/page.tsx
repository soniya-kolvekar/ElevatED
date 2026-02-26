"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
    BuildingLibraryIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon
} from "@heroicons/react/24/outline";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid
} from 'recharts';

export default function AdminDashboard() {
    const { user, logout } = useAuthStore();
    const [activeTab, setActiveTab] = useState<"analytics" | "policies" | "audit">("analytics");

    const handleLogout = () => {
        document.cookie = "auth-role=; path=/; max-age=0";
        logout();
        window.location.href = "/";
    };

    // Mock Data
    const branchPerformance = [
        { name: 'Computer Science', rate: 85 },
        { name: 'Electronics', rate: 72 },
        { name: 'Information Tech', rate: 81 },
        { name: 'Mechanical', rate: 45 },
        { name: 'Civil', rate: 38 },
    ];

    const auditLogs = [
        { id: 1, action: "resume_uploaded", user: "Alice Smith (Student)", time: "10 mins ago", detail: "Parsed via Gemini AI" },
        { id: 2, action: "atx_calculated", user: "Alice Smith (Student)", time: "10 mins ago", detail: "Score: 82/100" },
        { id: 3, action: "policy_filtered", user: "Charlie Davis (Student)", time: "1 hour ago", detail: "Blocked: CGPA below threshold (6.8 < 7.5)" },
        { id: 4, action: "shortlisted", user: "TechCorp Inc (Recruiter)", time: "2 hours ago", detail: "Shortlisted Bob Johnson" },
        { id: 5, action: "policy_updated", user: "Admin", time: "1 day ago", detail: "Global CGPA minimum set to 7.0" },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-eggshell text-gray-800 pb-24">
            {/* Header */}
            <header className="bg-white sticky top-0 z-40 border-b border-jungle/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-jungle text-white flex items-center justify-center font-bold text-xl shadow-soft">
                            E
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 leading-tight">Admin Console</h1>
                            <p className="text-xs text-mutedTeal font-semibold">ElevatED Institutional Control</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <div className="text-sm font-semibold">{user.name}</div>
                            <div className="text-xs text-gray-500 capitalize">System Administrator</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shadow-soft">
                            A
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === 'analytics' ? 'bg-jungle text-white shadow-soft' : 'bg-white text-gray-500 hover:bg-eggshell'}`}
                    >
                        <ChartBarIcon className="w-5 h-5" /> Institutional Analytics
                    </button>
                    <button
                        onClick={() => setActiveTab('policies')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === 'policies' ? 'bg-jungle text-white shadow-soft' : 'bg-white text-gray-500 hover:bg-eggshell'}`}
                    >
                        <ShieldCheckIcon className="w-5 h-5" /> Global Policy Engine
                    </button>
                    <button
                        onClick={() => setActiveTab('audit')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === 'audit' ? 'bg-jungle text-white shadow-soft' : 'bg-white text-gray-500 hover:bg-eggshell'}`}
                    >
                        <DocumentTextIcon className="w-5 h-5" /> System Audit Logs
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Top Stat Cards */}
                        <div className="grid md:grid-cols-4 gap-6">
                            <Card className="p-6">
                                <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Total Students</p>
                                <h3 className="text-4xl font-black text-gray-900">1,248</h3>
                            </Card>
                            <Card className="p-6">
                                <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Active Recruiters</p>
                                <h3 className="text-4xl font-black text-gray-900">42</h3>
                            </Card>
                            <Card className="p-6 border-2 border-jungle/20 bg-jungle/5">
                                <p className="text-sm font-bold text-jungle mb-1 uppercase tracking-wider">Avg Shortlist Rate</p>
                                <h3 className="text-4xl font-black text-jungle">24%</h3>
                            </Card>
                            <Card className="p-6 border-2 border-red-500/20 bg-red-50 text-red-900">
                                <p className="text-sm font-bold text-red-600 mb-1 uppercase tracking-wider">Block Rate (Policy)</p>
                                <h3 className="text-4xl font-black">18%</h3>
                            </Card>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card>
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <BuildingLibraryIcon className="w-6 h-6 text-tropicalTeal" /> Branch Placement Performance
                                </h3>
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={branchPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                            <Tooltip
                                                cursor={{ fill: '#F3F4F6' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(val: any) => [`${val}% Placement`, 'Performance'] as any}
                                            />
                                            <Bar dataKey="rate" radius={[6, 6, 0, 0]} maxBarSize={60}>
                                                {branchPerformance.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.rate > 70 ? '#4a7c59' : '#83c5be'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {activeTab === 'policies' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <ShieldCheckIcon className="w-8 h-8 text-jungle" /> Policy Builder
                            </h2>
                            <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
                                Rules defined here are statically enforced across the entire campus. Any student violating these global parameters will be hidden from recruiter queues regardless of their ATX score.
                            </p>

                            <form className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                        <label className="block text-sm font-bold text-gray-900 mb-2">Absolute CGPA Threshold</label>
                                        <Input type="number" step="0.1" defaultValue="6.5" />
                                        <p className="text-xs text-gray-500 mt-2">Zero tolerance cutoff limit.</p>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                        <label className="block text-sm font-bold text-gray-900 mb-2">Active Backlog Limit</label>
                                        <Input type="number" defaultValue="0" />
                                        <p className="text-xs text-gray-500 mt-2">Maximum number of active KT/backlogs permitted.</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Maximum Placement Attempts</label>
                                    <Input type="number" defaultValue="3" />
                                    <p className="text-xs text-gray-500 mt-2">How many final-round offers a student holds before being locked out.</p>
                                </div>

                                <Button className="w-full text-lg h-14" type="button">Enforce Global Policy Update</Button>
                            </form>
                        </Card>
                    </div>
                )}

                {activeTab === 'audit' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="p-0 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <DocumentTextIcon className="w-6 h-6 text-gray-500" /> Real-time System Audit Logs
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Non-repudiable logs of all core actions within the ElevatED Engine.</p>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {auditLogs.map((log) => (
                                    <li key={log.id} className="p-6 hover:bg-eggshell/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${log.action === 'policy_filtered' ? 'bg-red-500' :
                                                log.action === 'shortlisted' ? 'bg-jungle' :
                                                    log.action === 'policy_updated' ? 'bg-orange-500' : 'bg-tropicalTeal'
                                                }`} />
                                            <div>
                                                <div className="flex items-baseline gap-2 mb-1">
                                                    <span className="font-bold text-gray-900 capitalize">{log.action.replace('_', ' ')}</span>
                                                    <span className="text-xs text-gray-400 font-mono">{log.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-700 font-medium">{log.user}</p>
                                                <p className="text-sm text-gray-500 mt-1">{log.detail}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                                <Button variant="ghost" size="sm">Load More Logs</Button>
                            </div>
                        </Card>
                    </div>
                )}

            </main>
        </div>
    );
}
