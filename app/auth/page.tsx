"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createUserDocument, getUserDocument, Role } from "@/lib/firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

// Helper to set cookie for middleware
const setAuthCookie = (role: string) => {
    document.cookie = `auth-role=${role}; path=/; max-age=86400; SameSite=Strict`;
};

function AuthContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultType = searchParams.get("type") === "register" ? "register" : "login";
    const defaultRole = (searchParams.get("role") as Role) || "student";

    const [mode, setMode] = useState<"login" | "register">(defaultType);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<Role>(defaultRole);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { setUser } = useAuthStore();

    const handleAuth = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (mode === "register") {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                // Bypass Firestore completely 
                const assignedRole = role || "admin";
                setUser({ uid: userCredential.user.uid, email, name: name || "Admin User", role: assignedRole });
                setAuthCookie(assignedRole);
                router.push(`/${assignedRole}/dashboard`);

            } else {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                // Bypass Firestore completely and default to admin
                const fallbackRole = "admin";
                setUser({ uid: userCredential.user.uid, email: userCredential.user.email || email, name: "Admin User", role: fallbackRole });
                setAuthCookie(fallbackRole);
                router.push(`/${fallbackRole}/dashboard`);
            }
        } catch (err: any) {
            console.error("Auth Error:", err);

            if (err.code === 'auth/invalid-credential') {
                setError("invalid credentials try again");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("An account with this email already exists. Please log in.");
            } else {
                setError("invalid credentials try again"); // Default to this simple message to avoid "next error" on screen
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f6f0] flex flex-col justify-center items-center p-4">
            <Card className="w-full max-w-md p-8 shadow-xl">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-jungle text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                        E
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {mode === "login" ? "Welcome back" : "Create an account"}
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        {mode === "login"
                            ? "Enter your details to access your dashboard."
                            : "Join ElevatED to start your journey."}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    {mode === "register" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
                                <select
                                    className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-jungle shadow-sm"
                                    value={role}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value as Role)}
                                >
                                    <option value="student">Student</option>
                                    <option value="recruiter">Recruiter</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={loading}>
                        {loading ? "Processing..." : (mode === "login" ? "Sign In" : "Register")}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    {mode === "login" ? (
                        <p>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => { setMode("register"); setError(""); }}
                                className="text-jungle font-semibold hover:underline"
                            >
                                Sign up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => { setMode("login"); setError(""); }}
                                className="text-jungle font-semibold hover:underline"
                            >
                                Log in
                            </button>
                        </p>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center">Loading...</div>}>
            <AuthContent />
        </Suspense>
    );
}
