"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Users,
    Calendar,
    Star,
    Eye,
    Download,
    Filter,
    MoreHorizontal,
    UserCheck,
    Mail,
    Phone,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Candidate {
    id: string;
    name: string;
    atx: number;
    role: string;
    avatar: string;
    status?: string;
    nextInterview?: string;
    score?: number;
}

export default function ShortlistedPage() {
    // Candidates available to be shortlisted (mock)
    const availableToShortlistPool: Candidate[] = [
        {
            id: '3',
            name: 'Rohan Dasgupta',
            atx: 874,
            role: 'Software Systems, BITS',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        },
        {
            id: '5',
            name: 'Vikram Seth',
            atx: 856,
            role: 'Mechanical, IIT-M',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        },
        {
            id: '6',
            name: 'Aditi Verma',
            atx: 932,
            role: 'Software Eng, IIT-D',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        {
            id: '7',
            name: 'Rahul Kulkarni',
            atx: 885,
            role: 'Fullstack, VJTI',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        },
        {
            id: '8',
            name: 'Kavya Pillai',
            atx: 908,
            role: 'Data Science, NIT-K',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya',
        },
        {
            id: '10',
            name: 'Sneha Reddy',
            atx: 895,
            role: 'Backend, IIIT-H',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
        }
    ];

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial default candidates if none in storage
    const initialShortlisted = [
        {
            id: '1',
            name: 'Arjun Rao',
            atx: 942,
            role: 'Computer Science, IIT-B',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
            status: 'Technical Round',
            nextInterview: 'Oct 12, 10:30 AM',
            score: 9.2
        },
        {
            id: '2',
            name: 'Ananya Iyer',
            atx: 891,
            role: 'Data Engineering, NIT',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            status: 'HR Round',
            nextInterview: 'Oct 14, 02:00 PM',
            score: 8.8
        },
        {
            id: '4',
            name: 'Priya Sharma',
            atx: 915,
            role: 'Information Tech, BITS',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
            status: 'Final Interview',
            nextInterview: 'Oct 15, 11:00 AM',
            score: 9.5
        }
    ];

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('shortlisted_candidates');
        if (saved) {
            setCandidates(JSON.parse(saved));
        } else {
            setCandidates(initialShortlisted);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('shortlisted_candidates', JSON.stringify(candidates));
        }
    }, [candidates, isLoaded]);

    const addToShortlist = (cand: any) => {
        if (!candidates.find(c => c.id === cand.id)) {
            setCandidates([...candidates, {
                ...cand,
                status: 'Initial Review',
                nextInterview: 'TBD',
                score: 0
            }]);
        }
        setIsSelecting(false);
    };

    return (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                        <Star className="w-8 h-8 text-[#ec9d40] fill-[#ec9d40]" />
                        Shortlisted Talent
                    </h1>
                    <p className="text-gray-400 font-medium mt-1">Manage and track candidates who've passed the initial AI screening.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={() => setIsSelecting(!isSelecting)}
                        className="rounded-xl bg-tropicalTeal hover:bg-[#348e89] text-white shadow-soft font-bold px-6"
                    >
                        <UserCheck className="w-4 h-4 mr-2" /> Shortlist Candidates
                    </Button>
                    <Button className="rounded-xl bg-jungle hover:bg-[#3d5a4d] text-white shadow-soft font-bold px-6">
                        <Calendar className="w-4 h-4 mr-2" /> Schedule Rounds
                    </Button>
                </div>
            </div>

            {/* Selection Drawer (Simplified as a grid above the list) */}
            {isSelecting && (
                <div className="animate-in slide-in-from-top duration-500">
                    <Card className="p-6 border-tropicalTeal/20 bg-tropicalTeal/5 border-2 border-dashed">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-tropicalTeal uppercase tracking-widest text-sm">Select Candidate to Shortlist</h3>
                            <Button variant="ghost" onClick={() => setIsSelecting(false)} className="h-8 w-8 p-0 text-tropicalTeal">×</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {availableToShortlistPool.filter((a: Candidate) => !candidates.find((c: Candidate) => c.id === a.id)).map((cand: Candidate) => (
                                <div key={cand.id} className="bg-white p-4 rounded-2xl shadow-soft flex items-center justify-between border border-transparent hover:border-tropicalTeal/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl overflow-hidden relative">
                                            <img src={cand.avatar} alt={cand.name} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-800 text-xs">{cand.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold">{cand.role}</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => addToShortlist(cand)}
                                        className="h-8 px-3 text-[10px] font-black bg-tropicalTeal hover:bg-[#348e89] text-white rounded-lg"
                                    >
                                        Shortlist
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
                {[
                    { label: "Total Shortlisted", val: candidates.length.toString().padStart(2, '0'), icon: UserCheck, color: "text-jungle", bg: "bg-jungle/5" },
                    { label: "Interviews Today", val: "06", icon: Calendar, color: "text-tropicalTeal", bg: "bg-tropicalTeal/5" },
                    { label: "Avg. Assessment", val: "8.4", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/5" },
                    { label: "Ready to Offer", val: "03", icon: Star, color: "text-purple-500", bg: "bg-purple-500/5" },
                ].map((stat, i) => (
                    <Card key={i} className="p-5 border-none shadow-soft flex items-center gap-5">
                        <div className={cn("p-4 rounded-2xl", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900">{stat.val}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* List */}
            {isLoaded && (
                <Card className="border-none shadow-premium overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-black text-gray-900">Selection Pipeline</h2>
                            <span className="bg-jungle/10 text-jungle text-[10px] font-black px-2 py-1 rounded-md">LIVE BATCH</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" className="h-9 px-3 text-xs font-bold text-gray-500 border border-gray-100 rounded-lg">
                                <Filter className="w-3.5 h-3.5 mr-2" /> Filter By Stage
                            </Button>
                            <Button variant="ghost" className="h-9 px-3 text-xs font-bold text-gray-500 border border-gray-100 rounded-lg">
                                <Download className="w-3.5 h-3.5 mr-2" /> Export
                            </Button>
                        </div>
                    </div>

                    <div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/30 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <th className="py-5 px-8">Candidate</th>
                                    <th className="py-5 px-8">ATX Index</th>
                                    <th className="py-5 px-8">Current Stage</th>
                                    <th className="py-5 px-8">Next Interview</th>
                                    <th className="py-5 px-8">Score</th>
                                    <th className="py-5 px-8 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {candidates.map((cand) => (
                                    <tr key={cand.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden relative border-2 border-white shadow-soft">
                                                    <img src={cand.avatar} alt={cand.name} className="object-cover w-full h-full" />
                                                </div>
                                                <div>
                                                    <Link href={`/recruiter/candidates/${cand.id}`}>
                                                        <p className="font-black text-gray-800 text-sm leading-tight hover:text-jungle cursor-pointer transition-colors">
                                                            {cand.name}
                                                        </p>
                                                    </Link>
                                                    <p className="text-[11px] text-gray-400 font-bold">{cand.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-black text-[#528a7e]">{cand.atx}</span>
                                                <TrendingUp className="w-3.5 h-3.5 text-[#528a7e]" />
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-tight">
                                                {cand.status}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                                <Calendar className="w-3.5 h-3.5 text-jungle" />
                                                {cand.nextInterview}
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                                                <span className="text-sm font-black text-gray-800">{cand.score}</span>
                                                <span className="text-[10px] font-bold text-gray-300">/ 10</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex justify-center items-center gap-3 whitespace-nowrap">
                                                <Link href={`/recruiter/candidates/${cand.id}`}>
                                                    <button className="text-[11px] font-black uppercase tracking-widest text-jungle hover:bg-jungle/5 px-3 py-1.5 rounded-lg transition-all">
                                                        Shortlisted
                                                    </button>
                                                </Link>
                                                <button className="text-[11px] font-black uppercase tracking-widest text-tropicalTeal hover:bg-tropicalTeal/5 px-3 py-1.5 rounded-lg transition-all">
                                                    Move to Interview
                                                </button>
                                                <button className="text-[11px] font-black uppercase tracking-widest text-[#cf8f41] hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-all">
                                                    Roll Offer
                                                </button>
                                                <button
                                                    onClick={() => setCandidates(candidates.filter((c: Candidate) => c.id !== cand.id))}
                                                    className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                                                >
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
}
