"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Sparkles,
    ChevronLeft,
    Search,
    Bell,
    Settings,
    Calendar,
    Star,
    CheckCircle2,
    AlertCircle,
    GraduationCap,
    Briefcase,
    Award,
    Mail,
    MapPin,
    ExternalLink
} from "lucide-react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

// Mock data generator for dynamic feels
const getCandidateData = (id: string) => {
    const candidates: Record<string, any> = {
        "1": {
            name: "Arjun Rao",
            tier: "DIAMOND TIER",
            role: "Computer Science | IIT Bombay",
            location: "Mumbai, India",
            email: "arjun.rao@iitb.ac.in",
            atxScore: 942,
            atxTrend: "+15% vs Average",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
            avatar: "AR",
            radarData: [
                { subject: 'ALGORITHMS', A: 145, fullMark: 150 },
                { subject: 'SYSTEMS', A: 120, fullMark: 150 },
                { subject: 'RESEARCH', A: 130, fullMark: 150 },
                { subject: 'LEADERSHIP', A: 110, fullMark: 150 },
            ],
            technicalSkills: ["C++", "CUDA", "Python", "Kubernetes", "PyTorch"],
            softSkills: ["Analytical Thinking", "Peer Mentoring", "Public Speaking"],
            insights: [
                { type: "match", text: "Top choice for High-Frequency Trading or Systems roles." },
                { type: "success", text: "Recipient of KVPY Scholarship and JEE Advanced Rank < 100." }
            ],
            timeline: [
                {
                    date: "PRESENT",
                    title: "B.Tech Final Year",
                    description: "Focusing on Distributed Systems and ML infrastructure.",
                    type: "academic"
                }
            ],
            validation: [
                { label: "CGPA", value: "9.8 / 10", status: "pass" },
                { label: "DSA Proficiency", value: "Master", status: "pass" }
            ],
            recruiterNote: "Arjun is a Tier-1 candidate with exceptional algorithmic depth."
        },
        "2": {
            name: "Ananya Iyer",
            tier: "PLATINUM TIER",
            role: "Data Engineering | NIT Trichy",
            location: "Chennai, India",
            email: "ananya.i@nitt.edu",
            atxScore: 891,
            atxTrend: "Top 5% in Batch",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            avatar: "AI",
            radarData: [
                { subject: 'DATA ENG', A: 140, fullMark: 150 },
                { subject: 'SQL', A: 145, fullMark: 150 },
                { subject: 'CLOUD', A: 110, fullMark: 150 },
                { subject: 'COMM.', A: 135, fullMark: 150 },
            ],
            technicalSkills: ["Snowflake", "Apache Spark", "Airflow", "Python", "PostgreSQL"],
            softSkills: ["Data Storytelling", "Project Management", "Detail Oriented"],
            insights: [
                { type: "match", text: "Excellent fit for Big Data or Analytics Engineering roles." },
                { type: "success", text: "Reduced data pipeline latency by 30% during summer internship." }
            ],
            timeline: [
                {
                    date: "2023",
                    title: "Summer Intern at Amazon",
                    description: "Worked on automated supply chain forecasting pipelines.",
                    type: "work"
                }
            ],
            validation: [
                { label: "CGPA", value: "9.1 / 10", status: "pass" },
                { label: "SQL Assessment", value: "Expert", status: "pass" }
            ],
            recruiterNote: "Ananya has a very strong grasp of industrial data workflows."
        },
        "3": {
            name: "Rohan Dasgupta",
            tier: "GOLD TIER",
            role: "Software Systems | BITS Pilani",
            location: "Bangalore, India",
            email: "r.dasgupta@bits-pilani.ac.in",
            atxScore: 874,
            atxTrend: "Steady Growth",
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            avatar: "RD",
            radarData: [
                { subject: 'BACKEND', A: 130, fullMark: 150 },
                { subject: 'GO', A: 125, fullMark: 150 },
                { subject: 'DEVOPS', A: 115, fullMark: 150 },
                { subject: 'AGILE', A: 120, fullMark: 150 },
            ],
            technicalSkills: ["Go (Golang)", "Docker", "Terraform", "React", "Kafka"],
            softSkills: ["Cross-team Sync", "Agile Mindset", "Ownership"],
            insights: [
                { type: "match", text: "Versatile full-stack potential with strong backend foundation." },
                { type: "warning", text: "Still developing expertise in Frontend optimization." }
            ],
            timeline: [
                {
                    date: "2024",
                    title: "Project Lead: Campus Management System",
                    description: "Built a microservices-based portal serving 5000+ users.",
                    type: "academic"
                }
            ],
            validation: [
                { label: "CGPA", value: "8.4 / 10", status: "pass" },
                { label: "System Design", value: "Proficient", status: "pass" }
            ],
            recruiterNote: "Rohan is an all-rounder with practical project experience."
        },
        "4": {
            name: "Priya Sharma",
            tier: "PLATINUM TIER",
            role: "Information Tech | BITS Pilani",
            location: "Hyderabad, India",
            email: "priya.s@bits-pilani.ac.in",
            atxScore: 915,
            atxTrend: "Top 3% Analytics",
            avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
            avatar: "PS",
            radarData: [
                { subject: 'UI/UX', A: 145, fullMark: 150 },
                { subject: 'REACT', A: 140, fullMark: 150 },
                { subject: 'MOBILE', A: 110, fullMark: 150 },
                { subject: 'DESIGN', A: 130, fullMark: 150 },
            ],
            technicalSkills: ["React Native", "TypeScript", "Tailwind CSS", "Figma", "Redux"],
            softSkills: ["Visual Design", "User Empathy", "Prototyping"],
            insights: [
                { type: "match", text: "Perfect candidate for Product Engineer or Frontend Specialist roles." },
                { type: "success", text: "Winner of Global Hackathon for 'Best Accessibility Design'." }
            ],
            timeline: [
                {
                    date: "2023",
                    title: "Frontend Intern at Stripe",
                    description: "Optimized dashboard responsiveness for merchant consoles.",
                    type: "work"
                }
            ],
            validation: [
                { label: "CGPA", value: "9.3 / 10", status: "pass" },
                { label: "UX Research", value: "Master", status: "pass" }
            ],
            recruiterNote: "Priya combines technical rigor with a rare eye for premium user experiences."
        },
        "5": {
            name: "Vikram Seth",
            tier: "GOLD TIER",
            role: "Mechanical Engineering | IIT Madras",
            location: "Chennai, India",
            email: "v.seth@iitm.ac.in",
            atxScore: 856,
            atxTrend: "Steady Analytics",
            avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
            avatar: "VS",
            radarData: [
                { subject: 'CAD/CAM', A: 140, fullMark: 150 },
                { subject: 'PYTHON', A: 110, fullMark: 150 },
                { subject: 'MATLAB', A: 130, fullMark: 150 },
                { subject: 'COMM.', A: 120, fullMark: 150 },
            ],
            technicalSkills: ["SolidWorks", "Python", "MATLAB", "Ansys", "Fusion 360"],
            softSkills: ["Team Collaboration", "Complex Problem Solving", "Project Planning"],
            insights: [
                { type: "match", text: "Strong foundation in engineering principles and computational tools." },
                { type: "success", text: "Published 2 research papers on sustainable manufacturing." }
            ],
            timeline: [
                {
                    date: "2024",
                    title: "Research Project: Green Logistics",
                    description: "Optimized delivery routes using genetic algorithms.",
                    type: "academic"
                }
            ],
            validation: [
                { label: "CGPA", value: "8.7 / 10", status: "pass" },
                { label: "Design Proficiency", value: "Advanced", status: "pass" }
            ],
            recruiterNote: "Vikram is a versatile engineer with a strong analytical mindset."
        },
        "6": {
            name: "Aditi Verma",
            tier: "DIAMOND TIER",
            role: "Software Engineering | IIT Delhi",
            location: "New Delhi, India",
            email: "aditi.v@iitd.ac.in",
            atxScore: 932,
            atxTrend: "Top 1% Leetcode",
            avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            avatar: "AV",
            radarData: [
                { subject: 'BACKEND', A: 145, fullMark: 150 },
                { subject: 'DSA', A: 148, fullMark: 150 },
                { subject: 'SYSTEMS', A: 135, fullMark: 150 },
                { subject: 'CLOUD', A: 125, fullMark: 150 },
            ],
            technicalSkills: ["Java", "Spring Boot", "Rust", "Docker", "Kubernetes"],
            softSkills: ["Code Readability", "Mentoring", "System Architecture"],
            insights: [
                { type: "success", text: "Solved 1000+ problems on various competitive platforms." },
                { type: "match", text: "Ideal for High-Scale Backend or Infrastructure teams." }
            ],
            timeline: [
                {
                    date: "2023",
                    title: "SDE Intern at Google",
                    description: "Built a high-throughput internal caching layer.",
                    type: "work"
                }
            ],
            validation: [
                { label: "CGPA", value: "9.5 / 10", status: "pass" },
                { label: "HackerRank", value: "5-Star", status: "pass" }
            ],
            recruiterNote: "Aditi is a coding powerhouse with deep systems knowledge."
        },
        "7": {
            name: "Rahul Kulkarni",
            tier: "PLATINUM TIER",
            role: "Fullstack Development | VJTI",
            location: "Mumbai, India",
            email: "rahul.k@vjti.ac.in",
            atxScore: 885,
            atxTrend: "+18% vs Peers",
            avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            avatar: "RK",
            radarData: [
                { subject: 'REACT', A: 140, fullMark: 150 },
                { subject: 'NODE', A: 135, fullMark: 150 },
                { subject: 'DevOps', A: 110, fullMark: 150 },
                { subject: 'UI/UX', A: 120, fullMark: 150 },
            ],
            technicalSkills: ["Next.js", "Node.js", "GraphQL", "AWS", "Prisma"],
            softSkills: ["Agile Development", "User Research", "Fast Learner"],
            insights: [
                { type: "success", text: "Built a college management portal serving 5000+ students." },
                { type: "match", text: "Strong full-stack capabilities with a focus on modern frameworks." }
            ],
            timeline: [
                {
                    date: "2024",
                    title: "Freelance: E-commerce Refactor",
                    description: "Increased site conversion rate by 20% for a local startup.",
                    type: "work"
                }
            ],
            validation: [
                { label: "CGPA", value: "9.0 / 10", status: "pass" },
                { label: "Fullstack Cert", value: "Verified", status: "pass" }
            ],
            recruiterNote: "Rahul is a practical developer who focuses on business value."
        },
        "8": {
            name: "Kavya Pillai",
            tier: "PLATINUM TIER",
            role: "Data Science | NIT Karnataka",
            location: "Mangalore, India",
            email: "kavya.p@nitk.edu.in",
            atxScore: 908,
            atxTrend: "+25% in Batch",
            avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
            avatar: "KP",
            radarData: [
                { subject: 'ML', A: 145, fullMark: 150 },
                { subject: 'STATS', A: 140, fullMark: 150 },
                { subject: 'PYTHON', A: 135, fullMark: 150 },
                { subject: 'NLP', A: 130, fullMark: 150 },
            ],
            technicalSkills: ["TensorFlow", "Scikit-Learn", "Pandas", "PyTorch", "Tableau"],
            softSkills: ["Data Presentation", "Ethical AI", "Collaborative Research"],
            insights: [
                { type: "success", text: "Secured Rank 1 in National Data Science Hackathon." },
                { type: "match", text: "Highly proficient in training and deploying deep learning models." }
            ],
            timeline: [
                {
                    date: "2023",
                    title: "Data Intern at Microsoft",
                    description: "Analyzed Terabytes of user telemetry data to predict churn.",
                    type: "work"
                }
            ],
            validation: [
                { label: "CGPA", value: "9.2 / 10", status: "pass" },
                { label: "ML Assessment", value: "Expert", status: "pass" }
            ],
            recruiterNote: "Kavya is a brilliant data scientist with solid research skills."
        },
        "9": {
            name: "Ishan Malhotra",
            tier: "GOLD TIER",
            role: "Product Design | NID Ahmedabad",
            location: "Ahmedabad, India",
            email: "ishan.m@nid.edu",
            atxScore: 842,
            atxTrend: "Creative Excellence",
            avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
            avatar: "IM",
            radarData: [
                { subject: 'UI DESIGN', A: 148, fullMark: 150 },
                { subject: 'UX RES.', A: 135, fullMark: 150 },
                { subject: 'PROTO.', A: 140, fullMark: 150 },
                { subject: 'CODE', A: 85, fullMark: 150 },
            ],
            technicalSkills: ["Figma", "Adobe XD", "Framer", "React (Basics)", "Three.js"],
            softSkills: ["User Empathy", "Design Thinking", "Stakeholder Mgmt"],
            insights: [
                { type: "success", text: "Winning design for the National Digital Literacy App." },
                { type: "match", text: "Unique combination of premium design and interaction skills." }
            ],
            timeline: [
                {
                    date: "2024",
                    title: "Final Year: Smart Mobility App",
                    description: "Focused on accessible design for senior citizens.",
                    type: "academic"
                }
            ],
            validation: [
                { label: "Portfolio", value: "Excellent", status: "pass" },
                { label: "UX Research", value: "Advanced", status: "pass" }
            ],
            recruiterNote: "Ishan has a rare ability to transform complex data into beautiful UIs."
        },
        "10": {
            name: "Sneha Reddy",
            tier: "PLATINUM TIER",
            role: "Backend Development | IIIT Hyderabad",
            location: "Hyderabad, India",
            email: "sneha.r@iiit.ac.in",
            atxScore: 895,
            atxTrend: "Consistent Performer",
            avatarUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop",
            avatar: "SR",
            radarData: [
                { subject: 'DATABASE', A: 142, fullMark: 150 },
                { subject: 'JAVA', A: 138, fullMark: 150 },
                { subject: 'DIST. SYS', A: 130, fullMark: 150 },
                { subject: 'AGILE', A: 125, fullMark: 150 },
            ],
            technicalSkills: ["Java", "Redis", "Kafka", "PostgreSQL", "System Design"],
            softSkills: ["Problem Decomposition", "Technical Writing", "Ownership"],
            insights: [
                { type: "success", text: "Reduced API response time by 50% for high-load endpoints." },
                { type: "match", text: "Strong grasp of database internals and distributed systems." }
            ],
            timeline: [
                {
                    date: "2023",
                    title: "Intern at Salesforce",
                    description: "Developed microservices for real-time customer analytics.",
                    type: "work"
                }
            ],
            validation: [
                { label: "CGPA", value: "9.1 / 10", status: "pass" },
                { label: "System Design", value: "Expert", status: "pass" }
            ],
            recruiterNote: "Sneha is a reliable engineer with a focus on code efficiency and scale."
        },
        "alex": {
            name: "Sanjay Malani",
            tier: "PLATINUM RECRUITER",
            role: "Senior Talent Partner | ElevatED",
            location: "Gurgaon, India",
            email: "sanjay.malani@elevated.ai",
            atxScore: 980,
            atxTrend: "Top 1% Recruiter",
            avatar: "SM",
            radarData: [
                { subject: 'SOURCING', A: 140, fullMark: 150 },
                { subject: 'NEGOTIATION', A: 135, fullMark: 150 },
                { subject: 'TECH STACK', A: 120, fullMark: 150 },
                { subject: 'CLOSING', A: 145, fullMark: 150 },
            ],
            technicalSkills: ["LinkedIn Recruiter", "Greenhouse ATS", "Technical Sourcing", "Data Analytics"],
            softSkills: ["Strategic Planning", "Interviewing", "Employee Branding"],
            insights: [
                { type: "success", text: "Highest offer acceptance rate in Q4 2025." },
                { type: "success", text: "Reduced average time-to-hire by 15 days." },
                { type: "match", text: "Expertise in scaling engineering teams from 10 to 100+." }
            ],
            timeline: [
                {
                    date: "2024 - PRESENT",
                    title: "Talent Lead at ElevatED",
                    description: "Leading recruitment for the next-gen AI placement platform.",
                    type: "work"
                },
                {
                    date: "2021 - 2024",
                    title: "Senior Technical Recruiter at Microsoft",
                    description: "Scaled engineering team from 50 to 200 members in India.",
                    type: "work"
                }
            ],
            validation: [
                { label: "Recruitment Exp", value: "8+ Years", status: "pass" },
                { label: "Placement Rate", value: "92%", status: "pass" },
                { label: "Client Satisfaction", value: "4.9/5", status: "pass" }
            ],
            recruiterNote: "Sanjay is a veteran recruiter with a focus on deep technical matching in the Indian ecosystem."
        },
        "default": {
            name: "Candidate Profile",
            tier: "SILVER TIER",
            role: "Software Engineering Student",
            location: "Remote",
            email: "candidate@example.com",
            atxScore: 720,
            atxTrend: "+5% vs Average",
            avatar: "CP",
            radarData: [
                { subject: 'PYTHON', A: 90, fullMark: 150 },
                { subject: 'DSA', A: 110, fullMark: 150 },
                { subject: 'SYSTEM DESIGN', A: 60, fullMark: 150 },
                { subject: 'LEADERSHIP', A: 80, fullMark: 150 },
            ],
            technicalSkills: ["JavaScript", "React", "Node.js"],
            softSkills: ["Communication", "Problem Solving"],
            insights: [
                { type: "match", text: "Good match for junior frontend roles." },
                { type: "warning", text: "Needs improvement in system design concepts." }
            ],
            timeline: [
                { date: "2024", title: "Full Stack Web Project", description: "Built a responsive e-commerce site.", type: "academic" }
            ],
            validation: [
                { label: "CGPA > 7.0", value: "7.5 / 10", status: "pass" },
                { label: "No Active Backlogs", value: "Pass", status: "pass" }
            ],
            recruiterNote: "Solid fundamental skills, potential for growth."
        }
    };

    return candidates[id] || candidates["default"];
};

