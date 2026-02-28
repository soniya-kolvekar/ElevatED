"use client";

import { jsPDF } from "jspdf";

import { useAuthStore } from "@/store/useAuthStore";
import { ResumeUpload } from "@/components/student/ResumeUpload";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
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
    Trophy,
    X
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";

function DashboardContent() {
    const { user } = useAuthStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isUpdating = searchParams.get('update') === 'true';

    if (!user) return null;

    const data = getStudentDashboardData(user);

    const generateReport = () => {
        if (!user) return;
        const doc = new jsPDF();
        const timestamp = new Date().toLocaleDateString();

        // Header
        doc.setFillColor(74, 124, 89); // Jungle Green
        doc.rect(0, 0, 210, 40, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("ElevatED Readiness Report", 20, 25);
        doc.setFontSize(10);
        doc.text(`Generated on: ${timestamp}`, 150, 25);

        // Profile Section
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text("Candidate Profile", 20, 55);
        doc.setLineWidth(0.5);
        doc.line(20, 58, 65, 58);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Name: ${user.name}`, 20, 68);
        doc.text(`Domain: ${user.resumeData?.domain || "General"}`, 20, 76);
        doc.text(`ATX Score: ${data.atxScore} / 1000`, 20, 84);
        doc.text(`Current Tier: ${data.tier}`, 20, 92);

        // Skills Section
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Top Technical Skills", 20, 110);
        doc.setLineWidth(0.5);
        doc.line(20, 113, 75, 113);

        let skillY = 123;
        data.skills.slice(0, 8).forEach(skill => {
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.text(`${skill.name}`, 20, skillY);
            doc.text(`${skill.score}%`, 100, skillY);
            skillY += 8;
        });

        // Projects Section
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Key Projects & Impact", 20, skillY + 10);
        doc.setLineWidth(0.5);
        doc.line(20, skillY + 13, 80, skillY + 13);

        let projectY = skillY + 23;
        data.projects.slice(0, 3).forEach(project => {
            if (projectY > 270) { doc.addPage(); projectY = 20; }
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(`${project.name}`, 20, projectY);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            const splitDesc = doc.splitTextToSize(project.description, 170);
            doc.text(splitDesc, 20, projectY + 6);
            projectY += (splitDesc.length * 5) + 8;
            doc.setTextColor(74, 124, 89);
            doc.text(`Impact: ${project.impact}`, 20, projectY);
            doc.setTextColor(0, 0, 0);
            projectY += 10;
        });

        // Footer
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text("ElevatED AI Career Strategist - Strictly Confidential", 20, 285);
            doc.text(`Page ${i} of ${pageCount}`, 170, 285);
        }

        doc.save(`${user.name.replace(/\s+/g, '_')}_Readiness_Report.pdf`);
    };

    const hasResume = !!user.resumeUrl;

    if (!hasResume || isUpdating) {
        return (
            <div className="min-h-screen bg-[#f8f6f0] p-8 flex flex-col items-center justify-center text-center">
                <div className="max-w-2xl w-full space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                {isUpdating ? "Update Your" : "Personalize Your"} <span className="text-jungle">Future</span>.
                            </h1>
                            {isUpdating && (
                                <button
                                    onClick={() => router.push('/student/dashboard/insights')}
                                    className="p-2 bg-white rounded-full shadow-soft hover:bg-red-50 hover:text-red-500 transition-all"
                                    title="Cancel Update"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                        <p className="text-lg text-gray-600">
                            {isUpdating
                                ? "Refine your profile with a new resume, GitHub, or Portfolio to get updated AI insights."
                                : "Upload your resume to unlock your AI-powered ATX score, skills analysis, and smart company matching."}
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
                            <div className="text-2xl font-bold text-emerald-600">Instant</div>
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
                <Button
                    variant="outline"
                    className="bg-white border-gray-100 text-gray-600 gap-2 h-11 px-6 rounded-xl hover:bg-gray-50"
                    onClick={generateReport}
                >
                    <Download className="w-4 h-4" />
                    Download Readiness Report
                </Button>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current XP Card */}
                <Card className="relative overflow-hidden group flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Trophy size={120} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 mb-2">Current XP</p>
                        <div className="flex items-baseline gap-2 mb-1">
                            <h2 className="text-4xl font-black text-gray-900">{data.xp.toLocaleString()}</h2>
                            <span className="text-sm font-bold text-jungle">+{data.atxScoreDelta * 240} this month</span>
                        </div>
                    </div>

                    <div className="space-y-2 mt-8">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[11px] font-bold text-gray-900">XP to Platinum Tier</span>
                            <span className="text-[11px] font-black text-gray-900">{Math.round((data.xp / data.xpToNextTier) * 100)}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-jungle rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(data.xp / data.xpToNextTier) * 100}%` }}
                                transition={{ duration: 1 }}
                            />
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
                                <span className="text-[10px] font-black uppercase tracking-tighter">UP 0</span>
                            </div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Campus</p>
                        </div>
                        <div className="bg-emerald-500/5 rounded-xl p-3 border border-emerald-500/10">
                            <div className="flex items-center gap-1 text-emerald-600 mb-0.5">
                                <ArrowUpRight className="w-3 h-3" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">UP 0</span>
                            </div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">National</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Charts & Skills */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Readiness Growth Chart */}
                    <Card>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-black text-gray-900 leading-none">Readiness Growth</h3>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last 6 Months</div>
                        </div>

                        <div className="h-[240px] w-full">
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
                                        cursor={{ fill: 'transparent' }}
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
                                        radius={[8, 8, 0, 0]}
                                        barSize={44}
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

                    {/* Skill Gap Analysis */}
                    <Card>
                        <h3 className="text-lg font-black text-gray-900 mb-6">Skill Gap Analysis</h3>
                        <div className="space-y-6">
                            {data.skills.map((skill) => (
                                <div key={skill.name} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <p className="text-sm font-bold text-gray-800">{skill.name}</p>
                                        <span className={cn(
                                            "text-sm font-black",
                                            skill.needsImprovement ? "text-orange-500" : "text-jungle"
                                        )}>{skill.score}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
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
                                    {skill.needsImprovement && (
                                        <p className="text-[10px] text-orange-500 font-bold mt-1">
                                            + Needs improvement for High-Match roles
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column - Recommended Companies */}
                <Card className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-gray-900 leading-none">Recommended Companies</h3>
                        <button className="text-[10px] font-bold text-jungle uppercase tracking-widest hover:underline">View All</button>
                    </div>

                    <div className="space-y-8 flex-1">
                        {data.recommendedCompanies.map((company) => (
                            <div key={company.name} className="flex gap-4 group min-w-0">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Building2 className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
                                    <div className="flex items-start justify-between min-w-0">
                                        <div className="min-w-0 flex-1 pr-3">
                                            <h4 className="text-sm font-bold text-gray-900 truncate">{company.name}</h4>
                                            <p className="text-[10px] text-gray-400 font-bold truncate mt-0.5">{company.role}</p>
                                        </div>
                                        <span className="text-[9px] font-black text-jungle uppercase shrink-0 pt-0.5">{company.match}% Match</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
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
            
        </div>
    );
}

export default function StudentInsights() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#f8f6f0] p-8 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-jungle border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-bold animate-pulse">GENERATING INTELLIGENCE...</p>
                </div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
