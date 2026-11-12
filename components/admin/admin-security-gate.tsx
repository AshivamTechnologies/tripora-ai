'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { UserSession } from '@/lib/api';

interface AdminSecurityGateProps {
  currentUser: UserSession | null;
  onAuthenticateAdmin: (email: string, pass: string) => Promise<boolean>;
}

export function AdminSecurityGate({
  currentUser,
  onAuthenticateAdmin,
}: AdminSecurityGateProps) {
  const [email, setEmail] = useState('admin@tripora.ai');
  const [password, setPassword] = useState('Password123!');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isTraveler = currentUser && currentUser.role !== 'ADMIN';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const success = await onAuthenticateAdmin(email.trim(), password);
      if (!success) {
        setError('Invalid administrative credentials. Access denied.');
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication rejected by security matrix.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080E0A] text-white flex flex-col justify-center items-center px-4 py-16 selection:bg-[#F5D794] selection:text-[#0A120D]">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C5A46A]/5 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Security Shield Crest */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1C2C22] to-[#0A120D] text-[#F5D794] border border-[#C5A46A]/50 shadow-lg shadow-[#C5A46A]/10">
          <ShieldAlert className="h-8 w-8 text-[#F5D794]" />
        </div>

        {/* Header */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A46A]/40 bg-[#C5A46A]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5D794]">
            <Lock className="h-3 w-3" />
            Executive Security Clearance Required
          </span>

          <h1 className="mt-3 font-serif text-2xl sm:text-3xl text-white font-normal">
            Restricted Operations Terminal
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Access to the TRIPORA RESERVE Command Matrix is restricted to verified Master Concierge Officers and Operations Directors.
          </p>
        </div>

        {/* Current Identity Clearance Status */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-white/40">Current Session Identity</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${
                isTraveler
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              {isTraveler ? '403 Forbidden &bull; Traveler Tier' : '401 Unauthorized &bull; Guest'}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between font-mono text-[11px]">
            <span className="text-white/80">
              {currentUser ? currentUser.email : 'Unauthenticated Visitor'}
            </span>
            <span className="text-white/50">
              Role: <strong className="text-white">{currentUser?.role || 'NONE'}</strong>
            </span>
          </div>

          {isTraveler && (
            <p className="mt-2 text-[11px] text-amber-300/80 italic font-light border-t border-white/5 pt-2">
              Notice: Your traveler account is authorized for personal journeys only. To enter the operations matrix, provide executive credentials below.
            </p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Executive Authentication Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4 text-xs">
          <div>
            <label className="block font-medium text-white/80">
              Executive Officer Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none font-mono text-xs"
            />
          </div>

          <div>
            <label className="block font-medium text-white/80">
              Security Passcode
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none font-mono text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] py-3 text-xs font-bold uppercase tracking-wider text-[#0A120D] shadow-md hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {submitting ? (
              <span>Verifying Diplomatic Clearance...</span>
            ) : (
              <>
                <KeyRound className="h-4 w-4" />
                <span>Authenticate Executive Clearance</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Navigation & Safety Links */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/60">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 hover:text-[#F5D794] transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Return to Traveler Cockpit</span>
          </Link>

          <Link
            href="/"
            className="hover:text-white transition-colors"
          >
            Public Homepage
          </Link>
        </div>

        {/* Compliance Footer */}
        <p className="mt-6 text-center text-[10px] font-mono text-white/40 leading-relaxed">
          Zero-Trust Security Matrix &bull; Cryptographically logged origin IP &bull; TRIPORA RESERVE Internal
        </p>
      </div>
    </div>
  );
}
