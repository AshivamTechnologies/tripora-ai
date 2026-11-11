'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { controlClass, Field } from '@/components/planner/planner-field';
import { api } from '@/lib/api';
import { useAuth } from '@/components/auth/auth-provider';

type Mode = 'signin' | 'signup';

const MIN_PASSWORD_LENGTH = 8;

export function AuthForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignUp = mode === 'signup';

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
  }

  async function handleDemoSignIn() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'traveler@tripora.ai', password: 'Password123!' }),
      });
      api.setToken(res.tokens.accessToken);
      setUser(res.user);
      router.replace(nextPath || '/dashboard');
    } catch {
      // Fallback
      const demoUser = {
        id: 'usr-demo-002',
        email: 'traveler@tripora.ai',
        role: 'USER' as const,
        profile: { fullName: 'Alex Vance', country: 'United States' },
      };
      api.setToken('mock-session');
      setUser(demoUser);
      router.replace(nextPath || '/dashboard');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const trimmedEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError('Enter a valid email address.');
      return;
    }
    if (isSignUp && password.length < MIN_PASSWORD_LENGTH) {
      setError(`Use at least ${MIN_PASSWORD_LENGTH} characters for your password.`);
      return;
    }
    if (password.length === 0) {
      setError('Enter your password.');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        const res = await api.request('/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            email: trimmedEmail,
            password,
            fullName: fullName.trim() || trimmedEmail.split('@')[0],
          }),
        });
        api.setToken(res.tokens.accessToken);
        setUser(res.user);
        router.replace(nextPath || '/dashboard');
      } else {
        const res = await api.request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: trimmedEmail, password }),
        });
        api.setToken(res.tokens.accessToken);
        setUser(res.user);
        router.replace(nextPath || '/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-brand-line bg-white p-8 shadow-sm sm:p-10">
      <div className="flex border-b border-brand-line">
        <button
          type="button"
          onClick={() => switchMode('signin')}
          className={`flex-1 pb-4 text-center text-sm font-semibold transition-colors ${
            !isSignUp ? 'border-b-2 border-brand-forest text-brand-forest' : 'text-brand-muted hover:text-brand-ink'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => switchMode('signup')}
          className={`flex-1 pb-4 text-center text-sm font-semibold transition-colors ${
            isSignUp ? 'border-b-2 border-brand-forest text-brand-forest' : 'text-brand-muted hover:text-brand-ink'
          }`}
        >
          Create account
        </button>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleDemoSignIn}
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-forest/30 bg-brand-forest/5 px-4 py-3 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-forest/10"
        >
          <Sparkles className="h-4 w-4" />
          Continue with Demo Account (Instant Access)
        </button>
      </div>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-brand-line" />
        </div>
        <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-brand-muted">
          Or continue with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
        {notice && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            {notice}
          </div>
        )}

        {isSignUp && (
          <Field id="fullName" label="Full name" error={undefined}>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Eleanor Vance"
              className={controlClass}
            />
          </Field>
        )}

        <Field id="email" label="Email address" error={undefined}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className={controlClass}
          />
        </Field>

        <Field id="password" label="Password" error={undefined}>
          <input
            id="password"
            type="password"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isSignUp ? 'At least 8 characters' : 'Enter your password'}
            className={controlClass}
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-forest px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSignUp ? 'Create free account' : 'Sign in'}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-brand-muted">
        By continuing, you agree to Tripora&apos;s{' '}
        <Link href="/terms" className="underline hover:text-brand-ink">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline hover:text-brand-ink">
          Privacy Policy
        </Link>.
      </div>
    </div>
  );
}
