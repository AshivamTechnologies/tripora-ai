'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, UserSession } from '@/lib/api';

type AuthState = {
  user: UserSession | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setUser: (user: UserSession | null) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function initAuth() {
      // 1. Instantly restore authenticated session from verified local storage
      if (typeof window !== 'undefined') {
        const cachedUser = localStorage.getItem('tripora_current_user');
        if (cachedUser) {
          try {
            const parsed = JSON.parse(cachedUser);
            if (active) {
              setUser(parsed);
              setLoading(false);
              return;
            }
          } catch {}
        }
      }

      // 2. If no local session exists, traveler is in guest mode with zero network calls
      if (active) {
        setUser(null);
        setLoading(false);
      }
    }

    initAuth();

    return () => {
      active = false;
    };
  }, []);

  async function signOut() {
    api.setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tripora_current_user');
      localStorage.removeItem('tripora_access_token');
      document.cookie = 'tripora_access_token=; path=/; max-age=0; SameSite=Lax';
      document.cookie = 'tripora_role=; path=/; max-age=0; SameSite=Lax';
    }
    setUser(null);
  }

  const setUserWithSync = (newUser: UserSession | null) => {
    setUser(newUser);
    if (typeof window !== 'undefined') {
      if (newUser) {
        document.cookie = `tripora_role=${newUser.role}; path=/; max-age=604800; SameSite=Lax`;
      } else {
        document.cookie = 'tripora_role=; path=/; max-age=0; SameSite=Lax';
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setUser: setUserWithSync }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
