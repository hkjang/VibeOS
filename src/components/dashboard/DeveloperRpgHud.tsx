import React, { useMemo, useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { soundEngine } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';
import {
  Shield,
  Zap,
  Flame,
  Award,
  Crown,
  Sparkles,
  Swords,
  Brain,
  Coins,
  BatteryCharging,
  Maximize2,
  TrendingUp,
  Cpu,
} from 'lucide-react';

export const DeveloperRpgHud: React.FC = () => {
  const { projects, assets, summary, showToast } = useVibeStore();
  const { language } = useTranslation();

  // Dynamic Level & EXP Calculation based on 234 repositories, assets, and activity
  const totalRepos = projects.length;
  const growingCount = projects.filter((p) => p.stage === 'grow').length;
  const assetsCount = assets.length;

  const baseExp = totalRepos * 100 + growingCount * 250 + assetsCount * 150;
  const level = Math.floor(baseExp / 1000) + 1;
  const currentExp = baseExp % 1000;
  const nextLevelExp = 1000;
  const expPercent = Math.min(100, Math.round((currentExp / nextLevelExp) * 100));

  // Compute RPG Attributes
  const avgActivity = Math.round(
    projects.reduce((acc, p) => acc + (p.score.activity || 0), 0) / (projects.length || 1)
  );
  const avgMaintain = Math.round(
    projects.reduce((acc, p) => acc + (p.score.maintainability || 0), 0) / (projects.length || 1)
  );
  const avgPotential = Math.round(
    projects.reduce((acc, p) => acc + (p.score.potential || 0), 0) / (projects.length || 1)
  );
  const avgReuse = Math.round(
    projects.reduce((acc, p) => acc + (p.score.reuse || 0), 0) / (projects.length || 1)
  );

  const authorName = localStorage.getItem('vibeos_author_name') || 'hkjang';

  // Stats Pentagram
  const stats = [
    { label: 'ATK (Momentum)', val: Math.min(99, avgActivity + 20), icon: Swords, color: '#EF4444' },
    { label: 'DEF (Resilience)', val: Math.min(99, avgMaintain + 15), icon: Shield, color: '#3B82F6' },
    { label: 'INT (AI Swarm)', val: 99, icon: Brain, color: '#8B5CF6' },
    { label: 'AGI (Velocity)', val: Math.min(99, growingCount * 6 + 45), icon: Zap, color: '#F59E0B' },
    { label: 'LUCK (Asset Reuse)', val: Math.min(99, avgReuse + 18), icon: Sparkles, color: '#10B981' },
  ];

  const handleLevelUpClick = () => {
    soundEngine.playLevelUp();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'],
    });
    showToast(`⚡ LEVEL UP! ${authorName} reached Level ${level + 1} Grand Architect!`, 'success');
  };

  return (
    <div className="p-5 sm:p-6 md:p-7 rounded-3xl bg-gradient-to-br from-[#0B0F19] via-slate-900/90 to-[#0B0F19] border border-cyan-500/30 space-y-5 shadow-2xl relative overflow-hidden group">
      {/* Cyberpunk Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      {/* Top HUD Header: Avatar, Level, Rank Title */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3.5">
          {/* Cyber Avatar Shield */}
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-[2px] shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <Crown className="w-7 h-7 text-amber-400 animate-pulse" />
                <span className="absolute bottom-0 right-0 text-[9px] font-mono font-extrabold bg-cyan-500 text-slate-950 px-1 rounded-tl-md">
                  S+
                </span>
              </div>
            </div>
            {/* Online Status Blip */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                LV.{level}
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-white font-mono tracking-tight">
                {authorName}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase tracking-wider">
                👑 Grand Architect
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {language === 'ko'
                ? `신화급 AI & 풀스택 엔지니어링 마스터 (${totalRepos}개 레포지토리 운용)`
                : `Mythic AI & Autonomous Platform Architect (${totalRepos} Repos Managed)`}
            </p>
          </div>
        </div>

        {/* Currency & Combo Badges */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Combo Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold shadow-sm">
            <Flame className="w-4 h-4 text-amber-400 fill-current animate-bounce" />
            <span>14-DAY STREAK (x2.5 EXP)</span>
          </div>

          {/* Vibe Coins */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <Coins className="w-4 h-4 text-cyan-400" />
            <span>2,340 V-COINS</span>
          </div>
        </div>
      </div>

      {/* Middle HUD: EXP Bar & Live Energy Vials */}
      <div className="relative z-10 space-y-3">
        {/* EXP Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              EXP PROGRESSION (To LV.{level + 1})
            </span>
            <div className="flex items-center gap-2">
              <span className="text-cyan-300 font-bold">
                {currentExp} / {nextLevelExp} EXP ({expPercent}%)
              </span>
              <button
                onClick={handleLevelUpClick}
                className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 border border-cyan-500/40 font-bold transition-all"
                title="Simulate EXP Surge"
              >
                + Surge
              </button>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 p-0.5 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 shadow-md shadow-cyan-500/50 transition-all duration-1000"
              style={{ width: `${expPercent}%` }}
            />
          </div>
        </div>

        {/* Dual Resource Vials: Energy & Focus Mana */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Energy Vial */}
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <BatteryCharging className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Vibe Flow Energy</span>
                <span className="text-xs font-mono font-bold text-white">100 / 100 HP (Optimal Flow)</span>
              </div>
            </div>
            <div className="w-20 h-2 rounded-full bg-slate-900 overflow-hidden">
              <div className="w-full h-full bg-emerald-400 rounded-full" />
            </div>
          </div>

          {/* Focus Mana Vial */}
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Deep Work Focus MP</span>
                <span className="text-xs font-mono font-bold text-white">88 / 100 MP (Zen State)</span>
              </div>
            </div>
            <div className="w-20 h-2 rounded-full bg-slate-900 overflow-hidden">
              <div className="w-[88%] h-full bg-violet-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD: RPG Attribute Radar Stats */}
      <div className="relative z-10 pt-2 border-t border-slate-800/80">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                onClick={() => {
                  soundEngine.playCriticalHit();
                  showToast(`${s.label} attribute analyzed: Rank SS (${s.val} pts)`, 'info');
                }}
                className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all cursor-pointer space-y-1 group"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Icon className="w-3 h-3" style={{ color: s.color }} />
                    <span className="truncate">{s.label.split(' ')[0]}</span>
                  </span>
                  <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {s.val}
                  </span>
                </div>
                <div className="w-full h-1 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.val}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
