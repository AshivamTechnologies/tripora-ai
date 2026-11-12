'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Compass,
  Plane,
  Users,
  BookOpen,
  Sparkles,
  Lock,
  Activity,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { api } from '@/lib/api';
import {
  adminStore,
  Sanctuary,
  BespokeJourney,
  AviationCharter,
  VIPMember,
  EditorialArticle,
  ProviderCircuit,
  AuditLogEntry,
} from '@/lib/admin-store';

import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSecurityGate } from '@/components/admin/admin-security-gate';
import { OverviewTab } from '@/components/admin/overview-tab';
import { SanctuariesTab } from '@/components/admin/sanctuaries-tab';
import { JourneysTab } from '@/components/admin/journeys-tab';
import { AviationTab } from '@/components/admin/aviation-tab';
import { MembersTab } from '@/components/admin/members-tab';
import { EditorialTab } from '@/components/admin/editorial-tab';
import { AiGovernanceTab } from '@/components/admin/ai-governance-tab';
import { AuditTab } from '@/components/admin/audit-tab';

type AdminTab =
  | 'overview'
  | 'sanctuaries'
  | 'journeys'
  | 'aviation'
  | 'members'
  | 'editorial'
  | 'ai-governance'
  | 'audit';

export default function LuxuryAdminPortal() {
  const { user, loading, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Live Data States
  const [sanctuaries, setSanctuaries] = useState<Sanctuary[]>([]);
  const [journeys, setJourneys] = useState<BespokeJourney[]>([]);
  const [aviation, setAviation] = useState<AviationCharter[]>([]);
  const [members, setMembers] = useState<VIPMember[]>([]);
  const [articles, setArticles] = useState<EditorialArticle[]>([]);
  const [circuits, setCircuits] = useState<ProviderCircuit[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [metrics, setMetrics] = useState<any>({
    grossMerchandiseValueUsd: 161500,
    totalCuratedSanctuaries: 6,
    activeExpeditions: 3,
    pendingRequests: 1,
    averageConciergeSlaMin: 4.8,
    neuralMatrixLatencyMs: 182,
    conciergeDesks: [],
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedJourneyForView, setSelectedJourneyForView] = useState<BespokeJourney | null>(null);

  // Load store data
  const refreshData = () => {
    setSanctuaries(adminStore.getSanctuaries());
    setJourneys(adminStore.getJourneys());
    setAviation(adminStore.getAviationCharters());
    setMembers(adminStore.getMembers());
    setArticles(adminStore.getEditorialArticles());
    setCircuits(adminStore.getProviderCircuits());
    setAuditLogs(adminStore.getAuditLogs());
    setMetrics(adminStore.getExecutiveMetrics());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // --- Actions Handlers ---
  const handleAddSanctuary = (item: Omit<Sanctuary, 'id'>) => {
    const created = adminStore.addSanctuary(item);
    refreshData();
    triggerToast(`Curated sanctuary "${created.name}" added to the Private Reserve.`);
  };

  const handleUpdateSanctuary = (id: string, updates: Partial<Sanctuary>) => {
    adminStore.updateSanctuary(id, updates);
    refreshData();
    triggerToast(`Sanctuary parameters successfully updated.`);
  };

  const handleDeleteSanctuary = (id: string) => {
    adminStore.deleteSanctuary(id);
    refreshData();
    triggerToast(`Sanctuary removed from the portfolio.`);
  };

  const handleUpdateJourneyStatus = (id: string, status: BespokeJourney['status']) => {
    adminStore.updateJourneyStatus(id, status);
    refreshData();
    triggerToast(`Expedition status updated to ${status.replace('_', ' ')}.`);
  };

  const handleAssignDesk = (id: string, desk: BespokeJourney['assignedConciergeDesk']) => {
    adminStore.assignJourneyDesk(id, desk);
    refreshData();
    triggerToast(`Assigned expedition to ${desk}.`);
  };

  const handleUpdateDirective = (id: string, directive: string) => {
    adminStore.updateJourneyDirective(id, directive);
    refreshData();
    triggerToast(`Private concierge directive synchronized.`);
  };

  const handleUpdateAviationStatus = (id: string, status: AviationCharter['status']) => {
    adminStore.updateAviationStatus(id, status);
    refreshData();
    triggerToast(`Aviation dispatch status updated to ${status}.`);
  };

  const handleUpdateMemberTier = (id: string, tier: VIPMember['memberTier']) => {
    adminStore.updateMemberTier(id, tier);
    refreshData();
    triggerToast(`Traveler membership tier updated to ${tier}.`);
  };

  const handleUpdatePreferences = (
    id: string,
    preferences: VIPMember['preferences'],
    conciergeNotes: string
  ) => {
    adminStore.updateMemberPreferences(id, preferences, conciergeNotes);
    refreshData();
    triggerToast(`High-net-worth preference dossier synchronized.`);
  };

  const handleToggleSpotlight = (id: string) => {
    adminStore.toggleArticleSpotlight(id);
    refreshData();
    triggerToast(`Editorial spotlight hero visibility toggled.`);
  };

  const handleToggleArticleStatus = (id: string) => {
    adminStore.toggleArticleStatus(id);
    refreshData();
    triggerToast(`Publication status updated.`);
  };

  const handleToggleCircuit = (id: string) => {
    adminStore.toggleProviderCircuit(id);
    refreshData();
    triggerToast(`Provider circuit breaker state toggled.`);
  };

  const handleResetData = () => {
    if (confirm('Reset all admin modules and logs to pristine luxury seed defaults?')) {
      adminStore.resetToDefaults();
      refreshData();
      triggerToast('Platform restored to luxury reference state.');
    }
  };

  const handleExportMaster = () => {
    const fullExport = {
      system: 'TRIPORA RESERVE ENTERPRISE OPERATIONS',
      exportedAt: new Date().toISOString(),
      metrics,
      sanctuaries,
      bespokeJourneys: journeys,
      aviationCharters: aviation,
      vipMembers: members,
      editorialArticles: articles,
      circuits,
      auditLogs,
    };

    const blob = new Blob([JSON.stringify(fullExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tripora_Reserve_Master_Export_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Master JSON manifest downloaded.');
  };

  const handleSelectJourneyFromOverview = (j: BespokeJourney) => {
    setSelectedJourneyForView(j);
    setActiveTab('journeys');
  };

  const handleAuthenticateAdmin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password: pass }),
      });
      if (res?.tokens?.accessToken) {
        api.setToken(res.tokens.accessToken);
      }
      if (res?.user && res.user.role === 'ADMIN') {
        setUser(res.user);
        adminStore.addAuditLog('ADMIN_CLEARANCE_AUTHENTICATED', `Master concierge access authorized for ${email}`);
        refreshData();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Admin authentication failure:', err);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080E0A] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 border-2 border-[#C5A46A] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-[#F5D794] tracking-widest uppercase">
            Verifying Diplomatic Clearance...
          </span>
        </div>
      </div>
    );
  }

  // Security Gate: Restrict access to verified ADMIN role only
  if (!user || user.role !== 'ADMIN') {
    return (
      <AdminSecurityGate
        currentUser={user}
        onAuthenticateAdmin={handleAuthenticateAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080E0A] text-white selection:bg-[#F5D794] selection:text-[#0A120D] pb-24">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-[#C5A46A]/60 bg-[#121c16]/95 backdrop-blur-md px-4 py-3 text-xs font-medium text-white shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="h-4 w-4 text-[#F5D794]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/50 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Admin Executive Header */}
      <AdminHeader
        onOpenAddSanctuary={() => setActiveTab('sanctuaries')}
        onOpenAiSandbox={() => setActiveTab('ai-governance')}
        onExportData={handleExportMaster}
        onResetData={handleResetData}
      />

      {/* Master Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        {/* Luxury Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-white/10 pb-4">
          {[
            {
              id: 'overview',
              label: 'Command Telemetry',
              icon: Activity,
              badge: 'LIVE',
              badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
            },
            {
              id: 'sanctuaries',
              label: 'Sanctuaries & Estates',
              icon: Building2,
              badge: `${sanctuaries.length}`,
              badgeColor: 'bg-[#C5A46A]/20 text-[#F5D794] border border-[#C5A46A]/30',
            },
            {
              id: 'journeys',
              label: 'VIP Expeditions',
              icon: Compass,
              badge: `${journeys.length}`,
              badgeColor: 'bg-[#C5A46A]/20 text-[#F5D794] border border-[#C5A46A]/30',
            },
            {
              id: 'aviation',
              label: 'Private Aviation',
              icon: Plane,
              badge: `${aviation.length} Jets`,
              badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
            },
            {
              id: 'members',
              label: 'Traveler CRM',
              icon: Users,
              badge: 'HNWI',
              badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
            },
            {
              id: 'editorial',
              label: 'Field Notes CMS',
              icon: BookOpen,
              badge: `${articles.length}`,
              badgeColor: 'bg-white/10 text-white/70 border border-white/10',
            },
            {
              id: 'ai-governance',
              label: 'AI Matrix & Circuits',
              icon: Sparkles,
              badge: 'Gemini 1.5 Pro',
              badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
            },
            {
              id: 'audit',
              label: 'Audit Trail',
              icon: ShieldCheck,
              badge: 'SHA-256',
              badgeColor: 'bg-white/10 text-white/70 border border-white/10',
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] text-[#0A120D] shadow-md shadow-[#C5A46A]/10 font-bold scale-[1.02]'
                    : 'bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white border border-white/5'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#0A120D]' : 'text-[#F5D794]'}`} />
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[9px] font-mono font-bold ${
                    isActive ? 'bg-[#0A120D]/20 text-[#0A120D]' : tab.badgeColor
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="mt-8 animate-in fade-in duration-300">
          {activeTab === 'overview' && (
            <OverviewTab
              metrics={metrics}
              journeys={journeys}
              sanctuaries={sanctuaries}
              aviation={aviation}
              members={members}
              circuits={circuits}
              onSelectTab={(tabId) => setActiveTab(tabId)}
              onSelectJourney={handleSelectJourneyFromOverview}
            />
          )}

          {activeTab === 'sanctuaries' && (
            <SanctuariesTab
              sanctuaries={sanctuaries}
              onAddSanctuary={handleAddSanctuary}
              onUpdateSanctuary={handleUpdateSanctuary}
              onDeleteSanctuary={handleDeleteSanctuary}
            />
          )}

          {activeTab === 'journeys' && (
            <JourneysTab
              journeys={journeys}
              onUpdateStatus={handleUpdateJourneyStatus}
              onAssignDesk={handleAssignDesk}
              onUpdateDirective={handleUpdateDirective}
              selectedJourney={selectedJourneyForView}
            />
          )}

          {activeTab === 'aviation' && (
            <AviationTab
              charters={aviation}
              onUpdateStatus={handleUpdateAviationStatus}
            />
          )}

          {activeTab === 'members' && (
            <MembersTab
              members={members}
              onUpdateTier={handleUpdateMemberTier}
              onUpdatePreferences={handleUpdatePreferences}
            />
          )}

          {activeTab === 'editorial' && (
            <EditorialTab
              articles={articles}
              onToggleSpotlight={handleToggleSpotlight}
              onToggleStatus={handleToggleArticleStatus}
            />
          )}

          {activeTab === 'ai-governance' && (
            <AiGovernanceTab
              circuits={circuits}
              onToggleCircuit={handleToggleCircuit}
            />
          )}

          {activeTab === 'audit' && <AuditTab logs={auditLogs} />}
        </div>
      </main>
    </div>
  );
}
