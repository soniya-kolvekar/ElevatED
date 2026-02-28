"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';
import {
    Filter,
    ChevronDown,
    Building2,
    Clock,
    DollarSign,
    Zap,
    TrendingUp,
    BrainCircuit,
    ArrowUpRight,
    ArrowRight,
    CheckCircle2,
    PlusCircle,
    CheckCircle
} from "lucide-react";
import { getStudentDashboardData } from "@/lib/student-data";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase/config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const MOCK_OPPORTUNITIES = [
    {
        id: "opp-1",
        company: "Google",
        role: "Associate Product Manager",
        location: "Mountain View, CA",
        salary: "$120k - $160k",
        type: "Full-Time",
        match: 94,
        category: "Product Management",
        badges: ["SQL EXPERT", "TOP 5% APPLICANT"],
        radarData: [
            { subject: 'SQL', A: 140, fullMark: 150 },
            { subject: 'Strategy', A: 120, fullMark: 150 },
            { subject: 'Design', A: 86, fullMark: 150 },
            { subject: 'Comms', A: 110, fullMark: 150 },
            { subject: 'Analytics', A: 130, fullMark: 150 },
        ],
        whyMatch: [
            "Exceeds SQL proficiency requirements",
            "Top 5% in Problem Solving (ATX)"
        ],
        gaps: [
            { label: "A/B Testing", critical: false },
            { label: "Roadmapping Tools", critical: false },
            { label: "System Design (Low Score)", critical: true }
        ],
        recommendation: "Complete the 'Advanced System Design' Skill Lab module to increase match by 4%.",
        logoColor: "bg-gray-900 border-gray-800 text-white",
        logoText: "G"
    },
    {
        id: "opp-2",
        company: "Stripe",
        role: "Full Stack Engineer (Growth)",
        location: "San Francisco, CA",
        salary: "$140k - $190k",
        type: "Hybrid",
        match: 82,
        category: "Software Engineering",
        badges: ["TOP 10% CANDIDATE", "REACT EXPERT"],
        radarData: [
            { subject: 'React', A: 140, fullMark: 150 },
            { subject: 'Node', A: 110, fullMark: 150 },
            { subject: 'DB', A: 90, fullMark: 150 },
            { subject: 'System', A: 85, fullMark: 150 },
            { subject: 'Growth', A: 120, fullMark: 150 },
        ],
        whyMatch: [
            "Matches required tech stack exactly",
            "Strong side-project impact metrics"
        ],
        gaps: [
            { label: "High Scale Architecture", critical: true },
            { label: "Payments Domain", critical: false }
        ],
        recommendation: "Focus your next project on high-throughput message queues.",
        logoColor: "bg-blue-900 border-blue-800 text-white",
        logoText: "S"
    },
    {
        id: "opp-3",
        company: "Meta",
        role: "Data Scientist, Analytics",
        location: "Menlo Park, CA",
        salary: "$155k - $210k",
        type: "On-Site",
        match: 78,
        category: "Data Science",
        badges: ["PYTHON CORE", "STRONG ANALYTICS"],
        radarData: [
            { subject: 'Python', A: 140, fullMark: 150 },
            { subject: 'SQL', A: 130, fullMark: 150 },
            { subject: 'Stats', A: 110, fullMark: 150 },
            { subject: 'ML', A: 70, fullMark: 150 },
            { subject: 'Viz', A: 95, fullMark: 150 },
        ],
        whyMatch: [
            "Strong Analytical Thinking ATX score",
            "Significant Python coursework"
        ],
        gaps: [
            { label: "A/B Testing Frameworks", critical: true },
            { label: "Dashboarding", critical: false }
        ],
        recommendation: "Add more end-to-end data visualization tools to portfolio.",
        logoColor: "bg-[#0668E1] border-blue-700 text-white",
        logoText: "M"
    }
];

