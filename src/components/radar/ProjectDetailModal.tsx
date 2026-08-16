import React, { useState } from 'react';
import { ProjectItem, ProjectStage } from '../../types/project';
import { useVibeStore } from '../../store/useVibeStore';
import { StageBadge } from '../common/StageBadge';
import { ScoreBadge } from '../common/ScoreBadge';
import { TechStackTag } from '../common/TechStackTag';
import {
  X,
  Sparkles,
  Cpu,
  Archive,
  GitBranch,
  Play,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Layers,
  ArrowRight,
  ExternalLink,
  Code2,
  Flame,
} from 'lucide-react';
import { GitHubIcon } from '../common/GitHubIcon';

interface ProjectDetailModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const {
    updateProject,
    changeProjectStage,
    archiveToGraveyard,
    resuscitateProject,
    reAnalyzeProject,
    mineProjectAssets,
    deleteProject,
    assets,
    showToast,
  } = useVibeStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'dna' | 'assets' | 'lifecycle'>('overview');
  const [archiveReason, setArchiveReason] = useState('');
  const [showArchiveInput, setShowArchiveInput] = useState(false);

  // Mined assets for this project
  const projectAssets = assets.filter((a) => a.sourceProject === project.name);

  const handleStageChange = (newStage: ProjectStage) => {
    changeProjectStage(project.id, newStage);
  };

  const handleArchive = () => {
    archiveToGraveyard(project.id, archiveReason || undefined);
    setShowArchiveInput(false);
  };

  const handleResuscitate = () => {
    resuscitateProject(project.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0F172A] border border-slate-700/80 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl md:text-2xl font-extrabold text-white font-mono">
                {project.name}
              </h2>
              <StageBadge stage={project.stage} size="md" />
              {project.dna.githubUrl && (
                <a
                  href={project.dna.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  GitHub Repo
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <p className="text-sm text-slate-300 max-w-2xl">{project.description}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="px-6 border-b border-slate-800 flex items-center gap-2 bg-slate-950/40 text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            4D Score & Action
          </button>
          <button
            onClick={() => setActiveTab('dna')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'dna'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Project DNA & Stacks
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'assets'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Reusable Assets ({projectAssets.length})
          </button>
          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'lifecycle'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Lifecycle & Graveyard
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Next Action Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-indigo-950/20 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs uppercase font-mono font-bold tracking-wider">
                      Recommended Next Action
                    </span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono capitalize border border-cyan-500/20">
                    Category: {project.nextActionCategory}
                  </span>
                </div>

                <p className="text-base font-semibold text-white leading-relaxed">
                  {project.nextAction}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      reAnalyzeProject(project.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    AI Re-evaluate Next Step
                  </button>
                </div>
              </div>

              {/* 4-Dimensional Scoring Cards */}
              <div>
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono mb-3">
                  4D Project Scoring Breakdown
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 font-mono">Activity (35%)</span>
                    <div className="text-2xl font-bold font-mono text-emerald-400">
                      {project.score.activity}
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full"
                        style={{ width: `${project.score.activity}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 font-mono">Potential (30%)</span>
                    <div className="text-2xl font-bold font-mono text-cyan-400">
                      {project.score.potential}
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full"
                        style={{ width: `${project.score.potential}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 font-mono">Reusability (20%)</span>
                    <div className="text-2xl font-bold font-mono text-violet-400">
                      {project.score.reuse}
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-violet-400 h-full"
                        style={{ width: `${project.score.reuse}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 font-mono">Maintainability (15%)</span>
                    <div className="text-2xl font-bold font-mono text-blue-400">
                      {project.score.maintainability}
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-400 h-full"
                        style={{ width: `${project.score.maintainability}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-300 font-mono">
                    Total Aggregate AI Score
                  </span>
                  <ScoreBadge score={project.score.total} size="lg" />
                </div>
              </div>

              {/* Quick Meta */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-slate-400">Created:</span>
                  <p className="font-mono text-white font-medium mt-0.5">{project.createdAt}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-slate-400">Last Pushed:</span>
                  <p className="font-mono text-white font-medium mt-0.5">{project.lastActivityAt}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-slate-400">Weekly Commits:</span>
                  <p className="font-mono text-emerald-400 font-medium mt-0.5">
                    ~{project.dna.commitVelocityWeekly} commits/wk
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dna' && (
            <div className="space-y-6">
              {/* Architecture & Patterns */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                  <Cpu className="w-4 h-4" />
                  Architecture Specification
                </div>
                <p className="text-sm font-mono text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {project.dna.architecture}
                </p>

                {project.dna.keyPatterns && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs text-slate-400 font-mono">Key Patterns:</span>
                    <div className="flex flex-wrap gap-2">
                      {project.dna.keyPatterns.map((pat) => (
                        <span
                          key={pat}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700"
                        >
                          {pat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Prompt Patterns */}
              {project.dna.promptPatterns && project.dna.promptPatterns.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold uppercase">
                    <Sparkles className="w-4 h-4" />
                    AI Prompt & Agent DNA
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.dna.promptPatterns.map((prompt) => (
                      <div
                        key={prompt}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-violet-200 font-mono flex items-center gap-2"
                      >
                        <Code2 className="w-4 h-4 text-violet-400 shrink-0" />
                        <span>{prompt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack & Dependencies */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                  Dependencies ({Object.keys(project.dna.dependencies).length})
                </span>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                  {Object.entries(project.dna.dependencies).length > 0 ? (
                    Object.entries(project.dna.dependencies).map(([pkg, ver]) => (
                      <span
                        key={pkg}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        <strong className="text-cyan-300">{pkg}</strong>: {ver}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 font-mono p-2">
                      Zero standalone npm dependencies or native vanilla codebase.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">
                    Harvested Assets from {project.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Standalone modules extracted into the global Reusable Assets Hub
                  </p>
                </div>

                <button
                  onClick={() => mineProjectAssets(project.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 hover:bg-violet-600/30 text-xs font-semibold transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  Mine Assets Now
                </button>
              </div>

              {projectAssets.length > 0 ? (
                <div className="space-y-3">
                  {projectAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">
                          {asset.name}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          {asset.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{asset.description}</p>
                      <pre className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto max-h-32">
                        {asset.codeSnippet}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
                  <p className="text-xs text-slate-400">No assets extracted from this project yet.</p>
                  <button
                    onClick={() => mineProjectAssets(project.id)}
                    className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-colors"
                  >
                    Run AI Asset Miner
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'lifecycle' && (
            <div className="space-y-6">
              {/* Stage Transitions */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                  Change Stage
                </span>
                <div className="flex flex-wrap gap-2">
                  {(['grow', 'experiment', 'maintain', 'prototype'] as ProjectStage[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStageChange(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize border transition-all ${
                        project.stage === st
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graveyard & Archive Control */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
                    <Archive className="w-4 h-4" />
                    Graveyard & Post-Mortem Assetization
                  </div>
                  {project.status === 'graveyard' && (
                    <button
                      onClick={handleResuscitate}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Resuscitate Project
                    </button>
                  )}
                </div>

                <p className="text-xs text-rose-200/80 leading-relaxed">
                  Moving a project to the Graveyard does not delete your work. VibeOS automatically generates a post-mortem, records the failure root causes, and harvests all reusable utilities so you never lose compound knowledge.
                </p>

                {project.status !== 'graveyard' && (
                  <div className="space-y-3">
                    {showArchiveInput ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={archiveReason}
                          onChange={(e) => setArchiveReason(e.target.value)}
                          placeholder="Why is this project stopping? (e.g. Switched stacks, No market demand, High API costs)"
                          className="w-full bg-slate-900 border border-rose-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleArchive}
                            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition-colors"
                          >
                            Confirm Archive to Graveyard
                          </button>
                          <button
                            onClick={() => setShowArchiveInput(false)}
                            className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowArchiveInput(true)}
                        className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/20 transition-colors"
                      >
                        Archive to Graveyard with Post-Mortem
                      </button>
                    )}
                  </div>
                )}

                {/* If already has post-mortem */}
                {project.postMortem && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <p className="font-mono text-rose-400 font-bold">
                      Post-Mortem Root Cause: {project.postMortem.failedReason}
                    </p>
                    <p className="text-slate-300 italic">{project.postMortem.keyLearning}</p>
                  </div>
                )}
              </div>

              {/* Danger Zone: Delete */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Permanent removal</span>
                <button
                  onClick={() => {
                    if (confirm(`Permanently remove project "${project.name}"?`)) {
                      deleteProject(project.id);
                      onClose();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete from VibeOS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
