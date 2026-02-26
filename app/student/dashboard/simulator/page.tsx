"use client";

import { useState, useMemo } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
    Zap,
    Target,
    Trophy,
    ChevronRight,
    RotateCcw,
    Sparkles,
    CheckCircle2,
    Save,
    TrendingUp,
    ArrowUpRight
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";

export default function SimulatorPage() {
    const { user } = useAuthStore();
    const [targetCgpa, setTargetCgpa] = useState(8.8);
    const [skills, setSkills] = useState({
        python: true,
        react: true,
        sql: false,
        aws: false
    });
    const [capstone, setCapstone] = useState(false);
    const [mockScore, setMockScore] = useState(60);

    const data = useMemo(() => getStudentDashboardData(user), [user]);

    // Simulated Logic
    const simulatedAtx = useMemo(() => {
        let score = data.atxScore;
        if (targetCgpa > 7.5) score += (targetCgpa - 7.5) * 40;
        if (skills.python) score += 30;
        if (skills.react) score += 30;
        if (skills.sql) score += 25;
        if (skills.aws) score += 40;
        if (capstone) score += 50;
        score += (mockScore - 50) * 1.5;
        return Math.min(Math.round(score), 1000);
    }, [data.atxScore, targetCgpa, skills, capstone, mockScore]);

    const probability = useMemo(() => {
        return Math.min(Math.round((simulatedAtx / 1000) * 100 + (capstone ? 5 : 0)), 100);
    }, [simulatedAtx, capstone]);

    const chartData = [
        { name: 'MONTH 1', current: 30, simulated: 35 },
        { name: 'MONTH 2', current: 35, simulated: 48 },
        { name: 'MONTH 3', current: 40, simulated: 62 },
        { name: 'MONTH 4', current: 42, simulated: 78 },
        { name: 'FINAL DRIVE', current: 44, simulated: probability },
    ];

    const toggleSkill = (skill: keyof typeof skills) => {
        setSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
    };

    const resetAll = () => {
        setTargetCgpa(8.8);
        setSkills({ python: true, react: true, sql: false, aws: false });
        setCapstone(false);
        setMockScore(60);
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-gray-900 leading-none tracking-tight">Placement Readiness Simulator</h1>
                <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Simulation Mode Active</span>
                    <div className="w-2 h-2 bg-jungle rounded-full animate-pulse"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Controls */}
                <Card className="lg:col-span-1 h-fit space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-gray-900 leading-none">Improvement Levers</h3>
                        <button onClick={resetAll} className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-jungle flex items-center gap-1 transition-colors">
                            <RotateCcw size={10} /> Reset All
                        </button>
                    </div>

                    {/* CGPA Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Target CGPA Improvement</p>
                            <span className="text-sm font-black text-jungle">{targetCgpa.toFixed(1)} / 10</span>
                        </div>
                        <input
                            type="range"
                            min="6.0"
                            max="10.0"
                            step="0.1"
                            value={targetCgpa}
                            onChange={(e) => setTargetCgpa(parseFloat(e.target.value))}
                            className="w-full accent-jungle h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <p className="text-[9px] text-gray-400 font-medium italic">Simulating a jump from current 7.2 to {targetCgpa}</p>
                    </div>

                    {/* Tech Stack Skills */}
                    <div className="space-y-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Tech Stack Skills</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'python', label: 'Python (Adv)', key: 'python' },
                                { id: 'sql', label: 'SQL/NoSQL', key: 'sql' },
                                { id: 'react', label: 'React.js', key: 'react' },
                                { id: 'aws', label: 'AWS Cloud', key: 'aws' },
                            ].map((skill) => (
                                <button
                                    key={skill.id}
                                    onClick={() => toggleSkill(skill.key as any)}
                                    className={cn(
                                        "px-3 py-2.5 rounded-xl text-[10px] font-bold border transition-all flex items-center gap-2",
                                        skills[skill.key as keyof typeof skills]
                                            ? "bg-jungle/10 border-jungle/20 text-jungle"
                                            : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                                    )}
                                >
                                    {skills[skill.key as keyof typeof skills] ? <CheckCircle2 size={12} /> : <div className="w-3 h-3 border-2 border-gray-100 rounded-full" />}
                                    {skill.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Capstone Project */}
                    <div className="space-y-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Capstone Project Completion</p>
                        <div
                            onClick={() => setCapstone(!capstone)}
                            className={cn(
                                "p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                                capstone ? "bg-jungle border-jungle text-white" : "bg-gray-50 border-gray-100 text-gray-400"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Zap className={cn("w-5 h-5", capstone ? "text-white" : "text-gray-300")} />
                                <span className="text-[11px] font-black uppercase tracking-tight">Industry-Grade Project</span>
                            </div>
                            <div className={cn(
                                "w-10 h-5 rounded-full relative transition-colors",
                                capstone ? "bg-white/20" : "bg-gray-200"
                            )}>
                                <motion.div
                                    className="absolute top-1 w-3 h-3 bg-white rounded-full"
                                    animate={{ left: capstone ? "calc(100% - 16px)" : "4px" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mock Interview Score */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mock Interview Score</p>
                            <span className="text-sm font-black text-jungle">{mockScore}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-jungle"
                                animate={{ width: `${mockScore}%` }}
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={mockScore}
                            onChange={(e) => setMockScore(parseInt(e.target.value))}
                            className="w-full accent-jungle h-4 bg-transparent appearance-none cursor-pointer mt-[-10px] opacity-0"
                        />
                    </div>

                    {/* AI Recommendation */}
                    <div className="bg-tropicalTeal/5 border border-tropicalTeal/10 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-tropicalTeal">
                            <Sparkles size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">AI Recommendation</span>
                        </div>
                        <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                            Completing a <span className="text-tropicalTeal font-bold">Full-Stack Certification</span> and raising CGPA to <span className="text-tropicalTeal font-bold">8.5</span> would place you in the <span className="text-jungle font-bold">top 5%</span> of applicants for Tier-1 companies.
                        </p>
                    </div>
                </Card>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Top Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="flex flex-col items-center justify-center py-10 relative overflow-hidden text-center group">
                            <div className="absolute top-0 right-0 p-4 text-jungle/5 group-hover:scale-110 transition-transform duration-700">
                                <TrendingUp size={140} />
                            </div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Simulated ATX Score</p>
                            <div className="flex items-baseline gap-1">
                                <motion.span
                                    className="text-6xl font-black text-gray-900 tracking-tighter"
                                    key={simulatedAtx}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    {simulatedAtx}
                                </motion.span>
                                <span className="text-xl font-black text-gray-300">/1000</span>
                            </div>
                            <div className="mt-6 flex items-center gap-2 px-4 py-1.5 bg-jungle/5 text-jungle border border-jungle/10 rounded-full text-[11px] font-black uppercase">
                                <ArrowUpRight size={14} /> +{simulatedAtx - 686} pts
                            </div>
                            <p className="text-[10px] text-gray-300 font-bold mt-4 uppercase tracking-[0.1em]">Current Score: 686</p>
                        </Card>

                        <Card className="flex flex-col items-center justify-center py-10 relative overflow-hidden text-center group">
                            <div className="absolute top-0 right-0 p-4 text-tropicalTeal/5 group-hover:scale-110 transition-transform duration-700">
                                <Target size={140} />
                            </div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Placement Probability</p>
                            <div className="flex items-baseline gap-1">
                                <motion.span
                                    className="text-6xl font-black text-gray-900 tracking-tighter"
                                    key={probability}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    {probability}
                                </motion.span>
                                <span className="text-3xl font-black text-gray-900">%</span>
                            </div>
                            <div className="mt-6 flex items-center gap-2 px-4 py-1.5 bg-tropicalTeal/5 text-tropicalTeal border border-tropicalTeal/10 rounded-full text-[11px] font-black uppercase">
                                <Zap size={14} fill="currentColor" /> High Readiness
                            </div>
                            <p className="text-[10px] text-gray-300 font-bold mt-4 uppercase tracking-[0.1em]">Base Probability: 44%</p>
                        </Card>
                    </div>

                    {/* Chart Card */}
                    <Card className="p-10">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 leading-none">Probability Growth Forecast</h3>
                                <p className="text-xs text-gray-400 font-medium mt-2">Impact of simulated changes on monthly placement odds</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Path</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-tropicalTeal"></div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Simulated Path</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[340px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSimulated" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#006d77" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#006d77" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fontWeight: 900, fill: '#9ca3af', letterSpacing: '1px' }}
                                        dy={20}
                                    />
                                    <YAxis hide domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px -4px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="current"
                                        stroke="#e5e7eb"
                                        strokeWidth={4}
                                        fill="transparent"
                                        animationDuration={1500}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="simulated"
                                        stroke="#006d77"
                                        strokeWidth={6}
                                        fillOpacity={1}
                                        fill="url(#colorSimulated)"
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex gap-12">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 text-center">Dream Companies</p>
                                    <p className="text-md font-black text-jungle text-center">Unlocked ({Math.floor(probability / 10)})</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 text-center">Salary Projection</p>
                                    <p className="text-md font-black text-gray-900 text-center">{Math.floor(probability * 0.15 + 8)}-{Math.floor(probability * 0.2 + 12)} LPA</p>
                                </div>
                            </div>

                            <Button className="h-12 px-8 bg-jungle hover:bg-jungle/90 text-white rounded-xl gap-2 font-black text-sm shadow-xl shadow-jungle/20">
                                <Save size={18} />
                                Save Strategy
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
