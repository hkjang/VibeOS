import { ProjectItem, ReusableAsset, IdeaItem, PortfolioSummary } from '../types/project';

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'vibeos',
    name: 'VibeOS',
    description: '바이브 코더를 위한 포트폴리오 운영체제 — AI 프로젝트 수명주기 관리, 4D 점수화, 자산 마이닝, 묘지 부활 허브',
    status: 'active',
    stage: 'grow',
    createdAt: '2026-08-16',
    lastActivityAt: '2026-08-16',
    stack: ['TypeScript', 'React', 'TailwindCSS', 'Vite', 'Zustand', 'Recharts'],
    score: {
      total: 96,
      activity: 98,
      potential: 95,
      reuse: 94,
      maintainability: 96,
    },
    assets: ['Zero-Server Actions Runner', '4D Scoring Algorithm', 'Opportunity Matrix 2D', 'Confetti Resuscitation Engine'],
    nextAction: 'GitHub Pages CI/CD 배포 완료 및 hkjang 실제 프로젝트 데이터베이스 실시간 동기화',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'Vite 6 + React 18 SPA with Local-First IndexedDB & Serverless GitHub Actions Sync',
      keyPatterns: ['Local-First State Store', '4D Weighted Multi-Factor Scoring', 'Universal i18n Translation', 'Zero-Backend Runtime'],
      dependencies: {
        react: '^18.3.1',
        zustand: '^5.0.3',
        'lucide-react': '^1.16.0',
        recharts: '^2.15.1',
        'canvas-confetti': '^1.9.4',
        tailwindcss: '^3.4.17',
      },
      commitVelocityWeekly: 18,
      lastCommitMessage: 'feat: add full KO/EN i18n localization and mobile responsive optimization',
      githubUrl: 'https://github.com/hkjang/VibeOS',
    },
    stars: 1,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'trace',
    name: 'trace',
    description: '개발자 실행 흐름 추적, 성능 로그 분석 및 런타임 인스펙션 시스템',
    status: 'active',
    stage: 'grow',
    createdAt: '2026-08-16',
    lastActivityAt: '2026-08-16',
    stack: ['TypeScript', 'React', 'TailwindCSS', 'Vite', 'Lucide'],
    score: {
      total: 92,
      activity: 95,
      potential: 94,
      reuse: 88,
      maintainability: 90,
    },
    assets: ['Trace Flow Visualizer', 'Call Stack Timeline', 'Performance Profiler Hook'],
    nextAction: '분산 트레이싱 OpenTelemetry 스키마 연동 및 비동기 워커 프로파일러 추가',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'Client-side Trace Stream Engine with Real-Time Flamegraph Rendering',
      keyPatterns: ['Flamegraph Visualizer', 'High-Frequency Stream Buffering', 'Memory Leak Detector'],
      dependencies: {
        react: '^18.3.1',
        'lucide-react': '^1.16.0',
        vite: '^6.0.0',
      },
      commitVelocityWeekly: 14,
      lastCommitMessage: 'feat: implement flamegraph timeline inspector',
      githubUrl: 'https://github.com/hkjang/trace',
    },
    stars: 0,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'orbit',
    name: 'orbit',
    description: 'AI 멀티 에이전트 협업 오케스트레이션 및 작업 분배 관리 플랫폼',
    status: 'active',
    stage: 'grow',
    createdAt: '2026-08-16',
    lastActivityAt: '2026-08-16',
    stack: ['TypeScript', 'React', 'TailwindCSS', 'Vite', 'Zustand'],
    score: {
      total: 94,
      activity: 96,
      potential: 96,
      reuse: 91,
      maintainability: 92,
    },
    assets: ['Agent Message Broker', 'Task Routing DAG', 'Context Window Optimizer'],
    nextAction: 'Anthropic Claude Tool Use 및 OpenAI Assistant API 듀얼 프로바이더 라우터 구축',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'Distributed Agent State Machine with WebSocket Event Broadcasting',
      keyPatterns: ['Actor Model Agent Communication', 'DAG Task Dependency Resolver', 'Prompt Pipeline'],
      dependencies: {
        react: '^18.3.1',
        zustand: '^5.0.0',
        tailwindcss: '^3.4.0',
      },
      commitVelocityWeekly: 16,
      lastCommitMessage: 'feat: add subagent dependency scheduler and task visualizer',
      githubUrl: 'https://github.com/hkjang/orbit',
    },
    stars: 0,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'opengajae',
    name: 'opengajae (OpenClaw)',
    description: 'WhatsApp, Slack, Discord, LINE 다채널 AI 에이전트 게이트웨이 및 Pi RPC 툴 콜링 런타임',
    status: 'active',
    stage: 'grow',
    createdAt: '2026-02-09',
    lastActivityAt: '2026-08-15',
    stack: ['TypeScript', 'Node.js', 'Baileys', 'Grammy', 'Slack Bolt', 'Hono', 'SQLite-Vec'],
    score: {
      total: 91,
      activity: 88,
      potential: 95,
      reuse: 93,
      maintainability: 87,
    },
    assets: ['Multi-Channel Chat Gateway', 'SQLite-Vec Local Vector Search', 'WhatsApp Baileys Session Manager', 'Pi RPC Agent Executor'],
    nextAction: 'MCP (Model Context Protocol) 표준 서버 엔드포인트 지원 및 로컬 임베딩 캐싱 최적화',
    nextActionCategory: 'refactor',
    dna: {
      architecture: 'Multi-Channel Event Gateway with Embedded Vector DB and Modular Plugin Architecture',
      keyPatterns: ['Channel Adapter Pattern', 'Vector RAG Pipeline', 'RPC Agent Tooling', 'QR Terminal Auth'],
      dependencies: {
        '@whiskeysockets/baileys': '^6.6.0',
        grammy: '^1.20.0',
        '@slack/bolt': '^3.18.0',
        hono: '^4.0.0',
        'sqlite-vec': '^0.1.0',
      },
      commitVelocityWeekly: 12,
      lastCommitMessage: 'feat: add vector embeddings RAG pipeline for channel messages',
      githubUrl: 'https://github.com/hkjang/opengajae',
    },
    stars: 2,
    forks: 1,
    openIssues: 1,
  },
  {
    id: 'jainsight',
    name: 'jainsight',
    description: '데이터베이스/SQL 쿼리 관리 + 사용자·역할 권한 + AI 어시스턴트를 결합한 통합 데이터 운영 플랫폼',
    status: 'active',
    stage: 'maintain',
    createdAt: '2025-12-01',
    lastActivityAt: '2026-01-02',
    stack: ['TypeScript', 'Next.js', 'NestJS', 'TypeORM', 'Monaco Editor', 'PostgreSQL', 'MySQL', 'OpenAI'],
    score: {
      total: 89,
      activity: 72,
      potential: 93,
      reuse: 95,
      maintainability: 91,
    },
    assets: ['Monaco SQL Editor with Auto-Complete', 'Multi-Database Connection Pooler', 'RBAC User Permissions Guard', 'AI Query Explainer'],
    nextAction: 'Next.js 14 App Router 최적화 및 복합 인덱스 추천 AI 알고리즘 고도화',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'Nx Monorepo (Next.js Frontend + NestJS TypeORM Backend + Multi-DB Dialects)',
      keyPatterns: ['Monaco Custom Language Provider', 'Connection Pool Multiplexing', 'JWT Guard Middleware'],
      dependencies: {
        next: '^14.0.0',
        '@nestjs/core': '^10.0.0',
        typeorm: '^0.3.20',
        'monaco-editor': '^0.45.0',
        pg: '^8.11.0',
        mysql2: '^3.9.0',
      },
      commitVelocityWeekly: 5,
      lastCommitMessage: 'feat: add AI SQL query explanation and performance indexing hints',
      githubUrl: 'https://github.com/hkjang/jainsight',
    },
    stars: 1,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'jask',
    name: 'jask',
    description: '자연어 질의(NL2SQL)를 정밀한 SQL로 변환, 실행 및 시각화하는 지능형 Text-to-SQL 서비스',
    status: 'active',
    stage: 'experiment',
    createdAt: '2026-02-10',
    lastActivityAt: '2026-02-22',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Puppeteer', 'TailwindCSS'],
    score: {
      total: 86,
      activity: 68,
      potential: 94,
      reuse: 89,
      maintainability: 88,
    },
    assets: ['NL2SQL Schema Prompt Builder', 'SQL Injection Safety Sanitizer', 'Query Result Table Exporter'],
    nextAction: '자연어 질문의 데이터베이스 스키마 자동 프롬프트 임베딩(Few-Shot Retrieval) 탑재',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'FastAPI / Node Server with Prompt Engineering Pipeline and Monaco Query Playground',
      keyPatterns: ['Few-Shot Schema Context Injection', 'AST-based SQL Validation', 'Dynamic Schema Ingestion'],
      dependencies: {
        puppeteer: '^22.0.0',
        pg: '^8.11.0',
        typescript: '^5.3.0',
      },
      commitVelocityWeekly: 6,
      lastCommitMessage: 'feat: enhance text-to-sql precision with foreign key constraints context',
      githubUrl: 'https://github.com/hkjang/jask',
    },
    stars: 1,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'aura',
    name: 'aura',
    description: '기업용 보안 준수 AI 포털 — 온프레미스 LLM 거버넌스, 모델 스위처 및 역할 기반 접근 제어(RBAC)',
    status: 'active',
    stage: 'maintain',
    createdAt: '2025-11-15',
    lastActivityAt: '2025-12-25',
    stack: ['TypeScript', 'Next.js', 'AI SDK', 'Prisma', 'LibSQL', 'TailwindCSS'],
    score: {
      total: 88,
      activity: 65,
      potential: 92,
      reuse: 94,
      maintainability: 93,
    },
    assets: ['AI SDK Model Switcher Hook', 'Prisma LibSQL Adapter', 'PDF RAG Parser & Token Counter'],
    nextAction: 'vLLM 온프레미스 엔드포인트 헬스체크 및 스트리밍 레이턴시 모니터링 대시보드 추가',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'Next.js App Router + Vercel AI SDK Core + Prisma SQLite/LibSQL Edge Database',
      keyPatterns: ['Streaming UI Components', 'Multi-Provider Fallback Routing', 'Edge Database Authentication'],
      dependencies: {
        '@ai-sdk/openai': '^0.0.10',
        '@ai-sdk/react': '^0.0.10',
        '@prisma/client': '^5.10.0',
        next: '^14.1.0',
      },
      commitVelocityWeekly: 4,
      lastCommitMessage: 'feat: add local vLLM provider routing and prompt safety guardrails',
      githubUrl: 'https://github.com/hkjang/aura',
    },
    stars: 1,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'mattermost-myagents',
    name: 'mattermost-myagents-plugin',
    description: 'Mattermost 채널 내에서 동작하는 맞춤형 AI 멀티 에이전트 오케스트레이션 플러그인',
    status: 'active',
    stage: 'experiment',
    createdAt: '2026-03-20',
    lastActivityAt: '2026-05-13',
    stack: ['Go', 'TypeScript', 'React', 'Mattermost Server API', 'OpenAI'],
    score: {
      total: 85,
      activity: 60,
      potential: 91,
      reuse: 88,
      maintainability: 89,
    },
    assets: ['Mattermost Slash Command Hook', 'Interactive Post Action Button', 'Bot Account Persona Switcher'],
    nextAction: 'Mattermost 9.x 호환성 검증 및 슬래시 커맨드 `/agent summon` 인터랙티브 UI 추가',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'Mattermost Go Server Backend + Webpack React Client-Side Plugin Bundle',
      keyPatterns: ['Plugin Manifest API', 'Bot Post Interception', 'Async Job Queue'],
      dependencies: {
        react: '^18.2.0',
        'mattermost-redux': '^5.39.0',
      },
      commitVelocityWeekly: 5,
      lastCommitMessage: 'feat: add multi-agent channel routing and memory preservation',
      githubUrl: 'https://github.com/hkjang/mattermost-myagents-plugin',
    },
    stars: 0,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'weekly',
    name: 'weekly',
    description: 'GitHub 커밋 이력 및 프로젝트 활동을 자동 수집·요약하여 주간 개발 리포트를 생성하는 자동화 엔진',
    status: 'active',
    stage: 'grow',
    createdAt: '2026-08-10',
    lastActivityAt: '2026-08-13',
    stack: ['TypeScript', 'React', 'TailwindCSS', 'Vite', 'GitHub GraphQL API'],
    score: {
      total: 90,
      activity: 92,
      potential: 89,
      reuse: 90,
      maintainability: 91,
    },
    assets: ['Commit Diff Summarizer', 'Weekly Markdown Generator', 'Productivity Metrics Calculator'],
    nextAction: 'Slack 및 Mattermost 채널 자동 주간 리포트 웹훅 전송 기능 탑재',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'Vite React Client with GitHub API Rate-Limit Managed Fetcher',
      keyPatterns: ['Commit Message Clustering', 'Markdown Document Builder', 'Export to PDF/HTML'],
      dependencies: {
        react: '^18.3.1',
        'lucide-react': '^1.16.0',
        tailwindcss: '^3.4.0',
      },
      commitVelocityWeekly: 11,
      lastCommitMessage: 'feat: generate structured weekly engineering report with LLM synthesis',
      githubUrl: 'https://github.com/hkjang/weekly',
    },
    stars: 0,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'gitframe',
    name: 'GitFrame',
    description: '웹 프로젝트 자동 실행 및 Playwright 기반 데모 영상/스크린샷 무인 녹화 CLI 도구',
    status: 'active',
    stage: 'prototype',
    createdAt: '2026-08-01',
    lastActivityAt: '2026-08-08',
    stack: ['TypeScript', 'Node.js', 'Playwright', 'Commander', 'FFmpeg', 'YAML'],
    score: {
      total: 87,
      activity: 78,
      potential: 91,
      reuse: 92,
      maintainability: 90,
    },
    assets: ['Playwright Automated Recorder', 'Wait-On Server Healthchecker', 'FFmpeg Video Trimmer'],
    nextAction: '녹화된 데모 영상을 GIF / MP4로 압축 변환하는 경량 웹 대시보드 추가',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'Node.js CLI Application with Headless Chromium Automation and FFmpeg Streaming',
      keyPatterns: ['Command Pattern CLI', 'Headless Browser Automation', 'Process Spawning & Port Probing'],
      dependencies: {
        commander: '^12.0.0',
        playwright: '^1.44.0',
        'ffmpeg-static': '^5.2.0',
        'wait-on': '^7.2.0',
        'js-yaml': '^4.1.0',
      },
      commitVelocityWeekly: 8,
      lastCommitMessage: 'feat: add yaml scenario configuration and automated video trimming',
      githubUrl: 'https://github.com/hkjang/GitFrame',
    },
    stars: 0,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'stockboom',
    name: 'stockboom',
    description: '주식 거래 자동화 시스템 — 기술적 지표 계산, 백테스팅 및 리스크 관리 대시보드',
    status: 'active',
    stage: 'maintain',
    createdAt: '2026-01-05',
    lastActivityAt: '2026-01-18',
    stack: ['TypeScript', 'Node.js', 'Docker', 'Prisma', 'Date-fns'],
    score: {
      total: 82,
      activity: 50,
      potential: 88,
      reuse: 85,
      maintainability: 86,
    },
    assets: ['Technical Indicator Math Engine', 'Docker Compose Setup', 'Order Execution Guard'],
    nextAction: '키움증권 Open API 신규 REST 규격 연동 및 손절매 트리거 알고리즘 최적화',
    nextActionCategory: 'refactor',
    dna: {
      architecture: 'Dockerized Microservices with Node.js Backtester and PostgreSQL Database',
      keyPatterns: ['Time-Series Financial Calculations', 'Event-Driven Order Queue', 'Circuit Breaker'],
      dependencies: {
        'date-fns': '^3.0.0',
        prisma: '^5.8.0',
      },
      commitVelocityWeekly: 3,
      lastCommitMessage: 'feat: add moving average crossover backtesting strategy',
      githubUrl: 'https://github.com/hkjang/stockboom',
    },
    stars: 0,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'tagflow',
    name: 'tagflow',
    description: 'NW.js + NestJS + Next.js 기반 RFID 태그 이벤트 수집 및 권한 관리 시스템',
    status: 'active',
    stage: 'maintain',
    createdAt: '2025-11-20',
    lastActivityAt: '2025-12-15',
    stack: ['TypeScript', 'NW.js', 'NestJS', 'Next.js', 'TypeORM', 'TailwindCSS'],
    score: {
      total: 81,
      activity: 45,
      potential: 85,
      reuse: 86,
      maintainability: 89,
    },
    assets: ['NW.js Desktop Window Lifecycle Handler', 'Serial Port Scanner', 'Tag Audit Logger'],
    nextAction: '오프라인 환경 로컬 SQLite 캐시 동기화 및 엑셀 대량 임포터 최적화',
    nextActionCategory: 'feature',
    dna: {
      architecture: 'NW.js Desktop Shell wrapping Next.js Frontend with Local NestJS Microservice',
      keyPatterns: ['Desktop Native IPC', 'Hardware Serial Driver', 'Role-Based Access Control'],
      dependencies: {
        next: '^14.0.0',
        '@nestjs/core': '^10.0.0',
        concurrently: '^8.2.0',
      },
      commitVelocityWeekly: 2,
      lastCommitMessage: 'feat: implement role-based access control for tag event logs',
      githubUrl: 'https://github.com/hkjang/tagflow',
    },
    stars: 1,
    forks: 0,
    openIssues: 0,
  },
  // Graveyard Projects with Post-Mortems
  {
    id: 'afterman',
    name: 'afterman',
    description: 'Postman 컬렉션을 아름다운 Markdown 및 HTML API 문서로 변환·배포하는 툴',
    status: 'graveyard',
    stage: 'archived',
    createdAt: '2020-08-15',
    lastActivityAt: '2020-09-10',
    stack: ['Vue.js', 'Quasar Framework', 'Turndown', 'JavaScript'],
    score: {
      total: 58,
      activity: 10,
      potential: 60,
      reuse: 88,
      maintainability: 74,
    },
    assets: ['Postman v2 Collection Parser', 'HTML to Markdown Turndown Plugin', 'Quasar Markdown Exporter'],
    nextAction: 'Postman v2.1 스키마 호환 래퍼 추출 및 VibeOS 자산 마이닝 허브 등록',
    nextActionCategory: 'assetize',
    postMortem: {
      failedReason: 'Postman 컬렉션 v2.1 포맷 급변 및 Postman 자체 내장 문서 퍼블리싱 기능 강화로 단독 툴 경쟁력 저하',
      keyLearning: '외부 SaaS 플랫폼의 proprietary 스키마에 의존하는 도구는 스키마 파서를 독립 라이브러리로 분리하여 재사용성을 극대화해야 함',
      totalHoursInvested: 60,
      extractedAssets: ['Postman v2 Collection Parser', 'Markdown HTML Exporter', 'Quasar Table View'],
      revivalTrigger: 'Swagger/OpenAPI 3.1 양방향 변환 엔진으로 확장 시 부활 고려',
      stoppedDate: '2020-09-10',
      detailedAnalysis: 'UI와 파싱 로직이 긴밀히 결합되어 있었으나, 파싱 모듈 자체는 다른 API 테스팅 프로젝트에 유용하게 전용됨.',
    },
    dna: {
      architecture: 'Quasar Vue SPA with Client-Side File Parsing',
      keyPatterns: ['AST Transformation', 'Client-Side File Export'],
      dependencies: {
        quasar: '^1.14.0',
        turndown: '^7.0.0',
      },
      commitVelocityWeekly: 0,
      lastCommitMessage: 'build: export postman collection to clean html format',
      githubUrl: 'https://github.com/hkjang/afterman',
    },
    stars: 1,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'tistory-js',
    name: 'tistory.js',
    description: 'Node.js 및 브라우저를 모두 지원하는 JavaScript Tistory OpenAPI SDK 패키지',
    status: 'graveyard',
    stage: 'archived',
    createdAt: '2021-02-10',
    lastActivityAt: '2021-03-18',
    stack: ['JavaScript', 'Axios', 'Webpack', 'FormData'],
    score: {
      total: 54,
      activity: 5,
      potential: 55,
      reuse: 84,
      maintainability: 72,
    },
    assets: ['OAuth2 Token Exchange Client', 'Axios Multipart Image Uploader', 'Tistory Post Formatter'],
    nextAction: 'OAuth2 인증 및 멀티파트 업로드 모듈을 VibeOS 범용 유틸리티로 흡수',
    nextActionCategory: 'assetize',
    postMortem: {
      failedReason: '티스토리 Open API 정책 변경 및 OAuth 인증 절차 제한으로 외부 블로그 자동 발행 확장성 축소',
      keyLearning: '플랫폼 독점 API는 언제든 변경될 수 있으므로 추상화 인터페이스를 두고 headless 브라우저 자동화로 Fallback 설계가 필수적임',
      totalHoursInvested: 45,
      extractedAssets: ['OAuth2 Token Exchange Client', 'Axios Multipart Image Uploader'],
      revivalTrigger: 'Markdown to Tistory 자동 포스팅 CLI 수요 발생 시',
      stoppedDate: '2021-03-18',
      detailedAnalysis: 'API SDK 구현 패턴 및 웹팩 브라우저/Node 듀얼 번들링 기법을 후속 프로젝트에 표준 템플릿으로 전용함.',
    },
    dna: {
      architecture: 'Universal UMD / CJS / ESM Dual Bundle Library',
      keyPatterns: ['Universal HTTP Client', 'OAuth2 Flow Wrapper'],
      dependencies: {
        axios: '^0.21.0',
        'query-string': '^7.0.0',
      },
      commitVelocityWeekly: 0,
      lastCommitMessage: 'feat: add multipart image upload support for tistory api',
      githubUrl: 'https://github.com/hkjang/tistory.js',
    },
    stars: 2,
    forks: 0,
    openIssues: 0,
  },
  {
    id: 'kiwoom-helper',
    name: 'Kiwoom-Helper',
    description: 'QWebview-Plus 환경에서 Kiwoom 증권 ActiveX 객체와 이벤트를 Promise 기반으로 래핑한 유틸',
    status: 'graveyard',
    stage: 'archived',
    createdAt: '2022-03-15',
    lastActivityAt: '2022-04-21',
    stack: ['JavaScript', 'ES6 Promise', 'Webpack', 'Babel'],
    score: {
      total: 50,
      activity: 5,
      potential: 50,
      reuse: 82,
      maintainability: 65,
    },
    assets: ['Callback to Promise Event Emitter', 'Financial Precision Rounder'],
    nextAction: '이벤트 기반 Promise 브릿지 패턴을 stockboom 트레이딩 엔진에 통합 완료',
    nextActionCategory: 'assetize',
    postMortem: {
      failedReason: '32bit Windows 및 레거시 ActiveX 종속성으로 인해 현대적인 클라우드 컨테이너 환경 배포 불가',
      keyLearning: '레거시 OS 전용 네이티브 바인딩 대신 REST OpenAPI 또는 브라우저 웹소켓 표준 프로토콜 기반으로 설계해야 함',
      totalHoursInvested: 50,
      extractedAssets: ['Callback to Promise Event Emitter'],
      revivalTrigger: '키움증권 신규 REST API 전환 완료 시 모바일 클라이언트로 재설계',
      stoppedDate: '2022-04-21',
      detailedAnalysis: '비동기 COM 이벤트 콜백을 Promise 체인으로 변환하는 아키텍처 패턴을 확립하여 stockboom 구축에 결정적 기여.',
    },
    dna: {
      architecture: 'ES6 Promise Wrapper Library with Webpack & Babel Preprocessor',
      keyPatterns: ['Event-to-Promise Adapter', 'Singleton Connection Guard'],
      dependencies: {
        'es6-promise': '^4.2.8',
        webpack: '^4.0.0',
      },
      commitVelocityWeekly: 0,
      lastCommitMessage: 'feat: wrap kiwoom activex event loop into async promise',
      githubUrl: 'https://github.com/hkjang/Kiwoom-Helper',
    },
    stars: 0,
    forks: 0,
    openIssues: 0,
  },
];

