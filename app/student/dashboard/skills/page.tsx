"use client";
import React, { useState, useMemo } from "react";
import { useAuthStore } from "@/store/useAuthStore";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    PieChart, Pie, Cell, Tooltip
} from 'recharts';
import {
    Download,
    CheckCircle2,
    Circle,
    Route,
    ArrowRight,
    Play,
    ClipboardCheck,
    ChevronDown,
    FileText,
    TerminalSquare,
    CheckCircle
} from "lucide-react";
import { jsPDF } from "jspdf";
import { cn } from "@/lib/utils";

const ROLES_DATA: any = {
    "Software Engineer (L1)": {
        match: 65,
        radar: [
            { subject: 'TECHNICAL', current: 100, benchmark: 130, fullMark: 150 },
            { subject: 'CULTURAL', current: 120, benchmark: 110, fullMark: 150 },
            { subject: 'APTITUDE', current: 115, benchmark: 125, fullMark: 150 },
            { subject: 'SOFT SKILLS', current: 110, benchmark: 100, fullMark: 150 },
        ],
        criticalSkills: [
            { name: "Data Structures", met: true },
            { name: "Java/Python Core", met: true },
            { name: "System Design", met: false },
            { name: "Cloud Fundamentals", met: false }
        ],
        gaps: [
            { name: "NoSQL Databases", gap: "HIGH GAP", req: "Professional", cur: "Beginner", fill: 20 },
            { name: "Cloud Architecture", gap: "MED GAP", req: "Intermediate", cur: "Beginner", fill: 40 },
            { name: "System Design", gap: "MED GAP", req: "Advanced", cur: "Intermediate", fill: 50 },
            { name: "Unit Testing", gap: "LOW GAP", req: "Professional", cur: "Professional", fill: 90 },
        ],
        tip: "Focus on NoSQL as it impacts your ranking for 80% of current open roles.",
        roadmap: [
            {
                step: "STEP 01", title: "Course Recommendation", icon: <FileText size={20} className="text-[#a5c3af]" />,
                desc: "Complete the 'Modern NoSQL & Data Modeling' certified module on ElevatED Learn.", boost: "+10", actionIcon: <ArrowRight size={14} />
            },
            {
                step: "STEP 02", title: "Project Simulation", icon: <TerminalSquare size={20} className="text-[#a5c3af]" />,
                desc: "Engage in the 'E-commerce Scalability' sandboxed project to apply system design principles.", boost: "+15", actionIcon: <Play size={14} fill="currentColor" />
            },
            {
                step: "STEP 03", title: "Assessment", icon: <CheckCircle size={20} className="text-[#a5c3af]" />,
                desc: "Take the adaptive Software Engineering Benchmark v2.0 to update your ATX scoring.", boost: "+25", actionIcon: <ClipboardCheck size={14} />
            }
        ]
    },
    "Data Scientist": {
        match: 58,
        radar: [
            { subject: 'TECHNICAL', current: 80, benchmark: 140, fullMark: 150 },
            { subject: 'CULTURAL', current: 130, benchmark: 110, fullMark: 150 },
            { subject: 'APTITUDE', current: 140, benchmark: 130, fullMark: 150 },
            { subject: 'SOFT SKILLS', current: 100, benchmark: 100, fullMark: 150 },
        ],
        criticalSkills: [
            { name: "Python / R", met: true },
            { name: "SQL", met: true },
            { name: "Machine Learning Concepts", met: false },
            { name: "Deep Learning", met: false }
        ],
        gaps: [
            { name: "Machine Learning Concepts", gap: "HIGH GAP", req: "Advanced", cur: "Beginner", fill: 15 },
            { name: "Deep Learning", gap: "HIGH GAP", req: "Intermediate", cur: "None", fill: 5 },
            { name: "Data Visualization", gap: "MED GAP", req: "Professional", cur: "Intermediate", fill: 60 },
            { name: "Statistics", gap: "LOW GAP", req: "Professional", cur: "Advanced", fill: 85 },
        ],
        tip: "Strengthen ML Concepts to jumpstart your Data Science alignment by 15%.",
        roadmap: [
            {
                step: "STEP 01", title: "Theory Module", icon: <FileText size={20} className="text-[#a5c3af]" />,
                desc: "Start with 'Fundamentals of Machine Learning Models' on the learning path.", boost: "+12", actionIcon: <ArrowRight size={14} />
            },
            {
                step: "STEP 02", title: "Kaggle Integration", icon: <TerminalSquare size={20} className="text-[#a5c3af]" />,
                desc: "Complete the 'House Pricing Prediction' end-to-end sandbox pipeline.", boost: "+20", actionIcon: <Play size={14} fill="currentColor" />
            },
            {
                step: "STEP 03", title: "Assessment", icon: <CheckCircle size={20} className="text-[#a5c3af]" />,
                desc: "Pass the DS Level 1 screening assessment to validate your progress.", boost: "+30", actionIcon: <ClipboardCheck size={14} />
            }
        ]
    },
    "Cloud Engineer": {
        match: 72,
        radar: [
            { subject: 'TECHNICAL', current: 110, benchmark: 135, fullMark: 150 },
            { subject: 'CULTURAL', current: 125, benchmark: 115, fullMark: 150 },
            { subject: 'APTITUDE', current: 130, benchmark: 120, fullMark: 150 },
            { subject: 'SOFT SKILLS', current: 105, benchmark: 110, fullMark: 150 },
        ],
        criticalSkills: [
            { name: "Linux Administration", met: true },
            { name: "Networking Fundamentals", met: true },
            { name: "AWS / Azure Services", met: false },
            { name: "Infrastructure as Code", met: false }
        ],
        gaps: [
            { name: "AWS / Azure Services", gap: "HIGH GAP", req: "Professional", cur: "Beginner", fill: 25 },
            { name: "Infrastructure as Code", gap: "MED GAP", req: "Intermediate", cur: "Beginner", fill: 45 },
            { name: "Containers (Docker/K8s)", gap: "MED GAP", req: "Advanced", cur: "Intermediate", fill: 55 },
            { name: "Scripting (Python/Bash)", gap: "LOW GAP", req: "Professional", cur: "Advanced", fill: 80 },
        ],
        tip: "Earning an AWS Solutions Architect Associate certification will drastically improve your match.",
        roadmap: [
            {
                step: "STEP 01", title: "Cloud Basics", icon: <FileText size={20} className="text-[#a5c3af]" />,
                desc: "Complete the 'AWS Cloud Fundamentals' module.", boost: "+10", actionIcon: <ArrowRight size={14} />
            },
            {
                step: "STEP 02", title: "Deployment Project", icon: <TerminalSquare size={20} className="text-[#a5c3af]" />,
                desc: "Deploy a highly available web app using Terraform and AWS.", boost: "+25", actionIcon: <Play size={14} fill="currentColor" />
            },
            {
                step: "STEP 03", title: "Skill Assessment", icon: <CheckCircle size={20} className="text-[#a5c3af]" />,
                desc: "Take the Cloud Infrastructure assessment.", boost: "+20", actionIcon: <ClipboardCheck size={14} />
            }
        ]
    },
    "AI/ML Engineer": {
        match: 45,
        radar: [
            { subject: 'TECHNICAL', current: 75, benchmark: 145, fullMark: 150 },
            { subject: 'CULTURAL', current: 110, benchmark: 115, fullMark: 150 },
            { subject: 'APTITUDE', current: 145, benchmark: 135, fullMark: 150 },
            { subject: 'SOFT SKILLS', current: 95, benchmark: 105, fullMark: 150 },
        ],
        criticalSkills: [
            { name: "Python", met: true },
            { name: "Mathematics/Linear Algebra", met: true },
            { name: "Deep Learning Frameworks (PyTorch/TF)", met: false },
            { name: "MLOps", met: false }
        ],
        gaps: [
            { name: "Deep Learning Frameworks", gap: "HIGH GAP", req: "Advanced", cur: "Beginner", fill: 10 },
            { name: "MLOps", gap: "HIGH GAP", req: "Intermediate", cur: "None", fill: 0 },
            { name: "Neural Networks", gap: "MED GAP", req: "Professional", cur: "Intermediate", fill: 40 },
            { name: "Data Processing", gap: "LOW GAP", req: "Professional", cur: "Advanced", fill: 80 },
        ],
        tip: "Focus heavily on PyTorch and building at least one generative AI project.",
        roadmap: [
            {
                step: "STEP 01", title: "Architecture Study", icon: <FileText size={20} className="text-[#a5c3af]" />,
                desc: "Learn about Transformers and Attention mechanisms.", boost: "+15", actionIcon: <ArrowRight size={14} />
            },
            {
                step: "STEP 02", title: "Model Training", icon: <TerminalSquare size={20} className="text-[#a5c3af]" />,
                desc: "Train and deploy a custom foundational model on ElevatED Cloud.", boost: "+30", actionIcon: <Play size={14} fill="currentColor" />
            },
            {
                step: "STEP 03", title: "Assessment", icon: <CheckCircle size={20} className="text-[#a5c3af]" />,
                desc: "Complete the Advanced AI/ML benchmark.", boost: "+25", actionIcon: <ClipboardCheck size={14} />
            }
        ]
    },
    "Frontend Developer": {
        match: 85,
        radar: [
            { subject: 'TECHNICAL', current: 130, benchmark: 125, fullMark: 150 },
            { subject: 'CULTURAL', current: 120, benchmark: 115, fullMark: 150 },
            { subject: 'APTITUDE', current: 110, benchmark: 110, fullMark: 150 },
            { subject: 'SOFT SKILLS', current: 125, benchmark: 110, fullMark: 150 },
        ],
        criticalSkills: [
            { name: "HTML/CSS/JS", met: true },
            { name: "React / Vue", met: true },
            { name: "State Management", met: true },
            { name: "Web Performance & Accessibility", met: false }
        ],
        gaps: [
            { name: "Web Performance", gap: "MED GAP", req: "Advanced", cur: "Intermediate", fill: 60 },
            { name: "Accessibility (a11y)", gap: "MED GAP", req: "Professional", cur: "Beginner", fill: 45 },
            { name: "Testing (Jest/Cypress)", gap: "LOW GAP", req: "Intermediate", cur: "Beginner", fill: 70 },
            { name: "Modern React", gap: "LOW GAP", req: "Professional", cur: "Advanced", fill: 90 },
        ],
        tip: "Mastering web vital metrics and accessibility will push you into the top 5% of candidates.",
        roadmap: [
            {
                step: "STEP 01", title: "Optimization", icon: <FileText size={20} className="text-[#a5c3af]" />,
                desc: "Complete the 'Web Vitals & Performance' course.", boost: "+8", actionIcon: <ArrowRight size={14} />
            },
            {
                step: "STEP 02", title: "Audit Project", icon: <TerminalSquare size={20} className="text-[#a5c3af]" />,
                desc: "Run a full Lighthouse audit and optimization on your portfolio.", boost: "+12", actionIcon: <Play size={14} fill="currentColor" />
            },
            {
                step: "STEP 03", title: "Assessment", icon: <CheckCircle size={20} className="text-[#a5c3af]" />,
                desc: "Pass the Frontend Master screen.", boost: "+15", actionIcon: <ClipboardCheck size={14} />
            }
        ]
    },
    "Backend Developer": {
        match: 75,
        radar: [
            { subject: 'TECHNICAL', current: 120, benchmark: 135, fullMark: 150 },
            { subject: 'CULTURAL', current: 110, benchmark: 120, fullMark: 150 },
            { subject: 'APTITUDE', current: 135, benchmark: 130, fullMark: 150 },
            { subject: 'SOFT SKILLS', current: 100, benchmark: 105, fullMark: 150 },
        ],
        criticalSkills: [
            { name: "Node.js / Python / Java", met: true },
            { name: "RESTful APIs", met: true },
            { name: "Database Design (SQL)", met: true },
            { name: "Microservices Architecture", met: false }
        ],
        gaps: [
            { name: "Microservices", gap: "HIGH GAP", req: "Advanced", cur: "Beginner", fill: 30 },
            { name: "Message Queues (Kafka/RabbitMQ)", gap: "MED GAP", req: "Intermediate", cur: "Beginner", fill: 40 },
            { name: "Caching (Redis)", gap: "MED GAP", req: "Professional", cur: "Intermediate", fill: 65 },
            { name: "API Security", gap: "LOW GAP", req: "Advanced", cur: "Intermediate", fill: 75 },
        ],
        tip: "Understanding distributed systems and message brokers is crucial for senior backend roles.",
        roadmap: [
            {
                step: "STEP 01", title: "System Arch", icon: <FileText size={20} className="text-[#a5c3af]" />,
                desc: "Study the 'Microservices Design Patterns' guide.", boost: "+15", actionIcon: <ArrowRight size={14} />
            },
            {
                step: "STEP 02", title: "API Build", icon: <TerminalSquare size={20} className="text-[#a5c3af]" />,
                desc: "Construct a highly-concurrent Node.js/Redis API.", boost: "+20", actionIcon: <Play size={14} fill="currentColor" />
            },
            {
                step: "STEP 03", title: "Assessment", icon: <CheckCircle size={20} className="text-[#a5c3af]" />,
                desc: "Complete the Backend Scalability benchmark.", boost: "+25", actionIcon: <ClipboardCheck size={14} />
            }
        ]
    },
    "Full Stack Developer": {
        match: 68,
        radar: [
            { subject: 'TECHNICAL', current: 115, benchmark: 135, fullMark: 150 },
            { subject: 'CULTURAL', current: 115, benchmark: 115, fullMark: 150 },
            { subject: 'APTITUDE', current: 125, benchmark: 125, fullMark: 150 },
            { subject: 'SOFT SKILLS', current: 115, benchmark: 115, fullMark: 150 },
        ],
        criticalSkills: [
            { name: "Frontend Framework", met: true },
            { name: "Backend Language", met: true },
            { name: "Database Operations", met: true },
            { name: "CI/CD & Deployment", met: false }
        ],
        gaps: [
            { name: "CI/CD & Deployment", gap: "HIGH GAP", req: "Intermediate", cur: "Beginner", fill: 35 },
            { name: "System Architecture", gap: "MED GAP", req: "Advanced", cur: "Intermediate", fill: 50 },
            { name: "Security Best Practices", gap: "MED GAP", req: "Professional", cur: "Intermediate", fill: 55 },
            { name: "State Management", gap: "LOW GAP", req: "Professional", cur: "Advanced", fill: 85 },
        ],
        tip: "Full stack roles highly value the ability to independently deploy and maintain applications.",
        roadmap: [
            {
                step: "STEP 01", title: "DevOps Basics", icon: <FileText size={20} className="text-[#a5c3af]" />,
                desc: "Learn GitHub Actions and Docker deployment basics.", boost: "+12", actionIcon: <ArrowRight size={14} />
            },
            {
                step: "STEP 02", title: "End-to-End Build", icon: <TerminalSquare size={20} className="text-[#a5c3af]" />,
                desc: "Build and deploy a full SaaS application from scratch.", boost: "+25", actionIcon: <Play size={14} fill="currentColor" />
            },
            {
                step: "STEP 03", title: "Assessment", icon: <CheckCircle size={20} className="text-[#a5c3af]" />,
                desc: "Pass the Full Stack Integration screen.", boost: "+20", actionIcon: <ClipboardCheck size={14} />
            }
        ]
    },
    "DevOps Engineer": {
        match: 55,
        radar: [
            { subject: 'TECHNICAL', current: 90, benchmark: 140, fullMark: 150 },
            { subject: 'CULTURAL', current: 120, benchmark: 115, fullMark: 150 },
            { subject: 'APTITUDE', current: 135, benchmark: 120, fullMark: 150 },
            { subject: 'SOFT SKILLS', current: 110, benchmark: 120, fullMark: 150 },
        ],
        criticalSkills: [
            { name: "Linux / OS Internals", met: true },
            { name: "Scripting (Bash/Python)", met: true },
            { name: "CI/CD Pipelines", met: false },
            { name: "Kubernetes ecosystem", met: false }
        ],
        gaps: [
            { name: "Kubernetes", gap: "HIGH GAP", req: "Advanced", cur: "Beginner", fill: 20 },
            { name: "CI/CD (Jenkins/GitLab)", gap: "HIGH GAP", req: "Professional", cur: "Intermediate", fill: 35 },
            { name: "Monitoring (Prometheus/Grafana)", gap: "MED GAP", req: "Intermediate", cur: "Beginner", fill: 45 },
            { name: "Cloud Networking", gap: "LOW GAP", req: "Professional", cur: "Advanced", fill: 85 },
        ],
        tip: "To transition into DevOps, deploying robust CI/CD pipelines and learning k8s is mandatory.",
        roadmap: [
            {
                step: "STEP 01", title: "Pipeline Theory", icon: <FileText size={20} className="text-[#a5c3af]" />,
                desc: "Master continuous integration and deployment concepts.", boost: "+15", actionIcon: <ArrowRight size={14} />
            },
            {
                step: "STEP 02", title: "K8s Cluster", icon: <TerminalSquare size={20} className="text-[#a5c3af]" />,
                desc: "Set up and manage a local Kubernetes cluster.", boost: "+30", actionIcon: <Play size={14} fill="currentColor" />
            },
            {
                step: "STEP 03", title: "Assessment", icon: <CheckCircle size={20} className="text-[#a5c3af]" />,
                desc: "Complete the DevOps Reliability benchmark.", boost: "+25", actionIcon: <ClipboardCheck size={14} />
            }
        ]
    },
    "Product Manager (Technical)": {
        match: 80,
        radar: [
            { subject: 'TECHNICAL', current: 110, benchmark: 100, fullMark: 150 },
            { subject: 'CULTURAL', current: 135, benchmark: 130, fullMark: 150 },
            { subject: 'APTITUDE', current: 130, benchmark: 125, fullMark: 150 },
            { subject: 'SOFT SKILLS', current: 125, benchmark: 140, fullMark: 150 },
        ],
        criticalSkills: [
            { name: "Analytical Thinking", met: true },
            { name: "Basic Technical Architecture", met: true },
            { name: "Agile/Scrum Methodologies", met: false },
            { name: "User Research & PRDs", met: false }
        ],
        gaps: [
            { name: "Writing PRDs", gap: "HIGH GAP", req: "Professional", cur: "Beginner", fill: 25 },
            { name: "Agile/Scrum", gap: "MED GAP", req: "Advanced", cur: "Intermediate", fill: 50 },
            { name: "Stakeholder Management", gap: "MED GAP", req: "Professional", cur: "Intermediate", fill: 60 },
            { name: "Data/SQL", gap: "LOW GAP", req: "Advanced", cur: "Advanced", fill: 95 },
        ],
        tip: "As a technical applicant, developing strong communication and product documentation skills is your main priority.",
        roadmap: [
            {
                step: "STEP 01", title: "Product Sense", icon: <FileText size={20} className="text-[#a5c3af]" />,
                desc: "Study case studies on building product requirements docs.", boost: "+10", actionIcon: <ArrowRight size={14} />
            },
            {
                step: "STEP 02", title: "Mock PRD", icon: <TerminalSquare size={20} className="text-[#a5c3af]" />,
                desc: "Write and submit a comprehensive PRD for a mock feature.", boost: "+20", actionIcon: <Play size={14} fill="currentColor" />
            },
            {
                step: "STEP 03", title: "Assessment", icon: <CheckCircle size={20} className="text-[#a5c3af]" />,
                desc: "Pass the APM behavioral and product sense interview.", boost: "+25", actionIcon: <ClipboardCheck size={14} />
            }
        ]
    }
};

