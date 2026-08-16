import React, { useRef, useEffect, useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ProjectItem } from '../../types/project';
import { ScoreBadge } from '../common/ScoreBadge';
import { StageBadge } from '../common/StageBadge';
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
  const { projects, assets, setSelectedProjectId, addIdea, showToast } = useVibeStore();
  const { t, language } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<ProjectItem | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Mashup Modal state
  const [mashupPicks, setMashupPicks] = useState<string[]>(['opengajae', 'jask']);
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

  // Canvas Force & Network Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 540);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 540;
    };
    window.addEventListener('resize', handleResize);

    // Represent top 45 projects in the network graph for high performance
    const sampleProjects = projects
      .filter((p) => selectedCluster === 'all' || getProjectCluster(p).id === selectedCluster)
      .slice(0, 50);

    // Generate cluster centers
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

      // 1. Draw Cluster Background Clouds
      DOMAIN_CLUSTERS.forEach((c) => {
        const pos = clusterPositions[c.id];
        if (!pos) return;

        const grad = ctx.createRadialGradient(pos.x, pos.y, 10, pos.x, pos.y, 120);
        grad.addColorStop(0, `${c.color}22`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 120, 0, Math.PI * 2);
        ctx.fill();

        // Cluster Label
        ctx.fillStyle = c.color;
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(language === 'ko' ? c.nameKo : c.nameEn, pos.x, pos.y - 85);
      });

      // 2. Calculate node positions
      const nodes = sampleProjects.map((p, idx) => {
        const cluster = getProjectCluster(p);
        const center = clusterPositions[cluster.id] || { x: width / 2, y: height / 2 };
        const localAngle = (idx * 0.8) + angle * 0.2;
        const dist = 30 + (idx % 5) * 15;

        return {
          project: p,
          cluster,
          x: center.x + Math.cos(localAngle) * dist,
          y: center.y + Math.sin(localAngle) * dist,
          radius: p.stage === 'grow' ? 8 : 5,
        };
      });

      // 3. Draw Synergy Connection Lines between related nodes
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const sameCluster = n1.cluster.id === n2.cluster.id;
          const sharedStack = n1.project.stack.some((s) => n2.project.stack.includes(s));

          if (sameCluster || (sharedStack && Math.hypot(n1.x - n2.x, n1.y - n2.y) < 140)) {
            ctx.strokeStyle = sameCluster ? `${n1.cluster.color}33` : 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = sameCluster ? 1.2 : 0.8;
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

        ctx.save();
        ctx.fillStyle = node.cluster.color;
        ctx.shadowColor = node.cluster.color;
        ctx.shadowBlur = isHover ? 14 : 4;

        ctx.beginPath();
        ctx.arc(node.x, node.y, isHover ? node.radius + 4 : node.radius, 0, Math.PI * 2);
        ctx.fill();

        if (isHover || node.project.stage === 'grow') {
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.project.name, node.x, node.y + node.radius + 12);
        }
        ctx.restore();
      });

      angle += 0.005;
      animFrame = requestAnimationFrame(render);
    };

    render();

    // Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found: ProjectItem | null = null;

      sampleProjects.forEach((p, idx) => {
        const cluster = getProjectCluster(p);
        const center = clusterPositions[cluster.id] || { x: width / 2, y: height / 2 };
        const localAngle = (idx * 0.8) + angle * 0.2;
        const dist = 30 + (idx % 5) * 15;
        const nx = center.x + Math.cos(localAngle) * dist;
        const ny = center.y + Math.sin(localAngle) * dist;

        if (Math.hypot(mx - nx, my - ny) < 18) {
          found = p;
          setHoverPos({ x: mx, y: my });
        }
      });

      setHoveredNode(found);
      if (!found) setHoverPos(null);
      canvas.style.cursor = found ? 'pointer' : 'default';
    };

    const handleClick = () => {
      if (hoveredNode) {
        setSelectedProjectId(hoveredNode.id);
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
  }, [projects, selectedCluster, language, hoveredNode]);

  // Generate Mashup
  const handleGenerateMashup = () => {
    const p1 = projects.find((p) => p.name === mashupPicks[0] || p.id === mashupPicks[0]);
    const p2 = projects.find((p) => p.name === mashupPicks[1] || p.id === mashupPicks[1]);

    const title = `${p1?.name || 'Agent'}-${p2?.name || 'Flow'} Omni-Platform`;
    const description = `Combines the ${p1?.stack.join('/') || 'AI'} runtime of ${p1?.name || 'Project A'} with the core capabilities of ${p2?.name || 'Project B'} into a unified serverless solution.`;
    const suggestedStack = Array.from(new Set([...(p1?.stack || ['TypeScript']), ...(p2?.stack || ['React', 'Next.js'])]));

    setMashupResult({
      title,
      description,
      suggestedStack,
      viabilityScore: 92,
    });
  };

  const handlePromoteMashupToIdea = () => {
    if (!mashupResult) return;
    addIdea(mashupResult.title, mashupResult.description, 'weekend', mashupResult.suggestedStack);
    showToast(`Promoted "${mashupResult.title}" to Idea Inbox`, 'success');
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
              ? '234개 프로젝트 간 공통 스택, 자산 전이 및 5대 도메인 클러스터 네트워크'
              : 'Knowledge transfer map across 234 repositories & 5 core domain clusters.'}
          </p>
        </div>

        {/* Cluster Filter Pills & Compare Button */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          <button
            onClick={() => setIsCompareOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/40 font-bold hover:scale-[1.02] transition-all"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>1:1 Compare Arena</span>
          </button>

          <button
            onClick={() => setSelectedCluster('all')}
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              selectedCluster === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            All Clusters
          </button>
          {DOMAIN_CLUSTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCluster(c.id)}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedCluster === c.id
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800'
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

      {/* Network Canvas */}
      <div
        ref={containerRef}
        className="relative rounded-3xl bg-[#080B13] border border-slate-800 overflow-hidden shadow-2xl min-h-[540px]"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Hover Popover */}
        {hoveredNode && hoverPos && (
          <div
            className="absolute z-20 pointer-events-none p-3.5 rounded-2xl bg-slate-950/95 border border-indigo-500/50 shadow-2xl backdrop-blur-xl space-y-1.5 max-w-xs transition-all font-sans"
            style={{
              left: Math.min(hoverPos.x + 12, (containerRef.current?.clientWidth || 600) - 240),
              top: Math.min(hoverPos.y + 12, 380),
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
              <span className="font-bold text-white font-mono text-xs">{hoveredNode.name}</span>
              <ScoreBadge score={hoveredNode.score.total} size="sm" />
            </div>
            <p className="text-[11px] text-slate-300 line-clamp-2">{hoveredNode.description}</p>
            <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-cyan-400">
              {hoveredNode.stack.map((s, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {s}
                </span>
              ))}
            </div>
            <p className="text-[9px] text-slate-500 italic">Click node to inspect</p>
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
          <span className="text-xs text-slate-400 font-mono">234 Repositories Ready for Mashup</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400">Select Project 1:</label>
            <select
              value={mashupPicks[0]}
              onChange={(e) => setMashupPicks([e.target.value, mashupPicks[1]])}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.stack.join(', ')})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400">Select Project 2:</label>
            <select
              value={mashupPicks[1]}
              onChange={(e) => setMashupPicks([mashupPicks[0], e.target.value])}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.stack.join(', ')})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGenerateMashup}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-[1.02] transition-all font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Synthesize AI Mashup Blueprint</span>
          </button>
        </div>

        {mashupResult && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3 animate-fadeIn font-mono">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs sm:text-sm">{mashupResult.title}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Viability: {mashupResult.viabilityScore}%
              </span>
            </div>
            <p className="text-xs text-slate-300">{mashupResult.description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Stack: {mashupResult.suggestedStack.join(', ')}</span>
              <button
                onClick={handlePromoteMashupToIdea}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
              >
                <Plus className="w-3 h-3" />
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
