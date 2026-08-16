# 🌌 VibeOS — The Operating System for Vibe Coders

> **"20개의 실패한 사이드 프로젝트는 20번의 실패가 아니라, 나만의 개인 개발 플랫폼 자산이 된다."**  
> VibeOS는 여러 AI 바이브코딩 프로젝트를 동시에 실험하고, 4차원 AI 평가를 통해 살아남은 프로젝트만 성장시키며 버려진 코드까지 재사용 가능한 자산으로 축적하는 **개발 포트폴리오 운영체제**입니다.

---

## ✨ 핵심 기능 (Core Features)

### 1. 📡 Project Radar (프로젝트 레이더 & 2D 기회 매트릭스)
- **4-Dimensional AI Scoring**:
  - ⚡ **Activity (35%)**: 최근 커밋 빈도, 활동 모멘텀
  - 🚀 **Potential (30%)**: 시장 수요, 아이디어 명확성, 별점 반응
  - 🧩 **Reusability (20%)**: 모듈화 수준, 공통 자산화 가능성
  - 🛠️ **Maintainability (15%)**: 코드베이스 구조, 의존성 건전성
- **2D Portfolio Matrix**:
  - 🚀 **Growth Engines**: 집중 스케일업 대상 (High Momentum + High Potential)
  - 💎 **Hidden Gems**: 주말 스프린트 집중 필요 (Low Momentum + High Potential)
  - ⚡ **Quick Hacks**: 가벼운 전술적 프로토타입 (High Momentum + Tactical)
  - ⚰️ **Graveyard Candidates**: 자산 추출 후 아카이빙 권장

### 2. 🎯 High-Leverage Next Action Engine
- "내가 지금 무엇을 계속 만들어야 하는가?"에 대한 답을 AI가 단계별(코드 작성, 가설 검증, 리팩토링, 배포)로 자동 제안합니다.

### 3. ⛏️ Asset Mining Hub (코드 자산화 허브)
- 각 프로젝트에서 인증(Auth), LLM Wrapper, UI Grid, Webhook 유틸리티 등을 자동 발굴하여 단일 중앙 자산 허브로 모읍니다.
- 구문 강조 코드 뷰어, 원클릭 복사, 새 프로젝트로의 전파를 지원합니다.

### 4. ⚰️ The Graveyard (묘지 포스트모템 & 자산 회수)
- 실패하거나 중단된 프로젝트를 방치하지 않고 **실패 원인(Root Cause Analysis)**, **핵심 교훈(Key Takeaways)**, **부활 조건(Revival Trigger)**, **추출된 모듈**로 정리합니다.
- 언제든 원클릭으로 활성 프로토타입으로 부활(Resuscitate)시킬 수 있습니다.

### 5. 💡 Idea Inbox (아이디어 인큐베이터)
- 스치는 AI 프로젝트 아이디어를 즉시 기록하고, 코드를 짜기 전 AI가 타당성 점수와 추천 기술 스택을 사전 분석합니다.
- 준비되면 원클릭으로 활성 프로토타입 프로젝트로 승격시킵니다.

### 6. 🧬 Project DNA & Prompt Library
- 기술 스택 점유율, 프롬프트 엔지니어링 패턴 라이브러리, 아키텍처 사양을 한눈에 파악합니다.

### 7. ⚡ Serverless GitHub-Native Runtime
- **Database**: Git Repository (`projects/*.json`, `analysis/*.json`, `assets/*.json`, `ideas/inbox.json`)
- **Worker**: GitHub Actions Workflow Dispatch
- **Frontend**: GitHub Pages (Client-Side IndexedDB / Memory Security)
- 사용자의 코드가 서비스 외부 서버로 전송되지 않는 100% 사용자 데이터 주권 구조입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Glassmorphism, Dark Developer Aesthetic
- **Visuals & Charts**: Recharts, Lucide Icons, Canvas Confetti
- **State & Storage**: Zustand, IndexedDB, localStorage with Fallback
- **API & Cloud**: GitHub REST API (Fine-grained PAT), GitHub Actions Workflow Dispatch

---

## 🚀 빠른 시작 (Quick Start)

### 1. 로컬 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속하면 즉시 준비된 리치 데모 데이터셋(Clustara, Vibe-Coders, Project Nova, FastLanding 등)을 탐색할 수 있습니다.

### 2. 프로덕션 빌드
```bash
npm run build
```

---

## 🔒 GitHub PAT 보안 안내

- 발급된 Personal Access Token(PAT)은 브라우저 클라이언트 메모리/로컬 스토리지에만 보관되며 외부 서버로 전송되지 않습니다.
- 필요 권한: `repo`, `workflow`, `read:user`
