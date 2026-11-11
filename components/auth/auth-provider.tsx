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
      const token = api.getToken();
      if (!token) {
        // Automatically provide demo user session if in local dev for seamless testing
        if (typeof window !== 'undefined') {
          const cachedUser = localStorage.getItem('tripora_current_user');
          if (cachedUser) {
            try {
              if (active) {
                setUser(JSON.parse(cachedUser));
                setLoading(false);
                return;
              }
            } catch {}
          }
        }
        if (active) setLoading(false);
        return;
      }

      try {
        const profile = await api.request('/auth/me');
        if (active) {
          setUser(profile);
          if (typeof window !== 'undefined') {
            localStorage.setItem('tripora_current_user', JSON.stringify(profile));
          }
        }
      } catch (err) {
        console.warn('Failed to fetch user session:', err);
        if (active && typeof window !== 'undefined') {
          const cached = localStorage.getItem('tripora_current_user');
          if (cached) setUser(JSON.parse(cached));
        }
      } finally {
        if (active) setLoading(false);
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
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
