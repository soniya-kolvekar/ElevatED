"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';
import {
    Search,
    Bell,
    Filter,
    ChevronRight,
    Building2,
    MapPin,
    Clock,
    DollarSign,
    Zap,
    AlertTriangle,
    TrendingUp,
    BrainCircuit,
    ArrowUpRight
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";

const OpportunityCard = ({
    company,
    role,
    location,
    salary,
    type,
    match,
    radarData
}: any) => (
    <Card className="p-8 border-gray-100 hover:border-tropicalTeal/20 transition-all duration-500 group">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Company Info */}
            <div className="flex-1 space-y-6">
                <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Building2 className="w-7 h-7 text-gray-400 group-hover:text-jungle transition-colors" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-gray-900 group-hover:text-jungle transition-colors">{role}</h4>
                        <p className="text-sm font-bold text-gray-500 mt-0.5">{company} • {location} (Remote Friendly)</p>
                        <div className="flex items-center gap-4 mt-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><DollarSign size={13} /> {salary}</span>
                            <span className="flex items-center gap-1.5"><Clock size={13} /> {type}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-50">
                    <div>
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Why You Match</h5>
                        <div className="h-40 w-full mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#f3f4f6" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fontWeight: 900, fill: '#9ca3af' }} />
                                    <Radar name="Match" dataKey="A" stroke="#00f2ea" fill="#00f2ea" fillOpacity={0.15} strokeWidth={2} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Exceeds SQL proficiency requirements
                            </li>
                            <li className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Top 5% in Problem Solving (ATX)
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Gaps to Bridge</h5>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {["A/B Testing", "Roadmapping Tools"].map(g => (
                                <span key={g} className="px-3 py-1.5 bg-gray-50 text-[10px] font-bold text-gray-500 rounded-lg border border-gray-100 capitalize">{g}</span>
                            ))}
                            <span className="px-3 py-1.5 bg-rose-50 text-[10px] font-bold text-rose-500 rounded-lg border border-rose-100 capitalize">System Design (Low Score)</span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic border-l-2 border-rose-100 pl-3 mb-auto">
                            Recommendation: Complete the "Advanced System Design" Skill Lab module to increase match by 4%.
                        </p>
                        <div className="mt-8 space-y-3">
                            <Button className="w-full h-12 bg-[#00f2ea] text-tropicalTeal font-black rounded-xl shadow-xl shadow-[#00f2ea]/20 gap-2 hover:bg-[#00ffd9]">
                                APPLY NOW <ChevronRight size={18} />
                            </Button>
                            <Button variant="outline" className="w-full h-12 border-gray-100 text-gray-500 font-black rounded-xl hover:bg-gray-50 transition-all">
                                Save Opportunity
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Match Score Sidebar in Card */}
            <div className="md:w-64 flex flex-col items-end md:border-l md:border-gray-50 md:pl-8">
                <div className="text-right mb-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Match Score</p>
                    <span className="text-3xl font-black text-tropicalTeal leading-none">{match}%</span>
                </div>
                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden mb-8">
                    <motion.div
                        className="h-full bg-[#00f2ea] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${match}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                </div>
            </div>
        </div>
    </Card>
);

