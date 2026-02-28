import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function POST(req: Request) {
    try {
        const { parsedData, userId } = await req.json();

        if (!parsedData || !userId) {
            return NextResponse.json({ error: "Missing parsed data or userId" }, { status: 400 });
        }

        // We can also fetch academics (CGPA) from the user document in Firestore to complete the data picture
        let cgpa = 7.5; // default
        let xpYears = parsedData.internship ? 0.5 : 0;

        // Retrieve full profile from DB if possible
        try {
            const uDoc = await getDoc(doc(db, "users", userId));
            if (uDoc.exists() && uDoc.data().cgpa) {
                cgpa = uDoc.data().cgpa;
            }
        } catch {
            // Mock continuation if firestore isn't connected
        }

        // Weight Preferences (Total 1000)
        // Technical Proficiency: 400
        // Soft Skills / Potential: 250
        // Academic Excellence: 200
        // Experience & Portfolio: 150

        // 1. AI-Driven Baseline (70% weight)
        const baseline = parsedData.atxBaselineScore || 650;

        // 2. Academic & Verifiable Adjustments (30% weight)
        const cgpaRatio = Math.max(0, (cgpa - 4) / 6);
        const academicScore = Math.min(cgpaRatio * 300, 300);

        const totalScore = Math.floor((baseline * 0.7) + academicScore);

        return NextResponse.json({
            totalScore: Math.min(totalScore, 1000),
            breakdown: {
                technical: Math.round(baseline * 0.4),
                softSkills: Math.round(baseline * 0.2),
                academic: Math.round(academicScore),
                experience: Math.round(baseline * 0.1)
            }
        });

    } catch (error) {
        console.error("Error calculating ATX:", error);
        return NextResponse.json({ error: "Failed to calculate ATX score" }, { status: 500 });
    }
}
