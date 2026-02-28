"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
    Users,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    MoreHorizontal,
    PlusCircle,
    CheckCircle,
    ShieldAlert,
    Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RecruiterDashboard() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState('candidates');

    // Mock Data
    const candidates = [
        {
            id: '1',
            rank: '01',
            name: 'Arjun Rao',
            atx: 942,
            match: 98,
            skills: ['React', 'Node.js', 'Python'],
            tags: ['Full-Stack Expert', 'ML Enthusiast', '9.8 GPA'],
            status: 'HIGHLY QUALIFIED',
            policy: true,
            role: 'Computer Science, IIT-B',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
        },
        {
            id: '6',
            rank: '02',
            name: 'Aditi Verma',
            atx: 932,
            match: 95,
            skills: ['Rust', 'Backend', 'Distributed Systems'],
            tags: ['Backend Expert', 'Rust Enthusiast', '9.5 GPA'],
            status: 'HIGHLY QUALIFIED',
            policy: true,
            role: 'Software Engineering, IIT-D',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
        },
        {
            id: '4',
            rank: '03',
            name: 'Priya Sharma',
            atx: 915,
            match: 92,
            skills: ['React Native', 'UI/UX', 'Figma'],
            tags: ['React Native', 'UI/UX Expert'],
            status: 'SHORTLISTED',
            policy: true,
            role: 'Information Tech, BITS',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
        },
        {
            id: '2',
            rank: '04',
            name: 'Ananya Iyer',
            atx: 891,
            match: 88,
            skills: ['Python', 'Data Science', 'SQL'],
            tags: ['Python Specialist', 'Strong Logic'],
            status: 'SHORTLISTED',
            policy: true,
            role: 'Data Engineering, NIT',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        {
            id: '3',
            rank: '05',
            name: 'Rohan Dasgupta',
            atx: 874,
            match: 85,
            skills: ['Cloud', 'Go', 'Kubernetes'],
            tags: ['Cloud Native', 'Go Developer'],
            status: 'UNDER REVIEW',
            policy: false,
            policyReason: 'CGPA below benchmark (7.2 < 7.5)',
            role: 'Software Systems, BITS',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
    ];

    return (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header Area */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-[#1a1a1a] tracking-tight">Candidate Dashboard</h1>
                    <p className="text-gray-400 font-medium mt-1">AI-powered placement ranking with Advanced Talent Index (ATX)</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl bg-white border-gray-100 text-gray-600 shadow-sm hover:bg-gray-50 flex items-center gap-2 px-5 font-bold">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                    <Button className="rounded-xl bg-[#528a7e] hover:bg-[#4a7c59] text-white shadow-soft flex items-center gap-2 px-5 font-bold transition-all">
                        <Download className="w-4 h-4" /> Export Report
                    </Button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 border-b border-gray-100 pb-1">
                <button
                    onClick={() => setActiveTab('candidates')}
                    className={cn(
                        "flex items-center gap-2 px-6 py-3 font-bold transition-all border-b-2",
                        activeTab === 'candidates' ? "border-jungle text-jungle" : "border-transparent text-gray-400 hover:text-gray-600"
                    )}
                >
                    <Users size={20} /> Ranked Candidates
                </button>
                <button
                    onClick={() => setActiveTab('post-job')}
                    className={cn(
                        "flex items-center gap-2 px-6 py-3 font-bold transition-all border-b-2",
                        activeTab === 'post-job' ? "border-jungle text-jungle" : "border-transparent text-gray-400 hover:text-gray-600"
                    )}
                >
                    <PlusCircle size={20} /> Post New Job
                </button>
            </div>

            {activeTab === 'candidates' ? (
                <div className="space-y-8">
                    {/* Metrics Row */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-6 border-none shadow-soft group hover:translate-y-[-2px] transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-gray-500 mb-1">Total Applicants</p>
                                    <h3 className="text-4xl font-black text-[#1a1a1a]">1,284</h3>
                                </div>
                                <span className="bg-[#e8f5e9] text-[#2e7d32] text-xs font-black px-2 py-1 rounded-lg flex items-center gap-0.5">
                                    +12.5%
                                </span>
                            </div>
                            <div className="mt-6 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#528a7e] w-[70%] group-hover:w-[75%] transition-all duration-1000"></div>
                            </div>
                        </Card>

                        <Card className="p-6 border-none shadow-soft group hover:translate-y-[-2px] transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-gray-500 mb-1">Avg. ATX Score</p>
                                    <h3 className="text-4xl font-black text-[#1a1a1a]">742</h3>
                                </div>
                                <span className="bg-[#e8f5e9] text-[#2e7d32] text-xs font-black px-2 py-1 rounded-lg flex items-center gap-0.5">
                                    +5.2%
                                </span>
                            </div>
                            <div className="mt-6 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#528a7e] w-[60%] group-hover:w-[65%] transition-all duration-1000"></div>
                            </div>
                        </Card>

                        <Card className="p-6 border-none shadow-soft group hover:translate-y-[-2px] transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-gray-500 mb-1">Eligible Candidates</p>
                                    <h3 className="text-4xl font-black text-[#1a1a1a]">856</h3>
                                </div>
                                <span className="bg-[#ffebee] text-[#c62828] text-xs font-black px-2 py-1 rounded-lg flex items-center gap-0.5">
                                    -2.1%
                                </span>
                            </div>
                            <div className="mt-6 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#528a7e] w-[80%] group-hover:w-[85%] transition-all duration-1000"></div>
                            </div>
                        </Card>
                    </div>

                    {/* Candidate Table */}
                    <Card className="border-none shadow-soft overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white">
                            <h4 className="font-black text-[#1a1a1a]">Top Ranked Candidates</h4>
                            <div className="flex items-center gap-4">
                                <span className="bg-[#e0f2f1] text-[#00796b] text-[10px] font-black px-2 py-1 rounded-md">AI SORTED</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Updated 2m ago</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/30 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="py-5 px-8">Rank</th>
                                        <th className="py-5 px-8">Candidate</th>
                                        <th className="py-5 px-8">ATX Score</th>
                                        <th className="py-5 px-8">Smart Match</th>
                                        <th className="py-5 px-8">Policy Status</th>
                                        <th className="py-5 px-8 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {candidates.map((cand) => (
                                        <tr key={cand.id} className="group hover:bg-[#f8fafa] transition-colors">
                                            <td className="py-6 px-8">
                                                <div className="w-8 h-8 rounded-full bg-[#fff8e1] border border-[#ffecb3] flex items-center justify-center text-[#ff8f00] font-black text-xs">
                                                    {cand.rank}
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 shadow-soft">
                                                        <img src={cand.avatar} alt={cand.name} className="object-cover w-full h-full" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-800 text-sm leading-tight">{cand.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{cand.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <div className="flex items-center gap-2 text-lg font-black text-[#1a1a1a]">
                                                    {cand.atx}
                                                    <TrendingUp className="w-4 h-4 text-[#528a7e]" />
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-black text-jungle">{cand.match}%</span>
                                                    <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-jungle" style={{ width: `${cand.match}%` }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                {cand.policy ? (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-jungle bg-green-50 px-2 py-1 rounded-lg border border-green-100 uppercase">
                                                        <CheckCircle size={10} /> Eligible
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg border border-red-100 uppercase" title={cand.policyReason}>
                                                        <ShieldAlert size={10} /> Blocked
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <Button
                                                    variant={cand.status === 'SHORTLISTED' ? "secondary" : "outline"}
                                                    size="sm"
                                                    disabled={!cand.policy}
                                                    className={cn("rounded-lg font-bold", cand.status === 'SHORTLISTED' && "bg-jungle/10 text-jungle border-none")}
                                                >
                                                    {cand.status === 'SHORTLISTED' ? 'Shortlisted' : 'Shortlist'}
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
                    <Card className="p-8 border-none shadow-soft">
                        <h2 className="text-2xl font-black text-[#1a1a1a] mb-6 flex items-center gap-2">
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
                                    <Input type="number" placeholder="e.g. 750" />
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
                                <h4 className="font-black text-[#1a1a1a] mb-4">Algorithm Weight Preferences</h4>
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

                            <Button className="w-full mt-8 bg-jungle hover:bg-[#346048] text-white rounded-xl h-14 text-lg font-black" type="button">
                                Publish Job & Run Match Engine
                            </Button>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
