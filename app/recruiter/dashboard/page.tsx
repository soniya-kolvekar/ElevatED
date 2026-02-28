"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
    Users, Briefcase, PlusCircle, CheckCircle, ShieldAlert
} from "lucide-react";
import { BarChart as ReBarChart, Bar as ReBar, XAxis as ReXAxis, YAxis as ReYAxis, Tooltip as ReTooltip, ResponsiveContainer as ReResponsiveContainer, Cell as ReCell } from 'recharts';

export default function RecruiterDashboard() {
    const { user, logout } = useAuthStore();
    const [activeTab, setActiveTab] = useState<"candidates" | "post-job">("candidates");

    const handleLogout = () => {
        document.cookie = "auth-role=; path=/; max-age=0";
        logout();
        window.location.href = "/";
    };

    // Mock Data
    const candidates = [
        { id: '1', name: 'Alice Smith', atx: 82, match: 94, policy: true, skills: ['React', 'Node.js', 'AWS'], status: 'pending' },
        { id: '2', name: 'Bob Johnson', atx: 75, match: 88, policy: true, skills: ['Python', 'Django', 'SQL'], status: 'shortlisted' },
        { id: '3', name: 'Charlie Davis', atx: 90, match: 85, policy: false, skills: ['C++', 'System Design', 'GCP'], status: 'pending', policyReason: 'CGPA Threshold' },
        { id: '4', name: 'Diana King', atx: 68, match: 72, policy: true, skills: ['Java', 'Spring', 'Docker'], status: 'pending' },
    ];

    const distributionData = [
        { range: '90-100', count: 12 },
        { range: '80-89', count: 35 },
        { range: '70-79', count: 48 },
        { range: '60-69', count: 15 },
        { range: '<60', count: 4 },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#f8f6f0] text-gray-800 pb-24">
            {/* Header */}
            <header className="bg-white sticky top-0 z-40 border-b border-jungle/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-jungle text-white flex items-center justify-center font-bold text-xl shadow-soft">
                            E
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 leading-tight">Recruiter Hub</h1>
                            <p className="text-xs text-mutedTeal font-semibold">ElevatED Placement Engine</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <div className="text-sm font-semibold">{user.name}</div>
                            <div className="text-xs text-gray-500 capitalize">{user.role} Partner</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-tropicalTeal text-white flex items-center justify-center font-bold shadow-soft">
                            {user.name?.charAt(0) || "R"}
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('candidates')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'candidates' ? 'bg-jungle text-white shadow-soft' : 'bg-white text-gray-500 hover:bg-[#f8f6f0]'}`}
                    >
                        <Users size={20} /> Ranked Candidates
                    </button>
                    <button
                        onClick={() => setActiveTab('post-job')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'post-job' ? 'bg-jungle text-white shadow-soft' : 'bg-white text-gray-500 hover:bg-[#f8f6f0]'}`}
                    >
                        <PlusCircle size={20} /> Post New Job
                    </button>
                </div>

                {activeTab === 'candidates' ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Top Metrics Row */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="flex flex-col justify-center items-center text-center p-8">
                                <Users className="w-10 h-10 text-mutedTeal mb-4" />
                                <h3 className="text-3xl font-black text-gray-900">114</h3>
                                <p className="text-gray-500 font-medium">Total Applicants</p>
                            </Card>
                            <Card className="flex flex-col justify-center items-center text-center p-8">
                                <CheckCircle className="w-10 h-10 text-jungle mb-4" />
                                <h3 className="text-3xl font-black text-gray-900">28</h3>
                                <p className="text-gray-500 font-medium">Shortlisted</p>
                            </Card>
                            <Card className="flex flex-col">
                                <h3 className="font-bold text-gray-900 mb-2">ATX Distribution</h3>
                                <div className="h-32 w-full mt-auto">
                                    <ReResponsiveContainer width="100%" height="100%">
                                        <ReBarChart data={distributionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                            <ReXAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                            <ReYAxis hide />
                                            <ReTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                            <ReBar dataKey="count" fill="#528a7e" radius={[4, 4, 0, 0]}>
                                                {distributionData.map((entry, index) => (
                                                    <ReCell key={`cell-${index}`} fill={index === 1 ? '#4a7c59' : '#83c5be'} />
                                                ))}
                                            </ReBar>
                                        </ReBarChart>
                                    </ReResponsiveContainer>
                                </div>
                            </Card>
                        </div>

                        {/* Candidate Table */}
                        <Card className="p-0 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">AI Ranked Candidates</h3>
                                    <p className="text-sm text-gray-500">Sorted by Smart Match Score</p>
                                </div>
                                <Button variant="outline" size="sm">Export CSV</Button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                                            <th className="py-4 px-6 font-semibold">Candidate</th>
                                            <th className="py-4 px-6 font-semibold">Smart Match</th>
                                            <th className="py-4 px-6 font-semibold">ATX Score</th>
                                            <th className="py-4 px-6 font-semibold">Key Skills</th>
                                            <th className="py-4 px-6 font-semibold">Policy Status</th>
                                            <th className="py-4 px-6 font-semibold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {candidates.map((cand) => (
                                            <tr key={cand.id} className="hover:bg-[#f8f6f0]/40 transition-colors">
                                                <td className="py-4 px-6 font-medium text-gray-900">{cand.name}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-jungle">{cand.match}%</span>
                                                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-jungle" style={{ width: `${cand.match}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 font-semibold text-gray-700">{cand.atx}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex gap-1 flex-wrap">
                                                        {cand.skills.map(skill => (
                                                            <span key={skill} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{skill}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {cand.policy ? (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-jungle bg-green-50 px-2 py-1 rounded-full">
                                                            <CheckCircle size={12} /> Eligible
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full" title={cand.policyReason}>
                                                            <ShieldAlert size={12} /> Blocked
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <Button
                                                        variant={cand.status === 'shortlisted' ? "secondary" : "outline"}
                                                        size="sm"
                                                        disabled={!cand.policy}
                                                        className={cand.status === 'shortlisted' ? 'opacity-50 cursor-not-allowed' : ''}
                                                    >
                                                        {cand.status === 'shortlisted' ? 'Shortlisted' : 'Shortlist'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-jungle" /> Create Job Posting
                            </h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Title / Role</label>
                                    <Input placeholder="e.g. Frontend Developer" />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Minimum ATX Score</label>
                                        <Input type="number" placeholder="e.g. 75" />
                                        <p className="text-xs text-gray-500 mt-1">Filters out candidates below this ATX index.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Minimum CGPA (Policy)</label>
                                        <Input type="number" step="0.1" placeholder="e.g. 7.5" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Required Core Skills (comma separated)</label>
                                    <Input placeholder="React, TypeScript, Next.js" />
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-4">Algorithm Weight Preferences</h4>
                                    <p className="text-sm text-gray-500 mb-6">Adjust how the Smart Match engine ranks candidates for this specific role.</p>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <label className="w-32 text-sm font-semibold text-gray-700">Skill Overlap</label>
                                            <input type="range" className="flex-1 accent-jungle" defaultValue="40" />
                                            <span className="w-12 text-sm font-bold text-jungle text-right">40%</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="w-32 text-sm font-semibold text-gray-700">DSA / Logic</label>
                                            <input type="range" className="flex-1 accent-jungle" defaultValue="30" />
                                            <span className="w-12 text-sm font-bold text-jungle text-right">30%</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="w-32 text-sm font-semibold text-gray-700">Project Quality</label>
                                            <input type="range" className="flex-1 accent-jungle" defaultValue="30" />
                                            <span className="w-12 text-sm font-bold text-jungle text-right">30%</span>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full mt-8" type="button" size="lg">Publish Job & Run Match Engine</Button>
                            </form>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}
