"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ResumeUpload } from "@/components/student/ResumeUpload";
import { motion } from "framer-motion";
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    LineChart, Line
} from 'recharts';
import { Target, Trophy, TrendingUp, Briefcase, CheckCircle } from "lucide-react";

export default function StudentDashboard() {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        document.cookie = "auth-role=; path=/; max-age=0";
        logout();
        window.location.href = "/";
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-eggshell p-8 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-jungle/20 rounded-xl mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    const hasResume = !!user.resumeUrl;

    // Base ATX Mock Data 
    const atxScore = user.atxScore || 0;
    const atxBreakdown = [
        { name: 'Technical', value: 35 },
        { name: 'DSA', value: 20 },
        { name: 'Projects', value: 20 },
        { name: 'Academics', value: 15 },
        { name: 'Experience', value: 10 },
    ];
    const COLORS = ['#4a7c59', '#528a7e', '#006d77', '#83c5be', '#edf6f9'];

    const recommendedCompanies = [
        { name: 'Google', match: 92 },
        { name: 'Microsoft', match: 88 },
        { name: 'Amazon', match: 82 },
        { name: 'Meta', match: 78 },
        { name: 'Netflix', match: 70 },
    ];

    const skillGaps = [
        { subject: 'React', A: 90, fullMark: 100 },
        { subject: 'Node.js', A: 70, fullMark: 100 },
        { subject: 'System Design', A: 40, fullMark: 100 },
        { subject: 'DSA', A: 85, fullMark: 100 },
        { subject: 'DevOps', A: 30, fullMark: 100 },
    ];

    const readinessTimeline = [
        { name: 'Jan', readiness: 40 },
        { name: 'Feb', readiness: 55 },
        { name: 'Mar', readiness: 62 },
        { name: 'Apr', readiness: 80 },
        { name: 'May', readiness: 88 },
    ];

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
                            <h1 className="text-xl font-bold text-gray-900 leading-tight">Student Hub</h1>
                            <p className="text-xs text-mutedTeal font-semibold">ElevatED Placement Engine</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <div className="text-sm font-semibold">{user.name}</div>
                            <div className="text-xs text-gray-500 capitalize">{user.role} • Lvl {user.level || 1}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-tropicalTeal text-white flex items-center justify-center font-bold shadow-soft">
                            {user.name?.charAt(0) || "S"}
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">

                {/* Onboarding / Status Banner */}
                {!hasResume && (
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                                Welcome back, <br /><span className="text-jungle">{user.name?.split(' ')[0]}</span>.
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 max-w-xl">
                                To unlock your personalized ATX score, AI skill-gap analysis, and company match probability, upload your latest resume.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-sm text-jungle font-medium bg-jungle/10 px-4 py-2 rounded-full">
                                    <CheckCircle className="w-4 h-4" /> Secure Cloud Parsing
                                </div>
                                <div className="flex items-center gap-2 text-sm text-tropicalTeal font-medium bg-tropicalTeal/10 px-4 py-2 rounded-full">
                                    <CheckCircle className="w-4 h-4" /> Instant ATX Setup
                                </div>
                            </div>
                        </div>
                        <div>
                            <ResumeUpload />
                        </div>
                    </div>
                )}

                {hasResume && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Top Row - Key Metrics & Gamification */}
                        <div className="grid md:grid-cols-3 gap-6">

                            {/* ATX Score Donut */}
                            <Card className="flex flex-col relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                                    <Target size={120} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 z-10 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-jungle" /> ATX Score
                                </h3>
                                <p className="text-sm text-gray-500 mb-4 z-10">Application Troubleshooting Index</p>

                                <div className="h-48 w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={atxBreakdown}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {atxBreakdown.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                                                itemStyle={{ color: '#1f2937', fontWeight: 600 }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-4">
                                        <span className="text-4xl font-black text-jungle">{atxScore}</span>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">/ 100</span>
                                    </div>
                                </div>
                            </Card>

                            {/* XP & Level Status */}
                            <Card className="flex flex-col relative overflow-hidden group justify-between">
                                <div className="absolute bottom-0 right-0 p-4 opacity-5 transform translate-x-8 translate-y-8 group-hover:scale-110 transition-transform duration-500">
                                    <Trophy size={160} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 z-10 flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-amber-500" /> Career Level
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6 z-10">Accumulate XP by solving challenges</p>

                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-5xl font-black text-gray-900 leading-none">{user.level || 1}</span>
                                        <span className="text-sm font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md mb-1">Elite Tier</span>
                                    </div>
                                </div>

                                <div className="z-10 mt-8">
                                    <div className="flex justify-between text-sm mb-2 font-medium">
                                        <span className="text-gray-600">XP Progress</span>
                                        <span className="text-jungle">{(user.xp || 0)} / 1000</span>
                                    </div>
                                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-jungle rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((user.xp || 0) / 1000) * 100}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-3">Next level unlocks Mock Interviews.</p>
                                </div>
                            </Card>

                            {/* Recommended Companies Bar Chart */}
                            <Card className="flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-tropicalTeal" /> Top Matches
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">Ranked by ATX and Skill overlap</p>
                                <div className="h-48 w-full -ml-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={recommendedCompanies} layout="vertical" margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                                            <XAxis type="number" hide domain={[0, 100]} />
                                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4b5563', fontWeight: 500 }} />
                                            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                            <Bar dataKey="match" fill="#528a7e" radius={[0, 4, 4, 0]} barSize={16}>
                                                {recommendedCompanies.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.match > 85 ? '#4a7c59' : '#83c5be'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>

                        {/* Diagnostic Row */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Skill Gap Radar */}
                            <Card className="flex flex-col items-center">
                                <div className="w-full">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Competency Radar</h3>
                                    <p className="text-sm text-gray-500 mb-2">Identified skill strengths and gaps from resume</p>
                                </div>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillGaps}>
                                            <PolarGrid stroke="#e5e7eb" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar name="Proficiency" dataKey="A" stroke="#006d77" fill="#006d77" fillOpacity={0.2} strokeWidth={2} />
                                            <Tooltip />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            {/* Readiness Timeline */}
                            <Card className="flex flex-col">
                                <div className="w-full">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-mutedTeal" /> Placement Readiness
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">Probability trajectory over time</p>
                                </div>
                                <div className="h-60 w-full mt-auto">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={readinessTimeline} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} domain={[0, 100]} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                                                formatter={(value: any) => [`${value}%`, 'Readiness'] as any}
                                            />
                                            <Line type="monotone" dataKey="readiness" stroke="#4a7c59" strokeWidth={3} dot={{ r: 4, fill: '#4a7c59', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>

                        {/* Simulated Actions */}
                        <div className="bg-jungle text-white rounded-2xl p-8 shadow-xl flex flex-col md:flex-row gap-8 justify-between items-center relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10 max-w-2xl">
                                <h3 className="text-2xl font-bold mb-3">Want to improve your odds?</h3>
                                <p className="text-eggshell/90 mb-0">
                                    Use the Improvement Simulator to map out your shortest path to your dream company. See exactly how adding an internship or boosting DSA affects your ATX score.
                                </p>
                            </div>
                            <div className="relative z-10 whitespace-nowrap">
                                <Button className="bg-white text-jungle hover:bg-eggshell shadow-lg px-8 py-4 text-lg">
                                    Launch Simulator
                                </Button>
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}
