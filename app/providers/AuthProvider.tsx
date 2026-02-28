"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { getUserDocument } from "@/lib/firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userProfile = await getUserDocument(firebaseUser.uid);
                    setUser(userProfile);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false); // crucial: resolve the loading state whether logged in or not
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [setUser, setLoading]);

    return <>{children}</>;
}