export default function SkillsGapPage() {
    const { user } = useAuthStore();
    const [selectedRole, setSelectedRole] = useState("Software Engineer (L1)");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const data = ROLES_DATA[selectedRole];

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.setTextColor(50, 50, 50);
        doc.text("ElevatED Skill Gap Report", 20, 30);

        doc.setFontSize(14);
        doc.text(`Target Role: ${selectedRole}`, 20, 45);
        doc.text(`Current Match Score: ${data.match}%`, 20, 55);

        doc.setFontSize(12);
        doc.text("Critical Skills Check:", 20, 75);
        let yPos = 85;
        data.criticalSkills.forEach((skill: any) => {
            doc.text(`${skill.name}: ${skill.met ? "Met" : "Requires Improvement"}`, 25, yPos);
            yPos += 10;
        });

        yPos += 10;
        doc.text("Skill Gap Breakdown:", 20, yPos);
        yPos += 10;
        data.gaps.forEach((gap: any) => {
            doc.text(`${gap.name} [${gap.gap}] - Required: ${gap.req} | Current: ${gap.cur}`, 25, yPos);
            yPos += 10;
        });

        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 280);

        doc.save(`ElevatED_${selectedRole.replace(/\s+/g, '_')}_SkillReport.pdf`);
    };

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto px-4 md:px-0 bg-[#f8f6f0] min-h-screen pt-4">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#4a7c59] tracking-tight">Skill Gap Analysis</h1>
                    <p className="text-sm font-bold text-gray-500 mt-1">Deep dive into your technical and soft skill disparities for specific job roles.</p>
                </div>

                <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#4a7c59]/70 mb-1 ml-1">Target Role</label>
                    <div className="relative w-full md:w-64">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#4a7c59]/30 rounded-2xl text-sm font-bold text-[#4a7c59] shadow-sm hover:border-[#4a7c59] transition-colors"
                        >
                            {selectedRole}
                            <ChevronDown size={16} className={cn("transition-transform", isDropdownOpen && "rotate-180")} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50">
                                {Object.keys(ROLES_DATA).map(role => (
                                    <button
                                        key={role}
                                        onClick={() => { setSelectedRole(role); setIsDropdownOpen(false); }}
                                        className={cn(
                                            "w-full text-left px-4 py-3 text-sm font-bold hover:bg-[#4a7c59]/5 transition-colors",
                                            role === selectedRole ? "text-[#4a7c59] bg-[#4a7c59]/5" : "text-gray-600"
                                        )}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* 1. Role Match Card */}
                <Card className="col-span-1 md:col-span-3 bg-white p-6 shadow-sm border border-gray-100 rounded-[32px] flex flex-col items-center">
                    <h3 className="text-sm font-black text-[#4a7c59] self-start w-full mb-2">Role Match</h3>
                    <div className="w-40 h-40 relative my-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[{ value: data.match }, { value: 100 - data.match }]}
                                    innerRadius={55}
                                    outerRadius={70}
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell fill="#00E676" />
                                    <Cell fill="#e5e7eb" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-gray-900 leading-none">{data.match}%</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-[#4a7c59]/70 mt-1">Match Score</span>
                        </div>
                    </div>

                    <div className="w-full mt-4 space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#4a7c59]/80 border-b border-gray-100 pb-2">Critical Skills Check</h4>
                        <div className="space-y-3 pl-1">
                            {data.criticalSkills.map((skill: any, i: number) => (
                                <div key={i} className="flex items-center gap-2">
                                    {skill.met ? (
                                        <CheckCircle2 size={16} className="text-[#00E676] shrink-0 fill-emerald-50" />
                                    ) : (
                                        <Circle size={16} className="text-gray-300 shrink-0" strokeWidth={3} />
                                    )}
                                    <span className={cn("text-xs font-bold", skill.met ? "text-gray-800" : "text-gray-400")}>{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button onClick={generatePDF} className="w-full mt-auto mt-8 bg-[#4a7c59] hover:bg-[#3d664a] text-white font-black rounded-xl h-11 gap-2 shadow-sm uppercase tracking-widest text-[11px] transition-transform active:scale-95">
                        <Download size={16} /> Full Skill Report
                    </Button>
                </Card>

                {/* 2. Core Competency Radar */}
                <Card className="col-span-1 md:col-span-5 bg-white p-6 md:p-8 shadow-sm border border-gray-100 rounded-[32px] flex flex-col items-center relative">
                    <div className="self-start w-full mb-0 relative z-10">
                        <h3 className="text-base font-black text-[#4a7c59]">Core Competency Radar</h3>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Benchmark vs. Current Proficiency</p>
                    </div>

                    <div className="w-full h-[320px] -mt-4 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data.radar}>
                                <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 9, fontWeight: 900 }} />
                                {/* Benchmark area */}
                                <Radar name="Benchmark" dataKey="benchmark" stroke="#5fb896" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                                {/* Current user area */}
                                <Radar name="Your Level" dataKey="current" stroke="#4a7c59" strokeWidth={3} fill="#4a7c59" fillOpacity={0.2} />

                                {/* Add dots to current explicitly */}
                                <Radar name="Your Level Dots" dataKey="current" stroke="none" fill="#4a7c59" fillOpacity={1} dot={{ r: 5, fill: '#4a7c59' }} activeDot={{ r: 7 }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="absolute bottom-6 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#4a7c59]/40 border border-[#4a7c59]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Your Level</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 border-t-2 border-dashed border-[#5fb896]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Benchmark</span>
                        </div>
                    </div>
                </Card>

                {/* 3. Skill Gap Breakdown */}
                <Card className="col-span-1 md:col-span-4 bg-white p-6 shadow-sm border border-gray-100 rounded-[32px] flex flex-col">
                    <h3 className="text-base font-black text-[#4a7c59] mb-6">Skill Gap Breakdown</h3>

                    <div className="space-y-6 flex-1">
                        {data.gaps.map((gap: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between items-end mb-2">
                                    <h4 className="text-sm font-black text-gray-900">{gap.name}</h4>
                                    <span className={cn(
                                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm",
                                        gap.gap === "HIGH GAP" ? "text-orange-600 bg-orange-50" :
                                            gap.gap === "MED GAP" ? "text-[#5fb896] bg-[#f0f7f4]" :
                                                "text-blue-500 bg-blue-50"
                                    )}>
                                        {gap.gap}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-1.5">
                                    <div className={cn(
                                        "h-full rounded-full transition-all duration-1000",
                                        gap.gap === "HIGH GAP" ? "bg-orange-400" :
                                            gap.gap === "MED GAP" ? "bg-[#5fb896]" :
                                                "bg-blue-400"
                                    )} style={{ width: `${gap.fill}%` }} />
                                </div>
                                <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[#4a7c59]/70">
                                    <span>Required: {gap.req}</span>
                                    <span className="opacity-50">|</span>
                                    <span>Current: {gap.cur}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 bg-[#f0f7f4] border border-[#d9ecd] rounded-2xl p-4">
                        <p className="text-xs font-bold text-[#4a7c59] italic leading-relaxed text-center">
                            "{data.tip}"
                        </p>
                    </div>
                </Card>
            </div>

            {/* Action Plan: Learning Roadmap */}
            <div className="mt-12">
                <h2 className="flex items-center gap-2 text-xl font-black text-[#4a7c59] mb-6">
                    <Route size={24} /> Action Plan: Learning Roadmap
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.roadmap.map((card: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="bg-[#e4ebdd] border-none p-6 md:p-8 rounded-[32px] h-full flex flex-col relative overflow-hidden group hover:bg-[#d6e0cc] transition-colors cursor-pointer shadow-sm shadow-[#4a7c59]/10">
                                <div className="absolute right-4 top-4 opacity-30 text-[#4a7c59]">
                                    {card.icon}
                                </div>

                                <span className="text-[10px] font-black uppercase tracking-widest text-[#4a7c59]/80 mb-4 inline-block">{card.step}</span>
                                <h3 className="text-lg font-black text-[#3d664a] mb-3 leading-tight">{card.title}</h3>
                                <p className="text-xs font-bold text-[#4a7c59]/90 leading-relaxed mb-8 flex-1">
                                    {card.desc}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-[9px] font-black bg-white rounded-full px-3 py-1 text-[#4a7c59] uppercase tracking-widest shadow-sm">
                                        {card.boost} ATX Boost
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-[#4a7c59] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {card.actionIcon}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            
        </div>
    );
}