export default function MatchesPage() {
    const { user } = useAuthStore();

    const radarData = [
        { subject: 'Tech', A: 120, fullMark: 150 },
        { subject: 'Soft', A: 98, fullMark: 150 },
        { subject: 'Culture', A: 86, fullMark: 150 },
        { subject: 'Impact', A: 99, fullMark: 150 },
        { subject: 'Growth', A: 85, fullMark: 150 },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-black text-gray-900 leading-none mb-4">Smart Match Opportunities</h1>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                        AI-powered job recommendations curated specifically for your profile. Matches are calculated based on your ATX scoring, historical performance, and technical assessments.
                    </p>
                </div>
                <div className="bg-tropicalTeal/[0.03] border border-tropicalTeal/10 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black text-tropicalTeal uppercase tracking-widest leading-none">Profile Match: 92%</span>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
                {[
                    { label: "All Matches", icon: Filter, active: true },
                    { label: "High Match (>80%)", active: false },
                    { label: "Product Management", active: false },
                    { label: "Software Engineering", active: false },
                    { label: "Data Science", active: false },
                ].map((tab, i) => (
                    <button
                        key={tab.label}
                        className={cn(
                            "px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-tight flex items-center gap-2 transition-all",
                            tab.active
                                ? "bg-emerald-400 text-white shadow-lg shadow-emerald-200"
                                : "bg-white text-gray-400 border border-gray-100 hover:border-gray-200"
                        )}
                    >
                        {tab.icon && <tab.icon size={14} />}
                        {tab.label}
                        {tab.active && <ChevronRight size={14} className="rotate-90 ml-2 opacity-50" />}
                    </button>
                ))}
            </div>

            {/* Opportunities List */}
            <div className="space-y-8">
                <OpportunityCard
                    company="Google"
                    role="Associate Product Manager"
                    location="Mountain View, CA"
                    salary="120K - 160K"
                    type="FULL-TIME"
                    match={94}
                    radarData={radarData}
                />
                <OpportunityCard
                    company="Stripe"
                    role="Full Stack Engineer (Growth)"
                    location="San Francisco, CA"
                    salary="140K - 190K"
                    type="HYBRID"
                    match={82}
                    radarData={radarData.map(d => ({ ...d, A: d.A * 0.8 }))}
                />
            </div>

            {/* Bottom Insight Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-[#1a1c1e] text-white border-none p-8 relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-tropicalTeal/10 rounded-full blur-3xl" />
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <BrainCircuit className="text-emerald-400" size={24} />
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-400/20 px-3 py-1 rounded-full">Skill Strength</span>
                    </div>
                    <div className="relative z-10">
                        <p className="text-sm font-bold text-gray-300 uppercase tracking-[0.2em] mb-2">Analytical Thinking</p>
                        <h4 className="text-4xl font-black text-emerald-400 mb-4">Top 2%</h4>
                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                            Your cognitive assessment scores place you ahead of 98% of engineering students in systemic logic.
                        </p>
                    </div>
                </Card>

                <Card className="p-8 group hover:border-jungle/20 transition-all duration-500">
                    <div className="flex justify-between items-start mb-8">
                        <TrendingUp className="text-jungle" size={24} />
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Placement Trend</span>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Marketability</p>
                        <div className="flex items-baseline gap-2">
                            <h4 className="text-4xl font-black text-gray-900">+12.4%</h4>
                        </div>
                        <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden mt-6">
                            <motion.div
                                className="h-full bg-jungle rounded-full"
                                initial={{ width: "30%" }}
                                animate={{ width: "65%" }}
                                transition={{ duration: 1.5 }}
                            />
                        </div>
                        <p className="text-[10px] text-jungle font-black uppercase tracking-widest pt-4 flex items-center gap-1">
                            <ArrowUpRight size={12} /> Rising faster than peers
                        </p>
                    </div>
                </Card>

                <div className="bg-[#00f2ea] rounded-[32px] p-10 flex flex-col justify-between group cursor-pointer hover:shadow-2xl hover:shadow-[#00f2ea]/20 transition-all duration-500">
                    <div>
                        <h3 className="text-2xl font-black text-tropicalTeal mb-4 leading-tight">Boost Your Score Today</h3>
                        <p className="text-sm text-tropicalTeal/60 font-medium mb-8">
                            Missing 2 core technical skills for high-paying roles.
                        </p>
                    </div>
                    <Button className="h-14 bg-gray-900 text-white font-black rounded-2xl gap-3 text-sm hover:scale-105 transition-transform">
                        Enter Skill Lab <ArrowUpRight size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
