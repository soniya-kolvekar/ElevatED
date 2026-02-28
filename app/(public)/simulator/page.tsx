"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import {
    Search, Bell, User, LayoutDashboard, Compass, Briefcase,
    UserCircle, Zap, ShieldCheck, CheckCircle2, TrendingUp, SlidersHorizontal, Sparkles
} from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

export default function LandingPage() {
    // Mock data for the line chart identical to the Stitch design
    const chartData = [
        { name: 'MONTH 1', current: 44, simulated: 44 },
        { name: 'MONTH 2', current: 48, simulated: 55 },
        { name: 'MONTH 3', current: 52, simulated: 70 },
        { name: 'MONTH 4', current: 55, simulated: 85 },
        { name: 'FINAL DRIVE', current: 58, simulated: 92 },
    ];

    return (
        <div className="min-h-screen bg-[#f8f6f0] font-sans text-gray-900 pb-12">
            {/* Top Navigation Bar mimicking the Simulator frame */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-jungle text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                E
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                <span className="text-jungle">Elevat</span>
                                <span className="text-tropicalTeal">ED</span>
                            </span>
                        </div>
                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-jungle transition-colors">
                                <LayoutDashboard size={16} /> Dashboard
                            </Link>
                            <Link href="#" className="flex items-center gap-2 text-sm font-bold text-jungle border-b-2 border-jungle py-5">
                                <Compass size={16} /> Simulator
                            </Link>
                            <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-jungle transition-colors">
                                <Briefcase size={16} /> Jobs
                            </Link>
                            <Link href="#" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-jungle transition-colors">
                                <UserCircle size={16} /> Profile
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Search Input */}
                        <div className="relative hidden lg:block w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search analytics..."
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-tropicalTeal/30"
                            />
                        </div>
                        <button className="text-gray-400 hover:text-jungle transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute 0 right-0 w-2 h-2 bg-red-400 rounded-full border border-white"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-[#f8f6f0] border border-jungle/20 flex items-center justify-center text-jungle overflow-hidden">
                            <User size={16} />
                        </div>

                        {/* Real Login actions replacing avatar in landing context */}
                        <div className="pl-4 border-l border-gray-200 flex gap-2">
                            <Link href="/auth?type=login">
                                <Button variant="ghost" size="sm" className="text-gray-600 font-semibold">Sign In</Button>
                            </Link>
                            <Link href="/auth?type=register">
                                <Button size="sm" className="bg-jungle hover:bg-tropicalTeal text-white font-semibold">Join Platform</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-[1400px] mx-auto px-6 mt-8">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Placement Readiness Simulator</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Simulator Status:</span>
                        <span className="flex items-center gap-1 text-tropicalTeal font-bold bg-tropicalTeal/10 px-2 py-1 rounded-md"><Zap size={14} /> Active</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">

                    {/* Left Sidebar - Improvement Levers */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Card className="p-6 bg-white border border-gray-100 shadow-soft h-full flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <SlidersHorizontal size={18} className="text-jungle" /> Improvement Levers
                                </h2>
                                <button className="text-xs font-bold text-tropicalTeal hover:text-jungle transition-colors uppercase tracking-wider">
                                    Reset All
                                </button>
                            </div>

                            {/* CGPA Slider */}
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-3">
                                    <label className="text-sm font-bold text-gray-700">Target CGPA Improvement</label>
                                    <span className="text-sm font-bold text-jungle bg-[#f8f6f0] px-2 py-1 rounded">8.8 / 10</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-tropicalTeal rounded-full" style={{ width: '88%' }}></div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 font-medium">Simulating a bump from current 7.4 -&gt; 8.8</p>
                            </div>

                            {/* Skills Badges */}
                            <div className="mb-8">
                                <label className="text-sm font-bold text-gray-700 block mb-3">New Tech Stack Skills</label>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-tropicalTeal/10 border border-tropicalTeal/30 text-tropicalTeal text-xs font-bold rounded-full">
                                        <div className="w-4 h-4 rounded-full bg-tropicalTeal text-white flex items-center justify-center text-[10px]">+</div> Python (Adv)
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-500 text-xs font-bold rounded-full cursor-pointer hover:bg-gray-100">
                                        <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">+</div> SQL/NoSQL
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-tropicalTeal/10 border border-tropicalTeal/30 text-tropicalTeal text-xs font-bold rounded-full">
                                        <div className="w-4 h-4 rounded-full bg-tropicalTeal text-white flex items-center justify-center text-[10px]">+</div> React.js
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-500 text-xs font-bold rounded-full cursor-pointer hover:bg-gray-100">
                                        <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">+</div> AWS Cloud
                                    </span>
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="mb-8">
                                <label className="text-sm font-bold text-gray-700 block mb-3">Capstone Project Completion</label>
                                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                                    <span className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                        🚀 Industry-Grade Project
                                    </span>
                                    {/* Mock Toggle */}
                                    <div className="w-10 h-5 bg-jungle rounded-full relative cursor-pointer shadow-inner">
                                        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Interview Score Slider */}
                            <div className="mb-auto">
                                <div className="flex justify-between items-end mb-3">
                                    <label className="text-sm font-bold text-gray-700">Mock Interview Score</label>
                                    <span className="text-sm font-bold text-jungle bg-[#f8f6f0] px-2 py-1 rounded">80%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-tropicalTeal rounded-full opacity-60" style={{ width: '80%' }}></div>
                                </div>
                            </div>

                            {/* AI Recommendation Box */}
                            <div className="mt-8 bg-[#f8f6f0] border border-jungle/20 rounded-xl p-4">
                                <h4 className="text-xs font-extrabold text-jungle flex items-center gap-1 mb-2 uppercase tracking-wide">
                                    <Sparkles size={14} className="fill-jungle text-jungle" /> AI Recommendation
                                </h4>
                                <p className="text-xs font-medium text-gray-700 leading-relaxed">
                                    Completing a Full-Stack Certification and raising CGPA to 8.5 would place you in the top 5% of applicants for Tier-1 companies.
                                </p>
                            </div>

                        </Card>
                    </div>

                    {/* Right Area - Analytics */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* Top Metrics Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="p-8 bg-white border border-gray-100 shadow-soft flex flex-col items-center justify-center text-center relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-tropicalTeal/20">
                                    <TrendingUp size={48} strokeWidth={1} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Simulated ATX Score</h3>
                                <div className="flex items-baseline gap-1 justify-center mb-2">
                                    <span className="text-6xl font-black text-tropicalTeal tracking-tighter">842</span>
                                    <span className="text-xl font-bold text-gray-300">/1000</span>
                                </div>
                                <div className="inline-flex items-center gap-1 font-bold text-jungle bg-green-50 px-3 py-1 rounded-full text-sm mb-4">
                                    <TrendingUp size={14} /> +154 pts
                                </div>
                                <p className="text-xs font-semibold text-gray-400">Current Score: 688</p>
                            </Card>

                            <Card className="p-8 bg-white border border-gray-100 shadow-soft flex flex-col items-center justify-center text-center relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-jungle/10">
                                    <ShieldCheck size={48} strokeWidth={1} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Placement Probability</h3>
                                <div className="flex justify-center mb-2">
                                    <span className="text-6xl font-black text-jungle tracking-tighter">92<span className="text-3xl">%</span></span>
                                </div>
                                <div className="inline-flex items-center gap-1 font-bold text-jungle bg-[#f8f6f0] px-3 py-1 rounded-full text-sm mb-4">
                                    <CheckCircle2 size={14} className="fill-jungle text-white" /> High Readiness
                                </div>
                                <p className="text-xs font-semibold text-gray-400">Base Probability: 44%</p>
                            </Card>
                        </div>

                        {/* Chart Area */}
                        <Card className="p-6 bg-white border border-gray-100 shadow-soft flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Probability Growth Forecast</h3>
                                    <p className="text-xs font-semibold text-gray-500 mt-1">Impact of simulated changes on monthly placement odds</p>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div> Current Path</div>
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-tropicalTeal"></div> Simulated Path</div>
                                </div>
                            </div>

                            <div className="w-full h-64 mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#d1d5db', fontWeight: 600 }} tickFormatter={(val) => `${val}%`} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                                            itemStyle={{ fontWeight: 'bold' }}
                                            labelStyle={{ fontSize: '10px', color: '#9ca3af', fontWeight: 'bold' }}
                                        />
                                        <Line type="monotone" dataKey="current" stroke="#d1d5db" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                                        <Line type="monotone" dataKey="simulated" stroke="#00bfa5" strokeWidth={4} dot={{ r: 4, fill: '#00bfa5', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex gap-12">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">DREAM COMPANIES UNLOCKED (TIER 1)</p>
                                        <p className="text-lg font-black text-gray-900">15</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">SALARY PROJECTION</p>
                                        <p className="text-lg font-black text-gray-900">15-24 LPA</p>
                                    </div>
                                </div>
                                <Button className="bg-jungle hover:bg-tropicalTeal text-white font-bold py-2.5 px-6 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={16} /> Save Strategy
                                    </div>
                                </Button>
                            </div>
                        </Card>

                    </div>
                </div>

                <div className="text-center mt-12 mb-4">
                    <p className="text-[11px] font-bold text-gray-400 tracking-wide uppercase">Powered by ElevatED Standard Intelligence Engine © 2026</p>
                </div>
            </main>
        </div>
    );
}