const OpportunityCard = ({
    opp, user, expandedIds, toggleExpand, onSave, onApply
}: any) => {
    const isExpanded = expandedIds.includes(opp.id);
    const isSaved = user?.savedJobs?.some((j: any) => j.id === opp.id) || false;
    const isApplied = user?.appliedJobs?.some((j: any) => j.id === opp.id) || false;

    return (
        <Card className="bg-white p-6 md:p-8 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div className="flex items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center border justify-center text-xl font-bold", opp.logoColor)}>
                        {opp.logoText}
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-gray-900 leading-tight">{opp.role}</h4>
                        <p className="text-sm font-bold text-gray-500">{opp.company} • {opp.location} (Remote Friendly)</p>
                        <div className="flex gap-4 mt-2">
                            <span className="text-[11px] font-black text-[#4a7c59] flex items-center gap-1 uppercase">
                                <DollarSign size={13} /> {opp.salary}
                            </span>
                            <span className="text-[11px] font-black text-[#4a7c59] flex items-center gap-1 uppercase">
                                <Clock size={13} /> {opp.type}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end shrink-0 w-32 border-l border-gray-100 pl-4">
                    <span className="text-[10px] font-black uppercase text-[#4a7c59]/60 tracking-widest mb-1">Match Score</span>
                    <span className="text-3xl font-black text-[#5fb896] leading-none mb-1">{opp.match}%</span>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-[#5fb896] rounded-full" style={{ width: `${opp.match}%` }} />
                    </div>
                </div>
            </div>

            {!isExpanded && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
                    <div className="flex gap-2">
                        {opp.badges.map((b: string) => (
                            <span key={b} className="px-3 py-1 bg-[#4a7c59]/10 text-[#4a7c59] text-[9px] font-black uppercase tracking-widest rounded-full">{b}</span>
                        ))}
                    </div>
                    <button onClick={() => toggleExpand(opp.id)} className="text-[11px] font-black text-[#4a7c59] flex items-center gap-1 hover:underline">
                        View alignment details <ChevronDown size={14} />
                    </button>
                </div>
            )}

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 mt-4 border-t border-gray-100">
                            <div>
                                <h5 className="text-[11px] font-black text-[#4a7c59] uppercase tracking-widest mb-4">Why You Match</h5>
                                <div className="h-32 w-full mb-4 opacity-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={opp.radarData}>
                                            <PolarGrid stroke="#f3f4f6" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 800, fill: '#9ca3af' }} />
                                            <Radar name="Match" dataKey="A" stroke="#5fb896" fill="#5fb896" fillOpacity={0.2} strokeWidth={2} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                                <ul className="space-y-2 mt-2">
                                    {opp.whyMatch.map((m: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                            <CheckCircle2 size={14} className="text-[#4a7c59] shrink-0" /> {m}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col">
                                <h5 className="text-[11px] font-black text-[#4a7c59] uppercase tracking-widest mb-4">Gaps to Bridge</h5>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {opp.gaps.map((g: any, i: number) => (
                                        <div key={i} className={cn(
                                            "flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold border",
                                            g.critical ? "bg-red-50 text-red-600 border-red-100" : "bg-gray-50 text-gray-600 border-gray-200"
                                        )}>
                                            {g.label} {g.critical ? "" : <span className="ml-1 opacity-50">℗</span>}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 font-medium italic border-l-2 border-gray-200 pl-3 mb-auto">
                                    Recommendation: {opp.recommendation}
                                </p>
                                <div className="mt-8 flex flex-col gap-3">
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); onApply(opp); }}
                                        disabled={isApplied}
                                        className="w-full h-12 bg-[#4a7c59] hover:bg-[#3d664a] text-white font-black rounded-xl gap-2 transition-all shadow-md active:scale-95"
                                    >
                                        {isApplied ? (
                                            <>APPLIED <CheckCircle size={18} /></>
                                        ) : (
                                            <>APPLY NOW <ArrowRight size={18} /></>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); onSave(opp); }}
                                        disabled={isSaved}
                                        variant="outline"
                                        className="w-full h-12 border-gray-200 text-[#4a7c59] bg-white font-black rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                                    >
                                        {isSaved ? "Saved Opportunity ✓" : "Save Opportunity"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 text-center mt-4">
                            <button onClick={() => toggleExpand(opp.id)} className="text-[11px] font-black text-gray-400 flex items-center justify-center w-full gap-1 hover:text-gray-600 uppercase tracking-widest">
                                Collapse details <ChevronDown size={14} className="rotate-180" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

export default function MatchesPage() {
    const { user, setUser } = useAuthStore();
    const [activeFilter, setActiveFilter] = useState("All Matches");
    const [expandedIds, setExpandedIds] = useState<string[]>(["opp-1"]);

    // Calculate Dynamic UI metrics if available
    const marketabilityTrend = user?.resumeData?.marketabilityTrend || 12.4;

    const toggleExpand = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSave = async (opp: any) => {
        if (!user) return;
        const newSavedJob = {
            id: opp.id,
            title: opp.role,
            company: opp.company,
            savedAt: Date.now()
        };
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            savedJobs: arrayUnion(newSavedJob)
        });
        setUser({ ...user, savedJobs: [...(user.savedJobs || []), newSavedJob] });
    };

    const handleApply = async (opp: any) => {
        if (!user) return;
        const newAppliedJob = {
            id: opp.id,
            title: opp.role,
            company: opp.company,
            appliedAt: Date.now(),
            status: "Applied"
        };
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            appliedJobs: arrayUnion(newAppliedJob)
        });
        setUser({ ...user, appliedJobs: [...(user.appliedJobs || []), newAppliedJob] });
    };

    const filters = ['All Matches', 'High Match (90+)', 'Product Roles', 'Frontend', 'Backend'];

    const filteredOpportunities = MOCK_OPPORTUNITIES.filter(opp => {
        if (activeFilter === 'All Matches') return true;
        if (activeFilter === 'High Match (90+)') return opp.match >= 90;
        if (activeFilter === 'Product Roles') return opp.category === "Product Management";
        if (activeFilter === 'Frontend' || activeFilter === 'Backend') {
            const roleLower = opp.role.toLowerCase();
            return roleLower.includes(activeFilter.toLowerCase()) || opp.category.toLowerCase().includes(activeFilter.toLowerCase());
        }
        return true;
    });

    return (
        <div className="space-y-8 pb-12 max-w-5xl mx-auto bg-[#f8f6f0] min-h-screen px-4 md:px-0">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 pt-6">
                {filters.map((tab, idx) => (
                    <button
                        key={tab}
                        onClick={() => setActiveFilter(tab)}
                        className={cn(
                            "px-4 py-2 border rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                            activeFilter === tab
                                ? "bg-[#4a7c59] text-white border-[#4a7c59] shadow-sm flex items-center gap-1.5"
                                : "bg-white text-gray-500 border-gray-200 hover:border-[#4a7c59]/50 hover:text-[#4a7c59]"
                        )}
                    >
                        {tab === 'All Matches' && activeFilter === tab && <Filter size={12} />}
                        {tab}
                    </button>
                ))}
            </div>

            {/* Opportunities List */}
            <div className="space-y-6">
                {filteredOpportunities.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 font-bold">No matches found for this filter.</div>
                ) : (
                    filteredOpportunities.map((opp, idx) => (
                        <motion.div
                            key={opp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <OpportunityCard
                                opp={opp}
                                user={user}
                                expandedIds={expandedIds}
                                toggleExpand={toggleExpand}
                                onSave={handleSave}
                                onApply={handleApply}
                            />
                        </motion.div>
                    ))
                )}
            </div>

            {/* Bottom Metrics matching Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {/* Skill Strength */}
                <div className="bg-[#4a7c59] rounded-2xl p-6 text-white relative overflow-hidden shadow-sm">
                    <div className="absolute right-4 top-4 opacity-20">
                        <BrainCircuit size={80} />
                    </div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#a5c3af] mb-1">Skill Strength</h5>
                    <h4 className="text-base font-bold mb-4">Analytical Thinking</h4>
                    <span className="text-4xl font-black block mb-4">Top 2%</span>
                    <p className="text-xs text-[#a5c3af] leading-relaxed max-w-[85%] font-medium">
                        Your cognitive assessment scores place you ahead of 98% of engineering students in systemic logic.
                    </p>
                </div>

                {/* Placement Trend */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp size={16} className="text-[#4a7c59]" />
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Placement Trend</h5>
                        </div>
                        <h4 className="text-lg font-black text-gray-900 mb-1">Marketability</h4>
                        <span className="text-4xl font-black text-[#5fb896]">+{marketabilityTrend}%</span>
                    </div>
                    <div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full mt-4 overflow-hidden mb-2">
                            <div className="h-full bg-[#5fb896] rounded-full w-2/3" />
                        </div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rising faster than peers</p>
                    </div>
                </div>

                {/* Boost Score */}
                <div className="bg-[#e4ebdd] border border-[#cbd8c0] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h4 className="text-xl font-black text-[#3d664a] leading-tight mb-2">Boost Your<br />Score Today</h4>
                        <p className="text-xs text-[#4a7c59]/80 font-bold">
                            Missing 2 core technical skills for high-paying roles.
                        </p>
                    </div>
                    <Button className="w-full bg-[#4a7c59] hover:bg-[#3d664a] text-white font-black h-10 rounded-xl mt-4 gap-1 text-[11px] uppercase tracking-widest shadow-sm">
                        Enter Skill Lab <ArrowUpRight size={14} />
                    </Button>
                </div>
            </div>

            
        </div>
    );
}
