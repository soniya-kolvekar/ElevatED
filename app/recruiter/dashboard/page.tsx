"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
    Users,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    MoreHorizontal,
    Eye
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function RecruiterDashboard() {
    const { user } = useAuthStore();

    // Mock Data based on the image
    const candidates = [
        {
            id: '1',
            rank: '01',
            name: 'Arjun Rao',
            atx: 942,
            tags: ['Full-Stack Expert', 'ML Enthusiast', '9.8 GPA'],
            status: 'HIGHLY QUALIFIED',
            role: 'Computer Science, IIT-B',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
        },
        {
            id: '6',
            rank: '02',
            name: 'Aditi Verma',
            atx: 932,
            tags: ['Backend Expert', 'Rust Enthusiast', '9.5 GPA'],
            status: 'HIGHLY QUALIFIED',
            role: 'Software Engineering, IIT-D',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
        },
        {
            id: '4',
            rank: '03',
            name: 'Priya Sharma',
            atx: 915,
            tags: ['React Native', 'UI/UX Expert'],
            status: 'SHORTLISTED',
            role: 'Information Tech, BITS',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
        },
        {
            id: '2',
            rank: '04',
            name: 'Ananya Iyer',
            atx: 891,
            tags: ['Python Specialist', 'Strong Logic'],
            status: 'SHORTLISTED',
            role: 'Data Engineering, NIT',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        {
            id: '3',
            rank: '05',
            name: 'Rohan Dasgupta',
            atx: 874,
            tags: ['Cloud Native', 'Go Developer'],
            status: 'UNDER REVIEW',
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
                    <p className="text-gray-400 font-medium mt-1">Al-powered placement ranking with Advanced Talent Index (ATX)</p>
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

            {/* Metrics Row */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-none shadow-soft overflow-hidden relative group">
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

                <Card className="p-6 border-none shadow-soft overflow-hidden relative group">
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

                <Card className="p-6 border-none shadow-soft overflow-hidden relative group">
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

            {/* Charts Section */}
            <div className="grid md:grid-cols-5 gap-6">
                <Card className="md:col-span-3 p-8 border-none shadow-soft min-h-[400px]">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="font-black text-[#1a1a1a]">ATX Score Spread</h4>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Batch</span>
                    </div>

                    {/* Placeholder for ATX spread chart - bar chart representation */}
                    <div className="flex items-end justify-between h-48 gap-4 px-4">
                        {[40, 65, 90, 75, 55].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4">
                                <div
                                    className="w-full bg-[#f0f4f4] rounded-t-xl hover:bg-[#528a7e]/20 transition-all cursor-pointer relative group overflow-hidden"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute inset-x-0 bottom-0 bg-[#528a7e] h-0 group-hover:h-full transition-all duration-500 opacity-20"></div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400">
                                    {i * 200}-{(i + 1) * 200}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="md:col-span-2 p-8 border-none shadow-soft">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="font-black text-[#1a1a1a]">Candidate Eligibility</h4>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Real-time Analysis</span>
                    </div>

                    <div className="space-y-10">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <p className="text-sm font-bold text-gray-800">Eligible (Meets Benchmark)</p>
                                <p className="text-sm font-black text-[#528a7e]">66.7%</p>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#528a7e] w-[66.7%] rounded-full shadow-sm"></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <p className="text-sm font-bold text-gray-800">Flagged (Skill Gap)</p>
                                <p className="text-sm font-black text-[#ec9d40]">24.2%</p>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#ec9d40] w-[24.2%] rounded-full shadow-sm"></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <p className="text-sm font-bold text-gray-800">Ineligible</p>
                                <p className="text-sm font-black text-gray-400">9.1%</p>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-300 w-[9.1%] rounded-full shadow-sm"></div>
                            </div>
                        </div>
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
                                <th className="py-5 px-8">Applied Position</th>
                                <th className="py-5 px-8">ATX Index</th>
                                <th className="py-5 px-8">Match Explanation</th>
                                <th className="py-5 px-8">Status</th>
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
                                        <Link href={`/recruiter/candidates/${cand.id}`} className="flex items-center gap-4 group/item">
                                            <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-jungle border border-gray-100 shadow-soft group-hover/item:scale-105 transition-transform">
                                                {/* Original code used Image component, adapting to keep image display */}
                                                <img src={cand.avatar} alt={cand.name} className="object-cover w-full h-full rounded-2xl" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-800 text-sm leading-tight group-hover/item:text-jungle transition-colors">{cand.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{cand.id}</p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className="text-xs font-bold text-gray-600 italic">Senior Backend Engineer</span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-black text-[#528a7e]">{cand.atx}</span>
                                            <TrendingUp className="w-3.5 h-3.5 text-[#528a7e]" />
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 min-w-[300px]">
                                        <div className="flex flex-wrap gap-2">
                                            {cand.tags.map((tag, i) => (
                                                <span key={i} className="bg-gray-100/70 text-gray-500 text-[10px] font-black px-2.5 py-1 rounded-md border border-gray-200/50">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className={cn(
                                            "text-[10px] font-black px-2.5 py-1.5 rounded-lg border uppercase tracking-tight",
                                            cand.status === 'Hired' ? "bg-green-50 text-green-600 border-green-100" :
                                                cand.status === 'Shortlisted' ? "bg-jungle/5 text-jungle border-jungle/10" :
                                                    "bg-gray-50 text-gray-500 border-gray-100"
                                        )}>
                                            {cand.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
