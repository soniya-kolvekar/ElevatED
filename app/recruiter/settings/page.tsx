"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    User,
    Mail,
    Camera,
    Save,
    Sparkles,
    ChevronRight,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { updateUserDocument } from "@/lib/firebase/firestore";

export default function SettingsPage() {
    const { user, setUser, _hasHydrated } = useAuthStore();
    const [isSaving, setIsSaving] = useState(false);
    const [hasPopulated, setHasPopulated] = useState(false);
    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [saveSuccess, setSaveSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync state when user is loaded from persistent storage
    useEffect(() => {
        if (_hasHydrated && user && !hasPopulated) {
            setName(user.name || "");
            setAvatarUrl(user.avatarUrl || "");
            setHasPopulated(true);
        }
    }, [_hasHydrated, user, hasPopulated]);

    const handleSave = async () => {
        if (!user || (!name && !avatarUrl)) return;
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            const updatedData = {
                name: name || user.name,
                displayName: name || user.name, // Sync both fields
                avatarUrl: avatarUrl || user.avatarUrl
            };
            await updateUserDocument(user.uid, updatedData);
            setUser({ ...user, ...updatedData });
            setName(""); // Clear the input after successful save
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save settings", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleNameChange = (newName: string) => {
        setName(newName);
        if (user) {
            setUser({ ...user, name: newName || user.name, displayName: newName || user.name });
        }
    };

    if (!_hasHydrated) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const b64 = reader.result as string;
                setAvatarUrl(b64);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-[#f8fafa] p-8 pb-20">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-widest text-jungle mb-3">
                        <Sparkles className="w-4 h-4" />
                        System Settings
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-gray-900">Profile Settings</h1>
                    <p className="text-gray-500 font-medium mt-2">Manage your recruiter profile and public information.</p>
                </div>

                {/* Main Content */}
                <Card className="p-10 border-none shadow-premium bg-white">
                    <h2 className="text-xl font-black text-gray-900 mb-10 flex items-center gap-3">
                        <div className="w-2 h-6 bg-jungle rounded-full" />
                        Public Profile
                    </h2>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <div className="space-y-10">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center text-center gap-6 pb-10 border-b border-gray-50">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-[2rem] bg-jungle/5 overflow-hidden ring-8 ring-white shadow-premium flex items-center justify-center text-4xl font-black text-jungle transition-all group-hover:scale-105 duration-500">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : user?.avatarUrl ? (
                                        <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{(name || user?.name || "R").charAt(0)}</span>
                                    )}
                                </div>
                                <button
                                    onClick={triggerFileInput}
                                    className="absolute -bottom-2 -right-2 p-3 bg-jungle text-white rounded-2xl shadow-xl hover:scale-110 hover:rotate-12 transition-all group-hover:bottom-0 group-hover:right-0"
                                >
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 mb-1 leading-tight tracking-tight uppercase">
                                    {name || user?.name || "Recruiter Name"}
                                </h3>
                                <p className="text-xs text-jungle font-black uppercase tracking-[0.2em] mb-4 opacity-70">Talent Lead</p>
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-9 px-4 rounded-lg border-2 border-gray-100 text-[11px] font-black hover:bg-gray-50 transition-colors"
                                        onClick={() => {
                                            setAvatarUrl("");
                                        }}
                                    >
                                        Remove Photo
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 px-4 rounded-lg text-[11px] font-black text-jungle hover:bg-jungle/5"
                                        onClick={triggerFileInput}
                                    >
                                        Change Photo
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-1 py-1">
                                        <div className="h-full w-10 flex items-center justify-center bg-gray-50 rounded-xl border border-transparent group-focus-within:border-jungle/20 transition-all">
                                            <User className="w-4 h-4 text-gray-400 group-focus-within:text-jungle transition-colors" />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        onFocus={(e) => e.target.select()}
                                        className="w-full pl-14 pr-4 py-4 bg-white border-2 border-gray-50 rounded-3xl text-sm font-bold focus:ring-4 focus:ring-jungle/10 focus:border-jungle outline-none transition-all shadow-sm focus:shadow-md"
                                        placeholder="Enter your professional name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-1 py-1">
                                        <div className="h-full w-10 flex items-center justify-center bg-gray-50/50 rounded-xl">
                                            <Mail className="w-4 h-4 text-gray-300" />
                                        </div>
                                    </div>
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="w-full pl-14 pr-4 py-4 bg-gray-50/30 border-2 border-gray-50 rounded-3xl text-sm font-bold text-gray-300 cursor-not-allowed"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold ml-1 italic">* Email cannot be changed for security reasons.</p>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-center">
                            <Button
                                className={cn(
                                    "h-14 px-12 font-black rounded-[1.5rem] shadow-premium transition-all duration-300 hover:-translate-y-0.5",
                                    saveSuccess
                                        ? "bg-emerald-500 text-white shadow-emerald-200"
                                        : "bg-jungle hover:bg-jungle/90 text-white"
                                )}
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Syncing...
                                    </div>
                                ) : saveSuccess ? (
                                    <div className="flex items-center gap-2 text-lg animate-in zoom-in duration-300">
                                        <Sparkles className="w-5 h-5 text-white" />
                                        Profile Updated!
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-lg">
                                        <Save className="w-5 h-5" />
                                        Save Changes
                                    </div>
                                )}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
