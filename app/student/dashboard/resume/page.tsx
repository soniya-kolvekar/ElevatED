"use client";
import { useAuthStore } from "@/store/useAuthStore";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    FileText,
    RefreshCcw,
    Download,
    CheckCircle2,
    Sparkles,
    BarChart3,
    Activity
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";

export default function ResumeAnalysisPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const data = getStudentDashboardData(user);

    const handleDownloadJson = () => {
        if (!user?.resumeData) return;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user.resumeData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "parsed_resume.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    // Attempt to extract numeric impact from projects for the Impact Card
    const getProjectImpacts = () => {
        const defaultImpacts = [
            { label: "PROJECT METRICS", value: "Available" },
            { label: "QUANTIFIABLE", value: "Yes" }
        ];

        if (!data.projects || data.projects.length === 0) return defaultImpacts;

        const metrics: { label: string, value: string }[] = [];
        data.projects.forEach(p => {
            if (p.impact) {
                // Look for percentages
                const percentMatch = p.impact.match(/(\d+)%/);
                if (percentMatch) metrics.push({ label: "IMPACT FACTOR", value: `${percentMatch[1]}%` });

                // Look for mutlipliers (e.g. 10x, 2x)
                const multiplierMatch = p.impact.match(/(\d+)x/i);
                if (multiplierMatch) metrics.push({ label: "SCALE MULTIPLIER", value: `${multiplierMatch[1]}x` });

                // Look for standalone numbers like 100k
                const numMatch = p.impact.match(/(\d+[kKmM+])/);
                if (numMatch && !percentMatch && !multiplierMatch) metrics.push({ label: "USER BASE / SCALE", value: numMatch[1] });
            }
        });

        // Dedup or limit
        const unique = Array.from(new Set(metrics.map(m => m.value))).map(v => metrics.find(m => m.value === v)!);

        if (unique.length === 0) {
            return [
                { label: "PROJECTS DETECTED", value: data.projects.length.toString() },
                { label: "MEASURABLE IMPACT", value: "Review Info" }
            ];
        }

        return unique.slice(0, 3); // Max 3 impacts to display
    };

    const projectImpacts = getProjectImpacts();

    return (
        <div className="space-y-8 pb-12 bg-[#f8f6f0] min-h-screen pt-4 px-4 md:px-0 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        <span className="cursor-pointer">Dashboard</span>
                        <span>›</span>
                        <span className="text-[#4a7c59]">Resume Analysis</span>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Intelligence Detailed View</h1>
                    <p className="text-sm text-[#4a7c59] font-bold mt-1">Deep analysis of candidate profile: {user?.name || "User"}</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        className="flex-1 md:flex-none h-11 px-6 rounded-full border-none bg-[#4a7c59] text-white hover:bg-[#3d664a] font-bold gap-2 shadow-sm transition-colors"
                        onClick={() => router.push('/student/dashboard/insights?update=true')}
                    >
                        <RefreshCcw size={16} /> Re-upload
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 md:flex-none h-11 px-6 rounded-full border border-gray-200 text-[#4a7c59] bg-white font-bold gap-2 hover:bg-gray-50 shadow-sm transition-colors"
                        onClick={handleDownloadJson}
                    >
                        <Download size={16} /> Download Parsed JSON
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Left: Raw Resume Preview */}
                <div className="lg:col-span-5 relative">
                    <Card className="p-0 overflow-hidden flex flex-col border border-gray-100 bg-white rounded-[32px] shadow-sm relative min-h-[800px]">
                        <div className="p-6 flex items-center justify-between border-b border-gray-50">
                            <div className="flex items-center gap-2 text-[#4a7c59]">
                                <FileText size={18} />
                                <h3 className="text-sm font-black text-[#4a7c59]">Raw Resume Preview</h3>
                            </div>
                            <div className="px-3 py-1 bg-[#4a7c59] rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                PARSING ACTIVE
                            </div>
                        </div>

                        <div className="flex-1 p-8 px-10 relative">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{user?.name || "Candidate Name"}</h2>
                            <p className="text-sm text-gray-500 mt-1 mb-8">{user?.resumeData?.domain || "Software Professional"}</p>

                            <div className="space-y-8">
                                {/* Auto-Summary based on AI Advice */}
                                <section>
                                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Professional Summary</h4>
                                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                        {data.aiAdvice || "Awaiting AI interpretation of candidate profile."}
                                    </p>
                                </section>

                                <section>
                                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Experience</h4>
                                    <div className="space-y-6">
                                        {data.experiences.map((exp, idx) => (
                                            <div key={idx} className="relative">
                                                <h5 className="text-[13px] font-black text-gray-900">{exp.role} - {exp.company}</h5>
                                                <p className="text-[10px] text-gray-400 font-bold mb-2">{exp.duration}</p>
                                                <ul className="list-disc pl-4 space-y-1.5 text-gray-600 text-xs font-medium">
                                                    <li>{exp.description}</li>
                                                    {/* In a real scenario you would map bullet points, but currently API returns 1 string description */}
                                                </ul>
                                            </div>
                                        ))}
                                        {data.experiences.length === 0 && (
                                            <p className="text-xs text-gray-400 italic">No experience found in resume.</p>
                                        )}
                                    </div>
                                </section>

                                <section>
                                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Projects</h4>
                                    <div className="space-y-4">
                                        {data.projects.map((proj, idx) => (
                                            <div key={idx} className="relative">
                                                <h5 className="text-[13px] font-black text-gray-900">{proj.name}</h5>
                                                <p className="text-xs text-gray-600 mt-1 mb-1 font-medium">{proj.description}</p>
                                                {proj.impact && <p className="text-[10px] text-[#4a7c59] font-bold">• {proj.impact}</p>}
                                            </div>
                                        ))}
                                        {data.projects.length === 0 && (
                                            <p className="text-xs text-gray-400 italic">No projects found in resume.</p>
                                        )}
                                    </div>
                                </section>
                            </div>

                            <div className="mt-16 pt-8 border-t border-dashed border-gray-200 text-center">
                                <p className="text-[10px] font-bold text-gray-300 italic">End of extracted content preview</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right: Intelligence Breakdown */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Extracted Skills Map */}
                    <Card className="p-8 border-none bg-white rounded-[32px] shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <CheckCircle2 size={24} className="text-[#5fb896]" />
                            <h3 className="text-lg font-black text-gray-900">Extracted Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {data.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 bg-[#f0f7f4] text-[#4a7c59] border border-[#d9ecd] rounded-full text-xs font-bold"
                                >
                                    {skill.name}
                                </span>
                            ))}
                            {data.skills.length === 0 && (
                                <p className="text-xs text-gray-400">No specific skills parsed.</p>
                            )}
                        </div>
                    </Card>

                    {/* Timeline */}
                    <Card className="p-8 border-none bg-white rounded-[32px] shadow-sm">
                        <div className="flex items-center gap-2 mb-8">
                            <Activity size={24} className="text-[#a5c3af]" />
                            <h3 className="text-lg font-black text-gray-900">Experience Timeline</h3>
                        </div>
                        <div className="space-y-8 pl-2 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-100 before:to-transparent">
                            {data.experiences.map((exp, idx) => (
                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-[#a5c3af] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] pb-4 md:pb-0">
                                        <div className="flex flex-col md:group-odd:text-right group-odd:items-start md:group-odd:items-end group-even:items-start group-odd:pr-0 md:group-odd:pr-8 group-even:pl-4 md:group-even:pl-8">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-sm font-black text-gray-900">{exp.company}</h4>
                                                {idx === 0 && <span className="text-[8px] bg-[#f0f7f4] text-[#4a7c59] px-2 py-0.5 rounded-sm font-black tracking-widest uppercase">Latest</span>}
                                            </div>
                                            <div className="text-xs font-bold text-[#4a7c59] mb-1">{exp.role}</div>
                                            <div className="text-[10px] text-gray-400 font-bold mb-2">{exp.duration}</div>
                                            <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[90%] line-clamp-2 md:group-odd:text-right text-left">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {data.experiences.length === 0 && (
                                <p className="text-xs text-gray-400 italic">No timeline data available.</p>
                            )}
                        </div>
                    </Card>

                    {/* Project Impact */}
                    <Card className="p-8 border-none bg-white rounded-[32px] shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <BarChart3 size={24} className="text-[#4a7c59]" />
                            <h3 className="text-lg font-black text-gray-900">Project Impact</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {projectImpacts.map((impact, idx) => (
                                <div key={idx} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{impact.label}</p>
                                    <p className="text-2xl font-black text-[#4a7c59]">{impact.value}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* AI Suggestions Box */}
                    <Card className="p-8 border-none bg-[#a5c3af]/20 rounded-[32px] overflow-hidden relative group">
                        <div className="flex items-center gap-2 mb-6 relative z-10">
                            <div className="w-8 h-8 rounded-full bg-[#4a7c59] flex items-center justify-center text-white shrink-0">
                                <Sparkles size={16} fill="currentColor" />
                            </div>
                            <div>
                                <h3 className="text-base font-black text-[#3d664a] leading-none">AI Suggestions</h3>
                                <p className="text-[10px] text-[#4a7c59] font-bold uppercase tracking-widest mt-1">How to optimize your resume</p>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {data.aiSuggestions.map((suggestion, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <CheckCircle2 size={16} className="text-[#4a7c59] shrink-0 mt-0.5" />
                                    <p className="text-xs text-[#3d664a] font-medium leading-relaxed">
                                        {suggestion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
