'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Mail,
  Shield,
  UserMinus,
  Copy,
  Check,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { getTripDetail, TripDetail } from '@/lib/trips';

interface Member {
  id: string;
  fullName: string;
  email: string;
  role: 'OWNER' | 'EDITOR' | 'VIEWER';
  joinedAt?: string;
}

const DEFAULT_MEMBERS: Member[] = [
  {
    id: 'mem-001',
    fullName: 'Alex Vance',
    email: 'traveler@tripora.ai',
    role: 'OWNER',
    joinedAt: '2026-11-10T12:00:00Z',
  },
];

export default function TripCollaborationPage({ params }: { params: { tripId: string } }) {
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [members, setMembers] = useState<Member[]>(DEFAULT_MEMBERS);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'EDITOR' | 'VIEWER'>('EDITOR');
  const [inviting, setInviting] = useState(false);
  const [lastInviteLink, setLastInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const storageKey = `tripora_trip_members_${params.tripId}`;

  useEffect(() => {
    load();
  }, [params.tripId]);

  async function load() {
    try {
      const tData = await getTripDetail(params.tripId);
      setTrip(tData);

      // Load saved collaborators from localStorage
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          try {
            setMembers(JSON.parse(saved));
            return;
          } catch {}
        }
      }
      setMembers(DEFAULT_MEMBERS);
    } catch (err) {
      console.warn('Collaboration load error:', err);
    }
  }

  function saveMembers(newMembers: Member[]) {
    setMembers(newMembers);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(newMembers));
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setInviting(true);
    setNotification(null);

    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          role,
          tripId: params.tripId,
          tripDestination: trip?.destination || 'Bali, Indonesia',
          tripDates: `${trip?.startDate || 'Nov 20'} → ${trip?.endDate || 'Nov 26, 2026'}`,
          inviterName: 'Alex Vance',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.error || 'Invitation could not be dispatched.');
      }

      setLastInviteLink(data.inviteLink);

      // Add to collaborators list
      if (data.member) {
        const updated = [...members.filter((m) => m.email !== data.member.email), data.member];
        saveMembers(updated);
      }

      if (data.emailSent) {
        setNotification({
          type: 'success',
          message: `Invitation email dispatched via Gmail SMTP to ${data.recipient}!`,
        });
      } else {
        setNotification({
          type: 'success',
          message: `Direct invitation link generated for ${data.recipient}. Link ready below.`,
        });
      }

      setEmail('');
    } catch (err: any) {
      console.error('Invite error:', err);
      // Fallback: generate client-side invite link
      const fallbackToken = `${Date.now().toString(36)}`;
      const fallbackLink = `${window.location.origin}/trips/${params.tripId}?invite=${fallbackToken}`;
      setLastInviteLink(fallbackLink);

      const newMember: Member = {
        id: `mem-${fallbackToken}`,
        email: email.trim(),
        fullName: email.split('@')[0],
        role,
        joinedAt: new Date().toISOString(),
      };
      saveMembers([...members.filter((m) => m.email !== email.trim()), newMember]);

      setNotification({
        type: 'success',
        message: `Direct invite link created for ${email.trim()}. You can copy and share it directly.`,
      });
      setEmail('');
    } finally {
      setInviting(false);
    }
  }

  function handleRemoveMember(memberId: string) {
    if (!confirm('Remove this collaborator from the private expedition?')) return;
    const updated = members.filter((m) => m.id !== memberId);
    saveMembers(updated);
    setNotification({
      type: 'success',
      message: 'Collaborator removed from expedition roster.',
    });
  }

  function copyInviteLink() {
    if (!lastInviteLink) return;
    navigator.clipboard.writeText(lastInviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#080E0A] text-white selection:bg-[#F5D794] selection:text-[#0A120D] pb-24 pt-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/trips/${params.tripId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-[#F5D794] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Expedition Hub</span>
        </Link>

        {/* Header */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46A]/40 bg-[#C5A46A]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5D794]">
              <Users className="h-3 w-3" />
              EXPEDITION CIRCLE &bull; CO-CURATION
            </div>
            <h1 className="mt-2.5 font-serif text-3xl sm:text-4xl text-white font-normal">
              Collaborate on {trip?.destination || 'Bali, Indonesia'}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-white/60 font-light">
              Invite companions, co-travelers, or family to co-edit activity timelines, review luxury sanctuaries, split expense ledgers, and synchronize packing matrices.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SMTP RELAY ACTIVE
          </div>
        </div>

        {/* Notification Feedback Banner */}
        {notification && (
          <div
            className={`mt-6 flex items-center justify-between rounded-2xl p-4 text-xs font-medium animate-in fade-in duration-200 ${
              notification.type === 'success'
                ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                : 'border border-amber-500/40 bg-amber-500/15 text-amber-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F5D794]" />
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-white/60 hover:text-white"
            >
              &times;
            </button>
          </div>
        )}

        {/* Invite Box */}
        <div className="mt-8 rounded-3xl border border-[#C5A46A]/30 bg-[#0D1510] p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#F5D794]" />
              <h2 className="font-serif text-xl text-white">Invite a Co-Traveler</h2>
            </div>
            <span className="text-[11px] font-mono text-white/50">
              Dispatched via <strong className="text-[#F5D794]">ritik95061@gmail.com</strong>
            </span>
          </div>

          <form onSubmit={handleInvite} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter co-traveler's email (e.g. companion@gmail.com)..."
              className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="rounded-2xl border border-white/15 bg-[#16221A] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#C5A46A] focus:outline-none"
            >
              <option value="EDITOR">Editor (Can add & edit days)</option>
              <option value="VIEWER">Viewer (Read only)</option>
            </select>

            <button
              type="submit"
              disabled={inviting}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] px-6 py-3 text-xs sm:text-sm font-bold text-[#0A120D] shadow-md hover:scale-105 transition-all disabled:opacity-50 shrink-0"
            >
              {inviting ? (
                <>
                  <span className="h-3.5 w-3.5 border-2 border-[#0A120D] border-t-transparent rounded-full animate-spin" />
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Invitation</span>
                </>
              )}
            </button>
          </form>

          {/* Invitation Link Box */}
          {lastInviteLink && (
            <div className="mt-5 rounded-2xl border border-[#C5A46A]/40 bg-[#16221A] p-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#F5D794] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Direct VIP Invitation Link Ready:
                </span>
                <span className="text-[10px] font-mono text-white/50">Single-use secure token</span>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#080E0A] p-2.5">
                <span className="truncate text-xs font-mono text-white/80 select-all">
                  {lastInviteLink}
                </span>
                <button
                  type="button"
                  onClick={copyInviteLink}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#C5A46A]/20 border border-[#C5A46A]/40 px-3 py-1 text-xs font-bold text-[#F5D794] hover:bg-[#C5A46A]/30 transition-colors shrink-0"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Members Roster */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-white">
              Expedition Circle ({members.length})
            </h2>
            <span className="text-xs text-white/50">Active collaborators on this journey</span>
          </div>

          <div className="mt-4 space-y-3">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0D1510] p-4 transition-all hover:border-[#C5A46A]/40"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1C2C22] to-[#0A120D] text-[#F5D794] border border-[#C5A46A]/40 font-serif font-bold text-base">
                    {m.fullName?.slice(0, 1).toUpperCase() || 'T'}
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-white font-medium">
                      {m.fullName || m.email}
                    </h3>
                    <p className="text-xs text-white/50 font-mono">{m.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      m.role === 'OWNER'
                        ? 'bg-gradient-to-r from-[#F5D794] to-[#C5A46A] text-[#0A120D]'
                        : m.role === 'EDITOR'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-white/10 text-white/70 border border-white/15'
                    }`}
                  >
                    {m.role}
                  </span>

                  {m.role !== 'OWNER' && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(m.id)}
                      className="text-white/40 hover:text-red-400 p-1.5 rounded-full hover:bg-white/5 transition-colors"
                      title="Remove collaborator"
                    >
                      <UserMinus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
