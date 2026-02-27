"use client";
import { useState, useMemo } from "react";
import { useAuthStore } from "@/store/useAuthStore";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
    Zap,
    TrendingUp,
    CheckCircle2,
    Save,
    RotateCcw,
    Lightbulb,
    Check,
    LockIcon,
    UnlockIcon,
    CheckCircle
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";

export default function SimulatorPage() {
    const { user } = useAuthStore();
    const data = useMemo(() => getStudentDashboardData(user), [user]);

    // Baseline stats from real data
    const baselineCgpa = user?.cgpa || 7.5;
    const [targetCgpa, setTargetCgpa] = useState(Math.min(10, baselineCgpa + 0.5));

    // Dynamic Skill Levers
    const [skills, setSkills] = useState([
        { id: 'python', name: 'Python (Adv)', bonus: 25, active: true },
        { id: 'sql', name: 'SQL/NoSQL', bonus: 20, active: false },
        { id: 'react', name: 'React.js', bonus: 30, active: true },
        { id: 'aws', name: 'AWS Cloud', bonus: 35, active: false },
    ]);

    const [hasCapstone, setHasCapstone] = useState(true);
    const [mockScore, setMockScore] = useState(60);

    // Simulated Logic
    const simulatedAtx = useMemo(() => {
        let score = data.atxScore;

        // CGPA impact (normalized for 1000 scale)
        if (targetCgpa > baselineCgpa) {
            score += (targetCgpa - baselineCgpa) * 45;
        }

        // Skills impact
        skills.forEach(s => {
            if (s.active) score += s.bonus;
        });

        // Capstone impact
        if (hasCapstone) score += 40;

        // Mock Interview impact
        if (mockScore > 50) {
            score += (mockScore - 50) * 1.5;
        }

        return Math.min(Math.round(score), 1000);
    }, [data.atxScore, targetCgpa, baselineCgpa, skills, hasCapstone, mockScore]);

    const baseProbability = Math.min(Math.round((data.atxScore / 1000) * 100), 100) - 20; // Just for visual delta
    const probability = Math.min(Math.round((simulatedAtx / 1000) * 100), 100);

    const toggleSkill = (id: string) => {
        setSkills(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
    };

    const resetAll = () => {
        setTargetCgpa(baselineCgpa);
        setSkills(prev => prev.map(s => ({ ...s, active: false })));
        setHasCapstone(false);
        setMockScore(50);
    };

    // Chart Data Generation (Keep the gradient area design, but add a baseline line)
    const chartData = useMemo(() => {
        const months = ['MONTH 1', 'MONTH 2', 'MONTH 3', 'MONTH 4', 'FINAL DRIVE'];
        const baseStart = baseProbability;
        const baseEnd = baseProbability + 5;
        const simStart = baseProbability;
        const simEnd = probability;

        return months.map((month, idx) => {
            const progress = idx / (months.length - 1); // 0 to 1
            return {
                name: month,
                current: Math.round(baseStart + (baseEnd - baseStart) * progress),
                simulated: Math.round(simStart + (simEnd - simStart) * (progress * progress)) // Curve effect
            };
        });
    }, [baseProbability, probability]);

    return (
        <div className="space-y-6 pb-12 max-w-7xl mx-auto px-4 md:px-0">
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Improvement Levers Panel */}
                <Card className="lg:w-[400px] shrink-0 p-6 shadow-sm border-gray-100 flex flex-col h-fit">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-black text-gray-900">Improvement Levers</h2>
                        <button onClick={resetAll} className="text-xs font-bold text-[#5fb896] uppercase tracking-widest hover:underline">
                            RESET ALL
                        </button>
                    </div>

                    <div className="space-y-8 flex-1">
                        {/* Target CGPA */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-bold text-gray-900">Target CGPA Improvement</label>
                                <span className="text-sm font-black text-[#8ec8b3] bg-[#f0f7f4] px-3 py-1 rounded-md">{targetCgpa.toFixed(1)} / 10</span>
                            </div>
                            <input
                                type="range"
                                min={baselineCgpa}
                                max="10"
                                step="0.1"
                                value={targetCgpa}
                                onChange={(e) => setTargetCgpa(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#5fb896]"
                            />
                            <p className="text-[10px] text-gray-400 font-bold italic mt-2">Simulating a jump from current {baselineCgpa.toFixed(1)} to {targetCgpa.toFixed(1)}</p>
                        </div>

                        {/* New Tech Stack Skills */}
                        <div>
                            <label className="text-sm font-bold text-gray-900 mb-3 block">New Tech Stack Skills</label>
                            <div className="grid grid-cols-2 gap-3">
                                {skills.map(skill => (
                                    <button
                                        key={skill.id}
                                        onClick={() => toggleSkill(skill.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-xs font-bold",
                                            skill.active
                                                ? "border-[#5fb896] bg-[#f0f7f4] text-[#4a7c59]"
                                                : "border-gray-200 text-gray-500 hover:border-gray-300"
                                        )}
                                    >
                                        <div className={cn("w-4 h-4 rounded-full flex items-center justify-center", skill.active ? "bg-[#5fb896] text-white" : "bg-gray-200 text-gray-400")}>
                                            {skill.active ? <Check size={10} strokeWidth={4} /> : <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </div>
                                        {skill.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Capstone Project */}
                        <div>
                            <label className="text-sm font-bold text-gray-900 mb-3 block">Capstone Project Completion</label>
                            <div
                                onClick={() => setHasCapstone(!hasCapstone)}
                                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 cursor-pointer hover:bg-gray-100/80 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Zap size={16} className={hasCapstone ? "text-[#4a7c59]" : "text-gray-400"} />
                                    <span className={cn("text-xs font-bold", hasCapstone ? "text-gray-900" : "text-gray-500")}>Industry-Grade Project</span>
                                </div>
                                <div className={cn("w-10 h-6 rounded-full transition-colors flex items-center px-1", hasCapstone ? "bg-[#4a7c59]" : "bg-gray-300")}>
                                    <motion.div
                                        className="w-4 h-4 rounded-full bg-white shadow-sm"
                                        animate={{ x: hasCapstone ? 16 : 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Mock Interview Score */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-bold text-gray-900">Mock Interview Score</label>
                                <span className="text-sm font-black text-gray-900">{mockScore}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={mockScore}
                                onChange={(e) => setMockScore(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#4a7c59]"
                            />
                        </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className="mt-8 bg-[#f0f7f4] rounded-2xl p-5 border border-[#e2efe9]">
                        <div className="flex items-center gap-2 mb-2 text-[#5fb896]">
                            <Lightbulb size={16} className="fill-current" />
                            <span className="text-xs font-black uppercase tracking-widest">AI Recommendation</span>
                        </div>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">
                            Completing a <strong className="text-gray-900">Full-Stack Certification</strong> and raising CGPA to <strong className="text-gray-900">8.5</strong> would place you in the <strong className="text-[#5fb896]">top 5%</strong> of applicants for Tier-1 companies.
                        </p>
                    </div>
                </Card>

                {/* Main Content Area */}
                <div className="flex-1 space-y-6">

                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-8 border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className="absolute right-6 top-6 opacity-10 text-[#5fb896]"><TrendingUp size={40} /></div>
                            <h3 className="text-xs font-black text-[#4a7c59]/70 uppercase tracking-widest mb-4">Simulated ATX Score</h3>
                            <div className="flex items-baseline justify-center gap-1 mb-3">
                                <span className="text-6xl font-black text-[#5fb896] leading-none">{simulatedAtx}</span>
                                <span className="text-xl font-bold text-gray-400">/1000</span>
                            </div>
                            <div className="inline-flex items-center gap-1 bg-[#f0f7f4] text-[#4a7c59] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                                <TrendingUp size={12} /> +{simulatedAtx - data.atxScore} pts
                            </div>
                            <p className="text-xs font-bold text-gray-400 mt-auto">Current Score: {data.atxScore}</p>
                        </Card>

                        <Card className="p-8 border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className="absolute right-6 top-6 text-gray-200">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22L4 18V7L12 2L20 7V18L12 22Z" fill="#e4ebdd" />
                                    <path d="M16 9L10 15L7 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-black text-[#4a7c59]/70 uppercase tracking-widest mb-4">Placement Probability</h3>
                            <div className="flex items-baseline justify-center gap-1 mb-3">
                                <span className="text-6xl font-black text-[#4a7c59] leading-none">{probability}</span>
                                <span className="text-xl font-bold text-[#4a7c59]">%</span>
                            </div>
                            <div className="inline-flex items-center gap-1 bg-[#f0f7f4] text-[#4a7c59] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                                <Zap size={12} /> High Readiness
                            </div>
                            <p className="text-xs font-bold text-gray-400 mt-auto">Base Probability: {baseProbability}%</p>
                        </Card>
                    </div>

                    {/* Chart Card */}
                    <Card className="p-6 md:p-8 border-none bg-gradient-to-br from-[#161b22] to-[#0d1117] text-white shadow-xl flex flex-col h-[500px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4a7c59]/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div>
                                <h3 className="text-lg font-black text-white mb-1">Probability Growth Forecast</h3>
                                <p className="text-xs font-bold text-gray-400">Impact of simulated changes on monthly placement odds</p>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <div className="w-2 h-2 rounded-full bg-gray-500" /> Current Path
                                </div>
                                <div className="flex items-center gap-1.5 text-[#5fb896]">
                                    <div className="w-2 h-2 rounded-full bg-[#5fb896]" /> Simulated Path
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-0 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSimulated" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#5fb896" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#5fb896" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4a5568" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4a5568" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d3748" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={{ stroke: '#2d3748' }}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 9, fontWeight: 900 }}
                                        dy={10}
                                    />
                                    <YAxis hide domain={[0, 100]} />
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-black/90 border border-white/10 p-4 rounded-2xl shadow-xl text-xs backdrop-blur-md">
                                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">{payload[0].payload.name}</p>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between gap-4">
                                                                <span className="font-bold text-gray-400">Simulated</span>
                                                                <span className="font-black text-[#5fb896]">{payload[0].payload.simulated}%</span>
                                                            </div>
                                                            <div className="flex items-center justify-between gap-4">
                                                                <span className="font-bold text-gray-500">Current</span>
                                                                <span className="font-black text-gray-300">{payload[0].payload.current}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Area type="monotone" dataKey="simulated" stroke="#5fb896" fill="url(#colorSimulated)" strokeWidth={4} isAnimationActive={true} />
                                    <Area type="monotone" dataKey="current" stroke="#718096" fill="url(#colorCurrent)" strokeWidth={3} isAnimationActive={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 relative z-10">
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Dream Companies</p>
                                    <p className="text-sm font-black text-white">Unlocked ({Math.floor(probability / 15)})</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Salary Projection</p>
                                    <p className="text-sm font-black text-[#5fb896]">
                                        {probability > 80 ? "18-24 LPA" : (probability > 60 ? "10-15 LPA" : "6-9 LPA")}
                                    </p>
                                </div>
                            </div>
                            <Button className="bg-[#4a7c59]/20 border border-[#4a7c59]/50 hover:bg-[#4a7c59] text-white font-black rounded-xl px-6 h-11 gap-2 shadow-sm uppercase tracking-widest text-[11px] transition-colors">
                                <Save size={14} /> Save Strategy
                            </Button>
                        </div>
                    </Card>

                </div>
            </div>

            
        </div>
    );
}
