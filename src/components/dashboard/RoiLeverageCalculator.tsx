import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import { TrendingUp, Sparkles, DollarSign, Clock, ShieldCheck, Zap } from 'lucide-react';

export const RoiLeverageCalculator: React.FC = () => {
  const { projects, assets, summary } = useVibeStore();
  const { language } = useTranslation();

  const [futureProjectsCount, setFutureProjectsCount] = useState<number>(5);

  const graveyardHoursSaved = 3850;
  const hoursPerNewProjectWithAssets = 14;
  const hoursSavedPerNewProject = 28; // saved vs building from zero
  const totalFutureHoursSaved = futureProjectsCount * hoursSavedPerNewProject;
  const dollarLeverage = totalFutureHoursSaved * 120; // $120/hr senior dev rate

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-violet-950/20 via-slate-900 to-cyan-950/20 border border-slate-800 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white font-mono">
              {language === 'ko'
                ? '지식 자산화 복리 성장 & ROI 레버리지 계산기'
                : 'Asset Compound Growth & ROI Leverage Simulator'}
            </h2>
            <p className="text-[11px] text-slate-400">
              {language === 'ko'
                ? '묘지 프로젝트 매몰 비용의 공통 플랫폼 자산화 전환 레버리지'
                : 'Quantifying compounding engineering leverage from reusable modules'}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/20">
          3.8x Build Acceleration
        </span>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
          <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-rose-400" /> Rescued Graveyard Time
          </span>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">
            ~3,850 <span className="text-xs text-slate-400 font-normal">hrs</span>
          </div>
          <p className="text-[10px] text-slate-500">142개 아카이브 프로젝트 지식 보존</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
          <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-violet-400" /> Universal Mined Gems
          </span>
          <div className="text-xl sm:text-2xl font-bold text-violet-300 font-mono">
            {assets.length} <span className="text-xs text-slate-400 font-normal">modules</span>
          </div>
          <p className="text-[10px] text-slate-500">즉시 임포트 가능한 공통 래퍼</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
          <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" /> Projected Value Saved
          </span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">
            ${dollarLeverage.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-500">차기 {futureProjectsCount}개 신규 빌드 시 절감액</p>
        </div>
      </div>

      {/* Interactive Simulator Slider */}
      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">
            향후 계획 중인 신규 사이드 프로젝트: <strong className="text-cyan-400">{futureProjectsCount}개</strong>
          </span>
          <span className="text-emerald-400 font-bold">
            +{totalFutureHoursSaved}시간 개발 절감 (~{Math.round(totalFutureHoursSaved / 8)} 개발일)
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={futureProjectsCount}
          onChange={(e) => setFutureProjectsCount(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>
    </div>
  );
};
