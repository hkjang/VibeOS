import React, { useRef, useEffect, useState } from 'react';
import { ProjectItem } from '../../types/project';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { StageBadge } from '../common/StageBadge';
import { ScoreBadge } from '../common/ScoreBadge';
import {
  Sparkles,
  Play,
  Pause,
  FastForward,
  RotateCcw,
  Zap,
  Info,
  Maximize2,
  Cpu,
  Layers,
} from 'lucide-react';

interface CosmicProjectGalaxyProps {
  projects: ProjectItem[];
  onSelectProject: (id: string) => void;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
}

export const CosmicProjectGalaxy: React.FC<CosmicProjectGalaxyProps> = ({
  projects,
  onSelectProject,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { assets } = useVibeStore();
  const { t } = useTranslation();

  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [simSpeed, setSimSpeed] = useState<number>(1); // 0: pause, 1: normal, 2.5: fast
  const [showTethers, setShowTethers] = useState<boolean>(true);
  const [showAssets, setShowAssets] = useState<boolean>(true);
  const [filterStage, setFilterStage] = useState<string>('all');

  // Animation angle state refs to prevent re-renders on every frame
  const angleRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Group projects into orbital rings
  const growingProjects = projects.filter((p) => p.stage === 'grow' && p.status === 'active');
  const midTierProjects = projects.filter(
    (p) => (p.stage === 'experiment' || p.stage === 'maintain' || p.stage === 'prototype') && p.status === 'active'
  );
  const graveyardProjects = projects.filter((p) => p.status === 'graveyard' || p.stage === 'archived');

  // Initialize background starfield
  useEffect(() => {
    const starCount = 120;
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }
    starsRef.current = stars;
  }, []);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = Math.max(520, Math.min(width * 0.65, 680)));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.max(520, Math.min(width * 0.65, 680));
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const minDimension = Math.min(width, height);

      // Orbital Radii based on canvas size
      const rInner = minDimension * 0.22;
      const rMid = minDimension * 0.36;
      const rOuter = minDimension * 0.46;

      // 1. Draw Deep Space Background Nebula Glows
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, minDimension * 0.6);
      bgGradient.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
      bgGradient.addColorStop(0.4, 'rgba(99, 102, 241, 0.06)');
      bgGradient.addColorStop(0.8, 'rgba(15, 23, 42, 0.4)');
      bgGradient.addColorStop(1, 'rgba(9, 13, 22, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Twinkling Stars
      starsRef.current.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) star.twinkleSpeed = -star.twinkleSpeed;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Orbit Track Rings
      const drawOrbitRing = (radius: number, strokeColor: string, dash: number[], label: string) => {
        ctx.save();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2;
        ctx.setLineDash(dash);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Label on top
        ctx.fillStyle = strokeColor;
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label, centerX, centerY - radius - 6);
        ctx.restore();
      };

      drawOrbitRing(rInner, 'rgba(16, 185, 129, 0.35)', [4, 6], 'ORBIT I: GROWTH ENGINES');
      drawOrbitRing(rMid, 'rgba(56, 189, 248, 0.3)', [3, 8], 'ORBIT II: EXPERIMENT & MAINTAIN');
      drawOrbitRing(rOuter, 'rgba(244, 63, 94, 0.3)', [2, 10], 'ORBIT III: GRAVEYARD MONUMENTS');

      // 4. Calculate Positions for each project
      const currentAngle = angleRef.current;

      const innerNodes = growingProjects.map((p, idx) => {
        const offset = (idx / (growingProjects.length || 1)) * Math.PI * 2;
        const angle = currentAngle * 1.2 + offset;
        return {
          project: p,
          x: centerX + Math.cos(angle) * rInner,
          y: centerY + Math.sin(angle) * rInner,
          color: '#10B981',
          glow: 'rgba(16, 185, 129, 0.6)',
          radius: 14 + (p.score.total / 100) * 6,
        };
      });

      const midNodes = midTierProjects.map((p, idx) => {
        const offset = (idx / (midTierProjects.length || 1)) * Math.PI * 2;
        const angle = -currentAngle * 0.7 + offset;
        return {
          project: p,
          x: centerX + Math.cos(angle) * rMid,
          y: centerY + Math.sin(angle) * rMid,
          color: p.stage === 'experiment' ? '#F59E0B' : p.stage === 'prototype' ? '#A855F7' : '#38BDF8',
          glow: 'rgba(56, 189, 248, 0.5)',
          radius: 12 + (p.score.total / 100) * 5,
        };
      });

      const outerNodes = graveyardProjects.map((p, idx) => {
        const offset = (idx / (graveyardProjects.length || 1)) * Math.PI * 2;
        const angle = currentAngle * 0.3 + offset;
        return {
          project: p,
          x: centerX + Math.cos(angle) * rOuter,
          y: centerY + Math.sin(angle) * rOuter,
          color: '#F43F5E',
          glow: 'rgba(244, 63, 94, 0.5)',
          radius: 11,
        };
      });

      const allNodes = [...innerNodes, ...midNodes, ...outerNodes];

      // 5. Draw Knowledge Alchemy Tethers (Salvaged Graveyard -> Active Projects)
      if (showTethers) {
        outerNodes.forEach((deadNode, idx) => {
          // Connect to 1 or 2 active projects
          const targetNode = innerNodes[idx % (innerNodes.length || 1)];
          if (targetNode) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(deadNode.x, deadNode.y);
            // Curved Bezier line through midpoint towards center
            const cpX = (deadNode.x + targetNode.x) / 2 + Math.sin(currentAngle * 2 + idx) * 25;
            const cpY = (deadNode.y + targetNode.y) / 2 + Math.cos(currentAngle * 2 + idx) * 25;
            ctx.quadraticCurveTo(cpX, cpY, targetNode.x, targetNode.y);

            // Glowing animated laser beam
            const gradient = ctx.createLinearGradient(deadNode.x, deadNode.y, targetNode.x, targetNode.y);
            gradient.addColorStop(0, 'rgba(244, 63, 94, 0.4)');
            gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.6)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.5)');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.4;
            ctx.setLineDash([6, 8]);
            ctx.lineDashOffset = -currentAngle * 40;
            ctx.stroke();
            ctx.restore();
          }
        });
      }

      // 6. Draw Mined Asset Floating Crystals
      if (showAssets && assets.length > 0) {
        assets.slice(0, 8).forEach((asset, idx) => {
          const orbitR = (rInner + rMid) / 2;
          const aAngle = currentAngle * 0.9 + (idx / 8) * Math.PI * 2;
          const ax = centerX + Math.cos(aAngle) * orbitR;
          const ay = centerY + Math.sin(aAngle) * orbitR;

          ctx.save();
          ctx.translate(ax, ay);
          ctx.rotate(currentAngle * 2 + idx);

          // Diamond shape
          ctx.fillStyle = 'rgba(192, 132, 252, 0.85)';
          ctx.shadowColor = '#C084FC';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(0, -5);
          ctx.lineTo(5, 0);
          ctx.lineTo(0, 5);
          ctx.lineTo(-5, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
      }

      // 7. Draw Central Sun: Vibe Core
      ctx.save();
      const corePulse = Math.sin(currentAngle * 3) * 4;
      const coreRadius = 24 + corePulse;

      // Outer Corona Glow
      const corona = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, coreRadius * 2.2);
      corona.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
      corona.addColorStop(0.3, 'rgba(99, 102, 241, 0.5)');
      corona.addColorStop(0.7, 'rgba(168, 85, 247, 0.2)');
      corona.addColorStop(1, 'rgba(15, 23, 42, 0)');

      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Core Solid Orb
      const coreGrad = ctx.createRadialGradient(centerX - 4, centerY - 4, 2, centerX, centerY, coreRadius);
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.3, '#38BDF8');
      coreGrad.addColorStop(0.8, '#4F46E5');
      coreGrad.addColorStop(1, '#0F172A');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core Text Label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VIBE CORE', centerX, centerY);
      ctx.restore();

      // 8. Draw Planetary Project Nodes
      allNodes.forEach((node) => {
        const isHovered = hoveredProject?.id === node.project.id;
        const matchesFilter = filterStage === 'all' || node.project.stage === filterStage;

        ctx.save();
        ctx.globalAlpha = matchesFilter ? 1 : 0.2;

        // Gravity Well Pulse on Hover
        if (isHovered) {
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 10, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = node.glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Planet Body
        const planetGrad = ctx.createRadialGradient(
          node.x - 3,
          node.y - 3,
          2,
          node.x,
          node.y,
          node.radius
        );
        planetGrad.addColorStop(0, '#FFFFFF');
        planetGrad.addColorStop(0.4, node.color);
        planetGrad.addColorStop(1, '#0F172A');

        ctx.fillStyle = planetGrad;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHovered ? 16 : 8;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Project Name Tag
        ctx.shadowBlur = 0;
        ctx.fillStyle = isHovered ? '#38BDF8' : '#F1F5F9';
        ctx.font = `${isHovered ? 'bold 11px' : '10px'} "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(node.project.name, node.x, node.y + node.radius + 14);

        // Score Badge
        ctx.fillStyle = node.color;
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(`${node.project.score.total}`, node.x, node.y + node.radius + 25);

        ctx.restore();
      });

      // Advance orbital rotation angle
      angleRef.current += 0.004 * simSpeed;

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse Move / Hover Handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const centerX = width / 2;
      const centerY = height / 2;
      const minDimension = Math.min(width, height);
      const rInner = minDimension * 0.22;
      const rMid = minDimension * 0.36;
      const rOuter = minDimension * 0.46;
      const currentAngle = angleRef.current;

      let found: ProjectItem | null = null;

      // Check all node distances
      const checkNodes = (list: ProjectItem[], radius: number, speedMult: number, reverse = false) => {
        list.forEach((p, idx) => {
          const offset = (idx / (list.length || 1)) * Math.PI * 2;
          const angle = (reverse ? -currentAngle : currentAngle) * speedMult + offset;
          const nx = centerX + Math.cos(angle) * radius;
          const ny = centerY + Math.sin(angle) * radius;
          const dist = Math.hypot(mouseX - nx, mouseY - ny);
          if (dist < 20) {
            found = p;
            setHoverPos({ x: mouseX, y: mouseY });
          }
        });
      };

      checkNodes(growingProjects, rInner, 1.2);
      checkNodes(midTierProjects, rMid, 0.7, true);
      checkNodes(graveyardProjects, rOuter, 0.3);

      setHoveredProject(found);
      if (!found) setHoverPos(null);
      canvas.style.cursor = found ? 'pointer' : 'default';
    };

    // Click Handler
    const handleClick = () => {
      if (hoveredProject) {
        onSelectProject(hoveredProject.id);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [growingProjects, midTierProjects, graveyardProjects, simSpeed, showTethers, showAssets, filterStage, hoveredProject]);

  return (
    <div className="relative rounded-3xl bg-[#090D16] border border-slate-800 overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 select-none">
      {/* Top HUD Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <h2 className="text-base sm:text-lg font-bold text-white font-mono tracking-tight">
              {t.cosmos?.title || 'VibeOS Cosmic Project Galaxy'}
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            {t.cosmos?.subtitle || 'Living orbital ecosystem: Graveyard code tethers fuel active planetary engines'}
          </p>
        </div>

        {/* Orbit Control Buttons */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          {/* Speed Controls */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setSimSpeed(0)}
              className={`p-1.5 rounded-lg transition-colors ${simSpeed === 0 ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Pause Orbit"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSimSpeed(1)}
              className={`p-1.5 rounded-lg transition-colors ${simSpeed === 1 ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Normal Orbit Speed"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSimSpeed(2.5)}
              className={`p-1.5 rounded-lg transition-colors ${simSpeed === 2.5 ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Warp Speed Orbit"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Tethers */}
          <button
            onClick={() => setShowTethers(!showTethers)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              showTethers
                ? 'bg-violet-500/20 text-violet-300 border-violet-500/40'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span>{t.cosmos?.showTethers || 'Knowledge Beams'}</span>
          </button>

          {/* Toggle Assets */}
          <button
            onClick={() => setShowAssets(!showAssets)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              showAssets
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.cosmos?.showDust || 'Mined Crystals'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Galaxy Viewport */}
      <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl bg-[#060911] border border-slate-800/60 min-h-[460px]">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Hover Popover Tooltip */}
        {hoveredProject && hoverPos && (
          <div
            className="absolute z-20 pointer-events-none p-3.5 rounded-2xl bg-slate-950/95 border border-cyan-500/50 shadow-2xl backdrop-blur-xl space-y-2 max-w-xs transition-all font-sans animate-fadeIn"
            style={{
              left: Math.min(hoverPos.x + 15, (containerRef.current?.clientWidth || 600) - 260),
              top: Math.min(hoverPos.y + 15, 360),
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
              <span className="font-bold text-white font-mono text-xs">{hoveredProject.name}</span>
              <ScoreBadge score={hoveredProject.score.total} size="sm" />
            </div>

            <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
              {hoveredProject.description}
            </p>

            <div className="space-y-1 text-[10px] font-mono text-slate-400 pt-1">
              <div className="flex justify-between">
                <span>Momentum (Act):</span>
                <span className="text-emerald-400 font-bold">{hoveredProject.score.activity}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Potential:</span>
                <span className="text-cyan-400 font-bold">{hoveredProject.score.potential}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Reusability:</span>
                <span className="text-violet-400 font-bold">{hoveredProject.score.reuse}/100</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-800/80 text-[10px] text-cyan-400 font-mono flex items-center justify-between">
              <span>{t.modal.nextActionTitle}:</span>
              <span className="truncate max-w-[120px] text-slate-200">{hoveredProject.nextAction}</span>
            </div>

            <p className="text-[9px] text-slate-500 text-center font-mono italic">
              Click planet to inspect details
            </p>
          </div>
        )}

        {/* Orbit Legend Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between flex-wrap gap-2 text-[10px] font-mono bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-slate-400">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-sm shadow-emerald-400" />
              {t.cosmos?.innerOrbit || 'Inner Orbit: Growing (🚀 High Momentum)'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block shadow-sm shadow-sky-400" />
              {t.cosmos?.midOrbit || 'Mid Orbit: Experiment / Maintain (🛠️ Stable)'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block shadow-sm shadow-rose-400" />
              {t.cosmos?.outerHalo || 'Outer Halo: Graveyard (⚰️ Salvaged)'}
            </span>
          </div>

          <div className="text-slate-500">
            {projects.length} Celestial Repositories Active
          </div>
        </div>
      </div>

      {/* Alchemy Energy Recycling Matrix Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/30 via-violet-950/30 to-emerald-950/30 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 shrink-0">
            <Zap className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <span className="font-bold text-white font-mono block">
              Knowledge Alchemy Engine (지식 연금술 반응로)
            </span>
            <p className="text-slate-400 text-[11px]">
              Graveyard 매몰 시간 155시간을 재활용하여 6개 공통 자산으로 변환 → 5개 성장 엔진 프로젝트에 주입 중
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
          <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20">
            3 Graves
          </span>
          <span>➔</span>
          <span className="px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20">
            {assets.length} Mined Modules
          </span>
          <span>➔</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            {growingProjects.length} Active Engines
          </span>
        </div>
      </div>
    </div>
  );
};
