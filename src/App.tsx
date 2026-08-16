import React from 'react';
import { useVibeStore } from './store/useVibeStore';
import { useTranslation } from './i18n/useTranslation';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ExecutiveSummary } from './components/dashboard/ExecutiveSummary';
import { ProjectRadarView } from './components/radar/ProjectRadarView';
import { ProjectSynergyGraph } from './components/synergy/ProjectSynergyGraph';
import { VibeCopilot } from './components/copilot/VibeCopilot';
import { AssetMiningView } from './components/assets/AssetMiningView';
import { GraveyardView } from './components/graveyard/GraveyardView';
import { IdeaInboxView } from './components/ideas/IdeaInboxView';
import { ProjectDnaView } from './components/dna/ProjectDnaView';
import { GitHubActionsRunner } from './components/actions/GitHubActionsRunner';
import { SettingsModal } from './components/settings/SettingsModal';
import { NewProjectModal } from './components/settings/NewProjectModal';
import { NotificationToast } from './components/common/NotificationToast';
import {
  LayoutDashboard,
  Radar,
  Sparkles,
  Archive,
  Lightbulb,
  Network,
  Bot,
} from 'lucide-react';

export const App: React.FC = () => {
  const { activeTab, setActiveTab } = useVibeStore();
  const { t } = useTranslation();

  const mobileTabs = [
    { id: 'dashboard', label: t.nav.dashboard.split(' ')[0], icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'radar', label: t.nav.radar.split(' ')[0], icon: <Radar className="w-4 h-4" /> },
    { id: 'copilot', label: 'AI Copilot', icon: <Bot className="w-4 h-4 text-cyan-400" /> },
    { id: 'synergy', label: 'Synergy', icon: <Network className="w-4 h-4 text-indigo-400" /> },
    { id: 'assets', label: t.nav.assets.split(' ')[0], icon: <Sparkles className="w-4 h-4" /> },
    { id: 'graveyard', label: t.nav.graveyard.split(' ')[0], icon: <Archive className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F1F5F9] flex flex-col font-sans bg-grid-pattern selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Main Content Area */}
        <main className="flex-1 min-w-0 p-3.5 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <ExecutiveSummary />}
          {activeTab === 'radar' && <ProjectRadarView />}
          {activeTab === 'synergy' && <ProjectSynergyGraph />}
          {activeTab === 'copilot' && <VibeCopilot />}
          {activeTab === 'assets' && <AssetMiningView />}
          {activeTab === 'graveyard' && <GraveyardView />}
          {activeTab === 'ideas' && <IdeaInboxView />}
          {activeTab === 'dna' && <ProjectDnaView />}
          {activeTab === 'actions' && <GitHubActionsRunner />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav aria-label="Mobile Navigation" className="md:hidden sticky bottom-0 z-40 border-t border-slate-800 bg-[#090D16]/95 backdrop-blur-xl px-1 py-1.5 flex items-center justify-around">
        {mobileTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-xs transition-colors min-w-[50px] ${
                isActive
                  ? 'text-cyan-400 font-bold bg-cyan-500/10'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.icon}
              <span className="text-[9px] font-mono leading-none">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modals & System Toasts */}
      <SettingsModal />
      <NewProjectModal />
      <NotificationToast />
    </div>
  );
};

export default App;
