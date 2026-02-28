"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ClipboardList, Edit, Trash2, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DraftsPage() {
    const [drafts, setDrafts] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem('recruiter_jobs') || '[]');
        setDrafts(storedJobs.filter((j: any) => j.status === 'draft'));
    }, []);

    const handleDelete = (id: string) => {
        const storedJobs = JSON.parse(localStorage.getItem('recruiter_jobs') || '[]');
        const updated = storedJobs.filter((j: any) => j.id !== id);
        localStorage.setItem('recruiter_jobs', JSON.stringify(updated));
        setDrafts(updated.filter((j: any) => j.status === 'draft'));
    };

    return (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <ClipboardList className="w-8 h-8 text-amber-500" />
                        Job Drafts
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">Pick up where you left off. Refine and publish your opportunities.</p>
                </div>
                <Link href="/recruiter/dashboard/post-job">
                    <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 font-bold px-6 hover:bg-gray-50">
                        New Draft
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drafts.length === 0 ? (
                    <Card className="col-span-full py-20 border-dashed border-2 border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center gap-4 text-gray-400">
                        <FileText className="w-12 h-12 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-xs">No drafts available</p>
                    </Card>
                ) : (
                    drafts.map((draft) => (
                        <Card key={draft.id} className="p-6 border-none shadow-soft hover:shadow-premium transition-all group border-l-4 border-l-amber-400">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-black text-gray-800 text-lg leading-tight group-hover:text-jungle transition-colors">
                                        {draft.title || "Untitled Job"}
                                    </h3>
                                    <span className="text-[10px] font-black px-2 py-1 rounded bg-amber-50 text-amber-600 uppercase tracking-tight">
                                        Draft
                                    </span>
                                </div>

                                <p className="text-xs font-bold text-gray-400">
                                    {draft.department || "No Department"} • {draft.location || "No Location"}
                                </p>

                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Saved {new Date(draft.createdAt).toLocaleDateString()}
                                </div>

                                <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={() => router.push(`/recruiter/dashboard/post-job?edit=${draft.id}`)}
                                            variant="ghost"
                                            className="h-9 px-3 text-xs font-bold text-jungle hover:bg-jungle/5 rounded-lg"
                                        >
                                            <Edit className="w-3.5 h-3.5 mr-2" /> Edit
                                        </Button>
                                    </div>
                                    <Button
                                        onClick={() => handleDelete(draft.id)}
                                        variant="ghost"
                                        className="h-9 w-9 p-0 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
