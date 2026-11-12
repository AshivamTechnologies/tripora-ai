'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Star,
  ShieldCheck,
  Edit2,
  Plane,
  Heart,
  Utensils,
  Moon,
  Coffee,
  X,
  Lock,
} from 'lucide-react';
import { VIPMember } from '@/lib/admin-store';

interface MembersTabProps {
  members: VIPMember[];
  onUpdateTier: (id: string, tier: VIPMember['memberTier']) => void;
  onUpdatePreferences: (
    id: string,
    preferences: VIPMember['preferences'],
    conciergeNotes: string
  ) => void;
}

export function MembersTab({
  members,
  onUpdateTier,
  onUpdatePreferences,
}: MembersTabProps) {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [editingMember, setEditingMember] = useState<VIPMember | null>(null);

  // Form states for editing preferences
  const [prefAviation, setPrefAviation] = useState('');
  const [prefHospitality, setPrefHospitality] = useState('');
  const [prefDietary, setPrefDietary] = useState('');
  const [prefWellness, setPrefWellness] = useState('');
  const [notes, setNotes] = useState('');

  const filtered = members.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.homeCity.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === 'ALL' || m.memberTier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleOpenEdit = (m: VIPMember) => {
    setEditingMember(m);
    setPrefAviation(m.preferences.aviation);
    setPrefHospitality(m.preferences.hospitality);
    setPrefDietary(m.preferences.dietary);
    setPrefWellness(m.preferences.wellness);
    setNotes(m.conciergeNotes);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    onUpdatePreferences(
      editingMember.id,
      {
        aviation: prefAviation.trim(),
        hospitality: prefHospitality.trim(),
        dietary: prefDietary.trim(),
        wellness: prefWellness.trim(),
      },
      notes.trim()
    );
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-white">VIP Traveler CRM & Preference Dossiers</h2>
          <p className="mt-1 text-xs text-white/60">
            Virtuoso & Aman-grade guest intelligence: granular habits, dietary nuances, pillow menus, and confidential directives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-white/50">Total Client Portfolio:</span>
          <span className="rounded-full bg-[#C5A46A]/20 border border-[#C5A46A]/40 px-3 py-1 text-xs font-bold text-[#F5D794]">
            ${members.reduce((acc, m) => acc + m.lifetimeSpendUsd, 0).toLocaleString()} USD
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0D1510] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search VIP traveler by name, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'SOVEREIGN_BLACK', 'RESERVE_ELITE', 'VOYAGER'].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                tierFilter === tier
                  ? 'bg-[#C5A46A] text-[#0A120D] font-bold shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
              }`}
            >
              {tier === 'SOVEREIGN_BLACK'
                ? 'Black Card'
                : tier === 'RESERVE_ELITE'
                ? 'Reserve Elite'
                : tier === 'VOYAGER'
                ? 'Voyager'
                : 'All Members'}
            </button>
          ))}
        </div>
      </div>

      {/* Members Dossiers Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="group rounded-3xl border border-white/10 bg-[#0D1510] p-6 transition-all hover:border-[#C5A46A]/50 hover:shadow-2xl hover:shadow-[#C5A46A]/5"
          >
            {/* Top Info Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1C2C22] to-[#0A120D] text-[#F5D794] border border-[#C5A46A]/40 font-serif text-lg font-bold">
                  {m.fullName.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg text-white font-medium">
                      {m.fullName}
                    </h3>
                    {m.kycStatus === 'VERIFIED_DIPLOMATIC' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">
                        <ShieldCheck className="h-2.5 w-2.5" /> Diplomatic
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 font-mono">{m.email}</p>
                  <p className="text-[11px] text-white/60">Base: {m.homeCity}</p>
                </div>
              </div>

              {/* Tier Selector */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <select
                  value={m.memberTier}
                  onChange={(e) => onUpdateTier(m.id, e.target.value as any)}
                  className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider focus:outline-none ${
                    m.memberTier === 'SOVEREIGN_BLACK'
                      ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                      : m.memberTier === 'RESERVE_ELITE'
                      ? 'border-[#C5A46A]/50 bg-[#C5A46A]/20 text-[#F5D794]'
                      : 'border-white/20 bg-white/10 text-white/70'
                  }`}
                >
                  <option value="SOVEREIGN_BLACK" className="bg-[#121c16] text-white">Black Card Sovereign</option>
                  <option value="RESERVE_ELITE" className="bg-[#121c16] text-white">Reserve Elite</option>
                  <option value="VOYAGER" className="bg-[#121c16] text-white">Voyager Member</option>
                </select>

                <button
                  onClick={() => handleOpenEdit(m)}
                  className="rounded-full border border-white/10 bg-white/5 p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  title="Edit Preferences Dossier"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Financial Telemetry Banner */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-xs">
              <div>
                <span className="block font-mono text-[9px] uppercase text-white/40">Lifetime Spend</span>
                <span className="font-serif text-base font-semibold text-[#F5D794]">
                  ${m.lifetimeSpendUsd.toLocaleString()} USD
                </span>
              </div>
              <div>
                <span className="block font-mono text-[9px] uppercase text-white/40">Completed Expeditions</span>
                <span className="font-serif text-base font-semibold text-white">
                  {m.completedExpeditions} Expeditions
                </span>
              </div>
            </div>

            {/* Granular Preference Dossier Accordion/Grid */}
            <div className="mt-4 space-y-2.5 text-xs">
              {/* Aviation Preference */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F5D794]">
                  <Plane className="h-3 w-3 text-[#F5D794]" />
                  <span>Aviation & Transit</span>
                </div>
                <p className="mt-1 text-white/80 font-light text-[11px] leading-relaxed">
                  {m.preferences.aviation}
                </p>
              </div>

              {/* Hospitality & Pillow Menu */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F5D794]">
                  <Moon className="h-3 w-3 text-[#F5D794]" />
                  <span>Suite Architecture & Pillow Menu</span>
                </div>
                <p className="mt-1 text-white/80 font-light text-[11px] leading-relaxed">
                  {m.preferences.hospitality}
                </p>
              </div>

              {/* Culinary & Wine */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F5D794]">
                  <Utensils className="h-3 w-3 text-[#F5D794]" />
                  <span>Dietary Restrictions & Wine</span>
                </div>
                <p className="mt-1 text-white/80 font-light text-[11px] leading-relaxed">
                  {m.preferences.dietary}
                </p>
              </div>
            </div>

            {/* Confidential Concierge Directive */}
            <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-3 text-xs">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                <Lock className="h-3 w-3" />
                <span>Invisible Discretion Log</span>
              </div>
              <p className="mt-1 text-white/80 italic font-light text-[11px]">
                &ldquo;{m.conciergeNotes}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dossier Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-lg text-white">Edit Luxury Preference Dossier</h3>
                <p className="text-xs text-[#F5D794]">{editingMember.fullName}</p>
              </div>
              <button
                onClick={() => setEditingMember(null)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSavePreferences} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-white/80">Aviation & Transit Directives</label>
                <input
                  type="text"
                  required
                  value={prefAviation}
                  onChange={(e) => setPrefAviation(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#C5A46A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-white/80">Suite & Pillow Menu Preferences</label>
                <input
                  type="text"
                  required
                  value={prefHospitality}
                  onChange={(e) => setPrefHospitality(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#C5A46A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-white/80">Dietary & Cellar Wine Nuances</label>
                <input
                  type="text"
                  required
                  value={prefDietary}
                  onChange={(e) => setPrefDietary(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#C5A46A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-white/80">Wellness & Cultural Sessions</label>
                <input
                  type="text"
                  required
                  value={prefWellness}
                  onChange={(e) => setPrefWellness(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#C5A46A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-white/80">Invisible Discretion & Protocol Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-white focus:border-[#C5A46A] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="rounded-full border border-white/15 px-4 py-2 font-semibold text-white/70 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] px-5 py-2 font-bold text-[#0A120D] shadow-md hover:scale-105 transition-all"
                >
                  Synchronize Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
