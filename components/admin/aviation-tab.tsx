'use client';

import React, { useState } from 'react';
import {
  Plane,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Utensils,
  ShieldCheck,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { AviationCharter } from '@/lib/admin-store';

interface AviationTabProps {
  charters: AviationCharter[];
  onUpdateStatus: (id: string, status: AviationCharter['status']) => void;
}

export function AviationTab({ charters, onUpdateStatus }: AviationTabProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = charters.filter((c) => {
    const matchesSearch =
      c.tailNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.aircraftModel.toLowerCase().includes(search.toLowerCase()) ||
      c.route.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-white">Private Aviation & Lie-Flat Charters</h2>
          <p className="mt-1 text-xs text-white/60">
            NetJets-grade fleet coordination: Bombardier Global 7500, Gulfstream G650ER, and commercial First Suites.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-white/50">Charter Volume:</span>
          <span className="rounded-full bg-[#C5A46A]/20 border border-[#C5A46A]/40 px-3 py-1 text-xs font-bold text-[#F5D794]">
            ${charters.reduce((acc, c) => acc + c.charterRateUsd, 0).toLocaleString()} USD
          </span>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0D1510] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search tail number, aircraft model, or FBO route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'CONFIRMED', 'DISPATCHED', 'EMPTY_LEG_OPEN', 'STANDBY'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-[#C5A46A] text-[#0A120D] font-bold shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
              }`}
            >
              {status.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Charters Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="group rounded-3xl border border-white/10 bg-[#0D1510] p-6 transition-all hover:border-[#C5A46A]/50 hover:shadow-2xl hover:shadow-[#C5A46A]/5"
          >
            {/* Top Bar: Tail & Status */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#F5D794] bg-[#C5A46A]/10 px-2.5 py-0.5 rounded-md border border-[#C5A46A]/30">
                    {c.tailNumber}
                  </span>
                  <span className="font-serif text-lg text-white font-medium">
                    {c.aircraftModel}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/60">
                  Capacity: {c.capacitySeats} VIP Passengers &bull; Lie-Flat Berth
                </p>
              </div>

              {/* Status Selector */}
              <select
                value={c.status}
                onChange={(e) => onUpdateStatus(c.id, e.target.value as any)}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider focus:outline-none ${
                  c.status === 'DISPATCHED'
                    ? 'border-blue-500/40 bg-blue-500/20 text-blue-300'
                    : c.status === 'CONFIRMED'
                    ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                    : c.status === 'EMPTY_LEG_OPEN'
                    ? 'border-[#F5D794]/60 bg-[#C5A46A]/20 text-[#F5D794]'
                    : 'border-white/20 bg-white/10 text-white/60'
                }`}
              >
                <option value="CONFIRMED" className="bg-[#121c16] text-white">CONFIRMED</option>
                <option value="DISPATCHED" className="bg-[#121c16] text-white">DISPATCHED (AIRBORNE)</option>
                <option value="EMPTY_LEG_OPEN" className="bg-[#121c16] text-white">EMPTY LEG OPEN</option>
                <option value="STANDBY" className="bg-[#121c16] text-white">STANDBY</option>
              </select>
            </div>

            {/* Flight Route Visual */}
            <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-xs">
              <div className="flex items-center justify-between font-mono text-white/90">
                <span className="font-semibold text-white">{c.route.split('→')[0]?.trim()}</span>
                <div className="flex items-center gap-2 text-white/30">
                  <span className="h-px w-8 bg-white/20" />
                  <Plane className="h-3.5 w-3.5 text-[#F5D794] rotate-45" />
                  <span className="h-px w-8 bg-white/20" />
                </div>
                <span className="font-semibold text-white">{c.route.split('→')[1]?.trim()}</span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-white/50 border-t border-white/5 pt-2">
                <div>
                  <span className="block font-mono text-[9px] uppercase text-white/30">Departure FBO</span>
                  <span className="text-white/80">{c.departureFBO}</span>
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase text-white/30">Arrival FBO</span>
                  <span className="text-white/80">{c.arrivalFBO}</span>
                </div>
              </div>
            </div>

            {/* In-Flight Catering Directive */}
            <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F5D794]">
                <Utensils className="h-3 w-3 text-[#F5D794]" />
                <span>Private Jet Catering & Provisions</span>
              </div>
              <p className="mt-1 text-white/70 italic font-light">
                {c.cateringNotes}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
              <div>
                <span className="text-[9px] font-mono uppercase text-white/40">Charter Tariff</span>
                <p className="font-serif text-lg font-semibold text-white">
                  ${c.charterRateUsd.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-white/50">USD</span>
                </p>
              </div>

              <span className="font-mono text-[10px] text-white/40">
                Departure: {c.departureTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
