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
};

export const getStudentDashboardData = (user: any): StudentData => {
    const name = user?.name || "Student";
    const resumeData = user?.resumeData || {};

    return {
        atxScore: user?.atxScore || 686,
        atxScoreDelta: 5,
        globalRank: 1402,
        campusRankDelta: 12,
        nationalRankDelta: 45,
        xp: user?.xp || 12450,
        xpToNextTier: 15000,
        tier: (user?.atxScore || 0) > 850 ? "Platinum" : "Gold",
        readinessGrowth: [
            { month: "JAN", value: 30 },
            { month: "FEB", value: 45 },
            { month: "MAR", value: 38 },
            { month: "APR", value: 55 },
            { month: "MAY", value: 68 },
            { month: "JUN", value: user?.atxScore ? Math.round((user.atxScore / 1000) * 100) : 82 },
        ],
        recommendedCompanies: [
            { name: "TechFlow Systems", role: "Cloud Infrastructure Intern", match: 98 },
            { name: "FinEdge Labs", role: "Junior Frontend Developer", match: 92 },
            { name: "Nexus AI", role: "Machine Learning Associate", match: 87 },
            { name: "BioGrid Corp", role: "Data Analytics Intern", match: 81 },
            { name: "SwiftCart", role: "Software Engineer (New Grad)", match: 76 },
        ],
        skills: user?.skills?.map((s: string) => ({
            name: s,
            score: 70 + Math.floor(Math.random() * 25), // Mocking individual skill scores for now
            needsImprovement: false
        })) || [
                { name: "Full Stack Development", score: 92 },
                { name: "System Design", score: 78 },
                { name: "Cloud Computing (AWS)", score: 45, needsImprovement: true },
            ],
        projects: resumeData.projects?.map((p: string) => ({
            name: p,
            description: "Extracted from resume",
            impact: "High Impact"
        })) || [
                { name: "Industry-Grade E-commerce", description: "Scaleable microservices architecture", impact: "40% latency reduction" },
                { name: "AI Resume Parser", description: "LLM-based structured data extraction", impact: "Daily deploy frequency" }
            ],
        experiences: resumeData.experienceTimeline || [
            { role: "Lead Developer", company: "TechFlow Systems", duration: "4 years 2 months", description: "Overseeing core infrastructure", current: true },
            { role: "Software Engineer", company: "InnovateHQ", duration: "2 years 1 month", description: "Focused on frontend performance" }
        ],
        aiSuggestions: [
            "Quantify impact in TechFlow: Specifically mention the user base size affected by the AWS Lambda migration.",
            "Certifications missing: AI detected high proficiency in AWS, but no formal certification is listed. Adding 'AWS Solutions Architect' would boost score by +5."
        ]
    };
};
