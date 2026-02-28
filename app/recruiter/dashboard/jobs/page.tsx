"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileText, Eye, MoreHorizontal, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function JobListPage() {
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem('recruiter_jobs') || '[]');
        setJobs(storedJobs.filter((j: any) => j.status === 'published'));
    }, []);

    return (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Active Opportunities</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage your live job postings and track applicant performance.</p>
                </div>
                <Link href="/recruiter/dashboard/post-job">
                    <Button className="rounded-xl bg-jungle hover:bg-[#3d5a4d] text-white shadow-soft font-bold px-6">
                        Post New Job
                    </Button>
                </Link>
            </div>

            <Card className="border-none shadow-premium overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/30 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <th className="py-5 px-8">Job Title</th>
                                <th className="py-5 px-8">Applicants</th>
                                <th className="py-5 px-8">Match Rate</th>
                                <th className="py-5 px-8">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {jobs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-gray-400">
                                            <FileText className="w-12 h-12 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No active jobs found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                jobs.map((job) => (
                                    <tr key={job.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-6 px-8">
                                            <Link href={`/recruiter/dashboard/post-job?edit=${job.id}`} className="group/item">
                                                <p className="font-black text-gray-800 text-sm leading-tight group-hover/item:text-jungle transition-colors">{job.title}</p>
                                                <p className="text-[11px] text-gray-400 font-bold">{job.department} • {job.location}</p>
                                            </Link>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-gray-400" />
                                                <span className="font-black text-gray-700">{Math.floor(Math.random() * 50)}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-jungle" />
                                                <span className="font-black text-jungle">84%</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-green-50 text-green-600 border border-green-100 uppercase tracking-tight">
                                                {job.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
