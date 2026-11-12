'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Download,
  Lock,
  Filter,
  Clock,
  Terminal,
} from 'lucide-react';
import { AuditLogEntry } from '@/lib/admin-store';

interface AuditTabProps {
  logs: AuditLogEntry[];
}

export function AuditTab({ logs }: AuditTabProps) {
  const [search, setSearch] = useState('');

  const filtered = logs.filter((l) => {
    return (
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.signature.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleExportCsv = () => {
    const headers = 'ID,Timestamp,Actor,Action,Details,IP Address,Signature\n';
    const rows = filtered
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.actor}","${l.action}","${l.details.replace(/"/g, '""')}","${l.ipAddress}","${l.signature}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tripora_Reserve_Audit_Trail_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-white">Platform Security & Immutable Audit Trail</h2>
          <p className="mt-1 text-xs text-white/60">
            Cryptographically signed record of all operational mutations, concierge dispatches, rate overrides, and circuit states.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors self-start sm:self-auto"
        >
          <Download className="h-3.5 w-3.5 text-white/60" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex rounded-2xl border border-white/10 bg-[#0D1510] p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search audit trail by action, actor, or signature..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-6 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-white/50 font-mono uppercase text-[10px]">
              <th className="pb-3">Timestamp (UTC)</th>
              <th className="pb-3">Actor / Concierge Desk</th>
              <th className="pb-3">Action Event</th>
              <th className="pb-3">Operational Details</th>
              <th className="pb-3">Origin IP</th>
              <th className="pb-3 font-mono text-right">Cryptographic Signature</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-[11px]">
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-white/[0.02]">
                <td className="py-3.5 text-white/70 whitespace-nowrap">{l.timestamp}</td>
                <td className="py-3.5 font-semibold text-[#F5D794] whitespace-nowrap">{l.actor}</td>
                <td className="py-3.5 whitespace-nowrap">
                  <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 font-bold text-white text-[10px]">
                    {l.action}
                  </span>
                </td>
                <td className="py-3.5 text-white/90 font-sans text-xs max-w-xs sm:max-w-md">
                  {l.details}
                </td>
                <td className="py-3.5 text-white/50 whitespace-nowrap">{l.ipAddress}</td>
                <td className="py-3.5 text-right text-emerald-400/80 text-[10px] whitespace-nowrap">
                  {l.signature}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-white/50 text-xs">
            No audit records match your query.
          </div>
        )}
      </div>
    </div>
  );
}
