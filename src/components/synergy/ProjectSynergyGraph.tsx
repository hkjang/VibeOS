import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ProjectItem } from '../../types/project';
import { ScoreBadge } from '../common/ScoreBadge';
import { StageBadge } from '../common/StageBadge';
import { soundEngine } from '../../utils/soundEngine';
import {
  Network,
  Sparkles,
  Layers,
  Zap,
  ArrowRight,
  Filter,
  RefreshCw,
  Plus,
  Compass,
  Scale,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Play,
  Pause,
  Eye,
  Tag,
  Dices,
  GitFork,
  CheckCircle2,
  X,
  Code2,
} from 'lucide-react';
import { ProjectCompareModal } from './ProjectCompareModal';

interface DomainCluster {
  id: string;
  nameKo: string;
  nameEn: string;
  color: string;
  keywords: string[];
}

const DOMAIN_CLUSTERS: DomainCluster[] = [
  {
    id: 'ai-agents',
    nameKo: '🤖 AI & 지능형 에이전트',
    nameEn: '🤖 AI & Autonomous Agents',
    color: '#10B981', // emerald
    keywords: ['ai', 'agent', 'rag', 'vector', 'llm', 'ollama', 'claude', 'gpt', 'opengajae', 'ageforge', 'autoforge'],
  },
  {
    id: 'database-sql',
    nameKo: '💾 SQL & 데이터베이스 툴',
    nameEn: '💾 SQL & Database Tooling',
    color: '#06B6D4', // cyan
    keywords: ['sql', 'database', 'db', 'tadpole', 'monaco', 'jainsight', 'jask', 'sqlite', 'postgres', 'query'],
  },
  {
    id: 'mattermost-chat',
    nameKo: '💬 채팅 & 협업 플러그인',
    nameEn: '💬 Chat & Workflow Plugins',
    color: '#8B5CF6', // violet
    keywords: ['mattermost', 'chat', 'slack', 'discord', 'plugin', 'node-red', 'bot', 'relaychat', 'rocketchat'],
  },
  {
    id: 'devtools-automation',
    nameKo: '⚡ 개발자 생산성 & CLI/웹',
    nameEn: '⚡ DevTools & Web Engines',
    color: '#F59E0B', // amber
    keywords: ['vibeos', 'gitframe', 'weekly', 'trace', 'orbit', 'playwright', 'vite', 'next', 'cli', 'automation'],
  },
  {
    id: 'fintech-trading',
    nameKo: '📈 핀테크 & 데이터 파이프라인',
    nameEn: '📈 FinTech & Data Pipelines',
    color: '#F43F5E', // rose
    keywords: ['stock', 'kiwoom', 'finance', 'tagflow', 'stockboom', 'crawler', 'afterman', 'bank', 'lottery'],
  },
];

