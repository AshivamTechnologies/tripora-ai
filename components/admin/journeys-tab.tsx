'use client';

import React, { useState } from 'react';
import {
  Compass,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Plane,
  Building2,
  Send,
  Edit3,
  FileText,
  User,
  X,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { BespokeJourney } from '@/lib/admin-store';

interface JourneysTabProps {
  journeys: BespokeJourney[];
  onUpdateStatus: (id: string, status: BespokeJourney['status']) => void;
  onAssignDesk: (id: string, desk: BespokeJourney['assignedConciergeDesk']) => void;
  onUpdateDirective: (id: string, directive: string) => void;
  selectedJourney?: BespokeJourney | null;
}

export function JourneysTab({
  journeys,
  onUpdateStatus,
  onAssignDesk,
  onUpdateDirective,
  selectedJourney,
}: JourneysTabProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [editingJourney, setEditingJourney] = useState<BespokeJourney | null>(selectedJourney || null);
  const [directiveText, setDirectiveText] = useState('');
  const [activeDossier, setActiveDossier] = useState<BespokeJourney | null>(null);

  const filtered = journeys.filter((j) => {
    const matchesSearch =
      j.travelerName.toLowerCase().includes(search.toLowerCase()) ||
      j.referenceCode.toLowerCase().includes(search.toLowerCase()) ||
      j.destination.toLowerCase().includes(search.toLowerCase()) ||
      j.travelerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenEditDirective = (j: BespokeJourney) => {
    setEditingJourney(j);
    setDirectiveText(j.privateConciergeDirective);
  };

  const handleSaveDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJourney) return;
    onUpdateDirective(editingJourney.id, directiveText.trim());
    setEditingJourney(null);
  };

  const handleExportDossier = (j: BespokeJourney) => {
    const dossier = {
      manifestReference: j.referenceCode,
      traveler: {
        name: j.travelerName,
        email: j.travelerEmail,
        tier: j.memberTier,
      },
      expedition: {
        destination: j.destination,
        dates: j.dates,
        durationDays: j.durationDays,
        budgetVolumeUsd: j.budgetVolumeUsd,
        sanctuary: j.sanctuaryName,
        flightArrangement: j.flightArrangement,
        conciergeDesk: j.assignedConciergeDesk,
        status: j.status,
      },
      privateConciergeDirective: j.privateConciergeDirective,
      timestamp: new Date().toISOString(),
      authorizedBy: 'TRIPORA RESERVE EXECUTIVE CONCIERGE',
    };

    const blob = new Blob([JSON.stringify(dossier, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${j.referenceCode}_VIP_Dossier.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-white">Bespoke Expeditions & Concierge Dispatch</h2>
          <p className="mt-1 text-xs text-white/60">
            Real-time pipeline: traveler request intake, AI spatial synthesis, concierge approval, and live field tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-white/50">Active Expeditions:</span>
          <span className="rounded-full bg-[#C5A46A]/20 border border-[#C5A46A]/40 px-2.5 py-0.5 text-xs font-bold text-[#F5D794]">
            {journeys.length} En Route
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0D1510] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by code, traveler name, email, or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'ALL', label: 'All Pipelines' },
            { id: 'PENDING_REVIEW', label: 'Pending Review' },
            { id: 'SYNTHESIZING', label: 'AI Synthesizing' },
            { id: 'CONCIERGE_APPROVED', label: 'Approved' },
            { id: 'EXPEDITION_ACTIVE', label: 'Active in Field' },
            { id: 'COMPLETED', label: 'Completed' },
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setStatusFilter(status.id)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                statusFilter === status.id
                  ? 'bg-[#C5A46A] text-[#0A120D] font-bold shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Cards Grid */}
      <div className="space-y-4">
        {filtered.map((j) => (
          <div
            key={j.id}
            className="group rounded-3xl border border-white/10 bg-[#0D1510] p-6 transition-all hover:border-[#C5A46A]/50 hover:shadow-2xl hover:shadow-[#C5A46A]/5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              {/* Traveler & Expedition Header */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#F5D794]">
                    {j.referenceCode}
                  </span>
                  <span className="text-white/30">&bull;</span>
                  <h3 className="font-serif text-lg text-white font-medium">
                    {j.travelerName}
                  </h3>
                  {j.memberTier === 'SOVEREIGN_BLACK' ? (
                    <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] px-2.5 py-0.5 font-bold uppercase tracking-wider">
                      Black Card Sovereign
                    </span>
                  ) : j.memberTier === 'RESERVE_ELITE' ? (
                    <span className="rounded-full bg-[#C5A46A]/20 text-[#F5D794] border border-[#C5A46A]/40 text-[9px] px-2.5 py-0.5 font-bold uppercase tracking-wider">
                      Reserve Elite
                    </span>
                  ) : (
                    <span className="rounded-full bg-white/10 text-white/70 border border-white/15 text-[9px] px-2.5 py-0.5 font-bold uppercase tracking-wider">
                      Voyager
                    </span>
                  )}
                  <span className="text-xs text-white/40 font-mono">({j.travelerEmail})</span>
                </div>

                <p className="text-xs text-white/70">
                  <span className="font-medium text-white">{j.destination}</span> &bull; {j.durationDays} Days &bull; {j.dates}
                </p>
              </div>

              {/* Status & Assigned Desk Selector */}
              <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                {/* Desk Assignment Selector */}
                <select
                  value={j.assignedConciergeDesk}
                  onChange={(e) => onAssignDesk(j.id, e.target.value as any)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#F5D794] font-medium focus:border-[#C5A46A] focus:outline-none"
                >
                  <option value="Kyoto Desk" className="bg-[#121c16] text-white">Kyoto Desk</option>
                  <option value="Zurich Desk" className="bg-[#121c16] text-white">Zurich Desk</option>
                  <option value="Amalfi Desk" className="bg-[#121c16] text-white">Amalfi Desk</option>
                  <option value="St. Moritz Desk" className="bg-[#121c16] text-white">St. Moritz Desk</option>
                  <option value="London Desk" className="bg-[#121c16] text-white">London Desk</option>
                </select>

                {/* Status Dropdown */}
                <select
                  value={j.status}
                  onChange={(e) => onUpdateStatus(j.id, e.target.value as any)}
                  className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider focus:outline-none ${
                    j.status === 'CONCIERGE_APPROVED'
                      ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                      : j.status === 'EXPEDITION_ACTIVE'
                      ? 'border-[#C5A46A]/50 bg-[#C5A46A]/20 text-[#F5D794]'
                      : j.status === 'SYNTHESIZING'
                      ? 'border-blue-500/40 bg-blue-500/20 text-blue-300'
                      : j.status === 'COMPLETED'
                      ? 'border-white/20 bg-white/10 text-white/60'
                      : 'border-amber-500/40 bg-amber-500/20 text-amber-300'
                  }`}
                >
                  <option value="PENDING_REVIEW" className="bg-[#121c16] text-white">Pending Review</option>
                  <option value="SYNTHESIZING" className="bg-[#121c16] text-white">Synthesizing (AI)</option>
                  <option value="CONCIERGE_APPROVED" className="bg-[#121c16] text-white">Concierge Approved</option>
                  <option value="EXPEDITION_ACTIVE" className="bg-[#121c16] text-white">Expedition Active</option>
                  <option value="COMPLETED" className="bg-[#121c16] text-white">Completed</option>
                </select>
              </div>
            </div>

            {/* Logistics Grid: Sanctuary, Flight & Budget */}
            <div className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs sm:grid-cols-3">
              <div className="flex items-center gap-2.5">
                <Building2 className="h-4 w-4 text-[#F5D794] shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-mono text-white/40">Sanctuary Partner</span>
                  <span className="font-medium text-white truncate">{j.sanctuaryName}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Plane className="h-4 w-4 text-[#F5D794] shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-mono text-white/40">Aviation / Lie-Flat</span>
                  <span className="font-medium text-white truncate">{j.flightArrangement}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-mono text-white/40">Allocated Budget</span>
                  <span className="font-serif text-sm font-semibold text-white">
                    ${j.budgetVolumeUsd.toLocaleString()} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Private Concierge Directive Callout */}
            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Private Concierge Directive
                </span>
                <button
                  onClick={() => handleOpenEditDirective(j)}
                  className="inline-flex items-center gap-1 text-[11px] text-[#F5D794] hover:underline"
                >
                  <Edit3 className="h-3 w-3" />
                  <span>Customize Note</span>
                </button>
              </div>
              <p className="mt-1 text-white/80 font-light italic leading-relaxed">
                &ldquo;{j.privateConciergeDirective}&rdquo;
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
              <span className="text-[10px] font-mono text-white/40">
                Created: {new Date(j.createdAt).toLocaleDateString()} &bull; Assigned: {j.assignedConciergeDesk}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportDossier(j)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <FileText className="h-3.5 w-3.5 text-white/50" />
                  <span>Export Dossier</span>
                </button>

                {j.status === 'PENDING_REVIEW' && (
                  <button
                    onClick={() => onUpdateStatus(j.id, 'CONCIERGE_APPROVED')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-1.5 text-xs font-bold hover:bg-emerald-500/30 transition-all"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                    <span>Approve & Dispatch</span>
                  </button>
                )}

                {j.status === 'CONCIERGE_APPROVED' && (
                  <button
                    onClick={() => onUpdateStatus(j.id, 'EXPEDITION_ACTIVE')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#F5D794] to-[#C5A46A] text-[#0A120D] px-4 py-1.5 text-xs font-bold hover:scale-105 transition-all shadow-md"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Deploy to Field</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-12 text-center">
            <Compass className="mx-auto h-8 w-8 text-white/30" />
            <h3 className="mt-3 font-serif text-lg text-white">No Expeditions in this Pipeline</h3>
            <p className="mt-1 text-xs text-white/50">Try selecting another status tab or clearing search.</p>
          </div>
        )}
      </div>

      {/* Edit Directive Modal */}
      {editingJourney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-lg text-white">Customize Concierge Directive</h3>
                <p className="text-xs text-[#F5D794]">
                  {editingJourney.referenceCode} &bull; {editingJourney.travelerName}
                </p>
              </div>
              <button
                onClick={() => setEditingJourney(null)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDirective} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-white/80">
                  Confidential Concierge Directive & Private Notes
                </label>
                <textarea
                  rows={4}
                  required
                  value={directiveText}
                  onChange={(e) => setDirectiveText(e.target.value)}
                  placeholder="Detail high-touch arrangements (e.g. private tea master booking, helicopter charter, Champagne greeting, dietary specifications)..."
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingJourney(null)}
                  className="rounded-full border border-white/15 px-4 py-2 font-semibold text-white/70 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] px-5 py-2 font-bold text-[#0A120D] shadow-md hover:scale-105 transition-all"
                >
                  Save & Synchronize Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
