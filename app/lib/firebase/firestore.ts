import { db } from "./config";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export type Role = "student" | "recruiter" | "admin";

export interface UserProfile {
    uid: string;
    email: string;
    name: string;
    role: Role;
    cgpa?: number;
    branch?: string;
    skills?: string[];
    atxScore?: number;
    xp?: number;
    level?: number;
    resumeUrl?: string;
}

export async function createUserDocument(user: any, additionalData: Partial<UserProfile>) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { email } = user;
        const { name, role, ...rest } = additionalData;

        try {
            await setDoc(userRef, {
                uid: user.uid,
                email,
                name,
                role,
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
