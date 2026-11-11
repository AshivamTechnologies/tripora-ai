'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Mail, Shield, UserMinus, Copy, Check, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';
import { getTripDetail, TripDetail } from '@/lib/trips';

export default function TripCollaborationPage({ params }: { params: { tripId: string } }) {
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'EDITOR' | 'VIEWER'>('EDITOR');
  const [inviting, setInviting] = useState(false);
  const [lastInviteLink, setLastInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    load();
  }, [params.tripId]);

  async function load() {
    try {
      const [tData, mData] = await Promise.all([
        getTripDetail(params.tripId),
        api.request(`/trips/${params.tripId}/collaboration`).catch(() => []),
      ]);
      setTrip(tData);
      setMembers(mData || []);
    } catch (err) {
      console.warn('Collaboration load error:', err);
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setInviting(true);
    try {
      const res = await api.request(`/trips/${params.tripId}/collaboration/invite`, {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), role }),
      });
      setLastInviteLink(res.inviteLink);
      setEmail('');
      load();
    } catch (err: any) {
      alert(err.message || 'Invitation failed');
    } finally {
      setInviting(false);
    }
  }

  async function handleRemoveMember(memberId: string) {
    if (!confirm('Remove this collaborator from the trip?')) return;
    try {
      await api.request(`/trips/${params.tripId}/collaboration/${memberId}`, { method: 'DELETE' });
      load();
    } catch (err: any) {
      alert(err.message || 'Could not remove member');
    }
  }

  function copyInviteLink() {
    if (!lastInviteLink) return;
    navigator.clipboard.writeText(lastInviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href={`/trips/${params.tripId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-forest"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Trip Hub
        </Link>

        {/* Header */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl text-brand-ink sm:text-4xl">
              Collaborate on {trip?.destination || 'Trip'}
            </h1>
            <p className="mt-1 text-sm text-brand-muted">
              Invite friends, co-travelers, or family to co-edit activities, split expenses, and share packing duties.
            </p>
          </div>
        </div>

        {/* Invite Box */}
        <div className="mt-8 rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl text-brand-ink">Invite a Co-Traveler</h2>
          <form onSubmit={handleInvite} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter co-traveler's email..."
              className="flex-1 rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="rounded-2xl border border-brand-line p-3 text-sm focus:outline-none"
            >
              <option value="EDITOR">Editor (Can add & edit days)</option>
              <option value="VIEWER">Viewer (Read only)</option>
            </select>
            <button
              type="submit"
              disabled={inviting}
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-forest px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#274a39]"
            >
              <Mail className="h-4 w-4" />
              {inviting ? 'Dispatching...' : 'Send Invitation'}
            </button>
          </form>

          {lastInviteLink && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold text-emerald-900">Direct Invitation Link Ready:</p>
              <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-white p-2.5">
                <span className="truncate text-xs font-mono text-emerald-800">{lastInviteLink}</span>
                <button
                  type="button"
                  onClick={copyInviteLink}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-900 hover:underline"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Members List */}
        <div className="mt-10">
          <h2 className="font-serif text-2xl text-brand-ink">Trip Members ({members.length || 1})</h2>
          <div className="mt-4 space-y-3">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-2xl border border-brand-line bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mist text-brand-forest font-serif font-bold">
                    {m.fullName?.slice(0, 1) || 'T'}
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-brand-ink">{m.fullName || m.email}</h3>
                    <p className="text-xs text-brand-muted">{m.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      m.role === 'OWNER'
                        ? 'bg-brand-forest text-white'
                        : m.role === 'EDITOR'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-brand-mist text-brand-muted'
                    }`}
                  >
                    {m.role}
                  </span>

                  {m.role !== 'OWNER' && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(m.id)}
                      className="text-brand-muted hover:text-red-600 p-1"
                      title="Remove member"
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
