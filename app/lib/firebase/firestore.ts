import { db } from "./config";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export type Role = "student" | "recruiter" | "admin";

export interface UserProfile {
    uid: string;
    email: string;
    name: string;
    displayName?: string;
    role: Role;
    cgpa?: number;
    branch?: string;
    skills?: string[];
    atxScore?: number;
    xp?: number;
    level?: number;
    resumeUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    linkedinUrl?: string;
    leetcodeUrl?: string;
    bio?: string;
    savedJobs?: { id: string; title: string; company: string; savedAt: number }[];
    appliedJobs?: { id: string; title: string; company: string; appliedAt: number; status: string }[];
    resumeData?: {
        projects: { name: string; description: string; impact: string }[];
        domain: string;
        dsaLevel: string;
        experienceTimeline: any[];
        analyticalThinkingScore: number;
        marketabilityTrend: number;
        globalRank: number;
        aiSuggestions: string[];
        aiAdvice?: string;
        analysisLogs?: { status: "success" | "warning" | "info"; msg: string; time: string }[];
        recommendedCompanies: { name: string; role: string; match: number }[];
        readinessGrowth: { month: string; value: number }[];
    };
}

export async function createUserDocument(user: any, additionalData: Partial<UserProfile>) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { email } = user;
        const { name, role, displayName, ...rest } = additionalData;

        try {
            await setDoc(userRef, {
                uid: user.uid,
                email,
                name,
                role,
                displayName: displayName || user.displayName || name || null,
                skills: [],
                atxScore: 0,
                xp: 0,
                level: 1,
                ...rest,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error creating user document", error);
            throw error;
        }
    }
}

export async function getUserDocument(uid: string) {
    const userRef = doc(db, "users", uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
        return snapshot.data() as UserProfile;
    }
    return null;
}
