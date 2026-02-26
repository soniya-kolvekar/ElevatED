"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/Card";
import { getStudentDashboardData } from "@/lib/student-data";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SkillsPage() {
    const { user } = useAuthStore();
    const data = getStudentDashboardData(user);

    return (
        <div className="space-y-8 pb-12">
            <h1 className="text-3xl font-black text-gray-900">Skill Gap Analysis</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.skills.map((skill) => (
                    <Card key={skill.name} className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-black text-gray-900">{skill.name}</h3>
                                <p className="text-sm text-gray-500 font-medium">Detailed proficiency breakdown</p>
                            </div>
                            <div className={cn(
                                "text-2xl font-black",
                                skill.needsImprovement ? "text-orange-500" : "text-jungle"
                            )}>{skill.score}%</div>
                        </div>

                        <div className="h-4 w-full bg-gray-50 rounded-full overflow-hidden">
                            <motion.div
                                className={cn(
                                    "h-full rounded-full",
                                    skill.needsImprovement ? "bg-orange-400" : "bg-jungle"
                                )}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.score}%` }}
                                transition={{ duration: 1.2 }}
                            />
                        </div>

                        {skill.needsImprovement && (
                            <div className="flex gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100 text-orange-600">
                                <AlertCircle size={20} className="shrink-0" />
                                <p className="text-xs font-bold leading-relaxed">
                                    Your score in {skill.name} is currently below the average for top-tier companies.
                                    Consider taking the "Advanced {skill.name}" module to boost your ATX score.
                                </p>
                            </div>
                        )}

                        <div className="space-y-3 pt-4 border-t border-gray-50">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Strengths</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-bold">Project Architecture</span>
                                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-bold">API Design</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