export const ProjectSynergyGraph: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveTab, addIdea, showToast } = useVibeStore();
  const { t, language } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<ProjectItem | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [comparePreloadA, setComparePreloadA] = useState<string>('');

  // Canvas Controls
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showAllLabels, setShowAllLabels] = useState<boolean>(false);
  const [linkFilter, setLinkFilter] = useState<'all' | 'strong' | 'cluster'>('all');

  // Mashup State
  const [mashupPicks, setMashupPicks] = useState<string[]>([
    projects[0]?.name || 'opengajae',
    projects[1]?.name || 'jask',
  ]);
  const [mashupResult, setMashupResult] = useState<{
    title: string;
    description: string;
    suggestedStack: string[];
    viabilityScore: number;
  } | null>(null);

  // Classify each project into a cluster
  const getProjectCluster = (p: ProjectItem): DomainCluster => {
    const text = `${p.name} ${p.description} ${p.stack.join(' ')}`.toLowerCase();
    for (const c of DOMAIN_CLUSTERS) {
      if (c.keywords.some((kw) => text.includes(kw))) {
        return c;
      }
    }
    return DOMAIN_CLUSTERS[3]; // default to DevTools
  };

  // Find top synergy partners for a given project
  const getSynergyPartners = (target: ProjectItem) => {
    return projects
      .filter((p) => p.id !== target.id)
      .map((p) => {
        const shared = target.stack.filter((s) => p.stack.includes(s));
        const sameCluster = getProjectCluster(target).id === getProjectCluster(p).id;
        const score = shared.length * 20 + (sameCluster ? 30 : 0);
        return { project: p, shared, sameCluster, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  };

  // Canvas Force & Network Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 560);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 560;
    };
    window.addEventListener('resize', handleResize);

    const sampleProjects = projects
      .filter((p) => selectedCluster === 'all' || getProjectCluster(p).id === selectedCluster)
      .slice(0, 60);

    const clusterPositions: Record<string, { x: number; y: number }> = {
      'ai-agents': { x: width * 0.25, y: height * 0.3 },
      'database-sql': { x: width * 0.75, y: height * 0.3 },
      'mattermost-chat': { x: width * 0.25, y: height * 0.75 },
      'devtools-automation': { x: width * 0.5, y: height * 0.5 },
      'fintech-trading': { x: width * 0.75, y: height * 0.75 },
    };

    let animFrame: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Apply Zoom Transformation
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(zoomLevel, zoomLevel);
      ctx.translate(-width / 2, -height / 2);

      // 1. Draw Cluster Background Clouds
      DOMAIN_CLUSTERS.forEach((c) => {
        const pos = clusterPositions[c.id];
        if (!pos) return;

        const grad = ctx.createRadialGradient(pos.x, pos.y, 10, pos.x, pos.y, 130);
        grad.addColorStop(0, `${c.color}20`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 130, 0, Math.PI * 2);
        ctx.fill();

        // Cluster Header
        ctx.fillStyle = c.color;
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(language === 'ko' ? c.nameKo : c.nameEn, pos.x, pos.y - 95);
      });

      // 2. Calculate node positions
      const nodes = sampleProjects.map((p, idx) => {
        const cluster = getProjectCluster(p);
        const center = clusterPositions[cluster.id] || { x: width / 2, y: height / 2 };
        const localAngle = idx * 0.85 + angle * 0.25;
        const dist = 32 + (idx % 6) * 16;

        return {
          project: p,
          cluster,
          x: center.x + Math.cos(localAngle) * dist,
          y: center.y + Math.sin(localAngle) * dist,
          radius: p.stage === 'grow' ? 9 : 6,
        };
      });

      const activeProject = selectedProject || hoveredNode;

      // 3. Draw Synergy Connection Lines between related nodes
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const sameCluster = n1.cluster.id === n2.cluster.id;
          const sharedStack = n1.project.stack.some((s) => n2.project.stack.includes(s));

          let shouldDraw = false;
          if (linkFilter === 'all') {
            shouldDraw = sameCluster || (sharedStack && Math.hypot(n1.x - n2.x, n1.y - n2.y) < 160);
          } else if (linkFilter === 'strong') {
            shouldDraw = sharedStack && Math.hypot(n1.x - n2.x, n1.y - n2.y) < 180;
          } else if (linkFilter === 'cluster') {
            shouldDraw = sameCluster;
          }

          if (shouldDraw) {
            const isHighlighted =
              activeProject &&
              (activeProject.id === n1.project.id || activeProject.id === n2.project.id);

            if (isHighlighted) {
              ctx.strokeStyle = '#06B6D4';
              ctx.lineWidth = 2.2;
              ctx.shadowColor = '#06B6D4';
              ctx.shadowBlur = 8;
            } else {
              ctx.shadowBlur = 0;
              ctx.strokeStyle = sameCluster
                ? `${n1.cluster.color}28`
                : 'rgba(255, 255, 255, 0.07)';
              ctx.lineWidth = sameCluster ? 1.0 : 0.6;
            }

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 4. Draw Project Nodes
      nodes.forEach((node) => {
        const isHover = hoveredNode?.id === node.project.id;
        const isSelected = selectedProject?.id === node.project.id;

        ctx.save();
        ctx.fillStyle = node.cluster.color;
        ctx.shadowColor = node.cluster.color;
        ctx.shadowBlur = isSelected ? 18 : isHover ? 14 : 5;

        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          isSelected ? node.radius + 5 : isHover ? node.radius + 3 : node.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Outer selection ring
        if (isSelected) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw Text Labels
        if (showAllLabels || isHover || isSelected || node.project.stage === 'grow') {
          ctx.shadowBlur = 0;
          ctx.fillStyle = isSelected ? '#38BDF8' : isHover ? '#FFFFFF' : '#94A3B8';
          ctx.font = isSelected
            ? 'bold 11px "JetBrains Mono", monospace'
            : '10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.project.name, node.x, node.y + node.radius + 13);
        }
        ctx.restore();
      });

      ctx.restore();

      if (isPlaying) {
        angle += 0.004;
      }
      animFrame = requestAnimationFrame(render);
    };

    render();

    // Mouse Move Detection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      // Adjust for Zoom Transformation
      const mx = (rawX - width / 2) / zoomLevel + width / 2;
      const my = (rawY - height / 2) / zoomLevel + height / 2;

      let found: ProjectItem | null = null;

      sampleProjects.forEach((p, idx) => {
        const cluster = getProjectCluster(p);
        const center = clusterPositions[cluster.id] || { x: width / 2, y: height / 2 };
        const localAngle = idx * 0.85 + angle * 0.25;
        const dist = 32 + (idx % 6) * 16;
        const nx = center.x + Math.cos(localAngle) * dist;
        const ny = center.y + Math.sin(localAngle) * dist;

        if (Math.hypot(mx - nx, my - ny) < 18) {
          found = p;
          setHoverPos({ x: rawX, y: rawY });
        }
      });

      setHoveredNode(found);
      if (!found) setHoverPos(null);
      canvas.style.cursor = found ? 'pointer' : 'default';
    };

    // Canvas Click: Inspect Node
    const handleClick = () => {
      if (hoveredNode) {
        soundEngine.playClick();
        setSelectedProject(hoveredNode);
        setSelectedProjectId(hoveredNode.id);
      } else {
        setSelectedProject(null);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animFrame);
    };
  }, [projects, selectedCluster, language, hoveredNode, selectedProject, isPlaying, zoomLevel, showAllLabels, linkFilter]);

  // Generate Mashup
  const handleGenerateMashup = () => {
    soundEngine.playQuestComplete();
    const p1 = projects.find((p) => p.name === mashupPicks[0] || p.id === mashupPicks[0]);
    const p2 = projects.find((p) => p.name === mashupPicks[1] || p.id === mashupPicks[1]);

    const title = `${p1?.name || 'Agent'}-${p2?.name || 'Flow'} Fusion Platform`;
    const description = `Combines the ${p1?.stack.join('/') || 'Core AI'} architecture of ${p1?.name || 'Project A'} with ${p2?.name || 'Project B'}'s high-throughput engine for unified cross-domain intelligence.`;
    const suggestedStack = Array.from(
      new Set([...(p1?.stack || ['TypeScript']), ...(p2?.stack || ['React', 'Next.js'])])
    );

    setMashupResult({
      title,
      description,
      suggestedStack,
      viabilityScore: Math.floor(Math.random() * 8 + 91),
    });
  };

  // Surprise Me Random Pair
  const handleSurpriseMe = () => {
    soundEngine.playTeslaFsdEngage();
    const rand1 = projects[Math.floor(Math.random() * projects.length)];
    let rand2 = projects[Math.floor(Math.random() * projects.length)];
    while (rand2.id === rand1.id && projects.length > 1) {
      rand2 = projects[Math.floor(Math.random() * projects.length)];
    }

    setMashupPicks([rand1.name, rand2.name]);

    const title = `${rand1.name}-${rand2.name} Serendipity Engine`;
    const description = `Synthesized autonomous fusion between ${rand1.name} (${rand1.stack.slice(0, 3).join(', ')}) and ${rand2.name} (${rand2.stack.slice(0, 3).join(', ')}).`;
    const suggestedStack = Array.from(new Set([...rand1.stack, ...rand2.stack])).slice(0, 6);

    setMashupResult({
      title,
      description,
      suggestedStack,
      viabilityScore: Math.floor(Math.random() * 6 + 93),
    });
    showToast(`🎲 AI Paired "${rand1.name}" + "${rand2.name}"!`, 'info');
  };

  const handlePromoteMashupToIdea = () => {
    if (!mashupResult) return;
    soundEngine.playLevelUp();
    addIdea(mashupResult.title, mashupResult.description, 'weekend', mashupResult.suggestedStack);
    showToast(`💡 Promoted "${mashupResult.title}" to Idea Inbox`, 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400">
            <Network className="w-5 h-5 text-indigo-400" />
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest font-bold">
              Project Synergy & Knowledge Transfer Graph
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.nav.synergy || 'Synergy Network'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {language === 'ko'
              ? '234개 공개 리포지토리 간 공통 스택, 자산 전이 및 5대 도메인 클러스터 네트워크를 실시간 탐색합니다.'
              : 'Interactive knowledge transfer graph across 234 public repositories and 5 core domain clusters.'}
          </p>
        </div>

        {/* Cluster Filter Pills & 1:1 Compare Button */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsCompareOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/40 font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-md"
          >
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span>1:1 Compare Arena</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setSelectedCluster('all');
            }}
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              selectedCluster === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            All Clusters
          </button>
          {DOMAIN_CLUSTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCluster(c.id);
              }}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedCluster === c.id
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
              style={{
                borderColor: selectedCluster === c.id ? c.color : undefined,
                color: selectedCluster === c.id ? c.color : undefined,
              }}
            >
              {language === 'ko' ? c.nameKo.split(' ')[1] : c.nameEn.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Network Canvas & Interactive Controls */}
      <div
        ref={containerRef}
        className="relative rounded-3xl bg-[#080B13] border border-slate-800 overflow-hidden shadow-2xl min-h-[560px]"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Floating Canvas Action Toolbar */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-xs font-mono">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>

          <div className="w-[1px] h-4 bg-slate-800 mx-0.5" />

          <button
            onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => setZoomLevel(1)}
            className="px-2 py-1 rounded-xl text-[10px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset Zoom"
          >
            100%
          </button>

          <div className="w-[1px] h-4 bg-slate-800 mx-0.5" />

          <button
            onClick={() => setShowAllLabels(!showAllLabels)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] transition-colors ${
              showAllLabels ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tag className="w-3 h-3" />
            <span>Labels</span>
          </button>

          <button
            onClick={() => {
              const modes: ('all' | 'strong' | 'cluster')[] = ['all', 'strong', 'cluster'];
              const next = modes[(modes.indexOf(linkFilter) + 1) % modes.length];
              setLinkFilter(next);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] bg-slate-900 border border-slate-700 text-slate-300 hover:text-white capitalize"
            title="Toggle Laser Link Filter"
          >
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Links: {linkFilter}</span>
          </button>
        </div>

        {/* Hover Popover */}
        {hoveredNode && hoverPos && !selectedProject && (
          <div
            className="absolute z-20 pointer-events-none p-3.5 rounded-2xl bg-slate-950/95 border border-indigo-500/50 shadow-2xl backdrop-blur-xl space-y-1.5 max-w-xs transition-all font-sans animate-fadeIn"
            style={{
              left: Math.min(hoverPos.x + 12, (containerRef.current?.clientWidth || 600) - 240),
              top: Math.min(hoverPos.y + 12, 400),
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
              <span className="font-bold text-white font-mono text-xs truncate">{hoveredNode.name}</span>
              <ScoreBadge score={hoveredNode.score.total} size="sm" />
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-2">{hoveredNode.description}</p>
            <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-cyan-400">
              {hoveredNode.stack.slice(0, 4).map((s, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {s}
                </span>
              ))}
            </div>
            <p className="text-[9px] text-cyan-400 italic">Click node to inspect synergy partners</p>
          </div>
        )}

        {/* Selected Project Interactive Inspector Drawer */}
        {selectedProject && (
          <div className="absolute top-4 right-4 z-30 w-80 max-w-[calc(100%-32px)] p-4 rounded-3xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl space-y-3 font-sans animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white font-mono text-sm truncate max-w-[170px]">
                  {selectedProject.name}
                </span>
                <StageBadge stage={selectedProject.stage} size="sm" />
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {selectedProject.description || 'Public GitHub repository'}
            </p>

            {/* Stack Tags */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedProject.stack.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Top Synergy Partners */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <GitFork className="w-3.5 h-3.5" />
                  Top Synergy Partners
                </span>
                <span>Match Score</span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {getSynergyPartners(selectedProject).map((partner) => (
                  <div
                    key={partner.project.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedProject(partner.project);
                    }}
                    className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-mono group-hover:text-cyan-300">
                        {partner.project.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {partner.shared.length > 0
                          ? `Shared: ${partner.shared.join(', ')}`
                          : 'Same Domain Cluster'}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {partner.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setComparePreloadA(selectedProject.id);
                  setIsCompareOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono transition-all"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>1:1 Arena</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedProjectId(selectedProject.id);
                  setActiveTab('radar');
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold font-mono transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Radar View</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Synergy Mashup Generator Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              AI Project Synergy Matchmaker (신규 프로젝트 매시업 조합기)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSurpriseMe}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono hover:scale-105 transition-all active:scale-95"
              title="Serendipitous Random Mashup"
            >
              <Dices className="w-3.5 h-3.5 text-amber-400" />
              <span>Surprise Me (랜덤 조합)</span>
            </button>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">234 Repositories Ready</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400">Select Project 1:</label>
            <select
              value={mashupPicks[0]}
              onChange={(e) => setMashupPicks([e.target.value, mashupPicks[1]])}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.stack.slice(0, 3).join(', ')})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400">Select Project 2:</label>
            <select
              value={mashupPicks[1]}
              onChange={(e) => setMashupPicks([mashupPicks[0], e.target.value])}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.stack.slice(0, 3).join(', ')})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGenerateMashup}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-95 transition-all font-mono"
          >
            <Sparkles className="w-4 h-4" />
            <span>Synthesize AI Mashup Blueprint</span>
          </button>
        </div>

        {mashupResult && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3 animate-fadeIn font-mono">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs sm:text-sm">{mashupResult.title}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                Viability: {mashupResult.viabilityScore}%
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{mashupResult.description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Stack: {mashupResult.suggestedStack.join(', ')}</span>
              <button
                onClick={handlePromoteMashupToIdea}
                className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md active:scale-95 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save to Idea Inbox</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 1:1 Project Comparison Modal */}
      <ProjectCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </div>
  );
};
