"use client";

import { useState } from "react";
import { UserIcon, BriefcaseIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function AdminProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "Dr. Arvind Swamy",
        title: "Dean of Placements",
        email: "dean.placements@elevated.edu",
        phone: "+91 98765 43210",
        department: "Placement & Training Cell",
        bio: "Overseeing global corporate relations and campus recruitment for over 15 years. Dedicated to maximizing student career opportunities."
    });

    const [tempProfile, setTempProfile] = useState(profile);

    const handleSave = () => {
        setProfile(tempProfile);
        setIsEditing(false);
    };

    return (
        <div className="w-full pb-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 mt-2">
                <div>
                    <h1 className="text-[28px] leading-tight font-extrabold text-[#0a192f] mb-1.5 tracking-tight">
                        Administrator Profile
                    </h1>
                    <p className="text-[14px] text-gray-500 font-medium">
                        Manage your personal details and contact information.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    {isEditing ? (
                        <>
                            <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-[13px] font-bold transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-5 py-2.5 bg-[#457c5f] hover:bg-[#346048] text-white rounded-full text-[13px] font-bold transition-colors shadow-sm shadow-[#457c5f]/20">
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 bg-[#457c5f] hover:bg-[#346048] text-white rounded-full text-[13px] font-bold transition-colors shadow-sm shadow-[#457c5f]/20">
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#f0f3f1] max-w-3xl">
                <div className="flex items-start gap-8">
                    <div className="w-24 h-24 rounded-full bg-[#f4f7f5] border-2 border-[#e9f0ec] flex items-center justify-center shrink-0">
                        <UserIcon className="w-12 h-12 text-[#457c5f]" />
                    </div>
                    <div className="flex-1 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                {isEditing ? (
                                    <input type="text" value={tempProfile.name} onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })} className="w-full px-3 py-2 bg-[#f8fbfa] border border-[#e9f0ec] rounded-lg text-[14px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]" />
                                ) : (
                                    <div className="text-[15px] font-bold text-[#0a192f]">{profile.name}</div>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Title / Role</label>
                                {isEditing ? (
                                    <input type="text" value={tempProfile.title} onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })} className="w-full px-3 py-2 bg-[#f8fbfa] border border-[#e9f0ec] rounded-lg text-[14px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]" />
                                ) : (
                                    <div className="text-[15px] font-bold text-[#0a192f] flex items-center gap-2">
                                        <BriefcaseIcon className="w-4 h-4 text-gray-400" /> {profile.title}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                                {isEditing ? (
                                    <input type="email" value={tempProfile.email} onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })} className="w-full px-3 py-2 bg-[#f8fbfa] border border-[#e9f0ec] rounded-lg text-[14px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]" />
                                ) : (
                                    <div className="text-[15px] font-bold text-[#0a192f] flex items-center gap-2">
                                        <EnvelopeIcon className="w-4 h-4 text-gray-400" /> {profile.email}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                                {isEditing ? (
                                    <input type="tel" value={tempProfile.phone} onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })} className="w-full px-3 py-2 bg-[#f8fbfa] border border-[#e9f0ec] rounded-lg text-[14px] font-bold text-[#0a192f] focus:outline-none focus:border-[#457c5f]" />
                                ) : (
                                    <div className="text-[15px] font-bold text-[#0a192f] flex items-center gap-2">
                                        <PhoneIcon className="w-4 h-4 text-gray-400" /> {profile.phone}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-[#f0f3f1]">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Bio / Summary</label>
                            {isEditing ? (
                                <textarea rows={4} value={tempProfile.bio} onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })} className="w-full px-3 py-2 bg-[#f8fbfa] border border-[#e9f0ec] rounded-lg text-[14px] font-medium text-gray-600 focus:outline-none focus:border-[#457c5f] resize-none"></textarea>
                            ) : (
                                <div className="text-[14px] font-medium text-gray-600 leading-relaxed">{profile.bio}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
