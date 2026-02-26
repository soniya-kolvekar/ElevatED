"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { ResumeUpload } from "@/components/student/ResumeUpload";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';
import {
    Download,
    TrendingUp,
    ArrowUpRight,
    Building2,
    AlertCircle,
    ChevronRight,
    Trophy
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";

export default function StudentDashboard() {
    const { user } = useAuthStore();

    if (!user) return null;

    const hasResume = !!user.resumeUrl;

    if (!hasResume) {
        return (
            <div className="min-h-screen bg-eggshell p-8 flex flex-col items-center justify-center text-center">
                <div className="max-w-2xl w-full space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Personalize Your <span className="text-jungle">Future</span>.
                        </h1>
                        <p className="text-lg text-gray-600">
                            Upload your resume to unlock your AI-powered ATX score,
                            skills analysis, and smart company matching.
                        </p>
                    </div>

                    <div className="bg-white p-2 rounded-3xl shadow-soft">
                        <ResumeUpload />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4">
                            <div className="text-2xl font-bold text-jungle">95%</div>
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Parsing Accuracy</div>
                        </div>
                        <div className="p-4 border-x border-gray-100">
                            <div className="text-2xl font-bold text-tropicalTeal">Instant</div>
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Score Setup</div>
                        </div>
                        <div className="p-4">
                            <div className="text-2xl font-bold text-amber-500">Tier-1</div>
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Opportunities</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const data = getStudentDashboardData(user);

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Student Dashboard</h1>
                    <p className="text-gray-500 mt-1">
                        Welcome back, <span className="font-bold text-gray-700">{user.name.split(' ')[0]}</span>.
                        Your <span className="text-jungle font-bold">ATX Score</span> improved by {data.atxScoreDelta}% this week!
                    </p>
                </div>
                <Button variant="outline" className="bg-white border-gray-100 text-gray-600 gap-2 h-11 px-6 rounded-xl hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    Download Readiness Report
                </Button>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current XP Card */}
                <Card className="relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Trophy size={120} />
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current XP</p>
                    <div className="flex items-baseline gap-2 mb-1">
                        <h2 className="text-3xl font-black text-gray-900">{data.xp.toLocaleString()}</h2>
                        <span className="text-sm font-bold text-jungle">+{data.atxScoreDelta * 240} this month</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium mb-6">XP to {data.tier} Tier</p>

                    <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-jungle"
                                initial={{ width: 0 }}
                                animate={{ width: `${(data.xp / data.xpToNextTier) * 100}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-gray-400">
                            <span>{Math.round((data.xp / data.xpToNextTier) * 100)}%</span>
                            <span>{data.xpToNextTier.toLocaleString()} XP</span>
                        </div>
                    </div>
                </Card>

                {/* ATX Talent Index Card */}
                <Card className="flex flex-col items-center justify-center py-4">
                    <div className="flex justify-between w-full mb-1">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">ATX Talent Index</p>
                            <h2 className="text-3xl font-black text-gray-900">{data.atxScore}</h2>
                            <p className="text-[10px] text-gray-400 font-medium">Top 15% of Senior Students</p>
                        </div>
                        <div className="h-24 w-24 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[{ value: data.atxScore }, { value: 1000 - data.atxScore }]}
                                        innerRadius={28}
                                        outerRadius={38}
                                        startAngle={90}
                                        endAngle={-270}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        <Cell fill="#4a7c59" />
                                        <Cell fill="#f3f4f6" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-sm font-black text-jungle">{data.atxScore}</span>
                                <span className="text-[8px] font-bold text-gray-300 uppercase">Points</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Global Rank Card */}
                <Card>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Global Rank</p>
                    <h2 className="text-3xl font-black text-gray-900">#{data.globalRank.toLocaleString()}</h2>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-jungle/5 rounded-xl p-3 border border-jungle/10">
                            <div className="flex items-center gap-1 text-jungle mb-0.5">
                                <ArrowUpRight className="w-3 h-3" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">UP {data.campusRankDelta}</span>
                            </div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Campus</p>
                        </div>
                        <div className="bg-tropicalTeal/5 rounded-xl p-3 border border-tropicalTeal/10">
                            <div className="flex items-center gap-1 text-tropicalTeal mb-0.5">
                                <ArrowUpRight className="w-3 h-3" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">UP {data.nationalRankDelta}</span>
                            </div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">National</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Middle Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Readiness Growth Chart */}
                <Card className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 leading-none">Readiness Growth</h3>
                            <p className="text-xs text-gray-400 font-medium mt-1">Placement readiness score over the last 6 months</p>
                        </div>
                        <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Last 6 Months</div>
                    </div>

                    <div className="h-[280px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.readinessGrowth} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                                    dy={10}
                                />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip
                                    cursor={{ fill: '#f9fafb' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-50">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{payload[0].payload.month}</p>
                                                    <p className="text-sm font-black text-jungle">{payload[0].value}% Readiness</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[6, 6, 6, 6]}
                                    barSize={40}
                                >
                                    {data.readinessGrowth.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === data.readinessGrowth.length - 1 ? '#4a7c59' : '#C4D7CC'}
                                            className="transition-all duration-300 hover:opacity-80"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recommended Companies List */}
                <Card className="flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black text-gray-900 leading-none">Recommended Companies</h3>
                        <button className="text-[10px] font-bold text-jungle uppercase tracking-widest hover:underline">View All</button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {data.recommendedCompanies.map((company) => (
                            <div key={company.name} className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Building2 className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-sm font-bold text-gray-900 truncate">{company.name}</h4>
                                        <span className="text-[9px] font-black text-jungle uppercase shrink-0">{company.match}% Match</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold truncate mb-2">{company.role}</p>
                                    <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-jungle rounded-full"
                                            style={{ width: `${company.match}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Bottom Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Skill Gap Analysis */}
                <Card className="lg:col-span-2">
                    <h3 className="text-lg font-black text-gray-900 mb-6">Skill Gap Analysis</h3>
                    <div className="space-y-6">
                        {data.skills.map((skill) => (
                            <div key={skill.name} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{skill.name}</p>
                                        {skill.needsImprovement && (
                                            <p className="text-[10px] text-orange-500 font-bold flex items-center gap-1 mt-0.5">
                                                <AlertCircle size={10} /> Needs improvement for High-Match roles
                                            </p>
                                        )}
                                    </div>
                                    <span className={cn(
                                        "text-sm font-black",
                                        skill.needsImprovement ? "text-orange-500" : "text-jungle"
                                    )}>{skill.score}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                                    <motion.div
                                        className={cn(
                                            "h-full rounded-full",
                                            skill.needsImprovement ? "bg-orange-400" : "bg-jungle"
                                        )}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.score}%` }}
                                        transition={{ duration: 1.2 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Improvement CTA Card */}
                <div className="bg-jungle rounded-3xl p-6 text-white relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-2xl hover:shadow-jungle/20 transition-all duration-500">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/10">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black mb-2 leading-tight">Want to improve your odds?</h3>
                        <p className="text-sm text-eggshell/70 font-medium">
                            Use the Improvement Simulator to map out your shortest path to your dream company.
                        </p>
                    </div>

                    <button className="mt-8 bg-white text-jungle w-full py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 group-hover:gap-4 transition-all overflow-hidden relative">
                        <span className="relative z-10">Launch Simulator</span>
                        <ChevronRight className="w-4 h-4 relative z-10" />
                        <div className="absolute inset-0 bg-eggshell translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </div>
            </div>
        </div>
    );
}
