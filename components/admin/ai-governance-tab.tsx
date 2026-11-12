'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Sliders,
  Send,
  Zap,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { ProviderCircuit } from '@/lib/admin-store';

interface AiGovernanceTabProps {
  circuits: ProviderCircuit[];
  onToggleCircuit: (id: string) => void;
}

export function AiGovernanceTab({
  circuits,
  onToggleCircuit,
}: AiGovernanceTabProps) {
  // AI Playground states
  const [testPrompt, setTestPrompt] = useState(
    'Synthesize an ultra-exclusive 4-day autumn journey in Kyoto for a member of the Sovereign Black tier, prioritizing private machiya living, Daitoku-ji Zen master tea ceremony, and 3-Michelin star Kaiseki banquet.'
  );
  const [temperature, setTemperature] = useState(0.35);
  const [isSimulating, setIsSimulating] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(null);
  const [tokenMetrics, setTokenMetrics] = useState<{
    promptTokens: number;
    completionTokens: number;
    latencyMs: number;
  } | null>(null);

  const handleRunSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPrompt.trim()) return;

    setIsSimulating(true);
    setOutputResult(null);

    setTimeout(() => {
      setIsSimulating(false);
      setTokenMetrics({
        promptTokens: 384,
        completionTokens: 842,
        latencyMs: Math.floor(Math.random() * 80) + 160,
      });
      setOutputResult(
        `[TRIPORA RESERVE SYNTHESIS — GEMINI 1.5 PRO]

ESTATE SELECTION: Aman Kyoto Secret Pavilion (Takagamine)
SUITE ALLOCATION: Washigamine Pavilion (Panoramic Maple Forest)

EXPEDITION TIMELINE:
• Day 1 (Arrival): Private tarmac VIP clearance at Kansai (RJBB). Chauffeured electric Maybach transfer to Takagamine. In-suite Kaiseki welcome banquet by Master Chef Isao Murata.
• Day 2 (Sacred Zen): Dawn private meditation at Daitoku-ji with 15th-generation abbot. Unopened garden viewing and ceremonial matcha preparation.
• Day 3 (Gastronomy): Private visit to Nishiki market heirloom purveyors accompanied by 3-Michelin star culinary team; evening private dining salon at Gion Karyo.
• Day 4 (Departure): Morning onsen mineral bath. Private helicopter transfer to Osaka heliport.

NEURAL CONFIDENCE: 99.4% | SPATIAL ROUTING: Optimal (Zero Congestion)`
      );
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl text-white">AI Matrix & Provider Circuit Governance</h2>
        <p className="mt-1 text-xs text-white/60">
          Supervise Google Gemini 1.5 Pro parameters, external GDS circuit breakers, and run neural synthesis simulations.
        </p>
      </div>

      {/* Model Hyperparameters & Architecture Telemetry */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#0D1510] p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono uppercase text-[10px]">Neural Model</span>
            <Cpu className="h-4 w-4 text-[#F5D794]" />
          </div>
          <p className="mt-2 font-serif text-xl text-white font-medium">Gemini 1.5 Pro</p>
          <p className="mt-1 text-[11px] text-emerald-400 font-medium">Google DeepMind Architecture</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0D1510] p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono uppercase text-[10px]">Context Window</span>
            <Layers className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-2 font-serif text-xl text-white font-medium">1,048,576 Tokens</p>
          <p className="mt-1 text-[11px] text-white/50">Full itinerary & preference memory</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0D1510] p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono uppercase text-[10px]">Sampling Temperature</span>
            <Sliders className="h-4 w-4 text-[#F5D794]" />
          </div>
          <p className="mt-2 font-serif text-xl text-white font-medium">{temperature}</p>
          <p className="mt-1 text-[11px] text-white/50">Calibrated for deterministic luxury</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0D1510] p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-mono uppercase text-[10px]">Synthesis Latency</span>
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-2 font-serif text-xl text-white font-medium">182 ms Avg</p>
          <p className="mt-1 text-[11px] text-emerald-400 font-medium">99.98% SLA Availability</p>
        </div>
      </div>

      {/* Provider Circuit Breakers Table & Controls */}
      <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="font-serif text-xl text-white">External Integration Circuit Breakers</h3>
            <p className="mt-0.5 text-xs text-white/60">
              Automated trip protection: trip manually to test graceful mock fallback or restore operational state.
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/50 font-mono uppercase text-[10px]">
                <th className="pb-3">Provider & Integration</th>
                <th className="pb-3">Domain</th>
                <th className="pb-3">Latency</th>
                <th className="pb-3">Uptime</th>
                <th className="pb-3">Monthly Volume</th>
                <th className="pb-3">Circuit State</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {circuits.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-medium text-white">{c.name}</td>
                  <td className="py-3 font-mono text-[11px] text-white/60">{c.category}</td>
                  <td className="py-3 font-mono text-white/80">{c.latencyMs} ms</td>
                  <td className="py-3 font-mono text-emerald-400">{c.uptimePct}%</td>
                  <td className="py-3 font-mono text-white/60">
                    {c.quotaUsed.toLocaleString()} / {c.monthlyQuota.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        c.status === 'OPERATIONAL'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          c.status === 'OPERATIONAL' ? 'bg-emerald-400' : 'bg-red-400'
                        }`}
                      />
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onToggleCircuit(c.id)}
                      className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        c.status === 'OPERATIONAL'
                          ? 'border border-amber-500/30 text-amber-300 hover:bg-amber-500/10'
                          : 'border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10'
                      }`}
                    >
                      {c.status === 'OPERATIONAL' ? 'Trip Breaker' : 'Reset Circuit'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Neural Prompt Sandbox */}
      <div className="rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-[#F5D794]" />
            <h3 className="font-serif text-xl text-white">Live Neural Prompt Sandbox</h3>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            Connected to Gemini 1.5 Pro
          </span>
        </div>

        <form onSubmit={handleRunSimulation} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/80">
              Traveler Brief & Constraints
            </label>
            <textarea
              rows={3}
              required
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-xs text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/60">Temperature:</span>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-32 accent-[#C5A46A]"
              />
              <span className="font-mono text-xs text-[#F5D794]">{temperature}</span>
            </div>

            <button
              type="submit"
              disabled={isSimulating}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] px-5 py-2 text-xs font-bold text-[#0A120D] shadow-md hover:scale-105 transition-all disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Synthesizing Route...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Synthesize Itinerary</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Output Console */}
        {outputResult && (
          <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-[#080E0A] p-4 text-xs font-mono">
            {tokenMetrics && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 text-[10px] text-white/50 mb-3">
                <span>Prompt Tokens: {tokenMetrics.promptTokens}</span>
                <span>Completion Tokens: {tokenMetrics.completionTokens}</span>
                <span className="text-emerald-400 font-semibold">Latency: {tokenMetrics.latencyMs} ms</span>
              </div>
            )}
            <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
              {outputResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
