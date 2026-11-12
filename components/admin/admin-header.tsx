'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Plane,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Download,
  Plus,
  Compass,
  Clock,
  Terminal,
} from 'lucide-react';

interface AdminHeaderProps {
  onOpenAddSanctuary: () => void;
  onOpenAiSandbox: () => void;
  onExportData: () => void;
  onResetData: () => void;
}

export function AdminHeader({
  onOpenAddSanctuary,
  onOpenAiSandbox,
  onExportData,
  onResetData,
}: AdminHeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[#080E0A] pt-4 pb-6">
      {/* Top Telemetry Strip */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3 text-[11px] font-mono text-white/60">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              DISPATCH MATRIX ONLINE
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/70">KYOTO &amp; ZURICH DESKS CONNECTED</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-white/50">
            <div className="hidden md:flex items-center gap-3">
              <span className="flex items-center gap-1 text-white/80">
                <span className="text-[#F5D794]">JP</span> Kyoto 06:15 AM
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1 text-white/80">
                <span className="text-[#F5D794]">CH</span> Zurich 10:15 PM
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1 text-white/80">
                <span className="text-[#F5D794]">IT</span> Amalfi 10:15 PM
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#F5D794] hover:text-white transition-colors"
            >
              <span>Traveler View</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Main Executive Heading & Action Ribbon */}
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46A]/40 bg-[#C5A46A]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5D794] shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#F5D794]" />
              TRIPORA RESERVE &bull; EXECUTIVE COMMAND MATRIX
            </div>
            <h1 className="mt-2.5 font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal tracking-tight">
              Aman & Belmond Concierge Operations
            </h1>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Unified back-office infrastructure: luxury sanctuary inventory, bespoke VIP expedition dispatch,
              high-net-worth preference dossiers, and private charter allocation.
            </p>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              onClick={onOpenAddSanctuary}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#F5D794] via-[#eedcae] to-[#C5A46A] px-3.5 sm:px-4 py-2 text-xs font-bold text-[#0A120D] shadow-md hover:scale-105 transition-all"
            >
              <Plus className="h-3.5 w-3.5 text-[#0A120D]" />
              <span>Add Sanctuary</span>
            </button>

            <button
              onClick={onOpenAiSandbox}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-medium text-white transition-colors"
            >
              <Terminal className="h-3.5 w-3.5 text-[#F5D794]" />
              <span>Concierge Console</span>
            </button>

            <button
              onClick={onExportData}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-medium text-white/80 hover:text-white transition-colors"
              title="Export Master JSON Manifest"
            >
              <Download className="h-3.5 w-3.5 text-white/60" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-medium text-white/60 hover:text-white transition-colors"
              title="Reset data to initial luxury seeds"
            >
              <RefreshCw className="h-3 w-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
