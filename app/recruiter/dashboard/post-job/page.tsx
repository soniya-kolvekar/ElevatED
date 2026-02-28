"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Briefcase,
    MapPin,
    DollarSign,
    Target,
    Users,
    ChevronLeft,
    Sparkles,
    PlusCircle,
    CheckCircle2,
    Clock,
    Layout
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function PostJobPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        salaryMin: "",
        salaryMax: "",
        description: "",
        skills: [] as string[],
        benchmark: 750
    });

    const [newSkill, setNewSkill] = useState("");

    // Load draft if editing
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('edit');
        if (editId) {
            const jobs = JSON.parse(localStorage.getItem('recruiter_jobs') || '[]');
            const jobToEdit = jobs.find((j: any) => j.id === editId);
            if (jobToEdit) {
                setFormData(jobToEdit);
            }
        }
    }, []);

    const handleAddSkill = () => {
        if (newSkill && !formData.skills.includes(newSkill)) {
            setFormData({ ...formData, skills: [...formData.skills, newSkill] });
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    };

    const [isSaving, setIsSaving] = useState(false);

    // Save to localStorage helper
    const saveJob = (status: 'draft' | 'published') => {
        setIsSaving(true);
        const jobs = JSON.parse(localStorage.getItem('recruiter_jobs') || '[]');

        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('edit');

        let updatedJobs;
        if (editId) {
            updatedJobs = jobs.map((j: any) =>
                j.id === editId ? { ...formData, status, updatedAt: new Date().toISOString() } : j
            );
        } else {
            const newJob = {
                ...formData,
                id: Math.random().toString(36).substr(2, 9),
                status,
                createdAt: new Date().toISOString(),
                applicants: 0,
                matchRate: 0
            };
            updatedJobs = [...jobs, newJob];
        }

        localStorage.setItem('recruiter_jobs', JSON.stringify(updatedJobs));

        setTimeout(() => {
            setIsSaving(false);
            router.push(status === 'draft' ? '/recruiter/dashboard/drafts' : '/recruiter/dashboard/jobs');
        }, 800);
    };

    return (
        <div className="p-8 max-w-[1000px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* ... existing header ... */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-jungle transition-colors uppercase tracking-widest mb-4"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Post a New Opportunity</h1>
                    <p className="text-gray-500 font-medium mt-1">Define the role and set Al-benchmarks for candidate matching.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-8 border-none shadow-premium bg-white space-y-8">
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                                <Layout className="w-5 h-5 text-jungle" />
                                <h3 className="text-lg font-black text-gray-800">Basic Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Senior Backend Engineer"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-jungle/20 focus:outline-none transition-all"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Department</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Engineering"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-jungle/20 focus:outline-none transition-all"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Remote, Bangalore, etc."
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-jungle/20 focus:outline-none transition-all"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Employment Type</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-jungle/20 focus:outline-none transition-all appearance-none cursor-pointer"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Internship</option>
                                        <option>Contract</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Salary & Description */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                                <DollarSign className="w-5 h-5 text-jungle" />
                                <h3 className="text-lg font-black text-gray-800">Compensation & Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Salary Range (Annual)</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="text"
                                            placeholder="Min"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-jungle/20 focus:outline-none transition-all"
                                            value={formData.salaryMin}
                                            onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                                        />
                                        <span className="text-gray-300 font-black">—</span>
                                        <input
                                            type="text"
                                            placeholder="Max"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-jungle/20 focus:outline-none transition-all"
                                            value={formData.salaryMax}
                                            onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Job Description</label>
                                <textarea
                                    rows={6}
                                    placeholder="Write a compelling job description..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-jungle/20 focus:outline-none transition-all resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                                <Target className="w-5 h-5 text-jungle" />
                                <h3 className="text-lg font-black text-gray-800">Required Skills</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add a skill (e.g. React, Python)"
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-jungle/20 focus:outline-none transition-all"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                    />
                                    <Button
                                        onClick={handleAddSkill}
                                        className="bg-jungle hover:bg-[#3d5a4d] text-white rounded-xl px-6"
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map((skill) => (
                                        <div
                                            key={skill}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-jungle/5 text-jungle text-xs font-black rounded-lg border border-jungle/10 group animate-in zoom-in-95"
                                        >
                                            {skill}
                                            <button
                                                onClick={() => handleRemoveSkill(skill)}
                                                className="text-jungle/40 hover:text-red-500 transition-colors"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    {formData.skills.length === 0 && (
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic p-2">No skills added yet</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* AI Preview Card */}
                    <Card className="p-8 border-none shadow-premium bg-[#4a6b5d] text-white space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="w-5 h-5 text-white animate-pulse" />
                            <h3 className="text-lg font-black tracking-tight">AI Matching Settings</h3>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Minimum ATX Benchmark</label>
                                    <span className="text-2xl font-black">{formData.benchmark}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                                    value={formData.benchmark}
                                    onChange={(e) => setFormData({ ...formData, benchmark: parseInt(e.target.value) })}
                                />
                                <p className="text-[11px] font-medium opacity-60 leading-relaxed italic">
                                    Candidates with an ATX score below this benchmark will be automatically flagged as "Low Performance Match".
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                    <span className="text-xs font-bold">Automated Skill Verification</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                    <span className="text-xs font-bold">Academic Policy Validation</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-white opacity-40" />
                                    <span className="text-xs font-bold opacity-60">Custom Technical Video Test</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Stats/Info */}
                    <Card className="p-6 border-none shadow-premium bg-white">
                        <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">Visibility</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500">Live Date</span>
                                <span className="text-xs font-black text-gray-900">Today</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500">Duration</span>
                                <span className="text-xs font-black text-gray-900">30 Days</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500">Internal Review</span>
                                <span className="text-xs font-black text-jungle bg-jungle/5 px-2 py-0.5 rounded-md">Enabled</span>
                            </div>
                        </div>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                        <Button
                            onClick={() => saveJob('published')}
                            disabled={isSaving}
                            className="w-full bg-jungle hover:bg-[#3d5a4d] text-white font-black py-6 rounded-2xl shadow-soft disabled:opacity-50"
                        >
                            <PlusCircle className="w-5 h-5 mr-3" /> {isSaving ? 'Processing...' : 'Publish Opportunity'}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => saveJob('draft')}
                            disabled={isSaving}
                            className="w-full border-gray-200 text-gray-400 hover:bg-gray-50 font-black py-4 rounded-2xl disabled:opacity-50"
                        >
                            Save as Draft
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
