"use client";

import { jsPDF } from "jspdf";
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
    Circle,
    Code,
    User,
    GraduationCap,
    Briefcase,
    Leaf,
    LayoutTemplate,
    Rocket,
    Plus,
    Github
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";

// --- Sub-components ---

const MilestoneItem = ({ checked, title, desc }: { checked: boolean; title: string; desc: string }) => (
    <div className="flex gap-4">
        <div className="mt-1">
            {checked ? (
                <CheckCircle2 size={18} className="text-jungle fill-jungle/10" />
            ) : (
                <Circle size={18} className="text-gray-300" />
            )}
        </div>
        <div>
            <h4 className={cn("text-sm font-bold", checked ? "text-gray-900" : "text-gray-600")}>{title}</h4>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">{desc}</p>
        </div>
    </div>
);

const SectionHeader = ({ icon: Icon, title, score, max, weight }: any) => (
    <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f4f1e1] text-jungle flex items-center justify-center shrink-0">
                <Icon size={20} />
            </div>
            <div>
                <h4 className="text-base font-black text-gray-900 leading-tight">{title}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Weightage: {weight}</p>
            </div>
        </div>
        <div className="text-right shrink-0">
            <span className="text-2xl font-black text-jungle">{score} </span>
            <span className="text-sm font-bold text-gray-400">/ {max}</span>
        </div>
    </div>
);