export default function CandidateProfileView() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuthStore();
    const id = params.id as string;
    const data = getCandidateData(id);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans">
            {/* Header / Navbar */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-jungle rounded-lg flex items-center justify-center text-white shadow-soft">
                                <Sparkles className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-gray-800">ElevatED</span>
                        </div>
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search candidates, skills..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs w-72 focus:ring-2 focus:ring-jungle/20 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                    <nav className="flex items-center gap-8">
                        {["Dashboard", "Candidates", "Placements", "Analytics"].map((item) => (
                            <button
                                key={item}
                                className={cn(
                                    "text-xs font-bold transition-all pb-1 border-b-2",
                                    item === "Candidates"
                                        ? "text-gray-900 border-jungle"
                                        : "text-gray-400 border-transparent hover:text-gray-600"
                                )}
                            >
                                {item}
                            </button>
                        ))}
                        <div className="flex items-center gap-4 ml-6 pl-6 border-l border-gray-100">
                            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                            <div className="w-9 h-9 rounded-full bg-jungle/10 overflow-hidden border-2 border-white shadow-soft flex items-center justify-center font-bold text-jungle text-xs">
                                {user?.avatarUrl ? (
                                    <img src={user.avatarUrl} alt="User" />
                                ) : (
                                    user?.name?.charAt(0) || "R"
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-10">
                    <button onClick={() => router.back()} className="hover:text-jungle transition-colors">Candidates</button>
                    <span className="opacity-30">/</span>
                    <span className="hover:text-jungle transition-colors cursor-pointer text-gray-400">Engineering Batch 2024</span>
                    <span className="opacity-30">/</span>
                    <span className="text-jungle">{data.name}</span>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row gap-5 mb-8">
                    {/* Basic Info Card */}
                    <Card className="flex-1 p-8 flex flex-col md:flex-row items-center gap-10 border-none shadow-premium bg-white">
                        <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gray-50 ring-4 ring-gray-50/50 shadow-soft shrink-0 flex items-center justify-center text-3xl font-black text-jungle">
                            {data.avatarUrl ? (
                                <img
                                    src={data.avatarUrl}
                                    alt={data.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span>{data.avatar}</span>
                            )}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                                <h1 className="text-3xl font-black tracking-tight text-gray-900">{data.name}</h1>
                                <span className="bg-[#f0fdf4] text-jungle text-[10px] font-black px-2.5 py-1 rounded-lg border border-[#bbf7d0] tracking-widest uppercase">
                                    {data.tier}
                                </span>
                            </div>
                            <p className="text-lg text-gray-500 font-bold mb-6">{data.role}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs font-bold">
                                <span className="flex items-center gap-2 text-gray-400"><MapPin className="w-4 h-4" /> {data.location}</span>
                                <span className="flex items-center gap-2 text-jungle"><Mail className="w-4 h-4" /> {data.email}</span>
                            </div>
                        </div>
                    </Card>

                    {/* ATX Score Card */}
                    <div className="lg:w-72 bg-[#4a6b5d] rounded-3xl p-8 text-white flex flex-col items-center justify-center relative overflow-hidden shadow-premium">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,white_0%,transparent_70%)]"></div>
                        </div>
                        <span className="text-[10px] font-black tracking-[0.2em] opacity-60 mb-3 uppercase">ATX SCORE</span>
                        <div className="text-7xl font-black mb-1 leading-none tabular-nums">{data.atxScore}</div>
                        <span className="text-[11px] font-bold opacity-40 mb-6">out of 1000</span>
                        <div className="bg-white/10 px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 border border-white/20 shadow-inner">
                            <TrendingUp className="w-3.5 h-3.5 text-white" />
                            {data.atxTrend}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-row lg:flex-col gap-4 lg:w-48">
                        <Button className="flex-1 lg:flex-none h-[calc(50%-8px)] lg:h-16 bg-[#4a6b5d] hover:bg-[#3d5a4d] text-white font-black text-xs rounded-2xl shadow-soft">
                            <Calendar className="w-4 h-4 mr-2" /> Schedule Interview
                        </Button>
                        <Button variant="outline" className="flex-1 lg:flex-none h-[calc(50%-8px)] lg:h-12 border-2 border-[#4a6b5d]/20 text-[#4a6b5d] hover:bg-[#4a6b5d]/5 font-black text-xs rounded-2xl">
                            <Star className="w-4 h-4 mr-2" /> Shortlist
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left & Middle Columns */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Skill Analysis & Gap Assessment */}
                        <Card className="p-10 border-none shadow-premium bg-white group">
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-jungle/5 rounded-2xl group-hover:bg-jungle/10 transition-colors">
                                        <Award className="w-6 h-6 text-jungle" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Skill Analysis & Gap Assessment</h2>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time Competency Mapping</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">Updated 2h ago</span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                <div className="h-72 w-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.radarData}>
                                            <PolarGrid stroke="#f1f5f9" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800, letterSpacing: '0.05em' }} />
                                            <Radar
                                                name="Stats"
                                                dataKey="A"
                                                stroke="#4a6b5d"
                                                fill="#4a6b5d"
                                                fillOpacity={0.12}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                    <p className="absolute -bottom-4 left-0 right-0 text-center text-[10px] font-bold text-gray-300 italic uppercase tracking-widest">Benchmark: Software Engineer (L1)</p>
                                </div>

                                <div className="space-y-10">
                                    <div>
                                        <h3 className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase mb-5 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-jungle"></div> TECHNICAL SKILLS
                                        </h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {data.technicalSkills.map((skill: string) => (
                                                <span key={skill} className="px-3.5 py-2 bg-gray-50 text-gray-700 text-[11px] font-black rounded-xl border border-gray-100 hover:border-jungle/30 transition-colors cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-black tracking-[0.15em] text-gray-400 uppercase mb-5 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-tropicalTeal"></div> SOFT SKILLS
                                        </h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {data.softSkills.map((skill: string) => (
                                                <span key={skill} className="px-3.5 py-2 bg-gray-50 text-gray-700 text-[11px] font-black rounded-xl border border-gray-100 hover:border-tropicalTeal/30 transition-colors cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Academic Growth Timeline */}
                        <Card className="p-10 border-none shadow-premium bg-white group">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-3 bg-jungle/5 rounded-2xl group-hover:bg-jungle/10 transition-colors">
                                    <GraduationCap className="w-6 h-6 text-jungle" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Academic Growth Timeline</h2>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Journey & Milestones</p>
                                </div>
                            </div>

                            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-[11px] before:w-[2px] before:bg-gray-50 pb-4">
                                {data.timeline.map((item: any, idx: number) => (
                                    <div key={idx} className="relative flex items-start pl-12 group/item">
                                        <div className={cn(
                                            "absolute left-0 mt-1.5 w-6 h-6 rounded-full border-4 border-white shadow-soft transition-all duration-300 group-hover/item:scale-110",
                                            idx === 0 ? "bg-jungle" : "bg-gray-200"
                                        )}></div>
                                        <div className="flex-1">
                                            <span className={cn(
                                                "text-[10px] font-black tracking-widest uppercase mb-2 block",
                                                idx === 0 ? "text-jungle" : "text-gray-400"
                                            )}>
                                                {item.date}
                                            </span>
                                            <h4 className="text-base font-black text-gray-900 mb-1.5">{item.title}</h4>
                                            <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-2xl">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Smart Insight Match */}
                        <Card className="p-8 border-none shadow-premium bg-[#f8fafc] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-jungle/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="flex items-center gap-3 mb-8">
                                <Sparkles className="w-5 h-5 text-jungle animate-pulse" />
                                <h2 className="text-lg font-black text-gray-900 tracking-tight">Smart Insight Match</h2>
                            </div>
                            <div className="space-y-6">
                                {data.insights.map((insight: any, idx: number) => (
                                    <div key={idx} className="flex gap-4">
                                        {insight.type === "match" && <div className="p-1 bg-jungle/10 rounded-lg shrink-0 h-fit mt-0.5"><CheckCircle2 className="w-4 h-4 text-jungle" /></div>}
                                        {insight.type === "success" && <div className="p-1 bg-jungle/10 rounded-lg shrink-0 h-fit mt-0.5"><CheckCircle2 className="w-4 h-4 text-jungle" /></div>}
                                        {insight.type === "warning" && <div className="p-1 bg-amber-100 rounded-lg shrink-0 h-fit mt-0.5"><AlertCircle className="w-4 h-4 text-amber-600" /></div>}
                                        <p className="text-[13px] font-bold text-gray-600 leading-normal">
                                            {insight.text.split(/(\d+%)/g).map((part: string, i: number) =>
                                                part.match(/\d+%/) ? <span key={i} className="text-gray-900 font-black decoration-jungle/30 decoration-2 underline-offset-2 underline">{part}</span> : part
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Policy Validation */}
                        <Card className="p-8 border-none shadow-premium bg-white group">
                            <h2 className="text-lg font-black text-gray-900 tracking-tight mb-8">Policy Validation</h2>
                            <div className="space-y-4 mb-8">
                                {data.validation.map((item: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-jungle/10 transition-all cursor-default group/val">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-1 rounded-full bg-white shadow-soft transition-colors",
                                                item.status === 'pass' ? "text-jungle" : "text-gray-300"
                                            )}>
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <span className={cn(
                                            "text-[11px] font-black px-3 py-1 rounded-xl shadow-soft",
                                            item.status === 'pass' ? "bg-white text-jungle" : "bg-white text-gray-400"
                                        )}>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-5 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                                    <Mail className="w-3 h-3" /> RECRUITER NOTE
                                </p>
                                <p className="text-xs italic font-bold text-gray-500 leading-relaxed">"{data.recruiterNote}"</p>
                            </div>
                        </Card>

                        {/* Footer AI Branding */}
                        <div className="flex items-center justify-center gap-3 pt-4 opacity-40 group cursor-default">
                            <Sparkles className="w-4 h-4 text-jungle group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] font-black tracking-[0.3em] text-jungle uppercase">ELEVATED AI ANALYTICS</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
