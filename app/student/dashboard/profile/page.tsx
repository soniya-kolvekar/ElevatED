"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { motion } from "framer-motion";
import {
    Mail, GraduationCap, Github, Globe, Linkedin, Code2, Edit2, Check, X, Loader2, Bookmark, CheckCircle
} from "lucide-react";

export default function ProfilePage() {
    const { user, setUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        displayName: "",
        bio: "",
        branch: "",
        cgpa: "",
        githubUrl: "",
        portfolioUrl: "",
        linkedinUrl: "",
        leetcodeUrl: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || user.name || "",
                bio: user.bio || "",
                branch: user.branch || "",
                cgpa: user.cgpa?.toString() || "",
                githubUrl: user.githubUrl || "",
                portfolioUrl: user.portfolioUrl || "",
                linkedinUrl: user.linkedinUrl || "",
                leetcodeUrl: user.leetcodeUrl || "",
            });
        }
    }, [user, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSave = async () => {
        if (!user) return;
        setIsLoading(true);

        try {
            const userRef = doc(db, "users", user.uid);

            const updates = {
                displayName: formData.displayName,
                bio: formData.bio,
                branch: formData.branch,
                cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
                githubUrl: formData.githubUrl,
                portfolioUrl: formData.portfolioUrl,
                linkedinUrl: formData.linkedinUrl,
                leetcodeUrl: formData.leetcodeUrl,
            };

            await updateDoc(userRef, updates);

            // Update local Zustand state
            setUser({
                ...user,
                ...updates,
                cgpa: formData.cgpa ? parseFloat(formData.cgpa) : undefined
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="space-y-8 pb-12 max-w-5xl mx-auto">
            {/* Header Area */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#111827] leading-none mb-1 tracking-tight">Public Profile</h1>
                    <p className="text-sm text-[#6b7280] font-medium">
                        Manage your personal information, social links, and bio.
                    </p>
                </div>
                {!isEditing && (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#4a7c59] text-white font-bold rounded-lg px-5 h-10 gap-2 shadow-sm hover:bg-[#3d664a] transition-colors"
                    >
                        <Edit2 size={14} className="opacity-90" /> Edit Profile
                    </Button>
                )}
            </div>

            {/* Main Profile Container */}
            <Card className="p-0 overflow-hidden border-[#e5e7eb] bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative">

                {/* Banner Area */}
                <div className="h-40 bg-[#c4d7cc] w-full absolute top-0 left-0 right-0 z-0"></div>

                {/* Profile Header Content */}
                <div className="p-8 relative z-10 pt-20">
                    <div className="flex flex-col md:flex-row gap-6 items-end md:items-center">
                        {/* Rounded Square Avatar */}
                        <div className="w-[120px] h-[120px] rounded-[24px] bg-white shadow-sm border border-[#e5e7eb] flex items-center justify-center text-[#4a7c59] font-black text-6xl shrink-0 translate-y-4 md:translate-y-0">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        {/* User Details */}
                        <div className="flex-1 w-full space-y-4 pt-4 md:pt-0 pl-1">
                            {isEditing ? (
                                <div className="space-y-4 w-full max-w-xl bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Display Name</label>
                                            <input
                                                name="displayName"
                                                value={formData.displayName}
                                                onChange={handleChange}
                                                className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-[#4a7c59] focus:ring-1 focus:ring-[#4a7c59] outline-none transition-all text-sm font-bold text-gray-900"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Short Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#4a7c59] focus:ring-1 focus:ring-[#4a7c59] outline-none transition-all text-sm font-medium text-gray-700 resize-none"
                                            placeholder="Full Stack Developer passionate about scalable systems..."
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-[28px] font-bold text-[#2d3748] tracking-tight">{user.displayName || user.name}</h2>
                                    <div className="flex items-center gap-4 mt-2 mb-1">
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <Mail size={14} className="opacity-70" />
                                            <span className="text-xs font-medium">{user.email}</span>
                                        </div>
                                        {user.bio ? (
                                            <p className="text-[#4a5568] font-bold text-sm">{user.bio}</p>
                                        ) : (
                                            <p className="text-[#4a5568] font-bold text-sm capitalize">{user.branch || "Student"}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Detailed Information Grids */}
                <div className="grid grid-cols-1 md:grid-cols-2 mt-8 md:mt-2 border-t border-[#f3f4f6]">

                    {/* Academics Cell */}
                    <div className="p-8 md:border-r border-[#f3f4f6]">
                        <div className="flex items-center gap-2 mb-8">
                            <GraduationCap className="text-[#4a7c59]" size={18} />
                            <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#111827]">Academics</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[9px] font-black text-[#9ca3af] uppercase tracking-[0.15em] mb-1.5 block">Branch / Domain</label>
                                {isEditing ? (
                                    <input
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        className="w-full h-10 px-3 max-w-[240px] rounded-md border border-gray-200 focus:border-[#4a7c59] outline-none transition-all text-sm font-bold text-gray-900"
                                        placeholder="Computer Science"
                                    />
                                ) : (
                                    <p className="text-[#1f2937] font-bold text-[15px] tracking-tight">{user.branch || "Not specified"}</p>
                                )}
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-[#9ca3af] uppercase tracking-[0.15em] mb-1.5 block">CGPA</label>
                                {isEditing ? (
                                    <input
                                        name="cgpa"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="10"
                                        value={formData.cgpa}
                                        onChange={handleChange}
                                        className="w-full h-10 px-3 max-w-[120px] rounded-md border border-gray-200 focus:border-[#4a7c59] outline-none transition-all text-sm font-bold text-gray-900"
                                        placeholder="8.5"
                                    />
                                ) : (
                                    <p className="text-[#1f2937] font-bold text-[15px] tracking-tight">{user.cgpa ? user.cgpa.toFixed(2) : "Not specified"}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Social & Links Cell */}
                    <div className="p-8">
                        <div className="flex items-center gap-2 mb-8">
                            <Globe className="text-[#4a7c59]" size={18} />
                            <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#111827]">Social & Links</h3>
                        </div>

                        <div className="space-y-5">
                            {/* Github */}
                            <div>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <Github size={12} className="text-[#9ca3af]" />
                                    <label className="text-[9px] font-black text-[#9ca3af] uppercase tracking-[0.15em]">GitHub</label>
                                </div>
                                {isEditing ? (
                                    <input
                                        name="githubUrl"
                                        value={formData.githubUrl}
                                        onChange={handleChange}
                                        className="w-full h-9 px-3 rounded-md border border-gray-200 focus:border-[#4a7c59] outline-none transition-all text-sm font-medium text-gray-900"
                                        placeholder="https://github.com/..."
                                    />
                                ) : (
                                    user.githubUrl ? (
                                        <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] font-bold text-[13px] hover:underline hover:text-[#2563eb] block truncate max-w-[300px]">{user.githubUrl}</a>
                                    ) : <p className="text-[#9ca3af] italic text-[13px] font-medium">Not specified</p>
                                )}
                            </div>

                            {/* LinkedIn */}
                            <div>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <Linkedin size={12} className="text-[#9ca3af]" />
                                    <label className="text-[9px] font-black text-[#9ca3af] uppercase tracking-[0.15em]">LinkedIn</label>
                                </div>
                                {isEditing ? (
                                    <input
                                        name="linkedinUrl"
                                        value={formData.linkedinUrl}
                                        onChange={handleChange}
                                        className="w-full h-9 px-3 rounded-md border border-gray-200 focus:border-[#4a7c59] outline-none transition-all text-sm font-medium text-gray-900"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                ) : (
                                    user.linkedinUrl ? (
                                        <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] font-bold text-[13px] hover:underline hover:text-[#2563eb] block truncate max-w-[300px]">{user.linkedinUrl}</a>
                                    ) : <p className="text-[#9ca3af] italic text-[13px] font-medium">Not specified</p>
                                )}
                            </div>

                            {/* Leetcode */}
                            <div>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <Code2 size={12} className="text-[#9ca3af]" />
                                    <label className="text-[9px] font-black text-[#9ca3af] uppercase tracking-[0.15em]">LeetCode</label>
                                </div>
                                {isEditing ? (
                                    <input
                                        name="leetcodeUrl"
                                        value={formData.leetcodeUrl}
                                        onChange={handleChange}
                                        className="w-full h-9 px-3 rounded-md border border-gray-200 focus:border-[#4a7c59] outline-none transition-all text-sm font-medium text-gray-900"
                                        placeholder="https://leetcode.com/u/..."
                                    />
                                ) : (
                                    user.leetcodeUrl ? (
                                        <a href={user.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] font-bold text-[13px] hover:underline hover:text-[#2563eb] block truncate max-w-[300px]">{user.leetcodeUrl}</a>
                                    ) : <p className="text-[#9ca3af] italic text-[13px] font-medium">Not specified</p>
                                )}
                            </div>

                            {/* Portfolio */}
                            <div>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <Globe size={12} className="text-[#9ca3af]" />
                                    <label className="text-[9px] font-black text-[#9ca3af] uppercase tracking-[0.15em]">Portfolio Site</label>
                                </div>
                                {isEditing ? (
                                    <input
                                        name="portfolioUrl"
                                        value={formData.portfolioUrl}
                                        onChange={handleChange}
                                        className="w-full h-9 px-3 rounded-md border border-gray-200 focus:border-[#4a7c59] outline-none transition-all text-sm font-medium text-gray-900"
                                        placeholder="https://..."
                                    />
                                ) : (
                                    user.portfolioUrl ? (
                                        <a href={user.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-[#8b5cf6] font-bold text-[13px] hover:underline hover:text-[#7c3aed] block truncate max-w-[300px]">{user.portfolioUrl}</a>
                                    ) : <p className="text-[#9ca3af] italic text-[13px] font-medium">Not specified</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tracked Opportunities Section */}
                <div className="p-8 bg-[#f9fafb] border-t border-[#f3f4f6]">
                    <div className="flex items-center gap-2 mb-8">
                        <Bookmark className="text-[#4a7c59]" size={18} />
                        <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#111827]">Tracked Opportunities</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Applied Jobs */}
                        <div>
                            <h4 className="text-[9px] font-black text-[#9ca3af] uppercase tracking-[0.15em] mb-4">Applied ({user.appliedJobs?.length || 0})</h4>
                            <div className="space-y-3">
                                {user.appliedJobs?.length ? (
                                    user.appliedJobs.map((job: any) => (
                                        <div key={job.id} className="p-5 h-[72px] rounded-xl border border-[#f3f4f6] bg-white flex flex-row justify-between items-center shadow-sm">
                                            <div className="truncate pr-4">
                                                <h5 className="text-[13px] font-bold text-[#111827] leading-tight truncate">{job.title}</h5>
                                                <p className="text-[11px] font-medium text-[#6b7280] mt-0.5 truncate">{job.company}</p>
                                            </div>
                                            <div className="shrink-0 flex items-center justify-center bg-[#ecfdf5] border border-[#d1fae5] rounded px-2.5 h-[22px]">
                                                <CheckCircle size={10} className="text-[#059669] mr-1" strokeWidth={3} />
                                                <span className="text-[9px] font-black tracking-widest uppercase text-[#059669]">
                                                    {job.status || "APPLIED"}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-[11px] text-[#9ca3af] italic">No applications tracked yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Saved Jobs */}
                        <div>
                            <h4 className="text-[9px] font-black text-[#9ca3af] uppercase tracking-[0.15em] mb-4">Saved ({user.savedJobs?.length || 0})</h4>
                            <div className="space-y-3">
                                {user.savedJobs?.length ? (
                                    user.savedJobs.map((job: any) => (
                                        <div key={job.id} className="p-5 h-[72px] rounded-xl border border-[#f3f4f6] bg-white flex flex-row justify-between items-center shadow-sm">
                                            <div className="truncate pr-4">
                                                <h5 className="text-[13px] font-bold text-[#111827] leading-tight truncate">{job.title}</h5>
                                                <p className="text-[11px] font-medium text-[#6b7280] mt-0.5 truncate">{job.company}</p>
                                            </div>
                                            <div className="shrink-0 flex items-center justify-center bg-[#f3f4f6] border border-[#e5e7eb] rounded px-2.5 h-[22px]">
                                                <span className="text-[9px] font-black tracking-widest uppercase text-[#4b5563]">
                                                    SAVED
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-[11px] text-[#9ca3af] italic">No saved opportunities.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Action Bar */}
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border-t border-[#f3f4f6] p-5 flex justify-end gap-3 rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-20"
                    >
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                            disabled={isLoading}
                            className="text-[#4b5563] font-bold hover:bg-[#f9fafb] border-[#e5e7eb] rounded-lg h-9 text-xs shadow-sm"
                        >
                            <X size={14} className="mr-1.5" /> Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-[#4a7c59] text-white font-bold hover:bg-[#3d664a] rounded-lg h-9 px-5 text-xs shadow-sm ring-1 ring-black/5"
                        >
                            {isLoading ? <Loader2 size={14} className="animate-spin mr-1.5" /> : <Check size={14} className="mr-1.5" />}
                            Save Profile
                        </Button>
                    </motion.div>
                )}
            </Card>
        </div>
    );
}
