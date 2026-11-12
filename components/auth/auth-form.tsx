'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import {
  ShieldCheck,
  User,
  Sparkles,
  KeyRound,
  AlertTriangle,
  ArrowRight,
  Lock,
  Compass,
} from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/components/auth/auth-provider';

type Mode = 'signin' | 'signup' | 'admin';

const MIN_PASSWORD_LENGTH = 8;

interface AuthFormProps {
  nextPath: string;
  reason?: string;
}

export function AuthForm({ nextPath, reason }: AuthFormProps) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [mode, setMode] = useState<Mode>(reason ? 'admin' : 'signin');
  const [email, setEmail] = useState(reason ? 'admin@tripora.ai' : '');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState(reason ? 'Password123!' : '');
  const [country, setCountry] = useState('United States');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    if (next === 'admin') {
      setEmail('admin@tripora.ai');
      setPassword('Password123!');
    } else {
      if (email === 'admin@tripora.ai') {
        setEmail('');
        setPassword('');
      }
    }
  }

  async function handleDemoTraveler() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'traveler@tripora.ai', password: 'Password123!' }),
      });
      api.setToken(res.tokens.accessToken);
      setUser(res.user);
      router.replace(nextPath.startsWith('/admin') ? '/dashboard' : nextPath || '/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Demo sign-in failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDemoAdmin() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'admin@tripora.ai', password: 'Password123!' }),
      });
      api.setToken(res.tokens.accessToken);
      setUser(res.user);
      router.replace('/admin');
    } catch (err: any) {
      setError(err?.message || 'Admin sign-in failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (mode === 'signup' && password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }

    if (password.length === 0) {
      setError('Please enter your password.');
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'signup') {
        const res = await api.request('/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            email: trimmedEmail,
            password,
            fullName: fullName.trim() || trimmedEmail.split('@')[0],
            country,
          }),
        });
        api.setToken(res.tokens.accessToken);
        setUser(res.user);
        router.replace(nextPath.startsWith('/admin') ? '/dashboard' : nextPath || '/dashboard');
      } else {
        const res = await api.request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: trimmedEmail, password }),
        });
        api.setToken(res.tokens.accessToken);
        setUser(res.user);

        if (res.user.role === 'ADMIN') {
          router.replace('/admin');
        } else {
          router.replace(nextPath.startsWith('/admin') ? '/dashboard' : nextPath || '/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication rejected. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-lg rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-white">
      {/* Brand Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46A]/40 bg-[#C5A46A]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5D794]">
          <Lock className="h-3 w-3" />
          TRIPORA RESERVE AUTHENTICATION
        </div>

        <h1 className="mt-3 font-serif text-2xl sm:text-3xl text-white font-normal">
          {mode === 'admin'
            ? 'Executive Operations Clearance'
            : mode === 'signup'
            ? 'Create Your Traveler Dossier'
            : 'Welcome Back to the Studio'}
        </h1>
        <p className="mt-1 text-xs text-white/60 font-light">
          {mode === 'admin'
            ? 'Master Concierge and Operations Command Terminal.'
            : mode === 'signup'
            ? 'Join our private circle to unlock AI spatial routing and private sanctuaries.'
            : 'Access your saved expeditions, luxury suites, and flight passes.'}
        </p>
      </div>

      {/* Security Redirection Alert Banner */}
      {reason && (
        <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-amber-500/40 bg-amber-500/15 p-3.5 text-xs text-amber-200 animate-in fade-in duration-200">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#F5D794] mt-0.5" />
          <div>
            <span className="font-bold block uppercase tracking-wider text-[10px] text-[#F5D794]">
              {reason === 'insufficient_clearance' ? '403 Forbidden: Insufficient Clearance' : 'Diplomatic Clearance Required'}
            </span>
            <p className="mt-0.5 text-[11px] leading-relaxed text-white/90">
              The Administrative Command Matrix requires verified Master Concierge credentials. Sign in via the Executive Clearance tab below.
            </p>
          </div>
        </div>
      )}

      {/* Mode Navigation Tabs */}
      <div className="mt-6 flex rounded-2xl border border-white/10 bg-white/5 p-1 text-xs font-semibold">
        <button
          type="button"
          onClick={() => switchMode('signin')}
          className={`flex-1 py-2 text-center rounded-xl transition-all ${
            mode === 'signin'
              ? 'bg-[#C5A46A] text-[#0A120D] font-bold shadow-md'
              : 'text-white/70 hover:text-white'
          }`}
        >
          Traveler Sign In
        </button>
        <button
          type="button"
          onClick={() => switchMode('signup')}
          className={`flex-1 py-2 text-center rounded-xl transition-all ${
            mode === 'signup'
              ? 'bg-[#C5A46A] text-[#0A120D] font-bold shadow-md'
              : 'text-white/70 hover:text-white'
          }`}
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => switchMode('admin')}
          className={`flex-1 py-2 text-center rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            mode === 'admin'
              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold shadow-md'
              : 'text-white/70 hover:text-amber-300'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Admin Gate</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Authentication Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
        {mode === 'signup' && (
          <div>
            <label className="block font-medium text-white/80">Full Legal Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Alex Vance"
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="block font-medium text-white/80">
            {mode === 'admin' ? 'Executive Officer Email' : 'Email Address'}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={mode === 'admin' ? 'admin@tripora.ai' : 'traveler@tripora.ai'}
            className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none font-mono text-xs"
          />
        </div>

        <div>
          <label className="block font-medium text-white/80">
            {mode === 'admin' ? 'Master Security Passcode' : 'Password'}
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none font-mono text-xs"
          />
        </div>

        {mode === 'signup' && (
          <div>
            <label className="block font-medium text-white/80">Country of Residence</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-white focus:border-[#C5A46A] focus:outline-none"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] py-3 text-xs font-bold uppercase tracking-wider text-[#0A120D] shadow-md hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {submitting ? (
            <span>Authenticating...</span>
          ) : (
            <>
              {mode === 'admin' ? (
                <>
                  <KeyRound className="h-4 w-4" />
                  <span>Authenticate Executive Clearance</span>
                </>
              ) : mode === 'signup' ? (
                <>
                  <Compass className="h-4 w-4" />
                  <span>Create Traveler Account</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span>Sign In as Traveler</span>
                </>
              )}
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Quick Demo Access Bar */}
      <div className="mt-8 border-t border-white/10 pt-5">
        <span className="block text-center text-[10px] font-mono uppercase tracking-wider text-white/40">
          Or Quick Test with Pre-Seeded Profiles
        </span>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDemoTraveler}
            disabled={submitting}
            className="rounded-2xl border border-white/15 bg-white/5 p-2.5 text-center hover:bg-white/10 transition-colors"
          >
            <span className="block text-[11px] font-bold text-white">Traveler Demo</span>
            <span className="block text-[9px] font-mono text-white/50 truncate">Alex Vance (USER)</span>
          </button>

          <button
            type="button"
            onClick={handleDemoAdmin}
            disabled={submitting}
            className="rounded-2xl border border-[#C5A46A]/40 bg-[#C5A46A]/10 p-2.5 text-center hover:bg-[#C5A46A]/20 transition-colors"
          >
            <span className="block text-[11px] font-bold text-[#F5D794]">Master Concierge</span>
            <span className="block text-[9px] font-mono text-amber-300/70 truncate">Admin Terminal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
