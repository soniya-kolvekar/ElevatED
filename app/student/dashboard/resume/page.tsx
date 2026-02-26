"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
    FileText,
    RefreshCcw,
    Download,
    ShieldCheck,
    Zap,
    AlertCircle,
    CheckCircle2,
    Briefcase,
    Milestone,
    History
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";

export default function ResumeAnalysisPage() {
    const { user } = useAuthStore();
    const data = getStudentDashboardData(user);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        <span className="hover:text-jungle cursor-pointer">Dashboard</span>
                        <span>/</span>
                        <span className="text-jungle">Resume Analysis</span>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 leading-none">Intelligence Detailed View</h1>
                    <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-tight">Deep analysis of candidate profile: {user?.name}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-6 rounded-xl border-emerald-600/20 text-emerald-700 bg-emerald-50/50 font-bold gap-2 hover:bg-emerald-100/50">
                        <RefreshCcw size={16} /> Re-upload
                    </Button>
                    <Button variant="outline" className="h-11 px-6 rounded-xl border-gray-100 text-gray-600 font-bold gap-2 hover:bg-gray-50">
                        <Download size={16} /> Download Parsed JSON
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                {/* Left: Raw Resume Preview */}
                <div className="lg:col-span-5 h-full">
                    <Card className="p-0 overflow-hidden flex flex-col h-[800px]">
                        <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <FileText size={16} />
                                </div>
                                <h3 className="text-sm font-black text-gray-900">Raw Resume Preview</h3>
                            </div>
                            <div className="flex items-center gap-2 px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                                <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest">Parsing Active</span>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30 custom-scrollbar">
                            <div className="max-w-[440px] mx-auto bg-white p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 min-h-[600px]">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                                <p className="text-xs text-gray-500 font-bold border-b border-gray-100 pb-4 mb-6">Senior Full-stack Developer | New York, NY</p>

                                <div className="space-y-6">
                                    <section>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Professional Summary</h4>
                                        <p className="text-[11px] text-gray-700 leading-relaxed">
                                            Results-oriented software engineer with <span className="bg-yellow-100 font-bold">6+ years of experience</span> in building scalable web applications. Expert in <span className="bg-emerald-100">React, Node.js, and Cloud Infrastructure</span>. Proven track record of reducing latency by <span className="text-emerald-600 font-bold underline">40%</span> for enterprise clients.
                                        </p>
                                    </section>

                                    <section>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Experience</h4>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <p className="text-[11px] font-black text-gray-900">Lead Developer - TechFlow Systems</p>
                                                    <span className="text-[9px] font-bold text-gray-400 italic">2020 - Present</span>
                                                </div>
                                                <ul className="list-disc list-inside space-y-1 mt-2">
                                                    <li className="text-[10px] text-gray-600">Architected a microservices-based platform using <span className="bg-emerald-50 border border-emerald-100 px-1 rounded">AWS Lambda</span>.</li>
                                                    <li className="text-[10px] text-gray-600">Mentored a team of 8 junior developers.</li>
                                                    <li className="text-[10px] text-gray-600">Implemented <span className="text-emerald-600 font-bold underline">CI/CD pipelines</span> reducing deployment time.</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <p className="text-[11px] font-black text-gray-900">Software Engineer - InnovateHQ</p>
                                                    <span className="text-[9px] font-bold text-gray-400 italic">2018 - 2020</span>
                                                </div>
                                                <ul className="list-disc list-inside space-y-1 mt-2">
                                                    <li className="text-[10px] text-gray-600">Developed responsive UI using <span className="bg-blue-50 border border-blue-100 px-1 rounded">Tailwind CSS</span>.</li>
                                                    <li className="text-[10px] text-gray-600">Integrated <span className="bg-emerald-50 border border-emerald-100 px-1 rounded">Stripe API</span> for global payments.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Education</h4>
                                        <div>
                                            <p className="text-[11px] font-black text-gray-900">B.S. Computer Science</p>
                                            <p className="text-[10px] text-gray-500 font-medium italic">University of Texas at Austin, 2017</p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right: Analysis & Extracted Data */}
                <div className="lg:col-span-7 space-y-6">
                    {/* ATX Score Badge */}
                    <div className="flex justify-end mb-4">
                        <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-soft">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ATX Score</span>
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-3xl font-black text-jungle">84</span>
                                <span className="text-sm font-black text-gray-300">/100</span>
                            </div>
                        </div>
                    </div>

                    {/* Extracted Skills */}
                    <Card>
                        <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-3">
                            <ShieldCheck className="text-emerald-500" size={18} /> Extracted Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {["React.js", "Node.js", "TypeScript", "AWS Lambda", "PostgreSQL", "Tailwind CSS", "GraphQL", "Docker", "CI/CD"].map((skill) => (
                                <div key={skill} className="px-4 py-2 bg-emerald-50/50 text-emerald-800 border border-emerald-600/10 rounded-xl text-[11px] font-bold">
                                    {skill}
                                </div>
                            ))}
                            <div className="px-4 py-2 bg-gray-50 text-gray-400 border border-gray-100 rounded-xl text-[11px] font-bold">
                                +4 More
                            </div>
                        </div>
                    </Card>

                    {/* Experience Timeline */}
                    <Card>
                        <h3 className="text-sm font-black text-gray-900 mb-8 flex items-center gap-3">
                            <History className="text-tropicalTeal" size={18} /> Experience Timeline
                        </h3>
                        <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-tropicalTeal before:to-gray-100">
                            {data.experiences.map((exp, i) => (
                                <div key={exp.role} className="relative group">
                                    <div className={cn(
                                        "absolute -left-8 top-1.5 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center transition-all",
                                        exp.current ? "bg-emerald-500 shadow-lg shadow-emerald-500/30 w-7 h-7 -left-[34px]" : "bg-gray-200"
                                    )} />
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-black text-gray-900">{exp.role}</h4>
                                        {exp.current && (
                                            <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 tracking-[0.1em] uppercase">Current</span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mb-2">{exp.company} • {exp.duration}</p>
                                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Project Impact */}
                    <Card>
                        <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-3">
                            <Briefcase className="text-amber-500" size={18} /> Project Impact
                        </h3>
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { label: "Latency Reduction", value: "40%", color: "text-emerald-600" },
                                { label: "Team Size Led", value: "8+", color: "text-tropicalTeal" },
                                { label: "Deploy Frequency", value: "Daily", color: "text-jungle" },
                            ].map((stat) => (
                                <div key={stat.label} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col items-center">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
                                    <span className={cn("text-2xl font-black", stat.color)}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* AI Suggestions */}
                    <Card className="bg-jungle/[0.02] border-jungle/10">
                        <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-jungle text-white flex items-center justify-center shadow-lg shadow-jungle/20">
                                <Zap size={16} fill="white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-gray-900 leading-none">AI Suggestions</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">How to improve ATX Score</p>
                            </div>
                        </h3>
                        <div className="space-y-4">
                            {data.aiSuggestions.map((suggestion, i) => {
                                const [title, body] = suggestion.split(':');
                                return (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 group transition-all hover:border-jungle/20">
                                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                            <CheckCircle2 size={12} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-black text-gray-900 leading-tight">
                                                {title}{title.includes('?') ? '' : ':'}
                                            </p>
                                            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                                                {body || title}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
