import React, { useRef, useEffect } from 'react';
import { ProjectItem } from '../../types/project';
import { Layers, Cpu, Database, Cloud, Terminal, Sparkles } from 'lucide-react';

interface VisualArchitectureDiagramProps {
  project: ProjectItem;
}

export const VisualArchitectureDiagram: React.FC<VisualArchitectureDiagramProps> = ({ project }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const uiStack = project.stack.filter((s) => ['React', 'Next.js', 'Vue.js', 'Flutter', 'TailwindCSS'].includes(s)).join(' + ') || 'Web & Mobile Client';
  const backendStack = project.stack.filter((s) => ['TypeScript', 'Go', 'Python', 'Java', 'NestJS', 'Express'].includes(s)).join(' / ') || 'Modular Service Layer';
  const dataStack = project.stack.filter((s) => ['SQLite', 'PostgreSQL', 'Docker', 'Node-RED'].includes(s)).join(', ') || 'Local & Cloud Storage';

  // Canvas particle pulse animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 180);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 180;
    };
    window.addEventListener('resize', handleResize);

    let progress = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Node positions: 4 tiers
      const x1 = width * 0.15;
      const x2 = width * 0.40;
      const x3 = width * 0.65;
      const x4 = width * 0.88;
      const y = height / 2;

      // Draw connecting lines
      const drawLine = (fromX: number, toX: number) => {
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(fromX, y);
        ctx.lineTo(toX, y);
        ctx.stroke();

        // Draw animated energy pulse particle
        const pX = fromX + (toX - fromX) * ((progress % 100) / 100);
        ctx.fillStyle = '#06B6D4';
        ctx.shadowColor = '#06B6D4';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pX, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      drawLine(x1, x2);
      drawLine(x2, x3);
      drawLine(x3, x4);

      progress += 0.8;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#060911] border border-slate-800/80 space-y-3 relative overflow-hidden shadow-inner font-sans">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Interactive System Topology & Pipeline
        </span>
        <span className="text-[10px] font-mono text-slate-500">Live Data Flow Simulation</span>
      </div>

      {/* 4 Tier Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
        {/* Tier 1: Client UI */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-1 text-center shadow-lg">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-bold text-[11px] text-white font-mono block">1. Client / UI</span>
          <p className="text-[10px] text-cyan-300 font-mono truncate">{uiStack}</p>
        </div>

        {/* Tier 2: Service API */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-violet-500/30 space-y-1 text-center shadow-lg">
          <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-400 mx-auto flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="font-bold text-[11px] text-white font-mono block">2. Core Service</span>
          <p className="text-[10px] text-violet-300 font-mono truncate">{backendStack}</p>
        </div>

        {/* Tier 3: Data & Storage */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-1 text-center shadow-lg">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <span className="font-bold text-[11px] text-white font-mono block">3. Data Tier</span>
          <p className="text-[10px] text-emerald-300 font-mono truncate">{dataStack}</p>
        </div>

        {/* Tier 4: CI/CD & GitHub Actions */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-1 text-center shadow-lg">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center">
            <Cloud className="w-4 h-4" />
          </div>
          <span className="font-bold text-[11px] text-white font-mono block">4. CI/CD & Deploy</span>
          <p className="text-[10px] text-amber-300 font-mono truncate">GitHub Pages / Actions</p>
        </div>
      </div>

      {/* Background Particle Line Canvas */}
      <div className="hidden md:block absolute inset-0 pointer-events-none opacity-60">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};
