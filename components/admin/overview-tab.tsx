'use client';

import React from 'react';
import {
  DollarSign,
  Building2,
  Compass,
  Clock,
  Sparkles,
  Plane,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Users,
  Activity,
  Globe,
} from 'lucide-react';
import {
  BespokeJourney,
  Sanctuary,
  AviationCharter,
  VIPMember,
  ProviderCircuit,
} from '@/lib/admin-store';

interface OverviewTabProps {
  metrics: any;
  journeys: BespokeJourney[];
  sanctuaries: Sanctuary[];
  aviation: AviationCharter[];
  members: VIPMember[];
  circuits: ProviderCircuit[];
  onSelectTab: (tabId: any) => void;
  onSelectJourney: (journey: BespokeJourney) => void;
}

export function OverviewTab({
  metrics,
  journeys,
  sanctuaries,
  aviation,
  members,
  circuits,
  onSelectTab,
  onSelectJourney,
}: OverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* 5-Column Executive KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* GMV */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono uppercase tracking-wider text-[10px]">Gross Booking Volume</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <TrendingUp className="h-3 w-3" /> +28.4%
            </span>
          </div>
          <p className="mt-3 font-serif text-2xl sm:text-3xl text-white font-normal">
            ${(metrics.grossMerchandiseValueUsd || 161500).toLocaleString()}
          </p>
          <p className="mt-1 text-[11px] text-white/50">
            Combined bespoke journeys & private aviation
          </p>
          <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-[#F5D794]/5 blur-xl pointer-events-none" />
        </div>

        {/* Curated Sanctuaries */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono uppercase tracking-wider text-[10px]">Curated Sanctuaries</span>
            <Building2 className="h-4 w-4 text-[#F5D794]" />
          </div>
          <p className="mt-3 font-serif text-2xl sm:text-3xl text-white font-normal">
            {metrics.totalCuratedSanctuaries || sanctuaries.length}
          </p>
          <p className="mt-1 text-[11px] text-emerald-400/90 font-medium">
            100% 5-Star &bull; Aman & Belmond Parity
          </p>
        </div>

        {/* Active VIP Expeditions */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono uppercase tracking-wider text-[10px]">VIP Expeditions</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F5D794] bg-[#C5A46A]/15 px-2 py-0.5 rounded-full border border-[#C5A46A]/30">
              {metrics.activeExpeditions} Live
            </span>
          </div>
          <p className="mt-3 font-serif text-2xl sm:text-3xl text-white font-normal">
            {journeys.length} Total
          </p>
          <p className="mt-1 text-[11px] text-white/50">
            {metrics.pendingRequests} pending concierge review
          </p>
        </div>

        {/* Concierge SLA */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono uppercase tracking-wider text-[10px]">Concierge SLA</span>
            <Clock className="h-4 w-4 text-[#F5D794]" />
          </div>
          <p className="mt-3 font-serif text-2xl sm:text-3xl text-white font-normal">
            {metrics.averageConciergeSlaMin} min
          </p>
          <p className="mt-1 text-[11px] text-emerald-400/90 font-medium">
            99.8% Dispatched under 8 min
          </p>
        </div>

        {/* Concierge System Reliability */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono uppercase tracking-wider text-[10px]">Concierge SLA Reliability</span>
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 font-serif text-2xl sm:text-3xl text-white font-normal">
            99.9%
          </p>
          <p className="mt-1 text-[11px] text-emerald-400/90 font-medium">
            Active Global Diplomatic Desks
          </p>
        </div>
      </div>

      {/* Global Concierge Desks Telemetry Matrix */}
      <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#F5D794]" />
              <h2 className="font-serif text-xl sm:text-2xl text-white">
                Global Concierge Desks & Live Telemetry
              </h2>
            </div>
            <p className="mt-1 text-xs text-white/60">
              High-net-worth client coordinators actively routing requests across local time zones.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('journeys')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5D794] hover:text-white transition-colors self-start sm:self-auto"
          >
            <span>View All Journeys</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.conciergeDesks.map((desk: any) => (
            <div
              key={desk.name}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 hover:border-[#C5A46A]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-base text-white font-medium">{desk.name}</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {desk.status}
                </span>
              </div>
              <p className="mt-2 font-mono text-xs text-[#F5D794]">{desk.time}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-white/50 border-t border-white/5 pt-2">
                <span>Routing Load:</span>
                <span className="font-medium text-white/80">{desk.load}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Live Expeditions Pipeline & Provider Health */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left 7 Cols: Active Bespoke Journeys Pipeline Preview */}
        <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-6 shadow-xl lg:col-span-7">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-xl text-white">VIP Expeditions in Queue</h3>
              <p className="mt-0.5 text-xs text-white/60">
                Awaiting concierge approval or actively travelling.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('journeys')}
              className="text-xs font-semibold text-[#F5D794] hover:underline"
            >
              Manage &rarr;
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {journeys.slice(0, 4).map((j) => (
              <div
                key={j.id}
                onClick={() => onSelectJourney(j)}
                className="group cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-[#C5A46A]/50 hover:bg-white/[0.05]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#F5D794] font-semibold">
                      {j.referenceCode}
                    </span>
                    <span className="text-white/40">&bull;</span>
                    <span className="text-xs font-medium text-white">
                      {j.travelerName}
                    </span>
                    {j.memberTier === 'SOVEREIGN_BLACK' && (
                      <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] px-2 py-0.2 font-bold uppercase tracking-wider">
                        Black Card
                      </span>
                    )}
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      j.status === 'CONCIERGE_APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : j.status === 'EXPEDITION_ACTIVE'
                        ? 'bg-[#C5A46A]/20 text-[#F5D794] border border-[#C5A46A]/40'
                        : j.status === 'SYNTHESIZING'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {j.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-white/70">
                  <span>
                    {j.destination} &bull; {j.durationDays} Days ({j.dates})
                  </span>
                  <span className="font-mono font-semibold text-white">
                    ${j.budgetVolumeUsd.toLocaleString()} USD
                  </span>
                </div>

                <p className="mt-2 text-[11px] text-white/50 line-clamp-1 italic font-light">
                  &ldquo;{j.privateConciergeDirective}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: System Circuit Breakers & Integrations */}
        <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-6 shadow-xl lg:col-span-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-xl text-white">Provider Circuits</h3>
              <p className="mt-0.5 text-xs text-white/60">
                Real-time API health and fallback status.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('ai-governance')}
              className="text-xs font-semibold text-[#F5D794] hover:underline"
            >
              Governance &rarr;
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {circuits.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs"
              >
                <div>
                  <p className="font-medium text-white">{c.name}</p>
                  <p className="text-[10px] font-mono text-white/50">
                    Latency: {c.latencyMs}ms &bull; Uptime: {c.uptimePct}%
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      c.status === 'OPERATIONAL'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        c.status === 'OPERATIONAL' ? 'bg-emerald-400' : 'bg-red-400'
                      }`}
                    />
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats on VIP Member Tiers */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="font-mono uppercase text-[10px]">Client Portfolio Tiers</span>
              <button
                onClick={() => onSelectTab('members')}
                className="text-[10px] text-[#F5D794] hover:underline font-semibold"
              >
                View CRM &rarr;
              </button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2">
                <span className="text-[9px] font-mono font-bold text-amber-300 uppercase">Sovereign</span>
                <p className="text-base font-serif text-white font-semibold">
                  {members.filter((m) => m.memberTier === 'SOVEREIGN_BLACK').length}
                </p>
              </div>
              <div className="rounded-xl border border-[#C5A46A]/30 bg-[#C5A46A]/10 p-2">
                <span className="text-[9px] font-mono font-bold text-[#F5D794] uppercase">Reserve</span>
                <p className="text-base font-serif text-white font-semibold">
                  {members.filter((m) => m.memberTier === 'RESERVE_ELITE').length}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                <span className="text-[9px] font-mono font-bold text-white/70 uppercase">Voyager</span>
                <p className="text-base font-serif text-white font-semibold">
                  {members.filter((m) => m.memberTier === 'VOYAGER').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
