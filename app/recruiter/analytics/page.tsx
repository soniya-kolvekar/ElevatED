"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import { Card } from "@/components/ui/Card";
import {
    BarChart3,
    TrendingUp,
    Users,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Download,
    Calendar,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const pipelineData = [
    { name: 'Applied', value: 1284, color: '#94a3b8' },
    { name: 'Screening', value: 856, color: '#64748b' },
    { name: 'Shortlisted', value: 242, color: '#10b981' },
    { name: 'Interviewing', value: 86, color: '#059669' },
    { name: 'Offered', value: 12, color: '#047857' },
];

const trendData = [
    { name: 'Jan', atx: 620, applications: 400 },
    { name: 'Feb', atx: 650, applications: 450 },
    { name: 'Mar', atx: 640, applications: 600 },
    { name: 'Apr', atx: 680, applications: 800 },
    { name: 'May', atx: 720, applications: 1100 },
    { name: 'Jun', atx: 742, applications: 1284 },
];

const skillData = [
    { name: 'Frontend', score: 85 },
    { name: 'Backend', score: 72 },
    { name: 'DevOps', score: 45 },
    { name: 'AI/ML', score: 68 },
    { name: 'Design', score: 40 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function RecruiterAnalytics() {
    return (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Recruitment Intelligence</h1>
                    <p className="text-gray-400 font-medium mt-1">Deep dive into candidate quality and hiring efficiency.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-gray-100 text-gray-600 font-bold px-5">
                        <Calendar className="w-4 h-4 mr-2" /> Last 6 Months
                    </Button>
                    <Button className="rounded-xl bg-jungle hover:bg-[#3d5a4d] text-white shadow-soft font-bold px-6">
                        <Download className="w-4 h-4 mr-2" /> Download Report
                    </Button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
                {[
                    { label: "Hire Rate", val: "4.2%", trend: "+0.8%", up: true },
                    { label: "Avg. Time to Hire", val: "18 Days", trend: "-2 Days", up: true },
                    { label: "Cost Per Hire", val: "$1,240", trend: "+5.2%", up: false },
                    { label: "Quality of Hire", val: "8.8/10", trend: "+1.2%", up: true },
                ].map((stat, i) => (
                    <Card key={i} className="p-6 border-none shadow-soft">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-black text-gray-900 leading-none">{stat.val}</h3>
                            <div className={cn(
                                "flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-lg",
                                stat.up ? "text-jungle bg-jungle/5" : "text-red-500 bg-red-50/50"
                            )}>
                                {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                {stat.trend}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Hiring Pipeline Funnel */}
                <Card className="p-8 border-none shadow-premium">
                    <div className="mb-8">
                        <h4 className="text-xl font-black text-gray-900">Conversion Pipeline</h4>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Application to Offer Journey</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pipelineData} layout="vertical" margin={{ left: 40, right: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 800 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[0, 8, 8, 0]}
                                    barSize={32}
                                >
                                    {pipelineData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* ATX Trend Over Time */}
                <Card className="p-8 border-none shadow-premium bg-[#f8fafc]">
                    <div className="mb-8">
                        <h4 className="text-xl font-black text-gray-900">Talent Index Trend</h4>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Avg. ATX Score vs Application Volume</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorAtx" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }} />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="atx"
                                    stroke="#10b981"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorAtx)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Skill Strength Distribution */}
                <Card className="p-8 border-none shadow-premium lg:col-span-2">
                    <div className="mb-8">
                        <h4 className="text-xl font-black text-gray-900">Competency Heatmap</h4>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Performance across key technical domains</p>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={skillData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }}
                                />
                                <YAxis hide />
                                <Tooltip />
                                <Bar
                                    dataKey="score"
                                    fill="#4a6b5d"
                                    radius={[8, 8, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Status Breakdown Pie */}
                <Card className="p-8 border-none shadow-premium">
                    <div className="mb-4">
                        <h4 className="text-xl font-black text-gray-900">Current Distribution</h4>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Developer', value: 45 },
                                        { name: 'Designer', value: 15 },
                                        { name: 'Manager', value: 10 },
                                        { name: 'QA', value: 20 },
                                        { name: 'DevOps', value: 10 },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {COLORS.map((color, index) => (
                                        <Cell key={`cell-${index}`} fill={color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {['Developer', 'Designer', 'Manager', 'QA', 'DevOps'].map((label, i) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                <span className="text-[10px] font-black text-gray-500 uppercase">{label}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
