"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import {
    Eye,
    Database,
    Network,
    Target,
    Zap,
    Briefcase,
    TrendingUp,
    ShieldCheck,
    ArrowUpRight,
    CheckCircle2,
    Code
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { getStudentDashboardData } from "@/lib/student-data";


const readinessData = [
    { month: "MONTH 1", value: 45, target: 50 },
    { month: "MONTH 2", value: 55, target: 60 },
    { month: "MONTH 3", value: 50, target: 65 },
    { month: "MONTH 4", value: 65, target: 75 },
    { month: "MONTH 5", value: 78, target: 82 },
    { month: "TARGET", value: 82, target: 95 },
];

export default function PlatformOverview() {
    const { user } = useAuthStore();
    const data = getStudentDashboardData(user);

    return (
        <div className="space-y-12 pb-20 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="space-y-4">
                <span className="px-3 py-1 bg-jungle/5 text-jungle text-[10px] font-black uppercase tracking-widest rounded-full border border-jungle/10">
                    Deep Dive
                </span>
                <h1 className="text-5xl font-black text-gray-900 leading-tight">
                    Advanced Placement <br /> Intelligence
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl font-medium">
                    Explore the engine driving next-gen campus placements. From AI-driven resume parsing to predictive readiness modeling.
                </p>
            </div>

            {/* AI Resume Intelligence Section */}
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-jungle/10 flex items-center justify-center text-jungle">
                        <Zap size={18} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">AI Resume Intelligence</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Visual Parsing",
                            description: "Proprietary OCR and spatial analysis to convert complex, multi-column visual resumes into structured JSON data without losing context.",
                            icon: Eye
                        },
                        {
                            title: "Entity Extraction",
                            description: "Identifies key experience, education milestones, and extracurricular achievements using Named Entity Recognition (NER).",
                            icon: Database
                        },
                        {
                            title: "Skill Mapping",
                            description: "Maps candidate skills to the ATX standard industry taxonomy, normalizing varied terminology across different engineering domains.",
                            icon: Network
                        }
                    ].map((feature, idx) => (
                        <Card key={idx} className="p-8 border-gray-100 hover:border-jungle/20 transition-all hover:shadow-xl group">
                            <div className="w-full h-40 bg-gray-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-jungle/5 transition-colors">
                                <feature.icon size={48} className="text-gray-300 group-hover:text-jungle transition-all duration-500 group-hover:scale-110" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* ATX Score Engine Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-jungle/10 flex items-center justify-center text-jungle">
                            <Target size={18} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">ATX Score Engine</h2>
                    </div>

                    <p className="text-gray-500 font-medium leading-relaxed">
                        The Advanced Talent Index (ATX) uses a multi-weighted algorithm to determine placement viability. Our engine calculates scores based on five core pillars.
                    </p>

                    <div className="space-y-6 max-w-xl">
                        {[
                            { label: "Technical Proficiency", weight: "40%", score: 85, color: "bg-jungle" },
                            { label: "Academic Consistency", weight: "25%", score: 72, color: "bg-jungle/60" },
                            { label: "Communication & Soft Skills", weight: "15%", score: 90, color: "bg-emerald-500/40" },
                            { label: "Project Depth", weight: "20%", score: 65, color: "bg-gray-200" }
                        ].map((metric, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider">
                                    <span className="text-gray-900">{metric.label}</span>
                                    <span className="text-gray-400">{metric.weight} Weightage</span>
                                </div>
                                <div className="h-6 w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${metric.score}%` }}
                                        className={`h-full rounded-md ${metric.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5 bg-jungle/5 rounded-[2rem] p-8 border border-jungle/10 space-y-6">
                    <h3 className="text-xs font-black text-jungle uppercase tracking-[0.3em]">Score Tiers</h3>
                    <div className="space-y-4">
                        {[
                            { tier: "Platinum Tier (850+)", desc: "Top 5% of candidates. Direct track to Tier-1 product firms.", bg: "bg-amber-50", text: "P" },
                            { tier: "Gold Tier (700-849)", desc: "Strong foundation. Ideal for core engineering & fintech.", bg: "bg-emerald-50", text: "G" },
                            { tier: "Silver Tier (500-699)", desc: "Skilled workforce. Ready for service-based scale-ups.", bg: "bg-gray-50", text: "S" }
                        ].map((tier, idx) => (
                            <div key={idx} className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 rounded-xl ${tier.bg} flex items-center justify-center text-xl font-black text-gray-900/20`}>
                                    {tier.text}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-gray-900">{tier.tier}</h4>
                                    <p className="text-[10px] text-gray-400 font-bold">{tier.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Smart Opportunity Matching Section */}
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-jungle/10 flex items-center justify-center text-jungle">
                        <Briefcase size={18} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Smart Opportunity Matching</h2>
                </div>

                <Card className="overflow-hidden border-gray-100 p-0">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Company</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Compatibility</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { name: "NexaSystems", role: "Full Stack SDE", comp: "98%", status: "Invited", statusColor: "bg-blue-50 text-blue-600" },
                                { name: "CloudPulse", role: "DevOps Engineer", comp: "92%", status: "Open", statusColor: "bg-gray-100 text-gray-500" },
                                { name: "AuraData", role: "Data Scientist", comp: "76%", status: "Open", statusColor: "bg-gray-100 text-gray-500" }
                            ].map((job, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-black text-gray-400 group-hover:bg-jungle group-hover:text-white transition-all">
                                                {job.name[0]}
                                            </div>
                                            <span className="font-black text-gray-900">{job.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-500">{job.role}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className="font-black text-jungle">{job.comp}</span>
                                            <span className="px-2 py-0.5 bg-jungle/5 text-jungle text-[8px] font-black uppercase rounded">Best Fit</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${job.statusColor}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-jungle transition-colors">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>

            {/* Readiness Predictor Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <Card className="lg:col-span-8 p-10 border-gray-100">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="text-jungle" size={20} />
                            <h2 className="text-xl font-bold text-gray-900">Readiness Predictor</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Predicted Probability</p>
                            <span className="text-4xl font-black text-jungle">82%</span>
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={readinessData}>
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#4a7c59"
                                    strokeWidth={4}
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="target"
                                    stroke="#C4D7CC"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="mt-8 text-xs text-gray-400 italic font-medium leading-relaxed">
                        Historical data suggests an 82% placement probability within 45 days based on your current ATX trajectory.
                    </p>
                </Card>

                <div className="lg:col-span-4 bg-jungle rounded-[2rem] p-8 text-white flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck size={24} className="text-emerald-400" />
                            <h3 className="text-xl font-black">Policy Engine</h3>
                        </div>
                        <p className="text-sm text-eggshell/60 leading-relaxed mb-8">
                            The brain behind eligibility logic. Our Policy Engine ensures fair, rule-based matching that aligns with both university guidelines and corporate requirements.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Dynamic Eligibility Checks",
                                "Conflict Resolution Logic",
                                "Fair-Share Distribution"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 size={16} className="text-emerald-400" />
                                    <span className="text-xs font-bold text-white/90">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 bg-black/20 rounded-2xl p-6 border border-white/5 space-y-4">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Logic</span>
                        <div className="font-mono text-[10px] text-emerald-400/80 leading-relaxed uppercase whitespace-pre-wrap">
                            IF (ATX_SCORE {">"} 750) AND (BACKLOGS == 0)<br />
                            ENABLE(PREMIUM_ROLES)<br />
                            PRIORITY = DYNAMIC_RANK
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}
