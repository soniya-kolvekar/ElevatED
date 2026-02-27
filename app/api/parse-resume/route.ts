import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
    try {
        const { resumeUrl, githubUrl, portfolioUrl, userId } = await req.json();

        if (!resumeUrl || !userId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const apiKeys = [
            process.env.GEMINI_API_KEY1,
            process.env.GEMINI_API_KEY2,
            process.env.GEMINI_API_KEY3
        ].filter(Boolean);

        if (apiKeys.length === 0) {
            return NextResponse.json({ error: "No Gemini API keys configured. Please check your .env.local file." }, { status: 401 });
        }

        // Specific models requested by User
        const modelsToTry = [
            "gemini-2.5-flash", // Note: This model might not exists yet, but user requested it
            "gemini-2.0-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-pro-latest"
        ];

        let result;
        let lastError;

        // Implementation of Key and Model Rotation
        for (const apiKey of apiKeys) {
            const genAI = new GoogleGenerativeAI(apiKey!);

            for (const modelName of modelsToTry) {
                try {
                    console.log(`Attempting with key rotation: ${apiKey?.slice(0, 8)}... and model: ${modelName}`);
                    const model = genAI.getGenerativeModel({ model: modelName });

                    const prompt = `
            # ROLE
            You are an elite Career Strategist and Technical Recruiter specializing in high-growth tech domains. 
            Your goal is to parse the candidate's professional profile with 100% accuracy and provide high-fidelity career intelligence.

            # SOURCES
            - Resume Content (Accessible via): ${resumeUrl}
            - GitHub URL: ${githubUrl || "Not provided"}
            - Portfolio URL: ${portfolioUrl || "Not provided"}

            # INSTRUCTIONS: CHAIN-OF-THOUGHT EXTRACTION
            Before generating the final JSON, perform these mental steps:
            1. **Fact Extraction**: Read the resume carefully. Identify every distinct 'Project' and 'Experience' entry.
            2. **Impact Calculation**: For each project, look for quantitative results (percentages, user counts, latency numbers). If absent, infer realistic impact based on the tech stack and complexity (e.g., "Optimized database queries in a Next.js app implies improved TTFB").
            3. **Cross-Source Enrichment**: If a GitHub URL is provided, "browse" the repository names and descriptions in your mind to cross-reference with the resume. Enrich the 'Projects' section with repo-level details if found.
            4. **Domain Mapping**: Determine the most accurate 'Domain' (e.g., "Full-Stack Developer", "DevOps Engineer").

            # OUTPUT SPECIFICATIONS
            Return STRICTLY a JSON object. Ensure the following:
            - **Projects**: DO NOT merge projects. Each must have a 'description' (tech stack + complexity) and 'impact' (quantitative result).
            - **Analysis Logs**: Create 3-5 specific logs. They MUST name-drop projects. 
              Example: "Verified microservices architecture in 'FinTrack' project."
            - **AI Advice**: 2-3 sentences of HIGH-VALUE advice. Avoid generic tips. Focus on specific gaps in their projects or experience.
            - **Growth & Companies**: Estimate readiness growth and recommended companies based on the candidate's inferred skill level (DSA, System Design, and Technical Depth).

            # JSON STRUCTURE
            {
              "skills": [{"name": "string", "score": number (0-100)}],
              "projects": [{"name": "string", "description": "string", "impact": "string"}],
              "internship": boolean,
              "domain": "string",
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
              "consistencyScore": number (0-100),
              "courseworkScore": number (0-100),
              "atxBaselineScore": number (0-1000) (Simulate a professional ATX score based on resume depth),
              "marketabilityTrend": number (percentage growth),
              "globalRank": number (simulated),
              "aiSuggestions": ["string (actionable)"],
              "aiAdvice": "string",
              "analysisLogs": [
                {"status": "success" | "warning" | "info", "msg": "string", "time": "string"}
              ],
              "recommendedCompanies": [
                {"name": "string", "role": "string", "match": number}
              ],
              "readinessGrowth": [
                {"month": "string", "value": number}
              ]
            }

            Return ONLY the JSON. No preamble, no markdown code blocks.
        `;

                    result = await model.generateContent(prompt);
                    if (result) break; // Model success
                } catch (err: any) {
                    console.error(`Error with key/model combo [${modelName}]:`, err.message);
                    lastError = err;

                    // If it's a 429 (Quota), we move to the next model for THIS key
                    // If it's a 404 (Not Found), we move to the next model
                    // If all models fail for THIS key, it will naturally move to next key in outer loop
                }
            }
            if (result) break; // Entire process success
        }

        if (!result) {
            console.error("All Gemini models and keys failed.");
            return NextResponse.json({
                error: "AI analysis failed after trying all available models and API keys. This is usually due to rate limits or invalid links. Please try again in a few minutes."
            }, { status: 503 });
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
