import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
    try {
        const { resumeUrl, userId } = await req.json();

        if (!resumeUrl || !userId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY is missing, falling back to mock data");
            await new Promise(resolve => setTimeout(resolve, 1500));
            return NextResponse.json({
                skills: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
                projects: ["Portfolio Project", "Task Manager"],
                internship: true,
                domain: "Web Development",
                dsaLevel: "Intermediate",
                experienceTimeline: [
                    { role: "Frontend Intern", company: "TechCorp", duration: "3 Months", description: "Built responsive UIs" }
                ],
                analyticalThinkingScore: 82,
                marketabilityTrend: 12.5
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Try multiple models in order of preference (2.5 and above only)
        const modelsToTry = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-2.5-flash-latest", "gemini-2.5-pro-latest"];
        let result;
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting to parse with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const prompt = `
            Analyze the resume at this URL: ${resumeUrl}
            
            Extract the following information and return it STRICTLY as a JSON object:
            {
              "skills": ["string"],
              "projects": ["string"],
              "internship": boolean,
              "domain": "string (e.g. Full-Stack Dev, Data Science)",
              "dsaLevel": "Basic" | "Intermediate" | "Advanced",
              "experienceTimeline": [
                {
                  "role": "string",
                  "company": "string",
                  "duration": "string",
                  "description": "string"
                }
              ],
              "analyticalThinkingScore": number (0-100),
              "marketabilityTrend": number (percentage growth e.g. 15.4)
            }

            If the URL is not directly readable as text, use your internal vision/parsing capabilities to understand the candidate's profile based on the content available at the link.
            Return ONLY the JSON. No markdown blocks.
        `;

                result = await model.generateContent(prompt);
                if (result) break; // Success!
            } catch (err) {
                console.error(`Error with model ${modelName}:`, err);
                lastError = err;
            }
        }

        if (!result) {
            throw lastError || new Error("All Gemini models failed to process the resume.");
        }

        const responseText = result.response.text();

        // Clean markdown if Gemini returns it
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const structuredOutput = JSON.parse(cleanJson);

        return NextResponse.json(structuredOutput);

    } catch (error) {
        console.error("Error parsing resume:", error);
        return NextResponse.json({ error: "Failed to parse resume" }, { status: 500 });
    }
}
