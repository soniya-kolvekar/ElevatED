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

        // 1. Technical Proficiency (Out of 400)
        const skillPoints = Math.min((parsedData.skills?.length || 0) * 20, 200);
        let dsaPoints = 50;
        if (parsedData.dsaLevel === "Advanced") dsaPoints = 200;
        else if (parsedData.dsaLevel === "Intermediate") dsaPoints = 140;
        else if (parsedData.dsaLevel === "Basic") dsaPoints = 80;
        const technicalScore = skillPoints + dsaPoints;

        // 2. Soft Skills (Out of 250) - AI estimated
        const softSkillsScore = parsedData.analyticalThinkingScore ? (parsedData.analyticalThinkingScore / 100) * 250 : 180;

        // 3. Academic Excellence (Out of 200)
        const cgpaRatio = Math.max(0, (cgpa - 4) / 6);
        const academicScore = Math.min(cgpaRatio * 200, 200);

        // 4. Experience & Portfolio (Out of 150)
        const projectPoints = Math.min((parsedData.projects?.length || 0) * 25, 100);
        const experiencePoints = parsedData.internship ? 50 : 0;
        const expoScore = projectPoints + experiencePoints;

        const totalScore = Math.floor(technicalScore + softSkillsScore + academicScore + expoScore);

        return NextResponse.json({
            totalScore: Math.min(totalScore, 1000),
            breakdown: {
                technical: technicalScore,
                softSkills: Math.round(softSkillsScore),
                academic: Math.round(academicScore),
                experience: expoScore
            }
        });

    } catch (error) {
        console.error("Error calculating ATX:", error);
        return NextResponse.json({ error: "Failed to calculate ATX score" }, { status: 500 });
    }
}
