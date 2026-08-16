import React, { useState, useRef, useEffect } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { useTranslation } from '../../i18n/useTranslation';
import {
  Bot,
  Send,
  Sparkles,
  Terminal,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Code2,
  FolderGit2,
  Zap,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: { tab: string; projectId?: string; label: string };
}

export const VibeCopilot: React.FC = () => {
  const {
    projects,
    assets,
    ideas,
    summary,
    setActiveTab,
    setSelectedProjectId,
    reAnalyzeAll,
    mineProjectAssets,
    showToast,
  } = useVibeStore();

  const { t, language } = useTranslation();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        language === 'ko'
          ? `안녕하세요! **VibeOS AI 코파일럿**입니다. ${projects.length}개 프로젝트, ${assets.length}개 재사용 자산, ${ideas.length}개 아이디어 데이터베이스가 로드되었습니다.\n\n어떤 프로젝트를 분석하거나 새로운 조합 아이디어를 도출해드릴까요?`
          : `Hello! I am your **VibeOS AI Portfolio Copilot**. Loaded ${projects.length} repositories, ${assets.length} mined assets, and ${ideas.length} ideas.\n\nHow can I help you query, audit, or generate new architecture mashups?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        language === 'ko' ? '🚀 성장 엔진 프로젝트 4D 점수 분석' : '🚀 Analyze Growth Engines 4D Scores',
        language === 'ko' ? '💎 상위 재사용 자산 및 전용 가능 프로젝트' : '💎 Top Reusable Assets and Sources',
        language === 'ko' ? '⚰️ 묘지 프로젝트에서 배운 핵심 교훈' : '⚰️ Lessons from Graveyard Post-Mortems',
        language === 'ko' ? '⚡ 새로운 AI 에이전트 매시업 아이디어 생성' : '⚡ Generate Next Project Mashup Blueprint',
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(query);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const generateAIResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase();
    const isKo = language === 'ko';
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Audit command
    if (q.includes('audit') || q.includes('점검') || q.includes('분석') || q.includes('score')) {
      const topProjects = [...projects]
        .filter((p) => p.status === 'active')
        .sort((a, b) => b.score.total - a.score.total)
        .slice(0, 5);

      const listStr = topProjects
        .map(
          (p, i) =>
            `${i + 1}. **${p.name}** (${p.stage.toUpperCase()}) — **${p.score.total}점** (Act: ${p.score.activity}, Pot: ${p.score.potential})\n   👉 *다음 액션*: ${p.nextAction}`
        )
        .join('\n\n');

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: isKo
          ? `### 📊 ${projects.length}개 전체 프로젝트 건전성 진단 리포트\n\n현재 총 **${projects.length}개** 프로젝트 중 **${summary.growing}개**가 고속 성장 엔진(Grow), **${summary.experiment}개**가 가설 검증(Experiment) 단계입니다.\n\n**최우선 집중 권장 상위 프로젝트:**\n\n${listStr}\n\n💡 **AI 제언**: 3개 이상의 프로젝트에 동시 커밋을 분산하기보다, 이번 주말에는 \`${topProjects[0]?.name}\` 및 \`${topProjects[1]?.name}\`에 80% 이상의 시간을 집중 투입하는 것이 가장 높은 레버리지를 만듭니다.`
          : `### 📊 ${projects.length} Projects Health Audit Report\n\nCurrently across **${projects.length}** repositories, **${summary.growing}** are Growth Engines and **${summary.experiment}** are in validation stage.\n\n**Top Priority Recommended Projects:**\n\n${listStr}\n\n💡 **AI Recommendation**: Dedicate 80% of focus hours to \`${topProjects[0]?.name}\` to maximize shipping velocity.`,
        timestamp: timeStr,
        suggestions: ['/mashup', '/graveyard-stats', '자산 마이닝 허브 열기'],
        actionLink: { tab: 'radar', label: isKo ? '프로젝트 레이더에서 확인' : 'Open Project Radar' },
      };
    }

    // 2. Mashup / Synergy Idea
    if (q.includes('mashup') || q.includes('매시업') || q.includes('조합') || q.includes('아이디어') || q.includes('idea')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: isKo
          ? `### ⚡ AI 추천 프로젝트 매시업 블루프린트\n\n보유하신 기존 핵심 모듈들을 결합하여 다음 고부가가치 제품을 1일 만에 구축할 수 있습니다:\n\n1. **Omni-Agent SQL Studio** (소요 기간: 1주)\n   - **결합 소스**: \`opengajae\` (다채널 봇 게이트웨이) + \`jask\` (NL2SQL 프롬프트 엔진) + \`jainsight\` (Monaco SQL 에디터)\n   - **설명**: Slack/WhatsApp에서 자연어로 질문하면 사내 DB를 자동 조회하여 차트와 요약 리포트를 반환하는 사내 데이터 비서.\n\n2. **Headless Project Demo Bot** (소요 기간: 주말 스프린트)\n   - **결합 소스**: \`GitFrame\` (Playwright 무인 녹화) + \`weekly\` (커밋 요약기) + \`mattermost-playwright-plugin\`\n   - **설명**: GitHub에 커밋 푸시 시 웹 앱을 자동 실행하여 10초 데모 비디오를 렌더링하고 PR 및 Mattermost에 첨부하는 자동화 봇.`
          : `### ⚡ Project Synergy Mashup Blueprint\n\nBy combining your existing mined modules, you can build these high-leverage tools in 1 sprint:\n\n1. **Omni-Agent SQL Studio** (Effort: 1 week)\n   - **Components**: \`opengajae\` (Chat Gateway) + \`jask\` (NL2SQL Engine) + \`jainsight\` (Monaco SQL Editor)\n   - **Summary**: Conversational database query agent for Slack/WhatsApp.\n\n2. **Headless Project Demo Bot** (Effort: Weekend)\n   - **Components**: \`GitFrame\` (Playwright Recorder) + \`weekly\` (Commit Synthesizer)\n   - **Summary**: Automated 10-second demo video generator on every Git commit.`,
        timestamp: timeStr,
        suggestions: ['아이디어 인큐베이터에 등록', '시너지 네트워크 맵 보기'],
        actionLink: { tab: 'ideas', label: isKo ? '아이디어 인큐베이터 열기' : 'Open Idea Inbox' },
      };
    }

    // 3. Graveyard & Post-Mortem query
    if (q.includes('graveyard') || q.includes('묘지') || q.includes('실패') || q.includes('postmortem') || q.includes('교훈')) {
      const graveyardCount = projects.filter((p) => p.status === 'graveyard' || p.stage === 'archived').length;
      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: isKo
          ? `### 🪦 묘지 아카이브 및 자산화 분석 (${graveyardCount}개 프로젝트)\n\n**주요 회수 성과:**\n- **총 매몰 시간 회수**: 약 **3,850시간**의 엔지니어링 지식이 공통 패턴으로 보존됨.\n- **핵심 실패 패턴 Top 3**:\n  1. *서드파티 플랫폼 종속성*: \`afterman\`, \`tistory.js\`, \`node-red-contrib-*\` 등 플랫폼 API 변경에 취약했던 구조.\n  2. *레거시 OS 바인딩*: \`Kiwoom-Helper\` ActiveX 등 클라우드 컨테이너화 불가 한계.\n  3. *단독 툴 시장 경쟁*: 상용 SaaS 내장 기능 추가로 인한 독립성 약화.\n\n✅ **VibeOS 교훈 적용 결과**: 현재 활성 프로젝트(\`VibeOS\`, \`opengajae\`, \`aura\`)는 모두 **Zero-Backend, Local-First, 다중 어댑터 추상화**로 설계되어 영구 지속 가능성을 확보했습니다.`
          : `### 🪦 Graveyard & Post-Mortem Intelligence (${graveyardCount} Repos)\n\n**Key Takeaways:**\n- **Rescued Engineering Time**: ~**3,850 hrs** compound developer knowledge retained.\n- **Top Root Causes**: Third-party API volatility, legacy OS bindings, and standalone tool SaaS consolidation.\n- **Architectural Shift**: Modern active engines now use **Local-First, Zero-Server, and Universal Adapters**.`,
        timestamp: timeStr,
        suggestions: ['/audit', '/mashup', '묘지 포스트모템 보기'],
        actionLink: { tab: 'graveyard', label: isKo ? 'The Graveyard 열기' : 'Open The Graveyard' },
      };
    }

    // 4. Default Intelligent Project Search
    const matched = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
    );

    if (matched.length > 0) {
      const matchDetails = matched
        .slice(0, 4)
        .map(
          (p) =>
            `- **${p.name}** [${p.stage.toUpperCase()}] (${p.score.total}점)\n  ${p.description}\n  *스택*: ${p.stack.join(', ')}`
        )
        .join('\n\n');

      return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: isKo
          ? `### 🔍 "${query}" 검색 결과 (${matched.length}개 프로젝트 발견)\n\n${matchDetails}\n\n더 자세한 아키텍처 및 4D 점수를 보려면 프로젝트를 클릭하세요.`
          : `### 🔍 Search Results for "${query}" (${matched.length} Found)\n\n${matchDetails}`,
        timestamp: timeStr,
        suggestions: ['/audit', '/mashup', '전체 목록 필터링'],
        actionLink: {
          tab: 'radar',
          projectId: matched[0]?.id,
          label: isKo ? `"${matched[0]?.name}" 상세 검사` : `Inspect ${matched[0]?.name}`,
        },
      };
    }

    // Fallback general guidance
    return {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: isKo
          ? `질문하신 내용에 대해 ${projects.length}개 프로젝트 데이터베이스를 조회했습니다. 다음과 같은 전역 명령을 사용해보세요:\n\n- \`/audit\`: 전체 포트폴리오 건전성 및 최우선 과제 진단\n- \`/mashup\`: 기존 재사용 코드를 조합한 신규 AI 프로젝트 청사진\n- \`/graveyard\`: 과거 ${summary.archived}개 아카이브 프로젝트의 실패 원인 및 교훈 리포트\n- \`React\`, \`Go\`, \`SQL\`, \`Mattermost\` 등 키워드로 프로젝트 검색`
          : `Queried the ${projects.length} project database. Try these global commands:\n\n- \`/audit\`: Comprehensive portfolio health diagnosis\n- \`/mashup\`: New AI project blueprint mashups\n- \`/graveyard\`: Lessons from ${summary.archived} archived projects\n- Search by keywords like \`React\`, \`Go\`, \`SQL\`, \`Mattermost\`.`,
        timestamp: timeStr,
        suggestions: ['/audit', '/mashup', '/graveyard', 'AI 에이전트 프로젝트 목록'],
      };
    };

    return (
      <div className="space-y-5 sm:space-y-6 animate-fadeIn pb-12">
        {/* Header */}
        <div className="p-5 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400">
              <Bot className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest font-bold">
                Portfolio Intelligence AI Terminal
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              VibeOS Copilot
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {language === 'ko'
                ? `${projects.length}개 프로젝트, 재사용 자산, 아키텍처 DNA 전반에 대한 실시간 지능형 질의응답 및 합성 터미널`
                : `Real-time conversational intelligence and synthesis terminal across all ${projects.length} repositories.`}
            </p>
          </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMessages([messages[0]]);
              showToast('Chat history cleared', 'info');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 text-xs font-mono border border-slate-700 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Terminal</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="rounded-3xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[560px]">
        {/* Terminal Titlebar */}
        <div className="px-4 sm:px-6 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-bold text-slate-300">vibeos-copilot@hkjang: ~</span>
          </div>
          <span className="text-cyan-400 text-[11px]">234 Indexed Repositories</span>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-[1px] shrink-0 mt-1">
                    <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-75 border-b border-slate-700/40 pb-1.5">
                    <span className="font-bold">{isUser ? 'YOU' : 'VIBEOS INTELLIGENCE'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                    {msg.text}
                  </div>

                  {/* Interactive Action Button Link */}
                  {msg.actionLink && (
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (msg.actionLink?.projectId) {
                            setSelectedProjectId(msg.actionLink.projectId);
                          }
                          setActiveTab(msg.actionLink!.tab as any);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all font-mono shadow-sm"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{msg.actionLink.label}</span>
                      </button>
                    </div>
                  )}

                  {/* Quick Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(sug)}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs font-mono text-cyan-400">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <span>Synthesizing across 234 repositories...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Command Toolbar */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-slate-500 shrink-0">Commands:</span>
          <button
            onClick={() => handleSend('/audit')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40 shrink-0"
          >
            /audit
          </button>
          <button
            onClick={() => handleSend('/mashup')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40 shrink-0"
          >
            /mashup
          </button>
          <button
            onClick={() => handleSend('React와 Vector DB를 사용하는 프로젝트')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40 shrink-0"
          >
            React + VectorDB
          </button>
          <button
            onClick={() => handleSend('Mattermost 플러그인 목록 및 아키텍처')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40 shrink-0"
          >
            Mattermost Plugins
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Terminal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === 'ko'
                    ? '234개 프로젝트에 대해 자유롭게 질문하거나 명령어를 입력하세요 (예: /audit, /mashup)'
                    : 'Ask any question across 234 projects or run commands (e.g. /audit, /mashup)...'
                }
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 sm:p-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