export const INITIAL_ASSETS: ReusableAsset[] = [
  {
    id: 'asset-1',
    name: 'Multi-Channel Chat Gateway (WhatsApp / Slack / Discord)',
    category: 'api',
    sourceProject: 'opengajae',
    description: 'WhatsApp(Baileys), Slack(Bolt), Discord, Telegram 채널 메시지를 단일 표준 인터페이스로 수신·발신하는 어댑터',
    language: 'TypeScript',
    codeSnippet: `import { EventEmitter } from 'events';

export interface UnifiedMessage {
  channel: 'whatsapp' | 'slack' | 'discord' | 'line';
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
}

export class MultiChannelGateway extends EventEmitter {
  async handleIncoming(channel: UnifiedMessage['channel'], payload: any) {
    const msg: UnifiedMessage = {
      channel,
      senderId: payload.from || payload.user,
      senderName: payload.pushName || payload.userName || 'Anonymous',
      content: payload.text || payload.body || '',
      timestamp: Date.now(),
    };
    this.emit('message', msg);
  }
}`,
    tags: ['ChatBot', 'MultiChannel', 'Baileys', 'SlackBolt', 'TypeScript'],
    usageCount: 4,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-2',
    name: 'Monaco SQL Editor with Auto-Complete & Query Formatter',
    category: 'ui',
    sourceProject: 'jainsight',
    description: '다크 테마 Monaco Editor 기반 SQL 하이라이팅, 테이블/컬럼 자동완성 및 프리티파이어 컴포넌트',
    language: 'TypeScript',
    codeSnippet: `import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

export const SqlMonacoEditor: React.FC<{ value: string; onChange: (val: string) => void }> = ({
  value,
  onChange,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        const suggestions = [
          { label: 'SELECT', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'SELECT ', range },
          { label: 'WHERE', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'WHERE ', range },
          { label: 'GROUP BY', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'GROUP BY ', range },
        ];
        return { suggestions };
      },
    });
  };

  return (
    <Editor
      height="300px"
      defaultLanguage="sql"
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v || '')}
      onMount={handleEditorDidMount}
      options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
    />
  );
};`,
    tags: ['Monaco', 'SQL', 'React', 'SyntaxHighlight', 'UI'],
    usageCount: 3,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-3',
    name: 'NL2SQL Schema Prompt Ingestion Engine',
    category: 'llm',
    sourceProject: 'jask',
    description: '데이터베이스 DDL 및 관계형 외래키 제약조건을 LLM Few-Shot 시스템 프롬프트로 최적화 포맷팅하는 유틸',
    language: 'TypeScript',
    codeSnippet: `export function buildNl2SqlPrompt(schemaDdl: string, userQuery: string, dialect: 'postgres' | 'mysql' | 'sqlite' = 'postgres') {
  return \`You are an expert SQL engineer. Generate a valid, optimized \${dialect.toUpperCase()} query.
Database Schema:
\${schemaDdl}

Guidelines:
1. Return ONLY the executable SQL query inside a markdown codeblock.
2. Avoid destructive operations (DROP, DELETE, TRUNCATE) unless explicitly requested.
3. Optimize for index usage and join conditions.

User Request: \${userQuery}\`;
}`,
    tags: ['NL2SQL', 'PromptEngineering', 'LLM', 'SchemaContext'],
    usageCount: 5,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-4',
    name: 'Playwright Video & Snapshot Headless Recorder',
    category: 'utility',
    sourceProject: 'GitFrame',
    description: 'Playwright를 활용하여 로컬 개발 서버를 대기(wait-on)하고 데모 영상 및 스크린샷을 자동 캡처하는 런타임',
    language: 'TypeScript',
    codeSnippet: `import { chromium } from 'playwright';
import waitOn from 'wait-on';

export async function recordProjectDemo(url: string, outputVideoPath: string, durationSec = 10) {
  await waitOn({ resources: [url], timeout: 30000 });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: { dir: './recordings', size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();
  await page.goto(url);
  await page.waitForTimeout(durationSec * 1000);
  await context.close();
  await browser.close();
}`,
    tags: ['Playwright', 'Automation', 'VideoRecorder', 'Testing'],
    usageCount: 2,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-5',
    name: 'SQLite-Vec Local Embedding & Semantic RAG Search',
    category: 'database',
    sourceProject: 'opengajae',
    description: 'SQLite-Vec 확장을 활용한 제로 클라우드 비용 로컬 벡터 임베딩 유사도 검색 엔진',
    language: 'TypeScript',
    codeSnippet: `import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';

export class LocalVectorStore {
  private db: Database.Database;

  constructor(dbPath = ':memory:') {
    this.db = new Database(dbPath);
    sqliteVec.load(this.db);
    this.db.exec(\`
      CREATE VIRTUAL TABLE IF NOT EXISTS vec_documents USING vec0(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        embedding float[1536]
      );
    \`);
  }

  insert(content: string, embedding: number[]) {
    const stmt = this.db.prepare('INSERT INTO vec_documents(content, embedding) VALUES (?, ?)');
    stmt.run(content, new Float32Array(embedding));
  }
}`,
    tags: ['SQLite', 'VectorDB', 'Embedding', 'RAG', 'LocalFirst'],
    usageCount: 3,
    createdAt: '2026-08-16',
  },
  {
    id: 'asset-6',
    name: 'Postman Collection v2 to Markdown Exporter',
    category: 'utility',
    sourceProject: 'afterman',
    description: 'Postman Export JSON을 읽어 엔드포인트 파라미터, 헤더, 예제 응답을 마크다운 문서로 변환',
    language: 'TypeScript',
    codeSnippet: `export function postmanToMarkdown(collection: any): string {
  let md = \`# \${collection.info?.name || 'API Documentation'}\\n\\n\`;
  for (const item of collection.item || []) {
    md += \`## \${item.name}\\n\`;
    md += \`**Method**: \\\`\${item.request?.method}\\\`\\n\`;
    md += \`**URL**: \\\`\${item.request?.url?.raw || item.request?.url}\\\`\\n\\n\`;
    if (item.request?.description) {
      md += \`\${item.request.description}\\n\\n\`;
    }
  }
  return md;
}`,
    tags: ['Postman', 'Markdown', 'ApiDoc', 'Converter'],
    usageCount: 2,
    createdAt: '2026-08-16',
  },
];

