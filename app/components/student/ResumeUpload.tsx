"use client";

import { useState } from "react";
import { UploadCloud, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store/useAuthStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export function ResumeUpload() {
    const { user, setUser } = useAuthStore();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<"idle" | "uploading" | "analyzing" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            if (selected.type === "application/pdf" || selected.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                setFile(selected);
                setStatus("idle");
            } else {
                setErrorMessage("Please upload a PDF or DOCX file.");
                setStatus("error");
            }
        }
    };

    const processResume = async () => {
        if (!file || !user) return;
        setUploading(true);
        setStatus("uploading");

        try {
            // 1. Upload to Cloudinary Unauthenticated Endpoint
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

            if (!cloudName || !uploadPreset) {
                throw new Error("Cloudinary configuration missing in environment.");
            }

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                method: "POST",
                body: formData
            });

            if (!uploadRes.ok) throw new Error("Cloudinary upload failed.");

            const cloudData = await uploadRes.json();
            const realCloudinaryUrl = cloudData.secure_url;

            // 2. Analyze via Gemini API
            setStatus("analyzing");
            const res = await fetch("/api/parse-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeUrl: realCloudinaryUrl, userId: user.uid }),
            });

            if (!res.ok) throw new Error("Failed to analyze resume");

            const parsedData = await res.json();

            // 3. Optional: Call ATX Engine
            const atxRes = await fetch("/api/calculate-atx", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ parsedData, userId: user.uid }),
            });
            const atxData = await atxRes.json();

            // 4. Update Firestore and local state
            const updatedUser = {
                ...user,
                resumeUrl: realCloudinaryUrl,
                skills: parsedData.skills || [],
                atxScore: atxData.totalScore || 0,
                level: Math.floor((atxData.totalScore || 0) / 10) + 1,
                resumeData: {
                    projects: parsedData.projects || [],
                    domain: parsedData.domain || "General",
                    dsaLevel: parsedData.dsaLevel || "Basic",
                    experienceTimeline: parsedData.experienceTimeline || [],
                    analyticalThinkingScore: parsedData.analyticalThinkingScore || 0,
                    marketabilityTrend: parsedData.marketabilityTrend || 0
                }
            };

            await updateDoc(doc(db, "users", user.uid), {
                resumeUrl: realCloudinaryUrl,
                skills: updatedUser.skills,
                atxScore: updatedUser.atxScore,
                level: updatedUser.level,
                resumeData: updatedUser.resumeData
            });

            setUser(updatedUser);
            setStatus("success");
        } catch (err: any) {
            setErrorMessage(err.message || "An unexpected error occurred.");
            setStatus("error");
        } finally {
            setUploading(false);
        }
    };

    if (status === "success" && user?.resumeUrl) {
        return (
            <Card className="border border-green-200 bg-green-50/50 flex flex-col items-center justify-center p-8 text-center transition-all duration-500">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Resume Analyzed Successfully!</h3>
                <p className="text-green-700 text-sm mb-6">We've extracted your skills, projects, and calculated your initial ATX score.</p>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStatus("idle")}>Update Resume</Button>
                </div>
            </Card>
        );
    }

    return (
        <Card className={`border-2 border-dashed ${status === "error" ? 'border-red-300 bg-red-50/20' : 'border-jungle/30 bg-white'} transition-colors duration-300 relative overflow-hidden group hover:border-jungle`}>
            <input
                type="file"
                id="resume-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                disabled={uploading}
                accept=".pdf,.docx"
            />
            <div className="flex flex-col items-center justify-center p-8 text-center h-64 pointer-events-none relative z-20">
                <div className="w-16 h-16 rounded-2xl bg-eggshell flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-8 h-8 text-jungle" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Upload your Resume to Begin</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
                    PDF or DOCX (max. 5MB). Our AI will instantly parse your skills and calculate your initial ATX score.
                </p>

                {file && (
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 w-full mb-4">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-auto">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-1.5 rounded w-full mb-4">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {file && status !== "success" && (
                    <Button
                        className="w-full relative z-30 pointer-events-auto"
                        onClick={(e) => { e.stopPropagation(); processResume(); }}
                        disabled={uploading}
                    >
                        {status === "uploading" ? "Uploading to secure cloud..." : status === "analyzing" ? "Analyzing with Gemini AI..." : "Process Resume"}
                    </Button>
                )}
            </div>
        </Card>
    );
}
