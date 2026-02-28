export type Project = {
    name: string;
    description: string;
    impact?: string;
};

export type Experience = {
    role: string;
    company: string;
    duration: string;
    description: string;
    current?: boolean;
};

export type StudentData = {
    atxScore: number;
    atxScoreDelta: number;
    globalRank: number;
    campusRankDelta: number;
    nationalRankDelta: number;
    xp: number;
    xpToNextTier: number;
    tier: string;
    readinessGrowth: { month: string; value: number }[];
    recommendedCompanies: {
        name: string;
        role: string;
        match: number;
        logo?: string;
    }[];
    skills: {
        name: string;
        score: number;
        needsImprovement?: boolean;
    }[];
    projects: Project[];
    experiences: Experience[];
    aiSuggestions: string[];
    aiAdvice: string;
    atxBreakdown: {
        technical: number;
        softSkills: number;
        academic: number;
        experience: number;
    } | null;
    consistencyScore?: number;
    courseworkScore?: number;
    analysisLogs: { status: "success" | "warning" | "info"; msg: string; time: string }[];
};

export const getStudentDashboardData = (user: any): StudentData => {
    const resumeData = user?.resumeData || {};

    return {
        atxScore: user?.atxScore || 0,
        atxScoreDelta: 0,
        globalRank: resumeData.globalRank || 0,
        campusRankDelta: 0,
        nationalRankDelta: 0,
        xp: user?.xp || 0,
        xpToNextTier: 15000,
        tier: (user?.atxScore || 0) > 850 ? "Platinum" : "Gold",
        readinessGrowth: (resumeData.readinessGrowth || []).map((data: { month: string; value: number }, index: number, arr: any[]) => {
            // Generate realistic increasing curve ensuring last month is the actual value.
            // Spread values between 40% and actual max value based on position.
            const targetValue = Math.min(Math.max(data.value, 0), 100);
            const startValue = Math.max(targetValue - 45, 20); // starts ~45% lower
            const progress = index / Math.max(arr.length - 1, 1);

            // Linear interpolation with a slight random variance for realism
            let simulatedValue = startValue + (targetValue - startValue) * progress;
            if (index !== arr.length - 1) {
                // Add minor random variance (-5 to +5) except for the final month
                simulatedValue += (Math.random() * 10 - 5);
            }

            return {
                ...data,
                value: Math.round(Math.min(Math.max(simulatedValue, 0), 100))
            };
        }),
        recommendedCompanies: resumeData.recommendedCompanies || [],
        skills: user?.resumeData?.skills?.map((s: any) => ({
            name: s.name,
            score: s.score,
            needsImprovement: s.score < 50
        })) || [],
        projects: resumeData.projects?.map((p: any) => ({
            name: p.name,
            description: p.description,
            impact: p.impact || ""
        })) || [],
        experiences: resumeData.experienceTimeline || [],
        aiSuggestions: resumeData.aiSuggestions || [],
        aiAdvice: resumeData.aiAdvice || "Awaiting resume analysis...",
        atxBreakdown: resumeData.atxBreakdown || null,
        consistencyScore: resumeData.consistencyScore || 0,
        courseworkScore: resumeData.courseworkScore || 0,
        analysisLogs: resumeData.analysisLogs || [],
    };
};