export const INITIAL_IDEAS: IdeaItem[] = [
  {
    id: 'idea-1',
    title: 'Local SQLite-Vec MCP Server for Antigravity & Claude',
    description: '로컬 /mnt/d/project 내 모든 소스코드와 마크다운 문서를 실시간 임베딩하여 AI 어시스턴트가 0.1초만에 시맨틱 검색하도록 지원하는 MCP 서버',
    viabilityScore: 95,
    estimatedEffort: 'weekend',
    suggestedStack: ['TypeScript', 'SQLite-Vec', 'MCP SDK', 'Ollama'],
    status: 'inbox',
    createdAt: '2026-08-16',
    tags: ['MCP', 'AI', 'LocalFirst', 'VectorDB'],
  },
  {
    id: 'idea-2',
    title: 'Mattermost AI Daily Standup & Commit Digest Bot',
    description: '팀원들의 당일 GitHub 커밋 및 PR diff를 수집하여 Mattermost 스탠드업 채널에 매일 아침 9시 지능형 서머리를 브리핑하는 봇',
    viabilityScore: 91,
    estimatedEffort: 'weekend',
    suggestedStack: ['Go', 'TypeScript', 'Mattermost API', 'OpenAI'],
    status: 'inbox',
    createdAt: '2026-08-14',
    tags: ['Mattermost', 'Bot', 'Automation', 'DevProductivity'],
  },
  {
    id: 'idea-3',
    title: 'Vibe-Coding Prompt Auto-Refiner CLI',
    description: '자연어로 작성한 초기 아이디어를 구조화된 프로젝트 아키텍처 스펙, 디렉토리 트리, TypeScript 타입 정의서로 자동 확장해주는 CLI',
    viabilityScore: 88,
    estimatedEffort: '1-week',
    suggestedStack: ['TypeScript', 'Commander', 'Anthropic Claude 3.5 Sonnet'],
    status: 'inbox',
    createdAt: '2026-08-12',
    tags: ['CLI', 'VibeCoding', 'PromptEngineering'],
  },
  {
    id: 'idea-4',
    title: 'Self-Hosted Atlassian Forge Bridge for On-Prem AI',
    description: '폐쇄망 Bitbucket / Confluence 인프라에서 외부 클라우드 통신 없이 로컬 vLLM으로 코드 리뷰와 문서 작성을 수행하는 브릿지',
    viabilityScore: 84,
    estimatedEffort: '2-weeks',
    suggestedStack: ['Java', 'vLLM', 'Atlassian P2 Plugin', 'Docker'],
    status: 'inbox',
    createdAt: '2026-08-05',
    tags: ['Atlassian', 'OnPremise', 'vLLM', 'Enterprise'],
  },
];

export const INITIAL_SUMMARY: PortfolioSummary = {
  totalProjects: INITIAL_PROJECTS.length,
  growing: INITIAL_PROJECTS.filter((p) => p.stage === 'grow').length,
  experiment: INITIAL_PROJECTS.filter((p) => p.stage === 'experiment').length,
  maintaining: INITIAL_PROJECTS.filter((p) => p.stage === 'maintain').length,
  dormant: INITIAL_PROJECTS.filter((p) => p.stage === 'dormant').length,
  archived: INITIAL_PROJECTS.filter((p) => p.stage === 'archived').length,
  totalAssetsExtracted: INITIAL_ASSETS.length,
  monthlyProjectsCreated: 4,
  monthlyCommitsCount: INITIAL_PROJECTS.reduce((acc, p) => acc + (p.dna.commitVelocityWeekly * 4), 0),
  topWorthContinuingProjects: ['VibeOS', 'orbit', 'trace', 'opengajae'],
};