const ProgressBar = ({ label, score }: { label: string; score: number }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight text-gray-600">
            <span>{label}</span>
            <span className="text-gray-900">{score}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-[#4a7c59] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1 }}
            />
        </div>
    </div>
);

// --- Main Page Component ---

export default function ATXPage() {
    const { user } = useAuthStore();
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

    // Calculate categorical scores, normalizing sum to data.atxScore
    const rawTech = data.atxBreakdown?.technical || Math.round((data.skills.reduce((acc, s) => acc + s.score, 0) / (data.skills.length || 1)) || 75);
    const rawSoft = data.atxBreakdown?.softSkills || user?.resumeData?.analyticalThinkingScore || 80;
    const rawAcad = data.atxBreakdown?.academic || Math.round((user?.cgpa || 8.5) * 10);

    let t = Math.round((rawTech / 100) * 400);
    let s = Math.round((rawSoft / 100) * 250);
    let a = Math.round((rawAcad / 100) * 200);
    let e = data.atxScore - (t + s + a);

    if (e < 0) { t += e; e = 0; }
    else if (e > 150) { t += (e - 150); e = 150; }

    // Enforce max bounds explicitly just to be extremely safe, keeping the total balanced out if something maxes
    t = Math.min(t, 400);
    s = Math.min(s, 250);
    a = Math.min(a, 200);
    e = Math.min(e, 150);

    const overallPct = (data.atxScore / 10).toFixed(1);

    return (
        <div className="space-y-12 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="max-w-xl">
                    <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Detailed ATX Score Breakdown</h1>
                    <p className="text-gray-600 font-medium leading-relaxed">
                        Advanced Talent Index (ATX) uses AI to benchmark your technical proficiency
                        and behavioral traits against industry standards.
                    </p>
                </div>
                <Button
                    className="bg-[#4a7c59] text-white font-bold px-6 py-6 rounded-2xl gap-2 hover:bg-[#4a7c59]/90 shrink-0 shadow-lg"
                    onClick={generateReport}
                >
                    <Download size={18} /> Download Report
                </Button>
            </div>

            {/* Top Cards Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Score Summary Card */}
                <Card className="lg:col-span-2 p-8 border border-gray-100 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-[#4a7c59] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{data.tier} TIER</span>
                            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Top {((1000 - data.atxScore) / 10).toFixed(1)}% of Candidates</span>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <h2 className="text-6xl font-black text-gray-900 tracking-tighter">{data.atxScore}</h2>
                            <span className="text-gray-400 font-bold text-xl">/ 1000</span>
                        </div>

                        <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
                            Great job! You are just <span className="font-bold text-gray-900">{Math.max(0, 950 - data.atxScore)} points</span> away from reaching the <span className="font-bold text-gray-900">Platinum Tier</span>. This will unlock exclusive opportunities with top-tier partners.
                        </p>

                        <Button variant="outline" className="gap-2 font-bold text-[#4a7c59] border-[#4a7c59]/20 hover:bg-[#4a7c59]/5 rounded-xl px-5 shadow-sm">
                            <Share2 size={16} /> Share Achievement
                        </Button>
                    </div>

                    <div className="w-56 h-56 md:w-64 md:h-64 bg-[#f4f1e1] rounded-3xl flex flex-col items-center justify-center shrink-0 p-6 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { value: data.atxScore },
                                        { value: 1000 - data.atxScore }
                                    ]}
                                    innerRadius={65}
                                    outerRadius={85}
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell fill="#4a7c59" />
                                    <Cell fill="#e5dfc5" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            <span className="text-3xl font-black text-[#4a7c59]">{overallPct}%</span>
                            <span className="text-[9px] font-black text-[#4a7c59]/60 uppercase tracking-widest mt-1">Overall Proficiency</span>
                        </div>
                    </div>
                </Card>

                {/* Path to Platinum Card */}
                <Card className="p-8 border border-gray-100 rounded-[2rem] shadow-sm flex flex-col h-full">
                    <h3 className="text-lg font-black text-gray-900 mb-8">Path to Platinum</h3>
                    <div className="space-y-6 flex-1">
                        <MilestoneItem
                            checked={true}
                            title="Technical Foundation"
                            desc="Achieved 90+ in Core Subjects"
                        />
                        <MilestoneItem
                            checked={true}
                            title="Coding Proficiency"
                            desc={`Solved ${data.skills.length ? data.skills.length * 20 : 200}+ LeetCode problems`}
                        />
                        <MilestoneItem
                            checked={false}
                            title="Project Portfolio"
                            desc="Complete 1 more full-stack project"
                        />
                        <MilestoneItem
                            checked={false}
                            title="Soft Skills Mock"
                            desc="Score 8.5 in next mock interview"
                        />
                    </div>
                    <div className="mt-8 text-center">
                        <button className="text-[10px] font-black text-jungle uppercase tracking-widest hover:underline">
                            View All Milestones
                        </button>
                    </div>
                </Card>
            </div>

            {/* Detailed Metric Analysis */}
            <div>
                <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Detailed Metric Analysis</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Technical Proficiency */}
                    <Card className="p-8 border border-gray-100 rounded-[2rem] shadow-sm flex flex-col">
                        <SectionHeader icon={Code} title="Technical Proficiency" score={t} max={400} weight="40% of ATX" />
                        <div className="space-y-5 mt-auto">
                            <ProgressBar label={data.skills[0]?.name || "Data Structures & Algos"} score={data.skills[0]?.score || 92} />
                            <ProgressBar label={data.skills[1]?.name || "System Design"} score={data.skills[1]?.score || 75} />
                            <ProgressBar label={data.skills[2]?.name || "Database Management"} score={data.skills[2]?.score || 88} />
                        </div>
                    </Card>

                    {/* Soft Skills */}
                    <Card className="p-8 border border-gray-100 rounded-[2rem] shadow-sm flex flex-col">
                        <SectionHeader icon={User} title="Soft Skills" score={s} max={250} weight="25% of ATX" />
                        <div className="space-y-5 mt-auto">
                            <ProgressBar label="Communication" score={Math.round(rawSoft * 1.05 > 100 ? 100 : rawSoft * 1.05)} />
                            <ProgressBar label="Team Collaboration" score={Math.round(rawSoft * 0.9)} />
                            <ProgressBar label="Problem Solving Mindset" score={Math.round(rawSoft)} />
                        </div>
                    </Card>

                    {/* Academic Excellence */}
                    <Card className="p-8 border border-gray-100 rounded-[2rem] shadow-sm flex flex-col">
                        <SectionHeader icon={GraduationCap} title="Academic Excellence" score={a} max={200} weight="20% of ATX" />

                        <div className="grid grid-cols-3 gap-3 mt-auto mb-4">
                            <div className="bg-[#fcfaf5] border border-[#f4f1e1] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">CGPA</span>
                                <span className="text-lg font-black text-jungle">{user?.cgpa || 9.1}</span>
                            </div>
                            <div className="bg-[#fcfaf5] border border-[#f4f1e1] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Consistency</span>
                                <span className="text-lg font-black text-jungle">{(data.consistencyScore || 0) > 80 ? "High" : "Good"}</span>
                            </div>
                            <div className="bg-[#fcfaf5] border border-[#f4f1e1] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Top %</span>
                                <span className="text-lg font-black text-jungle">Top {Math.max(1, Math.round(100 - (a / 200) * 100))}%</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 italic text-center">
                            Calculated across past semesters in {user?.branch || "Computer Science Engineering"}
                        </p>
                    </Card>

                    {/* Experience & Portfolio */}
                    <Card className="p-8 border border-gray-100 rounded-[2rem] shadow-sm flex flex-col">
                        <SectionHeader icon={Briefcase} title="Experience & Portfolio" score={e} max={150} weight="15% of ATX" />

                        <div className="space-y-3 mt-auto">
                            {data.experiences.length > 0 && (
                                <div className="flex justify-between items-center p-3 rounded-xl border border-jungle/10 bg-jungle/5">
                                    <div className="flex items-center gap-3 min-w-0 pr-3">
                                        <Rocket size={14} className="text-jungle shrink-0" />
                                        <span className="text-xs font-bold text-gray-900 truncate">{data.experiences[0].role}</span>
                                    </div>
                                    <span className="text-xs font-black text-jungle shrink-0">+{(e * 0.5).toFixed(0)} pts</span>
                                </div>
                            )}
                            {data.projects.length > 0 && (
                                <div className="flex justify-between items-center p-3 rounded-xl border border-jungle/10 bg-jungle/5">
                                    <div className="flex items-center gap-3 min-w-0 pr-3">
                                        <Github size={14} className="text-jungle shrink-0" />
                                        <span className="text-xs font-bold text-gray-900 truncate">{data.projects[0].name}</span>
                                    </div>
                                    <span className="text-xs font-black text-jungle shrink-0">+{(e * 0.35).toFixed(0)} pts</span>
                                </div>
                            )}
                            {(!data.experiences.length || !data.projects.length) && (
                                <div className="flex justify-between items-center p-3 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3 min-w-0 pr-3">
                                        <Plus size={14} className="text-gray-400 shrink-0" />
                                        <span className="text-xs font-bold text-gray-400 truncate">Add More Experience</span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-300 italic shrink-0">Up to +25 pts</span>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            
        </div>
    );
}
