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

        // Weight Preferences
        // Technical Skills: 35%, DSA: 20%, Projects: 20%, Academics: 15%, Experience: 10%

        // 1. Technical Skills Score (Out of 35)
        // Formula: Cap at 10 skills. 3.5 points per relevant skill.
        const skillPoints = Math.min((parsedData.skills?.length || 0) * 3.5, 35);

        // 2. DSA Score (Out of 20)
        let dsaPoints = 5;
        if (parsedData.dsaLevel === "Advanced") dsaPoints = 20;
        else if (parsedData.dsaLevel === "Intermediate") dsaPoints = 14;
        else if (parsedData.dsaLevel === "Basic") dsaPoints = 8;

        // 3. Projects Score (Out of 20)
        // 5 points per project cap at 4 
        const projectPoints = Math.min((parsedData.projects?.length || 0) * 5, 20);

        // 4. Academics Score (Out of 15)
        // Linear scale from passing (4.0) to 10.0 CGPA
        const cgpaRatio = Math.max(0, (cgpa - 4) / 6);
        const academicPoints = Math.min(cgpaRatio * 15, 15);

        // 5. Experience Score (Out of 10)
        // 10 points for extensive internship, 5 for standard, 0 for none
        const experiencePoints = parsedData.internship ? 10 : 0;

        const totalScore = Math.floor(skillPoints + dsaPoints + projectPoints + academicPoints + experiencePoints);

        return NextResponse.json({
            totalScore,
            breakdown: {
                skills: Number(skillPoints.toFixed(1)),
                dsa: dsaPoints,
                projects: projectPoints,
                academics: Number(academicPoints.toFixed(1)),
                experience: experiencePoints
            }
        });

    } catch (error) {
        console.error("Error calculating ATX:", error);
        return NextResponse.json({ error: "Failed to calculate ATX score" }, { status: 500 });
    }
}
