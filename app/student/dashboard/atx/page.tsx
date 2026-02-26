"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import {
    Download,
    Share2,
    CheckCircle2,
    ChevronRight,
    Search,
    BookOpen,
    User,
    Code,
    GraduationCap,
    Briefcase,
    Target
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";

const MetricCard = ({
    title,
    score,
    max,
    weight,
    icon: Icon,
    subMetrics
}: {
    title: string;
    score: number;
    max: number;
    weight: string;
    icon: any;
    subMetrics: { label: string; score: number; color?: string }[]
}) => (
    <Card className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
            <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-tropicalTeal/5 text-tropicalTeal flex items-center justify-center border border-tropicalTeal/10">
                    <Icon size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-gray-900">{title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{weight}</p>
                </div>
            </div>
            <div className="text-right">
                <span className="text-xl font-black text-gray-900">{score} </span>
                <span className="text-xs font-bold text-gray-300">/ {max}</span>
            </div>
        </div>

        <div className="space-y-4 mt-auto">
            {subMetrics.map((sm) => (
                <div key={sm.label} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                        <span>{sm.label}</span>
                        <span>{sm.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                        <motion.div
                            className={cn("h-full rounded-full", sm.color || "bg-tropicalTeal")}
                            initial={{ width: 0 }}
                            animate={{ width: `${sm.score}%` }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

export default function ATXPage() {
    const { user } = useAuthStore();
    const data = getStudentDashboardData(user);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-gray-900">Detailed ATX Score Breakdown</h1>
                <Button variant="outline" className="h-11 px-6 rounded-xl border-tropicalTeal/20 text-tropicalTeal font-bold gap-2 hover:bg-tropicalTeal/5">
                    <Download size={18} /> Download Report
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score Summary Card */}
                <Card className="lg:col-span-2 flex flex-col md:flex-row items-center gap-12 p-10">
                    <div className="flex flex-col items-center">
                        <div className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase tracking-tighter mb-4">
                            GOLD TIER
                        </div>
                        <div className="h-48 w-48 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[{ value: 81.5 }, { value: 18.5 }]}
                                        innerRadius={60}
                                        outerRadius={80}
                                        startAngle={90}
                                        endAngle={-270}
                                        dataKey="value"
                                        stroke="none"
                                        paddingAngle={4}
                                    >
                                        <Cell fill="#006d77" />
                                        <Cell fill="#f3f4f6" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-gray-900 leading-none">81.5%</span>
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Overall Proficiency</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-4xl font-black text-gray-900">{data.atxScore} <span className="text-xl text-gray-300">/ 1000</span></h2>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Great job! You are just 85 points away from reaching the <span className="text-tropicalTeal font-bold underline underline-offset-4">Platinum Tier</span>. This will unlock exclusive opportunities with Fortune 500 partners.
                            </p>
                        </div>
                        <Button className="w-fit bg-tropicalTeal/5 text-tropicalTeal border border-tropicalTeal/10 rounded-xl px-6 font-bold hover:bg-tropicalTeal/10 gap-2">
                            <Share2 size={16} /> Share Achievement
                        </Button>
                    </div>
                </Card>

                {/* Path to Platinum Card */}
                <Card className="flex flex-col">
                    <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                        <Target className="text-tropicalTeal" size={20} /> Path to Platinum
                    </h3>
                    <div className="space-y-5">
                        {[
                            { label: "Technical Foundation", desc: "Achieved 90+ in Core Subjects", done: true },
                            { label: "Coding Proficiency", desc: "Solved 200+ LeetCode problems", done: true },
                            { label: "Project Portfolio", desc: "Complete 1 more full-stack project", done: false },
                            { label: "Soft Skills Mock", desc: "Score 8.5 in next mock interview", done: false },
                        ].map((m, i) => (
                            <div key={i} className="flex gap-4 group cursor-pointer">
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                                    m.done ? "bg-tropicalTeal border-tropicalTeal text-white" : "border-gray-100 bg-white group-hover:border-tropicalTeal"
                                )}>
                                    {m.done && <CheckCircle2 size={14} />}
                                </div>
                                <div className="space-y-0.5">
                                    <p className={cn("text-xs font-black", m.done ? "text-gray-900" : "text-gray-500")}>{m.label}</p>
                                    <p className="text-[10px] text-gray-400 font-medium">{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 text-center text-[10px] font-black text-tropicalTeal uppercase tracking-[0.1em] hover:underline">
                        View All Milestones
                    </button>
                </Card>
            </div>

            {/* Detailed Metric Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard
                    title="Technical Proficiency"
                    score={345}
                    max={400}
                    weight="Weightage: 40% of ATX"
                    icon={Code}
                    subMetrics={[
                        { label: "Data Structures & Algos", score: 92 },
                        { label: "System Design", score: 75 },
                        { label: "Database Management", score: 88 },
                    ]}
                />
                <MetricCard
                    title="Soft Skills"
                    score={195}
                    max={250}
                    weight="Weightage: 25% of ATX"
                    icon={User}
                    subMetrics={[
                        { label: "Communication", score: 85, color: "bg-tropicalTeal" },
                        { label: "Team Collaboration", score: 70, color: "bg-tropicalTeal" },
                        { label: "Problem Solving Mindset", score: 80, color: "bg-tropicalTeal" },
                    ]}
                />
                <MetricCard
                    title="Academic Excellence"
                    score={175}
                    max={200}
                    weight="Weightage: 20% of ATX"
                    icon={GraduationCap}
                    subMetrics={[
                        { label: "CGPA", score: 91, color: "bg-tropicalTeal" },
                        { label: "Consistency", score: 85, color: "bg-tropicalTeal" },
                        { label: "Top %", score: 95, color: "bg-tropicalTeal" },
                    ]}
                />
                <MetricCard
                    title="Experience & Portfolio"
                    score={100}
                    max={150}
                    weight="Weightage: 15% of ATX"
                    icon={Briefcase}
                    subMetrics={[
                        { label: "Summer Internship", score: 40, color: "bg-tropicalTeal" },
                        { label: "Open Source", score: 35, color: "bg-tropicalTeal" },
                        { label: "Hackathons", score: 25, color: "bg-tropicalTeal" },
                    ]}
                />
            </div>

            {/* Bottom Recommendation */}
            <div className="p-8 rounded-[32px] bg-tropicalTeal/[0.03] border border-tropicalTeal/10 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-tropicalTeal/[0.05] transition-all duration-500">
                <div className="max-w-xl">
                    <h3 className="text-xl font-black text-gray-900 mb-2">Ready to boost your ATX Score?</h3>
                    <p className="text-sm text-gray-500 font-medium">
                        Our AI engine recommends completing the 'Advanced System Design' course to gain the remaining 85 points for Platinum Tier.
                    </p>
                </div>
                <Button className="h-14 px-10 bg-[#00f2ea] text-tropicalTeal font-black rounded-3xl shadow-xl shadow-[#00f2ea]/20 gap-3 hover:scale-105 transition-transform group-hover:bg-[#00ffd9]">
                    Go to Learning Path
                    <ChevronRight size={20} />
                </Button>
            </div>
        </div>
    );
}
