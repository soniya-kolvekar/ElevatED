import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@/lib/firebase/firestore';

interface AuthState {
    user: UserProfile | null;
    loading: boolean;
    _hasHydrated: boolean;
    setUser: (user: UserProfile | null) => void;
    setLoading: (loading: boolean) => void;
    setHasHydrated: (state: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            loading: true,
            _hasHydrated: false,
            setUser: (user) => set({ user, loading: false }),
            setLoading: (loading) => set({ loading }),
            setHasHydrated: (state) => set({ _hasHydrated: state }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
