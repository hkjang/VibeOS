import { ProjectItem, ReusableAsset, IdeaItem, PortfolioSummary } from '../types/project';

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    "id": "ageforge",
    "name": "AgeForge",
    "description": "노화 디지털 트윈, Goal 기반 개입 설계, 연구 후보 평가와 안전 거버넌스를 하나의 폐쇄형 루프로 연결하는 제품 프로토타입입니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "TypeScript",
      "React",
      "Vite",
      "Docker"
    ],
    "score": {
      "total": 92,
      "activity": 95,
      "potential": 90,
      "reuse": 90,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript + React + Vite + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@vitejs/plugin-react": "latest",
        "lucide-react": "latest",
        "react": "latest",
        "react-dom": "latest",
        "typescript": "latest",
        "vite": "latest"
      },
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/AgeForge"
    },
    "stars": 3,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "agenthub",
    "name": "AgentHub",
    "description": "**JupyterHub처럼 각 사용자와 영속 Workspace마다 격리된 OpenCode 및 Hermes 런타임을 제공하는 엔터프라이즈 제어면**",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-15",
    "lastActivityAt": "2026-08-15",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 88,
      "activity": 95,
      "potential": 88,
      "reuse": 78,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/AgentHub"
    },
    "stars": 3,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "agora-python-sdk",
    "name": "Agora-Python-SDK",
    "description": "*[中文](Readme.zh.md) | English*",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-02-16",
    "lastActivityAt": "2021-02-16",
    "stack": [
      "TypeScript",
      "Python"
    ],
    "score": {
      "total": 62,
      "activity": 24,
      "potential": 82,
      "reuse": 77,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + Python Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Agora-Python-SDK"
    },
    "postMortem": {
      "stoppedDate": "2021-02-16",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Agora-Python-SDK 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Agora-Python-SDK Core Utility",
        "Agora-Python-SDK Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 40
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "argosaisecurity",
    "name": "ArgosAISecurity",
    "description": "랜섬웨어 · 이상 행위 · 권한 상승 · 파일 변조 실시간 탐지 · 차단 · 복구",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 89,
      "activity": 94,
      "potential": 91,
      "reuse": 81,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ArgosAISecurity"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "autoforge",
    "name": "AutoForge",
    "description": "현재 구현 범위와 실제 엔진·로봇 연동의 경계는 [완성도 감사](docs/COMPLETION_AUDIT.md)에 정리되어 있습니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-07-18",
    "lastActivityAt": "2026-07-18",
    "stack": [
      "TypeScript",
      "React",
      "Vite",
      "Express",
      "Docker"
    ],
    "score": {
      "total": 91,
      "activity": 94,
      "potential": 88,
      "reuse": 91,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript + React + Vite + Express + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@vitejs/plugin-react": "latest",
        "express": "latest",
        "lucide-react": "latest",
        "react": "latest",
        "react-dom": "latest",
        "typescript": "latest",
        "vite": "latest"
      },
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/AutoForge"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "bytestash",
    "name": "ByteStash",
    "description": "A React and node.js app that stores code snippets",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-04-12",
    "lastActivityAt": "2025-04-12",
    "stack": [
      "JavaScript",
      "Vite",
      "Express",
      "Docker"
    ],
    "score": {
      "total": 77,
      "activity": 65,
      "potential": 77,
      "reuse": 88,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "JavaScript + Vite + Express + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "body-parser": "^1.20.3",
        "cors": "^2.8.5",
        "css-select": "^5.1.0",
        "express": "^4.21.1",
        "sqlite": "^5.1.1",
        "sqlite3": "^5.1.7",
        "svgo": "^3.3.2",
        "vite": "^5.4.10"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ByteStash"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "cartoon-avatar-creator",
    "name": "Cartoon-Avatar-Creator",
    "description": "Cartoon Avatar Creator",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-23",
    "lastActivityAt": "2022-04-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 59,
      "activity": 29,
      "potential": 68,
      "reuse": 77,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Cartoon-Avatar-Creator"
    },
    "postMortem": {
      "stoppedDate": "2022-04-23",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Cartoon-Avatar-Creator 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Cartoon-Avatar-Creator Core Utility",
        "Cartoon-Avatar-Creator Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 43
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "character-party",
    "name": "Character-Party",
    "description": "Michael's Character Party",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-23",
    "lastActivityAt": "2022-04-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 58,
      "activity": 17,
      "potential": 73,
      "reuse": 78,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Character-Party"
    },
    "postMortem": {
      "stoppedDate": "2022-04-23",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Character-Party 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Character-Party Core Utility",
        "Character-Party Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 57
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "chatgptforgoogle",
    "name": "ChatGPTforGoogle",
    "description": "ChatGPTforGoogle — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-03-15",
    "lastActivityAt": "2024-03-15",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 56,
      "activity": 13,
      "potential": 79,
      "reuse": 80,
      "maintainability": 77
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ChatGPTforGoogle"
    },
    "postMortem": {
      "stoppedDate": "2024-03-15",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "ChatGPTforGoogle 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "ChatGPTforGoogle Core Utility",
        "ChatGPTforGoogle Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 43
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "chibi-character-generator",
    "name": "Chibi-Character-Generator",
    "description": "Chibi Character Generator",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-23",
    "lastActivityAt": "2022-04-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 56,
      "activity": 16,
      "potential": 71,
      "reuse": 81,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Chibi-Character-Generator"
    },
    "postMortem": {
      "stoppedDate": "2022-04-23",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Chibi-Character-Generator 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Chibi-Character-Generator Core Utility",
        "Chibi-Character-Generator Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 35
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "dartfly",
    "name": "DartFly",
    "description": "DartFly는 데이터베이스 탐색, SQL 실행, 리소스, API, MCP, 감사와 모니터링을 하나의 정책 경로로 제공하는 웹 기반 데이터베이스 운영 플랫폼입니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 84,
      "activity": 95,
      "potential": 69,
      "reuse": 81,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/DartFly"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "flat-design-character-maker",
    "name": "Flat-Design-Character-Maker",
    "description": "Flat Design Character Maker",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-23",
    "lastActivityAt": "2022-04-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 61,
      "activity": 22,
      "potential": 78,
      "reuse": 82,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Flat-Design-Character-Maker"
    },
    "postMortem": {
      "stoppedDate": "2022-04-23",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Flat-Design-Character-Maker 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Flat-Design-Character-Maker Core Utility",
        "Flat-Design-Character-Maker Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 58
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "fluentread",
    "name": "FluentRead",
    "description": "모든 사람이 원어민 수준의 독서 경험을 할 수 있도록 하는 혁신적인 오픈소스 브라우저 번역 플러그인",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-09-21",
    "lastActivityAt": "2025-09-21",
    "stack": [
      "TypeScript",
      "Vue.js",
      "Vite"
    ],
    "score": {
      "total": 76,
      "activity": 63,
      "potential": 73,
      "reuse": 96,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + Vue.js + Vite Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@element-plus/icons-vue": "^2.3.1",
        "@wxt-dev/storage": "^1.0.1",
        "crypto-js": "^4.2.0",
        "element-plus": "^2.9.3",
        "franc-min": "^6.2.0",
        "js-beautify": "^1.15.1",
        "webextension-polyfill": "^0.12.0"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/FluentRead"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "gitframe",
    "name": "GitFrame",
    "description": "Automated web project runner and demo video recorder CLI (TypeScript)",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 88,
      "activity": 95,
      "potential": 81,
      "reuse": 86,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "commander": "^11.1.0",
        "ffmpeg-static": "^5.2.0",
        "js-yaml": "^4.1.0",
        "playwright": "^1.40.0",
        "wait-on": "^7.2.0"
      },
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/GitFrame"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "h5_luckyslots",
    "name": "H5_LuckySlots",
    "description": "H5_LuckySlots",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-24",
    "lastActivityAt": "2021-04-24",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 57,
      "activity": 24,
      "potential": 69,
      "reuse": 78,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/H5_LuckySlots"
    },
    "postMortem": {
      "stoppedDate": "2021-04-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "H5_LuckySlots 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "H5_LuckySlots Core Utility",
        "H5_LuckySlots Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 42
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "kiwoom-helper",
    "name": "Kiwoom-Helper",
    "description": "QWebview-Plus에서 제공하는 kiwoom 객체와 이벤트를 손쉽게 사용할 수 있는 유틸",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-21",
    "lastActivityAt": "2022-04-21",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 54,
      "activity": 11,
      "potential": 68,
      "reuse": 84,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "es6-promise": "^3.2.1",
        "webpack": "^1.13.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Kiwoom-Helper"
    },
    "postMortem": {
      "stoppedDate": "2022-04-21",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Kiwoom-Helper 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Kiwoom-Helper Core Utility",
        "Kiwoom-Helper Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 51
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "kkiit",
    "name": "Kkiit",
    "description": "Kkiit는 사람·기업·AI Agent의 전문 서비스를 `재능 상품 → 요구사항 → 주문 → 작업 → 납품 → 구매확정 → 정산` 흐름으로 연결하는 오프라인 운영 가능 마켓플레이스입니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-13",
    "lastActivityAt": "2026-08-13",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 80,
      "activity": 93,
      "potential": 70,
      "reuse": 72,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Kkiit"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "legit_engineers",
    "name": "Legit_Engineers",
    "description": "**안녕하세요, 저희는 GPTers 그룹에서 활동하는 Legit_Engineers입니다.**",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-03-10",
    "lastActivityAt": "2024-03-10",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 64,
      "activity": 25,
      "potential": 80,
      "reuse": 85,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Legit_Engineers"
    },
    "postMortem": {
      "stoppedDate": "2024-03-10",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Legit_Engineers 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Legit_Engineers Core Utility",
        "Legit_Engineers Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 33
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "lottery",
    "name": "Lottery",
    "description": "Lottery — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-24",
    "lastActivityAt": "2021-04-24",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 58,
      "activity": 17,
      "potential": 77,
      "reuse": 80,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Lottery"
    },
    "postMortem": {
      "stoppedDate": "2021-04-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Lottery 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Lottery Core Utility",
        "Lottery Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 59
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "lotterygame",
    "name": "LotteryGame",
    "description": "Jan. 5th, 2018",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-24",
    "lastActivityAt": "2021-04-24",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 59,
      "activity": 17,
      "potential": 83,
      "reuse": 74,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/LotteryGame"
    },
    "postMortem": {
      "stoppedDate": "2021-04-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "LotteryGame 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "LotteryGame Core Utility",
        "LotteryGame Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 53
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "lucky",
    "name": "Lucky",
    "description": "HTML5 game",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-24",
    "lastActivityAt": "2021-04-24",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 62,
      "activity": 28,
      "potential": 74,
      "reuse": 79,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Lucky"
    },
    "postMortem": {
      "stoppedDate": "2021-04-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Lucky 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Lucky Core Utility",
        "Lucky Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 56
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "luckydraw",
    "name": "LuckyDraw",
    "description": "Simple HTML5 Game",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-24",
    "lastActivityAt": "2021-04-24",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 58,
      "activity": 22,
      "potential": 73,
      "reuse": 81,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/LuckyDraw"
    },
    "postMortem": {
      "stoppedDate": "2021-04-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "LuckyDraw 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "LuckyDraw Core Utility",
        "LuckyDraw Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 49
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "momento",
    "name": "Momento",
    "description": "누가 어느 조직·부서·네트워크 망에서 어느 서비스·기능·버튼·AI Agent를 사용하는지부터 실제 업무 결과와 사용자 경험까지 Raw Event 수준에서 직접 소유하고 분석합니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-12",
    "lastActivityAt": "2026-08-12",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 84,
      "activity": 98,
      "potential": 68,
      "reuse": 82,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Momento"
    },
    "stars": 4,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "planexus",
    "name": "Planexus",
    "description": "전략-KPI 목표 통섭, 결정론적 수지 시뮬레이션, 거버닝 AI 및 Streamable MCP 지원.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-12",
    "lastActivityAt": "2026-08-12",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 85,
      "activity": 96,
      "potential": 78,
      "reuse": 75,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Planexus"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "relaychat",
    "name": "RelayChat",
    "description": "Moddle is a Mattermost-compatible chat platform. The product goal is not a",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-04-26",
    "lastActivityAt": "2026-04-26",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 83,
      "activity": 85,
      "potential": 78,
      "reuse": 80,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/RelayChat"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "rocket-chat",
    "name": "Rocket.Chat",
    "description": "The Ultimate Open Source WebChat Platform",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-07-25",
    "lastActivityAt": "2020-07-25",
    "stack": [
      "TypeScript",
      "React",
      "Express",
      "Docker"
    ],
    "score": {
      "total": 68,
      "activity": 26,
      "potential": 88,
      "reuse": 96,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + React + Express + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@babel/runtime": "^7.9.6",
        "@google-cloud/language": "^3.7.0",
        "@google-cloud/storage": "^2.3.1",
        "@google-cloud/vision": "^1.8.0",
        "@nivo/bar": "^0.61.1",
        "@nivo/heatmap": "^0.61.0",
        "@nivo/line": "^0.61.1",
        "@nivo/pie": "^0.61.1",
        "@rocket.chat/apps-engine": "1.16.0-beta.3516",
        "@rocket.chat/css-in-js": "^0.13.1",
        "@rocket.chat/fuselage": "^0.13.2",
        "@rocket.chat/fuselage-hooks": "^0.13.2",
        "@rocket.chat/fuselage-polyfills": "^0.13.1",
        "@rocket.chat/fuselage-ui-kit": "^0.13.2",
        "@rocket.chat/icons": "^0.13.1",
        "@rocket.chat/mp3-encoder": "^0.13.1",
        "@rocket.chat/ui-kit": "^0.13.1",
        "@slack/client": "^4.8.0",
        "@types/fibers": "^3.1.0",
        "@types/underscore.string": "0.0.38",
        "@types/use-subscription": "^1.0.0",
        "@types/xml-crypto": "^1.4.1",
        "@types/xmldom": "^0.1.29",
        "adm-zip": "RocketChat/adm-zip",
        "apn": "2.2.0",
        "archiver": "^3.0.0",
        "arraybuffer-to-string": "^1.0.2",
        "atlassian-crowd": "^0.5.0",
        "autolinker": "^1.8.1",
        "aws-sdk": "^2.368.0",
        "bad-words": "^3.0.2",
        "bcrypt": "^3.0.7",
        "blockstack": "19.3.0",
        "body-parser": "1.18.3",
        "bson": "^4.0.0",
        "bugsnag": "^2.4.3",
        "bunyan": "^1.8.12",
        "busboy": "^0.2.14",
        "bytebuffer": "5.0.1",
        "cas": "https://github.com/kcbanner/node-cas/tarball/fcd27dad333223b3b75a048bce27973fb3ca0f62",
        "change-case": "^4.1.1",
        "chart.js": "^2.7.3",
        "clipboard": "^2.0.4",
        "codemirror": "^5.42.0",
        "coffeescript": "^2.3.2",
        "connect": "^3.6.6",
        "core-js": "^2.5.7",
        "cors": "^2.8.4",
        "csv-parse": "^4.0.1",
        "emailreplyparser": "^0.0.5",
        "emojione": "^4.5.0",
        "eslint-plugin-import": "^2.19.1",
        "express": "^4.17.1",
        "express-rate-limit": "^5.1.3",
        "fibers": "4.0.3",
        "file-type": "^10.6.0",
        "filesize": "^3.6.1",
        "googleapis": "^25.0.0",
        "grapheme-splitter": "^1.0.4",
        "gridfs-stream": "^1.1.1",
        "he": "^1.2.0",
        "highlight.js": "^9.18.0",
        "iconv-lite": "^0.4.24",
        "image-size": "^0.6.3",
        "imap": "^0.8.19",
        "ip-range-check": "^0.0.2",
        "jquery": "^3.5.0",
        "jschardet": "^1.6.0",
        "jsrsasign": "^8.0.12",
        "juice": "^5.2.0",
        "katex": "^0.11.1",
        "ldap-escape": "^2.0.1",
        "ldapjs": "^1.0.2",
        "less": "https://github.com/meteor/less.js/tarball/8130849eb3d7f0ecf0ca8d0af7c4207b0442e3f6",
        "less-plugin-autoprefixer": "^2.1.0",
        "limax": "^2.0.0",
        "localforage": "^1.7.3",
        "lodash.clonedeep": "^4.5.0",
        "lodash.property": "^4.4.2",
        "lru-cache": "^5.1.1",
        "mailparser": "^2.4.3",
        "marked": "^0.6.1",
        "mem": "^6.1.0",
        "meteor-node-stubs": "^1.0.0",
        "mime-db": "^1.40.0",
        "mime-type": "^3.0.7",
        "mkdirp": "^0.5.1",
        "moment": "^2.22.2",
        "moment-timezone": "^0.5.27",
        "mongodb": "^3.5.6",
        "node-dogstatsd": "^0.0.7",
        "node-gcm": "0.14.4",
        "node-rsa": "^1.0.5",
        "object-path": "^0.11.4",
        "pdfjs-dist": "^2.0.943",
        "photoswipe": "^4.1.3",
        "poplib": "^0.1.7",
        "prom-client": "^12.0.0",
        "prometheus-gc-stats": "^0.6.2",
        "querystring": "^0.2.0",
        "queue-fifo": "^0.2.5",
        "react": "^16.13.1",
        "react-dom": "^16.8.6",
        "react-keyed-flatten-children": "^1.2.0",
        "react-window": "^1.8.5",
        "react-window-infinite-loader": "^1.0.5",
        "redis": "^2.8.0",
        "semver": "^5.6.0",
        "sharp": "^0.22.1",
        "speakeasy": "^2.0.0",
        "stream-buffers": "^3.0.2",
        "string-strip-html": "^4.3.12",
        "styled-components": "^4.4.0",
        "tar-stream": "^1.6.2",
        "toastr": "^2.1.4",
        "turndown": "^5.0.1",
        "twilio": "^3.40.0",
        "twit": "^2.2.11",
        "ua-parser-js": "^0.7.19",
        "underscore": "^1.9.1",
        "underscore.string": "^3.3.5",
        "url-polyfill": "^1.1.5",
        "use-subscription": "^1.4.1",
        "uuid": "^3.3.2",
        "webdav": "^2.10.0",
        "wolfy87-eventemitter": "^5.2.5",
        "xml-crypto": "^1.0.2",
        "xml-encryption": "0.11.2",
        "xml2js": "0.4.19",
        "xmldom": "^0.1.27",
        "yaqrcode": "^0.2.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Rocket.Chat"
    },
    "postMortem": {
      "stoppedDate": "2020-07-25",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "Rocket.Chat 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "Rocket.Chat Core Utility",
        "Rocket.Chat Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 46
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "sqlbot",
    "name": "SQLBot",
    "description": "AskSQL ???款基于大模型??RAG ?�智?�问?�系统。AskSQL ?�优?�包?�：",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-11-26",
    "lastActivityAt": "2025-11-26",
    "stack": [
      "Docker"
    ],
    "score": {
      "total": 76,
      "activity": 59,
      "potential": 93,
      "reuse": 77,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/SQLBot"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "seccheck",
    "name": "SecCheck",
    "description": "Rule Engine 자동 배정과 암호학적 해시 체인 감사로그를 지원하는 엔터프라이즈 오프라인 운영형 보안 검토 플랫폼입니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-14",
    "lastActivityAt": "2026-08-14",
    "stack": [
      "JavaScript",
      "Go",
      "Docker"
    ],
    "score": {
      "total": 86,
      "activity": 95,
      "potential": 73,
      "reuse": 89,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "JavaScript + Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/SecCheck"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "signalhub",
    "name": "SignalHub",
    "description": "AI / Agents 분야의 기술 동향을 자동 수집·요약하고 팀에 공유하는 Intelligence Hub.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "Python",
      "Docker"
    ],
    "score": {
      "total": 84,
      "activity": 96,
      "potential": 71,
      "reuse": 77,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Python + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/SignalHub"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "tadpoledbhub_apiserver",
    "name": "TadpoleDBHub_APIServer",
    "description": "- Tadpole DB Hub API Server는 Tadpole DB Hub( https://github.com/hangum/TadpoleForDBTools )의 서브 프로젝트 입니다.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-09-29",
    "lastActivityAt": "2020-09-29",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 58,
      "activity": 14,
      "potential": 74,
      "reuse": 81,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/TadpoleDBHub_APIServer"
    },
    "postMortem": {
      "stoppedDate": "2020-09-29",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "TadpoleDBHub_APIServer 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "TadpoleDBHub_APIServer Core Utility",
        "TadpoleDBHub_APIServer Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 52
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "vendra",
    "name": "Vendra",
    "description": "Supplier 360, 구매 수명주기, 동적 스코어카드, 포털 보안 격리 및 11+ Read-Only MCP 지원.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-12",
    "lastActivityAt": "2026-08-12",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 84,
      "activity": 95,
      "potential": 72,
      "reuse": 79,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/Vendra"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "vibeos",
    "name": "VibeOS",
    "description": "> **\"20개의 실패한 사이드 프로젝트는 20번의 실패가 아니라, 나만의 개인 개발 플랫폼 자산이 된다.\"**",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-16",
    "lastActivityAt": "2026-08-16",
    "stack": [
      "TypeScript",
      "React",
      "TailwindCSS",
      "Vite"
    ],
    "score": {
      "total": 92,
      "activity": 94,
      "potential": 92,
      "reuse": 96,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript + React + TailwindCSS + Vite Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "canvas-confetti": "^1.9.4",
        "clsx": "^2.1.1",
        "lucide-react": "^1.16.0",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "recharts": "^2.15.1",
        "tailwind-merge": "^3.0.2",
        "zustand": "^5.0.3"
      },
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/VibeOS"
    },
    "stars": 4,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "afterman",
    "name": "afterman",
    "description": "Convert postman collection in Markdown or HTML file",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-09-10",
    "lastActivityAt": "2020-09-10",
    "stack": [
      "TypeScript",
      "Docker"
    ],
    "score": {
      "total": 60,
      "activity": 22,
      "potential": 78,
      "reuse": 74,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@quasar/extras": "^1.0.0",
        "quasar": "^1.0.0",
        "turndown": "^6.0.0",
        "uniqid": "^5.2.0",
        "vue-i18n": "^8.0.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/afterman"
    },
    "postMortem": {
      "stoppedDate": "2020-09-10",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "afterman 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "afterman Core Utility",
        "afterman Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 59
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ai_chatbot",
    "name": "ai_chatbot",
    "description": "| 항목 | 설명 |",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-05-17",
    "lastActivityAt": "2025-05-17",
    "stack": [
      "Python",
      "Docker"
    ],
    "score": {
      "total": 77,
      "activity": 59,
      "potential": 93,
      "reuse": 76,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "Python + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ai_chatbot"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ai_code_improvement",
    "name": "ai_code_improvement",
    "description": "| 항목 | 설명 |",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-05-03",
    "lastActivityAt": "2025-05-03",
    "stack": [
      "Python",
      "Docker"
    ],
    "score": {
      "total": 79,
      "activity": 69,
      "potential": 94,
      "reuse": 72,
      "maintainability": 79
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "Python + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ai_code_improvement"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "aura",
    "name": "aura",
    "description": "Aura is a comprehensive Enterprise AI Portal designed to empower organizations with advanced AI capabilities while ensuring data security, governance,",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-25",
    "lastActivityAt": "2025-12-25",
    "stack": [
      "TypeScript",
      "React",
      "Next.js",
      "Docker"
    ],
    "score": {
      "total": 77,
      "activity": 61,
      "potential": 88,
      "reuse": 85,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + React + Next.js + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@ai-sdk/openai": "^2.0.88",
        "@ai-sdk/react": "^2.0.117",
        "@libsql/client": "^0.15.15",
        "@next-auth/prisma-adapter": "^1.0.7",
        "@prisma/adapter-libsql": "^7.2.0",
        "@prisma/client": "^7.2.0",
        "@radix-ui/react-switch": "^1.2.6",
        "@types/bcryptjs": "^2.4.6",
        "@types/pdf-parse": "^1.1.5",
        "@types/react-syntax-highlighter": "^15.5.13",
        "@types/uuid": "^10.0.0",
        "ai": "^5.0.115",
        "bcryptjs": "^3.0.3",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "lucide-react": "^0.562.0",
        "mammoth": "^1.11.0",
        "next": "^16.1.0",
        "next-auth": "^4.24.13",
        "next-intl": "^4.6.1",
        "next-themes": "^0.4.6",
        "pdf-parse": "^2.4.5",
        "prisma": "^7.2.0",
        "react": "^19.2.3",
        "react-dom": "^19.2.3",
        "react-markdown": "^10.1.0",
        "react-pdf": "^10.2.0",
        "react-syntax-highlighter": "^16.1.0",
        "rehype-raw": "^7.0.0",
        "remark-gfm": "^4.0.1",
        "swr": "^2.3.8",
        "uuid": "^13.0.0",
        "zod": "^4.2.1"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/aura"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "aws_dev_tadpole",
    "name": "aws_dev_tadpole",
    "description": "aws_dev_tadpole — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2019-12-15",
    "lastActivityAt": "2019-12-15",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 54,
      "activity": 11,
      "potential": 79,
      "reuse": 84,
      "maintainability": 66
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/aws_dev_tadpole"
    },
    "postMortem": {
      "stoppedDate": "2019-12-15",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "aws_dev_tadpole 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "aws_dev_tadpole Core Utility",
        "aws_dev_tadpole Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 48
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "aws_kf",
    "name": "aws_kf",
    "description": "aws_kf — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-01-19",
    "lastActivityAt": "2020-01-19",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 52,
      "activity": 20,
      "potential": 68,
      "reuse": 73,
      "maintainability": 67
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/aws_kf"
    },
    "postMortem": {
      "stoppedDate": "2020-01-19",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "aws_kf 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "aws_kf Core Utility",
        "aws_kf Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 45
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "aws_kuta",
    "name": "aws_kuta",
    "description": "aws_kuta — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2019-12-15",
    "lastActivityAt": "2019-12-15",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 58,
      "activity": 28,
      "potential": 69,
      "reuse": 77,
      "maintainability": 79
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/aws_kuta"
    },
    "postMortem": {
      "stoppedDate": "2019-12-15",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "aws_kuta 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "aws_kuta Core Utility",
        "aws_kuta Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 41
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "bank-crawling-engine",
    "name": "bank-crawling-engine",
    "description": "This service crawling the BCA's transaction and account balance Data.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-02-29",
    "lastActivityAt": "2020-02-29",
    "stack": [
      "Python"
    ],
    "score": {
      "total": 62,
      "activity": 26,
      "potential": 83,
      "reuse": 75,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "Python Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/bank-crawling-engine"
    },
    "postMortem": {
      "stoppedDate": "2020-02-29",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "bank-crawling-engine 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "bank-crawling-engine Core Utility",
        "bank-crawling-engine Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 27
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "bitbucket-code-suggestion-addon",
    "name": "bitbucket-code-suggestion-addon",
    "description": "AI 기반 코드 제안 플러그인으로, Pull Request에서 자동으로 코드 리뷰 및 개선 제안을 제공합니다.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-02-23",
    "lastActivityAt": "2026-02-23",
    "stack": [
      "TypeScript",
      "Java"
    ],
    "score": {
      "total": 79,
      "activity": 82,
      "potential": 68,
      "reuse": 76,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + Java Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/bitbucket-code-suggestion-addon"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "cdnjs",
    "name": "cdnjs",
    "description": "---",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-09-20",
    "lastActivityAt": "2020-09-20",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 55,
      "activity": 15,
      "potential": 76,
      "reuse": 72,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/cdnjs"
    },
    "postMortem": {
      "stoppedDate": "2020-09-20",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "cdnjs 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "cdnjs Core Utility",
        "cdnjs Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 32
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "chaca",
    "name": "chaca",
    "description": "This project contains a Forge app written in Javascript that displays `Hello World!` in a Confluence global page.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-02-05",
    "lastActivityAt": "2022-02-05",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 57,
      "activity": 27,
      "potential": 72,
      "reuse": 75,
      "maintainability": 70
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@forge/ui": "^0.16.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/chaca"
    },
    "postMortem": {
      "stoppedDate": "2022-02-05",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "chaca 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "chaca Core Utility",
        "chaca Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 47
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "chaca-market",
    "name": "chaca-market",
    "description": "- if doenst have connection cant request to backend or didnt do anything",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-12-18",
    "lastActivityAt": "2021-12-18",
    "stack": [
      "Java",
      "Flutter"
    ],
    "score": {
      "total": 56,
      "activity": 15,
      "potential": 73,
      "reuse": 78,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "Java + Flutter Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/chaca-market"
    },
    "postMortem": {
      "stoppedDate": "2021-12-18",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "chaca-market 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "chaca-market Core Utility",
        "chaca-market Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 25
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "claude_code_test",
    "name": "claude_code_test",
    "description": "claude_code_test — AI & engineering project by hkjang",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-09-28",
    "lastActivityAt": "2025-09-28",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 71,
      "activity": 60,
      "potential": 83,
      "reuse": 75,
      "maintainability": 66
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/claude_code_test"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "clubhouse-py",
    "name": "clubhouse-py",
    "description": "___FOR REFERENCE AND EDUCATION PURPOSES ONLY. THIS DOES NOT COME WITH ANY KINDS OF WARRANTY.___",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-02-16",
    "lastActivityAt": "2021-02-16",
    "stack": [
      "Python"
    ],
    "score": {
      "total": 61,
      "activity": 29,
      "potential": 78,
      "reuse": 74,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "Python Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/clubhouse-py"
    },
    "postMortem": {
      "stoppedDate": "2021-02-16",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "clubhouse-py 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "clubhouse-py Core Utility",
        "clubhouse-py Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 38
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "clustara",
    "name": "clustara",
    "description": "**Clustara**는 Kubernetes 운영을 위한 **장애 분석·변경 추적·보안·용량·비용 통합 운영 허브**입니다. `kubectl` 없이도 클러스터의 위험과 장애 원인 후보를 한 화면에서 확인하고, 변경 이력을 추적하며, 위험 작업을 승인 워크플로우로 안전하",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 86,
      "activity": 97,
      "potential": 74,
      "reuse": 81,
      "maintainability": 94
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/clustara"
    },
    "stars": 4,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "confluence-page-ai-generation-addon",
    "name": "confluence-page-ai-generation-addon",
    "description": "Confluence Server 7.2.1 P2 플러그인으로, vLLM(OpenAI Compatible API)을 활용하여 전문가 수준의 문서를 자동 생성합니다.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-02-27",
    "lastActivityAt": "2026-02-27",
    "stack": [
      "TypeScript",
      "Java"
    ],
    "score": {
      "total": 86,
      "activity": 84,
      "potential": 91,
      "reuse": 78,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + Java Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/confluence-page-ai-generation-addon"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "contty",
    "name": "contty",
    "description": "| 항목 | 설명 |",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-05-11",
    "lastActivityAt": "2025-05-11",
    "stack": [
      "Python",
      "Docker"
    ],
    "score": {
      "total": 75,
      "activity": 67,
      "potential": 77,
      "reuse": 77,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "Python + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/contty"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "czur",
    "name": "czur",
    "description": "czur — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-06-10",
    "lastActivityAt": "2020-06-10",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 55,
      "activity": 18,
      "potential": 80,
      "reuse": 75,
      "maintainability": 67
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/czur"
    },
    "postMortem": {
      "stoppedDate": "2020-06-10",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "czur 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "czur Core Utility",
        "czur Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 25
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "data",
    "name": "data",
    "description": "data — AI & engineering project by hkjang",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-01-05",
    "lastActivityAt": "2026-01-05",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 78,
      "activity": 83,
      "potential": 75,
      "reuse": 77,
      "maintainability": 76
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/data"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "dataworks",
    "name": "dataworks",
    "description": "**Data Works**는 내부 데이터 자산을 판매 가능한 데이터 상품, API 상품, 분석 리포트, PoC 제안 패키지로 전환하는 **Data Product Factory**입니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 85,
      "activity": 98,
      "potential": 71,
      "reuse": 84,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/dataworks"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "dialoqbase",
    "name": "dialoqbase",
    "description": "Create chatbots with ease",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-03-24",
    "lastActivityAt": "2024-03-24",
    "stack": [
      "JavaScript",
      "Docker"
    ],
    "score": {
      "total": 60,
      "activity": 19,
      "potential": 81,
      "reuse": 80,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "npm-run-all": "^4.1.5"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/dialoqbase"
    },
    "postMortem": {
      "stoppedDate": "2024-03-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "dialoqbase 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "dialoqbase Core Utility",
        "dialoqbase Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 49
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "dify",
    "name": "dify",
    "description": "📌 <a href=\"https://dify.ai/blog/introducing-dify-workflow-file-upload-a-demo-on-ai-podcast\">Introducing Dify Workflow File Upload: Recreate Google No",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-12-19",
    "lastActivityAt": "2024-12-19",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 56,
      "activity": 25,
      "potential": 68,
      "reuse": 72,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/dify"
    },
    "postMortem": {
      "stoppedDate": "2024-12-19",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "dify 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "dify Core Utility",
        "dify Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 34
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "dify-chatbot",
    "name": "dify-chatbot",
    "description": "dify-chatbot — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-12-18",
    "lastActivityAt": "2024-12-18",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 58,
      "activity": 23,
      "potential": 80,
      "reuse": 78,
      "maintainability": 66
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/dify-chatbot"
    },
    "postMortem": {
      "stoppedDate": "2024-12-18",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "dify-chatbot 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "dify-chatbot Core Utility",
        "dify-chatbot Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 47
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "dify-docs",
    "name": "dify-docs",
    "description": "This repository contains the documentation website code and Markdown source files for [docs.dify.ai](https://docs.dify.ai).",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-12-23",
    "lastActivityAt": "2024-12-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 57,
      "activity": 14,
      "potential": 74,
      "reuse": 80,
      "maintainability": 94
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/dify-docs"
    },
    "postMortem": {
      "stoppedDate": "2024-12-23",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "dify-docs 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "dify-docs Core Utility",
        "dify-docs Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 53
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "dify-docs1",
    "name": "dify-docs1",
    "description": "This repository contains the documentation website code and Markdown source files for [docs.dify.ai](https://docs.dify.ai).",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-12-23",
    "lastActivityAt": "2024-12-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 53,
      "activity": 12,
      "potential": 69,
      "reuse": 76,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/dify-docs1"
    },
    "postMortem": {
      "stoppedDate": "2024-12-23",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "dify-docs1 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "dify-docs1 Core Utility",
        "dify-docs1 Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 34
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "egene-decompiled",
    "name": "egene-decompiled",
    "description": "egene-decompiled — AI & engineering project by hkjang",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-23",
    "lastActivityAt": "2026-03-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 77,
      "activity": 80,
      "potential": 77,
      "reuse": 77,
      "maintainability": 67
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/egene-decompiled"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "egene52",
    "name": "egene52",
    "description": "egene52 — AI & engineering project by hkjang",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-23",
    "lastActivityAt": "2026-03-23",
    "stack": [
      "Docker"
    ],
    "score": {
      "total": 82,
      "activity": 88,
      "potential": 69,
      "reuse": 85,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/egene52"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "egene52------",
    "name": "egene52 - 복사본",
    "description": "egene52 - 복사본 — AI & engineering project by hkjang",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-23",
    "lastActivityAt": "2026-03-23",
    "stack": [
      "Docker"
    ],
    "score": {
      "total": 81,
      "activity": 82,
      "potential": 78,
      "reuse": 78,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/egene52 - 복사본"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "egene_db",
    "name": "egene_db",
    "description": "egene_db — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-03-10",
    "lastActivityAt": "2024-03-10",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 57,
      "activity": 21,
      "potential": 77,
      "reuse": 77,
      "maintainability": 75
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/egene_db"
    },
    "postMortem": {
      "stoppedDate": "2024-03-10",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "egene_db 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "egene_db Core Utility",
        "egene_db Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 27
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "eliza",
    "name": "eliza",
    "description": "📖 [Documentation](https://ai16z.github.io/eliza/) | 🎯 [Examples](https://github.com/thejoven/awesome-eliza)",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-12-19",
    "lastActivityAt": "2024-12-19",
    "stack": [
      "TypeScript",
      "Vite",
      "Docker"
    ],
    "score": {
      "total": 61,
      "activity": 15,
      "potential": 78,
      "reuse": 96,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + Vite + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@0glabs/0g-ts-sdk": "0.2.1",
        "@coinbase/coinbase-sdk": "0.10.0",
        "@deepgram/sdk": "^3.9.0",
        "@vitest/eslint-plugin": "1.0.1",
        "amqplib": "0.10.5",
        "csv-parse": "5.6.0",
        "ollama-ai-provider": "0.16.1",
        "optional": "0.1.4",
        "pnpm": "9.14.4",
        "sharp": "0.33.5",
        "tslog": "4.9.3"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/eliza"
    },
    "postMortem": {
      "stoppedDate": "2024-12-19",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "eliza 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "eliza Core Utility",
        "eliza Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 32
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "fineyflutter-native-cash-manager",
    "name": "fineyflutter-native-cash-manager",
    "description": "A new Flutter project.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-11-29",
    "lastActivityAt": "2020-11-29",
    "stack": [
      "Flutter"
    ],
    "score": {
      "total": 56,
      "activity": 20,
      "potential": 75,
      "reuse": 75,
      "maintainability": 75
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "Flutter Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/fineyflutter-native-cash-manager"
    },
    "postMortem": {
      "stoppedDate": "2020-11-29",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "fineyflutter-native-cash-manager 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "fineyflutter-native-cash-manager Core Utility",
        "fineyflutter-native-cash-manager Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 54
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "flutter-chacha",
    "name": "flutter-chacha",
    "description": "Install Android Studio and Flutter Framework https://flutter.dev/docs/get-started/web",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-10-26",
    "lastActivityAt": "2020-10-26",
    "stack": [
      "Flutter"
    ],
    "score": {
      "total": 58,
      "activity": 17,
      "potential": 76,
      "reuse": 81,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "Flutter Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/flutter-chacha"
    },
    "postMortem": {
      "stoppedDate": "2020-10-26",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "flutter-chacha 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "flutter-chacha Core Utility",
        "flutter-chacha Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 25
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "forge-wheel-of-fortune",
    "name": "forge-wheel-of-fortune",
    "description": "This is a simple example which generates a spinning wheel from the contents of a table on the page and selects a random row.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-02-06",
    "lastActivityAt": "2022-02-06",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 53,
      "activity": 10,
      "potential": 74,
      "reuse": 72,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@atlaskit/adf-utils": "^7.3.1",
        "@forge/api": "0.0.3",
        "@forge/ui": "^0.1.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/forge-wheel-of-fortune"
    },
    "postMortem": {
      "stoppedDate": "2022-02-06",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "forge-wheel-of-fortune 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "forge-wheel-of-fortune Core Utility",
        "forge-wheel-of-fortune Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 49
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "gen-mermaid",
    "name": "gen-mermaid",
    "description": "gen-mermaid — AI & engineering project by hkjang",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-03-23",
    "lastActivityAt": "2025-03-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 81,
      "activity": 70,
      "potential": 95,
      "reuse": 80,
      "maintainability": 78
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/gen-mermaid"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ghostfolio",
    "name": "ghostfolio",
    "description": "**Open Source Wealth Management Software**",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-11-27",
    "lastActivityAt": "2025-11-27",
    "stack": [
      "TypeScript",
      "NestJS",
      "Docker"
    ],
    "score": {
      "total": 75,
      "activity": 63,
      "potential": 70,
      "reuse": 88,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + NestJS + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@angular/animations": "20.2.4",
        "@angular/cdk": "20.2.2",
        "@angular/common": "20.2.4",
        "@angular/compiler": "20.2.4",
        "@angular/core": "20.2.4",
        "@angular/forms": "20.2.4",
        "@angular/material": "20.2.2",
        "@angular/platform-browser": "20.2.4",
        "@angular/platform-browser-dynamic": "20.2.4",
        "@angular/router": "20.2.4",
        "@angular/service-worker": "20.2.4",
        "@codewithdan/observable-store": "2.2.15",
        "@date-fns/utc": "2.1.0",
        "@dfinity/agent": "0.15.7",
        "@dfinity/auth-client": "0.15.7",
        "@dfinity/candid": "0.15.7",
        "@dfinity/identity": "0.15.7",
        "@dfinity/principal": "0.15.7",
        "@internationalized/number": "3.6.3",
        "@ionic/angular": "8.7.3",
        "@keyv/redis": "4.4.0",
        "@nestjs/bull": "11.0.2",
        "@nestjs/cache-manager": "3.0.1",
        "@nestjs/common": "11.1.3",
        "@nestjs/config": "4.0.2",
        "@nestjs/core": "11.1.3",
        "@nestjs/event-emitter": "3.0.1",
        "@nestjs/jwt": "11.0.0",
        "@nestjs/passport": "11.0.5",
        "@nestjs/platform-express": "11.1.3",
        "@nestjs/schedule": "6.0.0",
        "@nestjs/serve-static": "5.0.3",
        "@openrouter/ai-sdk-provider": "0.7.2",
        "@prisma/client": "6.18.0",
        "@simplewebauthn/browser": "13.1.0",
        "@simplewebauthn/server": "13.1.1",
        "@stripe/stripe-js": "7.9.0",
        "ai": "4.3.16",
        "alphavantage": "2.2.0",
        "big.js": "7.0.1",
        "bootstrap": "4.6.2",
        "bull": "4.16.5",
        "chart.js": "4.5.0",
        "chartjs-adapter-date-fns": "3.0.0",
        "chartjs-chart-treemap": "3.1.0",
        "chartjs-plugin-annotation": "3.1.0",
        "chartjs-plugin-datalabels": "2.2.0",
        "cheerio": "1.0.0",
        "class-transformer": "0.5.1",
        "class-validator": "0.14.2",
        "color": "5.0.0",
        "countries-and-timezones": "3.8.0",
        "countries-list": "3.1.1",
        "countup.js": "2.9.0",
        "date-fns": "4.1.0",
        "dotenv": "17.2.3",
        "dotenv-expand": "12.0.3",
        "envalid": "8.1.0",
        "exsolve": "^1.0.8",
        "fuse.js": "7.1.0",
        "google-spreadsheet": "3.2.0",
        "helmet": "7.0.0",
        "http-status-codes": "2.3.0",
        "ionicons": "8.0.13",
        "jsonpath": "1.1.1",
        "lodash": "4.17.21",
        "marked": "15.0.4",
        "ms": "3.0.0-canary.1",
        "ng-extract-i18n-merge": "3.0.0",
        "ngx-device-detector": "10.1.0",
        "ngx-markdown": "20.0.0",
        "ngx-skeleton-loader": "11.3.0",
        "ngx-stripe": "20.7.0",
        "open-color": "1.9.1",
        "papaparse": "5.3.1",
        "passport": "0.7.0",
        "passport-google-oauth20": "2.0.0",
        "passport-headerapikey": "1.2.2",
        "passport-jwt": "4.0.1",
        "reflect-metadata": "0.2.2",
        "rxjs": "7.8.1",
        "stripe": "18.5.0",
        "svgmap": "2.12.2",
        "tablemark": "4.1.0",
        "twitter-api-v2": "1.23.0",
        "uuid": "11.1.0",
        "yahoo-finance2": "3.10.0",
        "zone.js": "0.15.1"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ghostfolio"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "git-ctx",
    "name": "git-ctx",
    "description": "`git-ctx`는 사내 Bitbucket Server 6.9.1과 GitLab의 문서·코드 예제를 색인해",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 85,
      "activity": 98,
      "potential": 77,
      "reuse": 74,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/git-ctx"
    },
    "stars": 3,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "goalforge",
    "name": "goalforge",
    "description": "GoalForge is a goal-first development orchestrator. The Go process owns project",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 82,
      "activity": 94,
      "potential": 73,
      "reuse": 72,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/goalforge"
    },
    "stars": 3,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "google-maps-grouping-and-clustering-markers",
    "name": "google-maps-grouping-and-clustering-markers",
    "description": "- List View",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-07-30",
    "lastActivityAt": "2021-07-30",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 55,
      "activity": 17,
      "potential": 68,
      "reuse": 77,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/google-maps-grouping-and-clustering-markers"
    },
    "postMortem": {
      "stoppedDate": "2021-07-30",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "google-maps-grouping-and-clustering-markers 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "google-maps-grouping-and-clustering-markers Core Utility",
        "google-maps-grouping-and-clustering-markers Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 38
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "hkjang",
    "name": "hkjang",
    "description": "---",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 85,
      "activity": 95,
      "potential": 70,
      "reuse": 84,
      "maintainability": 94
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/hkjang"
    },
    "stars": 4,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "hkjang-github-io",
    "name": "hkjang.github.io",
    "description": "Live GitHub portfolio for **Hyeongkuk Jang (장형국, hkjang)**, focused on AI, cloud-native operations, data platforms, DevSecOps, and developer productiv",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 83,
      "activity": 92,
      "potential": 75,
      "reuse": 78,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/hkjang.github.io"
    },
    "stars": 4,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "html5_lucky_draw",
    "name": "html5_lucky_draw",
    "description": "html5_lucky_draw",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-24",
    "lastActivityAt": "2021-04-24",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 60,
      "activity": 22,
      "potential": 80,
      "reuse": 77,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/html5_lucky_draw"
    },
    "postMortem": {
      "stoppedDate": "2021-04-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "html5_lucky_draw 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "html5_lucky_draw Core Utility",
        "html5_lucky_draw Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 38
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "icube",
    "name": "icube",
    "description": "iCUBE 회계관리 시스템",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-05-16",
    "lastActivityAt": "2026-05-16",
    "stack": [
      "JavaScript",
      "Express"
    ],
    "score": {
      "total": 80,
      "activity": 86,
      "potential": 75,
      "reuse": 72,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "JavaScript + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "chart.js": "^4.5.1",
        "cors": "^2.8.6",
        "express": "^5.2.1",
        "mssql": "^12.2.1",
        "pdfkit": "^0.18.0"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/icube"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "intention",
    "name": "intention",
    "description": "intention — AI & engineering project by hkjang",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-05-17",
    "lastActivityAt": "2025-05-17",
    "stack": [
      "Python"
    ],
    "score": {
      "total": 71,
      "activity": 64,
      "potential": 77,
      "reuse": 75,
      "maintainability": 67
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "Python Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/intention"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "invenqor",
    "name": "invenqor",
    "description": "Invenqor는 Linux 자산 수집 Agent와 Go 기반 중앙 Server, React 관리 콘솔을",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-07-31",
    "lastActivityAt": "2026-07-31",
    "stack": [
      "TypeScript",
      "Docker"
    ],
    "score": {
      "total": 88,
      "activity": 98,
      "potential": 80,
      "reuse": 83,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/invenqor"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jadtrade",
    "name": "jaDTrade",
    "description": "jaDTrade is a decentralized trading platform built with a high-performance matching engine and integrated AI services.",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-13",
    "lastActivityAt": "2025-12-13",
    "stack": [
      "JavaScript",
      "Docker"
    ],
    "score": {
      "total": 72,
      "activity": 62,
      "potential": 78,
      "reuse": 74,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "JavaScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jaDTrade"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jagrow",
    "name": "jaGrow",
    "description": "Enterprise Growth Hacking Management Service",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-12",
    "lastActivityAt": "2025-12-12",
    "stack": [
      "TypeScript",
      "Docker"
    ],
    "score": {
      "total": 77,
      "activity": 64,
      "potential": 82,
      "reuse": 86,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@types/ioredis": "^5.0.0",
        "ioredis": "^5.8.2"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jaGrow"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jaterm",
    "name": "jaTerm",
    "description": "Web-based SSH Terminal Service with Access Control",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-14",
    "lastActivityAt": "2025-12-14",
    "stack": [
      "TypeScript",
      "React",
      "Next.js"
    ],
    "score": {
      "total": 83,
      "activity": 62,
      "potential": 96,
      "reuse": 94,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + React + Next.js Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@auth/prisma-adapter": "^2.0.0",
        "@prisma/client": "^5.7.0",
        "@xterm/addon-fit": "^0.10.0",
        "@xterm/addon-web-links": "^0.11.0",
        "@xterm/addon-webgl": "^0.18.0",
        "@xterm/xterm": "^5.4.0",
        "bcryptjs": "^2.4.3",
        "next": "14.0.4",
        "next-auth": "^5.0.0-beta.4",
        "otplib": "^12.0.1",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "ssh2": "^1.15.0",
        "uuid": "^9.0.0",
        "ws": "^8.14.2"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jaTerm"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jablog",
    "name": "jablog",
    "description": "Root package for Jablog project orchestration",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-09",
    "lastActivityAt": "2025-12-09",
    "stack": [
      "JavaScript",
      "Docker"
    ],
    "score": {
      "total": 74,
      "activity": 66,
      "potential": 72,
      "reuse": 84,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "JavaScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jablog"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jacal",
    "name": "jacal",
    "description": "Productivity Platform",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-11-28",
    "lastActivityAt": "2025-11-28",
    "stack": [
      "JavaScript",
      "Docker"
    ],
    "score": {
      "total": 73,
      "activity": 58,
      "potential": 78,
      "reuse": 84,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "JavaScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jacal"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jackpot_five",
    "name": "jackpot_five",
    "description": "Pure html5 slot machine game virtual cabinet (concept)",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-24",
    "lastActivityAt": "2021-04-24",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 55,
      "activity": 20,
      "potential": 68,
      "reuse": 73,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jackpot_five"
    },
    "postMortem": {
      "stoppedDate": "2021-04-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "jackpot_five 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "jackpot_five Core Utility",
        "jackpot_five Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 55
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jacode",
    "name": "jacode",
    "description": "AI-Powered Integrated Development Environment",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-01-13",
    "lastActivityAt": "2026-01-13",
    "stack": [
      "TypeScript",
      "Docker"
    ],
    "score": {
      "total": 78,
      "activity": 79,
      "potential": 73,
      "reuse": 74,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jacode"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jacodelens",
    "name": "jacodelens",
    "description": "This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-01-03",
    "lastActivityAt": "2026-01-03",
    "stack": [
      "TypeScript",
      "React",
      "Next.js",
      "TailwindCSS"
    ],
    "score": {
      "total": 87,
      "activity": 81,
      "potential": 93,
      "reuse": 89,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + React + Next.js + TailwindCSS Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@libsql/client": "^0.15.15",
        "@prisma/adapter-libsql": "^7.2.0",
        "@prisma/client": "^7.2.0",
        "clsx": "^2.1.1",
        "framer-motion": "^12.23.26",
        "ignore": "^7.0.5",
        "lucide-react": "^0.562.0",
        "next": "16.1.0",
        "next-intl": "^4.6.1",
        "openai": "^6.15.0",
        "react": "19.2.3",
        "react-dom": "19.2.3",
        "react-markdown": "^10.1.0",
        "react-window": "^2.2.3",
        "recharts": "^3.6.0",
        "tailwind-merge": "^3.4.0"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jacodelens"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jacon",
    "name": "jacon",
    "description": "Jacon is a mocked, high-fidelity simulation of an Enterprise-grade Kubernetes/GitOps management platform. It demonstrates advanced concepts like multi",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-01-29",
    "lastActivityAt": "2026-01-29",
    "stack": [
      "TypeScript",
      "React",
      "Next.js",
      "TailwindCSS"
    ],
    "score": {
      "total": 88,
      "activity": 82,
      "potential": 94,
      "reuse": 87,
      "maintainability": 92
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + React + Next.js + TailwindCSS Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "clsx": "^2.1.1",
        "next": "16.1.6",
        "react": "19.2.3",
        "react-dom": "19.2.3",
        "react-icons": "^5.5.0"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jacon"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jahr",
    "name": "jahr",
    "description": "This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-16",
    "lastActivityAt": "2025-12-16",
    "stack": [
      "TypeScript",
      "React",
      "Next.js",
      "TailwindCSS",
      "Docker"
    ],
    "score": {
      "total": 82,
      "activity": 71,
      "potential": 86,
      "reuse": 87,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + React + Next.js + TailwindCSS + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@prisma/adapter-pg": "^7.1.0",
        "@prisma/client": "^7.1.0",
        "@radix-ui/react-avatar": "^1.1.11",
        "@radix-ui/react-checkbox": "^1.3.3",
        "@radix-ui/react-dialog": "^1.1.15",
        "@radix-ui/react-dropdown-menu": "^2.1.16",
        "@radix-ui/react-label": "^2.1.8",
        "@radix-ui/react-navigation-menu": "^1.2.14",
        "@radix-ui/react-popover": "^1.1.15",
        "@radix-ui/react-scroll-area": "^1.2.10",
        "@radix-ui/react-select": "^2.2.6",
        "@radix-ui/react-separator": "^1.1.8",
        "@radix-ui/react-slot": "^1.2.4",
        "@radix-ui/react-switch": "^1.2.6",
        "@radix-ui/react-tabs": "^1.1.13",
        "@radix-ui/react-toast": "^1.2.15",
        "@radix-ui/react-tooltip": "^1.2.8",
        "@tanstack/react-query": "^5.90.12",
        "bcryptjs": "^3.0.3",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "date-fns": "^4.1.0",
        "lucide-react": "^0.561.0",
        "next": "16.0.10",
        "next-auth": "^5.0.0-beta.30",
        "pg": "^8.16.3",
        "prisma": "^7.1.0",
        "react": "19.2.1",
        "react-dom": "19.2.1",
        "recharts": "^3.6.0",
        "tailwind-merge": "^3.4.0",
        "zod": "^4.2.1",
        "zustand": "^5.0.9"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jahr"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jainsight",
    "name": "jainsight",
    "description": "✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-01-15",
    "lastActivityAt": "2026-01-15",
    "stack": [
      "TypeScript",
      "React",
      "Next.js",
      "TailwindCSS",
      "NestJS",
      "Docker"
    ],
    "score": {
      "total": 90,
      "activity": 89,
      "potential": 89,
      "reuse": 94,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + React + Next.js + TailwindCSS + NestJS + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@monaco-editor/react": "^4.7.0",
        "@nestjs/cache-manager": "^3.1.0",
        "@nestjs/common": "^11.0.0",
        "@nestjs/config": "^4.0.2",
        "@nestjs/core": "^11.0.0",
        "@nestjs/jwt": "^11.0.2",
        "@nestjs/mapped-types": "^2.1.0",
        "@nestjs/passport": "^11.0.5",
        "@nestjs/platform-express": "^11.0.0",
        "@nestjs/swagger": "^11.2.3",
        "@nestjs/throttler": "^6.5.0",
        "@nestjs/typeorm": "^11.0.0",
        "axios": "^1.6.0",
        "bcrypt": "^6.0.0",
        "better-sqlite3": "^12.5.0",
        "cache-manager": "^7.2.7",
        "class-transformer": "^0.5.1",
        "class-validator": "^0.14.3",
        "compression": "^1.8.1",
        "helmet": "^8.1.0",
        "monaco-editor": "^0.55.1",
        "mssql": "^12.2.0",
        "mysql2": "^3.16.0",
        "next": "~16.0.1",
        "openai": "^6.15.0",
        "passport": "^0.7.0",
        "passport-jwt": "^4.0.1",
        "pg": "^8.16.3",
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "recharts": "^3.6.0",
        "reflect-metadata": "^0.1.13",
        "rxjs": "^7.8.0",
        "sqlite3": "^5.1.7",
        "typeorm": "^0.3.28"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jainsight"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jalearn",
    "name": "jalearn",
    "description": "This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-19",
    "lastActivityAt": "2025-12-19",
    "stack": [
      "TypeScript",
      "React",
      "Next.js",
      "TailwindCSS"
    ],
    "score": {
      "total": 77,
      "activity": 58,
      "potential": 86,
      "reuse": 90,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + React + Next.js + TailwindCSS Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@auth/prisma-adapter": "^2.11.1",
        "@prisma/client": "^5.22.0",
        "@radix-ui/react-avatar": "^1.1.11",
        "@radix-ui/react-dialog": "^1.1.15",
        "@radix-ui/react-dropdown-menu": "^2.1.16",
        "@radix-ui/react-progress": "^1.1.8",
        "@radix-ui/react-select": "^2.2.6",
        "@radix-ui/react-tabs": "^1.1.13",
        "bcryptjs": "^3.0.3",
        "cheerio": "^1.1.2",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "date-fns": "^4.1.0",
        "lucide-react": "^0.562.0",
        "next": "16.1.0",
        "next-auth": "^4.24.13",
        "pdf-parse": "^2.4.5",
        "prisma": "^5.22.0",
        "react": "19.2.3",
        "react-dom": "19.2.3",
        "recharts": "^3.6.0",
        "tailwind-merge": "^3.4.0"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jalearn"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jamailstudio",
    "name": "jamailstudio",
    "description": "Enterprise-grade email collection, processing automation, and transactional email platform.",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-01",
    "lastActivityAt": "2025-12-01",
    "stack": [
      "TypeScript",
      "Docker"
    ],
    "score": {
      "total": 77,
      "activity": 63,
      "potential": 89,
      "reuse": 78,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jamailstudio"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jamypg",
    "name": "jamypg",
    "description": "Go-based MCP server for metadata-grounded NL2SQL over **PostgreSQL, MySQL, and",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-07-31",
    "lastActivityAt": "2026-07-31",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 84,
      "activity": 95,
      "potential": 70,
      "reuse": 80,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jamypg"
    },
    "stars": 3,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "japart",
    "name": "japart",
    "description": "> **\"복잡한 부동산 투자를 데이터와 AI로 명쾌하게.\"**",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-01-25",
    "lastActivityAt": "2026-01-25",
    "stack": [
      "TypeScript",
      "React",
      "Next.js",
      "TailwindCSS"
    ],
    "score": {
      "total": 92,
      "activity": 89,
      "potential": 91,
      "reuse": 95,
      "maintainability": 94
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + React + Next.js + TailwindCSS Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@prisma/client": "6.0.0",
        "@tailwindcss/typography": "^0.5.19",
        "bcrypt": "^6.0.0",
        "clsx": "^2.1.1",
        "clsx-merge": "^1.0.2",
        "framer-motion": "^12.29.0",
        "jose": "^6.1.3",
        "lucide-react": "^0.563.0",
        "next": "16.1.4",
        "react": "19.2.3",
        "react-dom": "19.2.3",
        "react-markdown": "^10.1.0",
        "swr": "^2.3.8"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/japart"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "japgadmin",
    "name": "japgadmin",
    "description": "PostgreSQL Integrated Management Tool",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-02-06",
    "lastActivityAt": "2026-02-06",
    "stack": [
      "JavaScript",
      "Docker"
    ],
    "score": {
      "total": 83,
      "activity": 86,
      "potential": 79,
      "reuse": 81,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "JavaScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/japgadmin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "japp",
    "name": "japp",
    "description": "Please refer to its documentation:   - [Getting Started](https://github.com/jqwidgets/japp/blob/master/README.md#getting-started)    - [jQWidgets Vue Documentation](http://www.jqwidgets.com/vue-components-documentation/)",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-05-30",
    "lastActivityAt": "2020-05-30",
    "stack": [
      "TypeScript",
      "Vue.js"
    ],
    "score": {
      "total": 52,
      "activity": 17,
      "potential": 69,
      "reuse": 75,
      "maintainability": 67
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + Vue.js Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "core-js": "^2.6.5",
        "jqwidgets-scripts": "^8.1.4",
        "vue": "^2.6.10"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/japp"
    },
    "postMortem": {
      "stoppedDate": "2020-05-30",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "japp 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "japp Core Utility",
        "japp Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 32
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jasca",
    "name": "jasca",
    "description": "Trivy Vulnerability Management System",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-01-07",
    "lastActivityAt": "2026-01-07",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 77,
      "activity": 78,
      "potential": 73,
      "reuse": 78,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jasca"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jasheets",
    "name": "jasheets",
    "description": "A Sheets-like web spreadsheet service",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-07-23",
    "lastActivityAt": "2026-07-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 85,
      "activity": 94,
      "potential": 70,
      "reuse": 86,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jasheets"
    },
    "stars": 3,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jask",
    "name": "jask",
    "description": "Natural Language to SQL Generation, Analysis, and Execution Service",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-02-22",
    "lastActivityAt": "2026-02-22",
    "stack": [
      "JavaScript",
      "Docker"
    ],
    "score": {
      "total": 77,
      "activity": 81,
      "potential": 70,
      "reuse": 72,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "JavaScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "puppeteer": "^24.36.0"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jask"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jdk-21",
    "name": "jdk-21",
    "description": "jdk-21 — AI & engineering project by hkjang",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-18",
    "lastActivityAt": "2025-12-18",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 73,
      "activity": 58,
      "potential": 81,
      "reuse": 86,
      "maintainability": 75
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jdk-21"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jeus",
    "name": "jeus",
    "description": "Javascript jeusadmin json API package, Support Node.js",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-18",
    "lastActivityAt": "2021-03-18",
    "stack": [
      "JavaScript"
    ],
    "score": {
      "total": 61,
      "activity": 20,
      "potential": 79,
      "reuse": 86,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.21.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jeus"
    },
    "postMortem": {
      "stoppedDate": "2021-03-18",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "jeus 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "jeus Core Utility",
        "jeus Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 33
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jqwidgets-ver13-2-0",
    "name": "jqwidgets-ver13.2.0",
    "description": "jqwidgets-ver13.2.0 — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-01",
    "lastActivityAt": "2022-04-01",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 51,
      "activity": 12,
      "potential": 70,
      "reuse": 75,
      "maintainability": 70
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jqwidgets-ver13.2.0"
    },
    "postMortem": {
      "stoppedDate": "2022-04-01",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "jqwidgets-ver13.2.0 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "jqwidgets-ver13.2.0 Core Utility",
        "jqwidgets-ver13.2.0 Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 41
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jqwidgets-ver14-0-0",
    "name": "jqwidgets-ver14.0.0",
    "description": "jqwidgets-ver14.0.0 — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2023-07-16",
    "lastActivityAt": "2023-07-16",
    "stack": [
      "JavaScript",
      "Express"
    ],
    "score": {
      "total": 54,
      "activity": 14,
      "potential": 78,
      "reuse": 74,
      "maintainability": 72
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "body-parser": "^1.20.2",
        "express": "^4.18.2"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jqwidgets-ver14.0.0"
    },
    "postMortem": {
      "stoppedDate": "2023-07-16",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "jqwidgets-ver14.0.0 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "jqwidgets-ver14.0.0 Core Utility",
        "jqwidgets-ver14.0.0 Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 40
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jqwidgets-ver9-1-4",
    "name": "jqwidgets-ver9.1.4",
    "description": "jqwidgets-ver9.1.4 — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-05-22",
    "lastActivityAt": "2020-05-22",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 60,
      "activity": 26,
      "potential": 79,
      "reuse": 78,
      "maintainability": 79
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jqwidgets-ver9.1.4"
    },
    "postMortem": {
      "stoppedDate": "2020-05-22",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "jqwidgets-ver9.1.4 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "jqwidgets-ver9.1.4 Core Utility",
        "jqwidgets-ver9.1.4 Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 43
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "jqwidgets_crud",
    "name": "jqwidgets_crud",
    "description": "Automated CRUD with jQWidgets and Node.js",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-11-26",
    "lastActivityAt": "2025-11-26",
    "stack": [
      "JavaScript",
      "Express"
    ],
    "score": {
      "total": 75,
      "activity": 65,
      "potential": 82,
      "reuse": 86,
      "maintainability": 71
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "JavaScript + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@prisma/client": "^6.19.0",
        "axios": "^1.13.2",
        "body-parser": "^1.20.2",
        "cors": "^2.8.5",
        "dotenv": "^17.2.3",
        "express": "^4.18.2",
        "express-session": "^1.18.2",
        "fs-extra": "^11.3.2",
        "multer": "^2.0.2",
        "prisma": "^6.19.0",
        "sqlite3": "^5.1.7",
        "vm2": "^3.10.0"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/jqwidgets_crud"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "json2chartfile",
    "name": "json2chartfile",
    "description": "```bash",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-09",
    "lastActivityAt": "2021-03-09",
    "stack": [
      "JavaScript",
      "Express"
    ],
    "score": {
      "total": 55,
      "activity": 17,
      "potential": 72,
      "reuse": 72,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "body-parser": "^1.19.0",
        "chart.js": "^2.4.0",
        "cookie-parser": "~1.4.4",
        "debug": "~2.6.9",
        "express": "~4.16.1",
        "google-trends-api": "^4.9.2",
        "http-errors": "~1.6.3",
        "jade": "~1.11.0",
        "morgan": "~1.9.1",
        "node-chartjs": "0.0.7",
        "opn": "^6.0.0",
        "request": "^2.88.2"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/json2chartfile"
    },
    "postMortem": {
      "stoppedDate": "2021-03-09",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "json2chartfile 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "json2chartfile Core Utility",
        "json2chartfile Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 44
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "kanpic",
    "name": "kanpic",
    "description": "kanpic은 온프레미스와 폐쇄망을 우선 지원하는 웹 기반 AI 스프레드시트 및 데이터 협업 플랫폼입니다. 초기 버전은 Go 모듈형 모놀리스, React Canvas 편집기, PostgreSQL 서버 권위 저장소로 구성되며 Redis 없이 실행됩니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-14",
    "lastActivityAt": "2026-08-14",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 83,
      "activity": 92,
      "potential": 72,
      "reuse": 77,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/kanpic"
    },
    "stars": 4,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "kanvas",
    "name": "kanvas",
    "description": "안전한 Confluence MySQL 마이그레이션과 원천 데이터 소유권을 단일 Docker 패키지로 제공합니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-09",
    "lastActivityAt": "2026-08-09",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 81,
      "activity": 92,
      "potential": 70,
      "reuse": 72,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/kanvas"
    },
    "stars": 3,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "langflower",
    "name": "langflower",
    "description": "Langflower is an operations console for Langflow-based environments.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-13",
    "lastActivityAt": "2026-03-13",
    "stack": [
      "Docker"
    ],
    "score": {
      "total": 86,
      "activity": 83,
      "potential": 94,
      "reuse": 83,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/langflower"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ln2sql",
    "name": "ln2sql",
    "description": "ln2sql — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-03-23",
    "lastActivityAt": "2020-03-23",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 62,
      "activity": 28,
      "potential": 87,
      "reuse": 72,
      "maintainability": 76
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ln2sql"
    },
    "postMortem": {
      "stoppedDate": "2020-03-23",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "ln2sql 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "ln2sql Core Utility",
        "ln2sql Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 47
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "lottery_numbers",
    "name": "lottery_numbers",
    "description": "Random lottery numbers picker (6 numbers - suitable for Romania's \"6/49\" game)",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-24",
    "lastActivityAt": "2021-04-24",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 58,
      "activity": 15,
      "potential": 73,
      "reuse": 84,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/lottery_numbers"
    },
    "postMortem": {
      "stoppedDate": "2021-04-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "lottery_numbers 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "lottery_numbers Core Utility",
        "lottery_numbers Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 26
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "luckysix-react-game",
    "name": "luckysix-react-game",
    "description": "Lucky balls 6/48 is a game in which player chooses 6 numbers out of 48 in total, where 35 balls are drawn in each game. When the six played numbers ar",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-24",
    "lastActivityAt": "2021-04-24",
    "stack": [
      "TypeScript",
      "React"
    ],
    "score": {
      "total": 61,
      "activity": 10,
      "potential": 93,
      "reuse": 86,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + React Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "mime": "^2.4.6",
        "react": "^16.13.1",
        "react-dom": "^16.13.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/luckysix-react-game"
    },
    "postMortem": {
      "stoppedDate": "2021-04-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "luckysix-react-game 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "luckysix-react-game Core Utility",
        "luckysix-react-game Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 54
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "masterkey",
    "name": "masterkey",
    "description": "This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-18",
    "lastActivityAt": "2025-12-18",
    "stack": [
      "TypeScript",
      "React",
      "Next.js",
      "TailwindCSS"
    ],
    "score": {
      "total": 77,
      "activity": 58,
      "potential": 89,
      "reuse": 87,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + React + Next.js + TailwindCSS Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@prisma/client": "^5.22.0",
        "bcryptjs": "^3.0.3",
        "clsx": "^2.1.1",
        "lucide-react": "^0.562.0",
        "next": "16.0.10",
        "next-auth": "^5.0.0-beta.30",
        "prisma": "^5.22.0",
        "react": "19.2.1",
        "react-dom": "19.2.1",
        "tailwind-merge": "^3.4.0"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/masterkey"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-botman-plugin",
    "name": "mattermost-botman-plugin",
    "description": "Mattermost bot 사용 통계를 수집하고 관리자 대시보드에서 운영 지표로 확인하는 플러그인입니다.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-25",
    "lastActivityAt": "2026-03-25",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 87,
      "activity": 81,
      "potential": 94,
      "reuse": 80,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-botman-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-chatdump-plugin",
    "name": "mattermost-chatdump-plugin",
    "description": "Mattermost plugin for exporting recent chat history on demand.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-24",
    "lastActivityAt": "2026-03-24",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 86,
      "activity": 83,
      "potential": 92,
      "reuse": 77,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-chatdump-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-echosummary-plugin",
    "name": "mattermost-echosummary-plugin",
    "description": "Mattermost Echo Summary is a server + webapp plugin that finds the conversations each user participated in yesterday, expands thread and nearby contex",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-29",
    "lastActivityAt": "2026-03-29",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 88,
      "activity": 87,
      "potential": 96,
      "reuse": 72,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-echosummary-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-flow-plugin",
    "name": "mattermost-flow-plugin",
    "description": "Mattermost Flow Plugin brings kanban boards and gantt timelines into Mattermost so teams can plan, track, and finish work without leaving channel cont",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-30",
    "lastActivityAt": "2026-03-30",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 87,
      "activity": 83,
      "potential": 96,
      "reuse": 78,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-flow-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-langflow-plugin",
    "name": "mattermost-langflow-plugin",
    "description": "Mattermost channels, threads, and DMs can trigger Langflow flows through dedicated Mattermost bots. Each configured bot maps to exactly one Langflow f",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-29",
    "lastActivityAt": "2026-03-29",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 83,
      "activity": 82,
      "potential": 89,
      "reuse": 72,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-langflow-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-myagents-plugin",
    "name": "mattermost-myagents-plugin",
    "description": "Mattermost users can talk to their personal opencode agent through the `@myagents` bot.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-05-13",
    "lastActivityAt": "2026-05-13",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 87,
      "activity": 85,
      "potential": 93,
      "reuse": 78,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-myagents-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-ocs-plugin",
    "name": "mattermost-ocs-plugin",
    "description": "Mattermost channels, threads, and DMs can trigger OpenCode sessions through dedicated Mattermost bots. Each configured bot can define its own default ",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-29",
    "lastActivityAt": "2026-03-29",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 82,
      "activity": 87,
      "potential": 91,
      "reuse": 72,
      "maintainability": 68
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-ocs-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-onboarding-plugin",
    "name": "mattermost-onboarding-plugin",
    "description": "This repository now contains a Mattermost onboarding plugin foundation that automatically sends a direct message to newly created users. The current i",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-27",
    "lastActivityAt": "2026-03-27",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 83,
      "activity": 79,
      "potential": 86,
      "reuse": 83,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-onboarding-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-paw-plugin",
    "name": "mattermost-paw-plugin",
    "description": "Mattermost users can talk to their personal QwenPaw agent through the `@paw` bot.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-05-13",
    "lastActivityAt": "2026-05-13",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 85,
      "activity": 84,
      "potential": 87,
      "reuse": 78,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-paw-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-playwright-plugin",
    "name": "mattermost-playwright-plugin",
    "description": "Mattermost 안에서 `playwright-player`를 실행하고 상태를 추적하며 결과를 공유할 수 있게 해주는 Mattermost 플러그인입니다.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-04-02",
    "lastActivityAt": "2026-04-02",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 87,
      "activity": 86,
      "potential": 90,
      "reuse": 80,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-playwright-plugin"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mattermost-plugin-ai",
    "name": "mattermost-plugin-ai",
    "description": "> Mattermost plugin for local and third-party LLMs",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-12-01",
    "lastActivityAt": "2024-12-01",
    "stack": [
      "Go"
    ],
    "score": {
      "total": 63,
      "activity": 14,
      "potential": 95,
      "reuse": 81,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "Go Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mattermost-plugin-ai"
    },
    "postMortem": {
      "stoppedDate": "2024-12-01",
      "failedReason": "Mattermost v7/v8 메이저 업그레이드로 인한 인터페이스 마이그레이션",
      "detailedAnalysis": "mattermost-plugin-ai 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "mattermost-plugin-ai Core Utility",
        "mattermost-plugin-ai Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 34
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "mbtitest",
    "name": "mbtiTest",
    "description": "```",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-08-26",
    "lastActivityAt": "2022-08-26",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 52,
      "activity": 10,
      "potential": 69,
      "reuse": 75,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/mbtiTest"
    },
    "postMortem": {
      "stoppedDate": "2022-08-26",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "mbtiTest 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "mbtiTest Core Utility",
        "mbtiTest Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 50
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "naverapi",
    "name": "naverapi",
    "description": "https://developers.naver.com/docs/cafe/api/",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-09",
    "lastActivityAt": "2021-03-09",
    "stack": [
      "JavaScript",
      "Express"
    ],
    "score": {
      "total": 57,
      "activity": 10,
      "potential": 79,
      "reuse": 83,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "cookie-parser": "~1.4.4",
        "debug": "~2.6.9",
        "express": "~4.16.1",
        "http-errors": "~1.6.3",
        "morgan": "~1.9.1",
        "pug": "2.0.0-beta11",
        "request": "^2.88.2"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/naverapi"
    },
    "postMortem": {
      "stoppedDate": "2021-03-09",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "naverapi 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "naverapi Core Utility",
        "naverapi Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 32
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "nexabuilder",
    "name": "nexabuilder",
    "description": "> Spring Boot 기반의 메타데이터-주도 노코드 / 로우코드 플랫폼.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-07-12",
    "lastActivityAt": "2026-07-12",
    "stack": [
      "TypeScript",
      "Docker"
    ],
    "score": {
      "total": 85,
      "activity": 93,
      "potential": 73,
      "reuse": 83,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/nexabuilder"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-open-mining-portal",
    "name": "node-open-mining-portal",
    "description": "An extremely efficient, highly scalable, all-in-one, easy to setup cryptocurrency mining pool",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-27",
    "lastActivityAt": "2021-04-27",
    "stack": [
      "JavaScript",
      "Express"
    ],
    "score": {
      "total": 60,
      "activity": 27,
      "potential": 72,
      "reuse": 81,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "stratum-pool": "git://github.com/zone117x/node-stratum-pool.git",
        "dateformat": "1.0.12",
        "node-json-minify": "*",
        "redis": "0.12.1",
        "mysql": "*",
        "async": "1.5.2",
        "express": "*",
        "body-parser": "*",
        "compression": "*",
        "dot": "*",
        "colors": "*",
        "node-watch": "0.5.9",
        "request": "2.69.0",
        "nonce": "*",
        "bignum": "0.13.1",
        "extend": "*"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-open-mining-portal"
    },
    "postMortem": {
      "stoppedDate": "2021-04-27",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "node-open-mining-portal 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-open-mining-portal Core Utility",
        "node-open-mining-portal Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 31
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red",
    "name": "node-red",
    "description": "Low-code programming for event-driven applications",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Express"
    ],
    "score": {
      "total": 58,
      "activity": 16,
      "potential": 80,
      "reuse": 72,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "ajv": "6.12.6",
        "async-mutex": "0.2.6",
        "basic-auth": "2.0.1",
        "bcryptjs": "2.4.3",
        "body-parser": "1.19.0",
        "cheerio": "0.22.0",
        "clone": "2.1.2",
        "content-type": "1.0.4",
        "cookie": "0.4.1",
        "cookie-parser": "1.4.5",
        "cors": "2.8.5",
        "cron": "1.7.2",
        "denque": "1.5.0",
        "express": "4.17.1",
        "express-session": "1.17.1",
        "fs-extra": "8.1.0",
        "fs.notify": "0.0.4",
        "hash-sum": "2.0.0",
        "https-proxy-agent": "5.0.0",
        "i18next": "15.1.2",
        "iconv-lite": "0.6.2",
        "is-utf8": "0.2.1",
        "js-yaml": "3.14.0",
        "json-stringify-safe": "5.0.1",
        "jsonata": "1.8.4",
        "lodash.clonedeep": "^4.5.0",
        "media-typer": "1.1.0",
        "memorystore": "1.6.4",
        "mime": "2.4.7",
        "moment-timezone": "0.5.32",
        "mqtt": "4.2.6",
        "multer": "1.4.2",
        "mustache": "4.1.0",
        "node-red-admin": "^0.2.6",
        "node-red-node-rbe": "^0.2.9",
        "node-red-node-sentiment": "^0.1.6",
        "node-red-node-tail": "^0.1.0",
        "nopt": "5.0.0",
        "oauth2orize": "1.11.0",
        "on-headers": "1.0.2",
        "passport": "0.4.1",
        "passport-http-bearer": "1.0.1",
        "passport-oauth2-client-password": "0.1.2",
        "raw-body": "2.4.1",
        "request": "2.88.0",
        "semver": "6.3.0",
        "tar": "6.0.5",
        "uglify-js": "3.12.4",
        "when": "3.7.8",
        "ws": "6.2.1",
        "xml2js": "0.4.23"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "node-red 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red Core Utility",
        "node-red Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 42
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-bitbucket",
    "name": "node-red-contrib-bitbucket",
    "description": "Node-RED node for bitbucket",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 61,
      "activity": 18,
      "potential": 83,
      "reuse": 79,
      "maintainability": 92
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "bitbucket": "^2.5.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-bitbucket"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-bitbucket 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-bitbucket Core Utility",
        "node-red-contrib-bitbucket Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 44
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-codef",
    "name": "node-red-contrib-codef",
    "description": "A node-red module to call codef api",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-12-06",
    "lastActivityAt": "2020-12-06",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 56,
      "activity": 12,
      "potential": 75,
      "reuse": 84,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "ini": "^1.3.5",
        "easycodef-node": "^1.0.2"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-codef"
    },
    "postMortem": {
      "stoppedDate": "2020-12-06",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-codef 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-codef Core Utility",
        "node-red-contrib-codef Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 42
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-contribgen",
    "name": "node-red-contrib-contribgen",
    "description": "make node for node-red",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 60,
      "activity": 27,
      "potential": 74,
      "reuse": 77,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "csv-string": "^4.0.1",
        "javascript-obfuscator": "^2.11.0",
        "jimp": "^0.16.1",
        "js-string-escape": "^1.0.1",
        "mustache": "^4.1.0",
        "when": "^3.7.8"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-contribgen"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-contribgen 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-contribgen Core Utility",
        "node-red-contrib-contribgen Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 56
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-danawa",
    "name": "node-red-contrib-danawa",
    "description": "Node-RED node for danawa",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-26",
    "lastActivityAt": "2021-03-26",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 63,
      "activity": 26,
      "potential": 78,
      "reuse": 80,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-danawa"
    },
    "postMortem": {
      "stoppedDate": "2021-03-26",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-danawa 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-danawa Core Utility",
        "node-red-contrib-danawa Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 38
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-ethermine",
    "name": "node-red-contrib-ethermine",
    "description": "Node-RED node for Ethermine API",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-06",
    "lastActivityAt": "2021-04-06",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 61,
      "activity": 25,
      "potential": 83,
      "reuse": 74,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.21.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-ethermine"
    },
    "postMortem": {
      "stoppedDate": "2021-04-06",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-ethermine 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-ethermine Core Utility",
        "node-red-contrib-ethermine Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 52
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-financialmodelingprep",
    "name": "node-red-contrib-financialmodelingprep",
    "description": "Node-RED node for financialmodelingprep",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 61,
      "activity": 20,
      "potential": 82,
      "reuse": 82,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.21.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-financialmodelingprep"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-financialmodelingprep 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-financialmodelingprep Core Utility",
        "node-red-contrib-financialmodelingprep Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 47
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-fluttergenerator",
    "name": "node-red-contrib-fluttergenerator",
    "description": "A node-red module to generate flutter source",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-11-30",
    "lastActivityAt": "2020-11-30",
    "stack": [
      "TypeScript",
      "Node-RED"
    ],
    "score": {
      "total": 58,
      "activity": 23,
      "potential": 68,
      "reuse": 83,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "flutter-generator": "^1.0.3"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-fluttergenerator"
    },
    "postMortem": {
      "stoppedDate": "2020-11-30",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-fluttergenerator 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-fluttergenerator Core Utility",
        "node-red-contrib-fluttergenerator Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 56
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-gitlabapi",
    "name": "node-red-contrib-gitlabapi",
    "description": "Node-RED node for gitlabapi",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-29",
    "lastActivityAt": "2022-04-29",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 56,
      "activity": 13,
      "potential": 75,
      "reuse": 72,
      "maintainability": 94
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.26.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-gitlabapi"
    },
    "postMortem": {
      "stoppedDate": "2022-04-29",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-gitlabapi 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-gitlabapi Core Utility",
        "node-red-contrib-gitlabapi Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 32
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-google-sheets",
    "name": "node-red-contrib-google-sheets",
    "description": "nodered node to get, update, append, and clear google sheets.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-11-20",
    "lastActivityAt": "2020-11-20",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 58,
      "activity": 11,
      "potential": 77,
      "reuse": 86,
      "maintainability": 92
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "googleapis": "^46.0.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-google-sheets"
    },
    "postMortem": {
      "stoppedDate": "2020-11-20",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-google-sheets 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-google-sheets Core Utility",
        "node-red-contrib-google-sheets Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 56
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-googlenews",
    "name": "node-red-contrib-googlenews",
    "description": "serve google news to json",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-09",
    "lastActivityAt": "2021-03-09",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 56,
      "activity": 11,
      "potential": 79,
      "reuse": 72,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "google-news-json": "^2.0.4"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-googlenews"
    },
    "postMortem": {
      "stoppedDate": "2021-03-09",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-googlenews 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-googlenews Core Utility",
        "node-red-contrib-googlenews Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 53
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-jeus",
    "name": "node-red-contrib-jeus",
    "description": "Node-RED node for jeus",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 56,
      "activity": 22,
      "potential": 69,
      "reuse": 75,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "jeus": "^1.0.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-jeus"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-jeus 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-jeus Core Utility",
        "node-red-contrib-jeus Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 48
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-jsdiff",
    "name": "node-red-contrib-jsdiff",
    "description": "compare old and new string or array or json or etc",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-13",
    "lastActivityAt": "2021-03-13",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 56,
      "activity": 23,
      "potential": 68,
      "reuse": 75,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "diff": "^5.0.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-jsdiff"
    },
    "postMortem": {
      "stoppedDate": "2021-03-13",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-jsdiff 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-jsdiff Core Utility",
        "node-red-contrib-jsdiff Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 40
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-json2md",
    "name": "node-red-contrib-json2md",
    "description": "Parse json to markdown",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-08-29",
    "lastActivityAt": "2020-08-29",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 56,
      "activity": 17,
      "potential": 70,
      "reuse": 79,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "json2md": "1.7.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-json2md"
    },
    "postMortem": {
      "stoppedDate": "2020-08-29",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-json2md 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-json2md Core Utility",
        "node-red-contrib-json2md Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 58
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-kakao-bizmessage-toast",
    "name": "node-red-contrib-kakao-bizmessage-toast",
    "description": "Node-RED node for kakao-bizmessage-toast",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 59,
      "activity": 22,
      "potential": 77,
      "reuse": 77,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "kakao-bizmessage-toast": "^1.1.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-kakao-bizmessage-toast"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-kakao-bizmessage-toast 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-kakao-bizmessage-toast Core Utility",
        "node-red-contrib-kakao-bizmessage-toast Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 46
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-kokoanlp",
    "name": "node-red-contrib-kokoanlp",
    "description": "sentence to words",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-09-29",
    "lastActivityAt": "2020-09-29",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 59,
      "activity": 23,
      "potential": 77,
      "reuse": 72,
      "maintainability": 92
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "kokoanlp": "0.1.0",
        "hanguler": "^0.1.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-kokoanlp"
    },
    "postMortem": {
      "stoppedDate": "2020-09-29",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-kokoanlp 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-kokoanlp Core Utility",
        "node-red-contrib-kokoanlp Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 32
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-korbit",
    "name": "node-red-contrib-korbit",
    "description": "Node-RED node for korbit",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-04-09",
    "lastActivityAt": "2021-04-09",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 61,
      "activity": 25,
      "potential": 70,
      "reuse": 83,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.21.1",
        "querystring": "^0.2.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-korbit"
    },
    "postMortem": {
      "stoppedDate": "2021-04-09",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-korbit 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-korbit Core Utility",
        "node-red-contrib-korbit Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 55
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-naverencyclopedia",
    "name": "node-red-contrib-naverencyclopedia",
    "description": "Node-RED node for naverencyclopedia",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-05",
    "lastActivityAt": "2022-04-05",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 63,
      "activity": 24,
      "potential": 77,
      "reuse": 85,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.21.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-naverencyclopedia"
    },
    "postMortem": {
      "stoppedDate": "2022-04-05",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-naverencyclopedia 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-naverencyclopedia Core Utility",
        "node-red-contrib-naverencyclopedia Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 49
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-navernews",
    "name": "node-red-contrib-navernews",
    "description": "Node-RED node for navernews",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-05",
    "lastActivityAt": "2022-04-05",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 57,
      "activity": 23,
      "potential": 68,
      "reuse": 76,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.21.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-navernews"
    },
    "postMortem": {
      "stoppedDate": "2022-04-05",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-navernews 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-navernews Core Utility",
        "node-red-contrib-navernews Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 36
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-naversearch",
    "name": "node-red-contrib-naversearch",
    "description": "Node-RED node for naversearch",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-06",
    "lastActivityAt": "2022-04-06",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 60,
      "activity": 22,
      "potential": 75,
      "reuse": 82,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.26.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-naversearch"
    },
    "postMortem": {
      "stoppedDate": "2022-04-06",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-naversearch 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-naversearch Core Utility",
        "node-red-contrib-naversearch Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 43
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-newsapi",
    "name": "node-red-contrib-newsapi",
    "description": "Node-RED node for newsapi",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 61,
      "activity": 26,
      "potential": 70,
      "reuse": 83,
      "maintainability": 92
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "newsapi": "^2.4.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-newsapi"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-newsapi 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-newsapi Core Utility",
        "node-red-contrib-newsapi Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 50
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-nodegen",
    "name": "node-red-contrib-nodegen",
    "description": "make function node for node-red",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-14",
    "lastActivityAt": "2021-03-14",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 59,
      "activity": 23,
      "potential": 76,
      "reuse": 72,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "csv-string": "^4.0.1",
        "javascript-obfuscator": "^2.11.0",
        "jimp": "^0.16.1",
        "js-string-escape": "^1.0.1",
        "mustache": "^4.1.0",
        "when": "^3.7.8"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-nodegen"
    },
    "postMortem": {
      "stoppedDate": "2021-03-14",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-nodegen 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-nodegen Core Utility",
        "node-red-contrib-nodegen Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 51
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-npmapi",
    "name": "node-red-contrib-npmapi",
    "description": "Node-RED node for npmapi",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 58,
      "activity": 16,
      "potential": 79,
      "reuse": 75,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "mocha": "^8.3.2",
        "node-red": "^1.2.9",
        "node-red-node-test-helper": "^0.2.7",
        "npm-api": "^1.0.1",
        "should": "^13.2.3"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-npmapi"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-npmapi 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-npmapi Core Utility",
        "node-red-contrib-npmapi Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 55
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-openai",
    "name": "node-red-contrib-openai",
    "description": "Node-RED node for openai",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-03-26",
    "lastActivityAt": "2024-03-26",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 60,
      "activity": 13,
      "potential": 90,
      "reuse": 82,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^1.6.8"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-openai"
    },
    "postMortem": {
      "stoppedDate": "2024-03-26",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-openai 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-openai Core Utility",
        "node-red-contrib-openai Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 29
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-opendart",
    "name": "node-red-contrib-opendart",
    "description": "Node-RED node for opendart",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 62,
      "activity": 25,
      "potential": 75,
      "reuse": 85,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "opendart": "^1.0.2"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-opendart"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-opendart 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-opendart Core Utility",
        "node-red-contrib-opendart Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 34
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-pdfparse",
    "name": "node-red-contrib-pdfparse",
    "description": "Node-RED node for pdfparse",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-04-30",
    "lastActivityAt": "2024-04-30",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 60,
      "activity": 18,
      "potential": 79,
      "reuse": 83,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "pdf-parse": "^1.1.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-pdfparse"
    },
    "postMortem": {
      "stoppedDate": "2024-04-30",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-pdfparse 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-pdfparse Core Utility",
        "node-red-contrib-pdfparse Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 47
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-postman",
    "name": "node-red-contrib-postman",
    "description": "Payload to Postman Collection JSON",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-09-09",
    "lastActivityAt": "2020-09-09",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 55,
      "activity": 15,
      "potential": 73,
      "reuse": 72,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "postman-collection": "^3.6.6"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-postman"
    },
    "postMortem": {
      "stoppedDate": "2020-09-09",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-postman 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-postman Core Utility",
        "node-red-contrib-postman Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 34
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-postman-codegen",
    "name": "node-red-contrib-postman-codegen",
    "description": "postman code generator",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-13",
    "lastActivityAt": "2021-03-13",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 64,
      "activity": 28,
      "potential": 83,
      "reuse": 82,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "postman-code-generators": "^1.1.3",
        "postman-collection": "^3.6.9"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-postman-codegen"
    },
    "postMortem": {
      "stoppedDate": "2021-03-13",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-postman-codegen 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-postman-codegen Core Utility",
        "node-red-contrib-postman-codegen Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 39
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-redash",
    "name": "node-red-contrib-redash",
    "description": "A node-red module to get to your redash server",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-08-29",
    "lastActivityAt": "2020-08-29",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 57,
      "activity": 11,
      "potential": 78,
      "reuse": 80,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "request": "^2.51.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-redash"
    },
    "postMortem": {
      "stoppedDate": "2020-08-29",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-redash 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-redash Core Utility",
        "node-red-contrib-redash Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 25
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-sk11st",
    "name": "node-red-contrib-sk11st",
    "description": "Node-RED node for sk11st",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-26",
    "lastActivityAt": "2021-03-26",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 60,
      "activity": 20,
      "potential": 77,
      "reuse": 80,
      "maintainability": 94
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "sk11st": "^1.0.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-sk11st"
    },
    "postMortem": {
      "stoppedDate": "2021-03-26",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-sk11st 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-sk11st Core Utility",
        "node-red-contrib-sk11st Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 42
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-sqlparser",
    "name": "node-red-contrib-sqlparser",
    "description": "Parse SQL to JSON",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-08-27",
    "lastActivityAt": "2020-08-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 65,
      "activity": 20,
      "potential": 96,
      "reuse": 79,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "node-sql-parser": "^3.0.4"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-sqlparser"
    },
    "postMortem": {
      "stoppedDate": "2020-08-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-sqlparser 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-sqlparser Core Utility",
        "node-red-contrib-sqlparser Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 30
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-strapi",
    "name": "node-red-contrib-strapi",
    "description": "A node-red module to get to your strapi server",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-08-11",
    "lastActivityAt": "2020-08-11",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 61,
      "activity": 25,
      "potential": 76,
      "reuse": 85,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "request": "^2.51.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-strapi"
    },
    "postMortem": {
      "stoppedDate": "2020-08-11",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-strapi 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-strapi Core Utility",
        "node-red-contrib-strapi Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 34
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-tabletojson",
    "name": "node-red-contrib-tabletojson",
    "description": "Node-RED node for tabletojson",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-02-08",
    "lastActivityAt": "2022-02-08",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 60,
      "activity": 12,
      "potential": 83,
      "reuse": 82,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "tabletojson": "^2.0.7"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-tabletojson"
    },
    "postMortem": {
      "stoppedDate": "2022-02-08",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-tabletojson 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-tabletojson Core Utility",
        "node-red-contrib-tabletojson Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 41
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-tabletojson2",
    "name": "node-red-contrib-tabletojson2",
    "description": "Node-RED node for tabletojson2",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-02-08",
    "lastActivityAt": "2022-02-08",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 57,
      "activity": 20,
      "potential": 82,
      "reuse": 76,
      "maintainability": 67
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "tabletojson": "^2.0.7"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-tabletojson2"
    },
    "postMortem": {
      "stoppedDate": "2022-02-08",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-tabletojson2 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-tabletojson2 Core Utility",
        "node-red-contrib-tabletojson2 Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 25
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-tadpoledbhub",
    "name": "node-red-contrib-tadpoledbhub",
    "description": "A node-red module to get to your tadpoledbhub server",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-08-05",
    "lastActivityAt": "2020-08-05",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 58,
      "activity": 11,
      "potential": 81,
      "reuse": 83,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "request": "^2.51.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-tadpoledbhub"
    },
    "postMortem": {
      "stoppedDate": "2020-08-05",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-tadpoledbhub 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-tadpoledbhub Core Utility",
        "node-red-contrib-tadpoledbhub Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 32
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-tistory",
    "name": "node-red-contrib-tistory",
    "description": "Node-RED node for tistory",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-27",
    "lastActivityAt": "2021-03-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 56,
      "activity": 20,
      "potential": 68,
      "reuse": 77,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "tistory": "^2.2.2"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-tistory"
    },
    "postMortem": {
      "stoppedDate": "2021-03-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-tistory 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-tistory Core Utility",
        "node-red-contrib-tistory Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 33
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-toonify",
    "name": "node-red-contrib-toonify",
    "description": "Node-RED node for toonify",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-10-27",
    "lastActivityAt": "2021-10-27",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 53,
      "activity": 15,
      "potential": 72,
      "reuse": 77,
      "maintainability": 71
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "toonify": "^1.0.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-toonify"
    },
    "postMortem": {
      "stoppedDate": "2021-10-27",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-toonify 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-toonify Core Utility",
        "node-red-contrib-toonify Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 40
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-turndown",
    "name": "node-red-contrib-turndown",
    "description": "Parse HTML to markdown",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-08-29",
    "lastActivityAt": "2020-08-29",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 58,
      "activity": 24,
      "potential": 71,
      "reuse": 72,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "turndown": "5.0.3"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-turndown"
    },
    "postMortem": {
      "stoppedDate": "2020-08-29",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-turndown 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-turndown Core Utility",
        "node-red-contrib-turndown Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 29
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-xml2json",
    "name": "node-red-contrib-xml2json",
    "description": "Parse xml to json",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-01-13",
    "lastActivityAt": "2021-01-13",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 58,
      "activity": 13,
      "potential": 74,
      "reuse": 85,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "xml2json": "0.12.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-xml2json"
    },
    "postMortem": {
      "stoppedDate": "2021-01-13",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-xml2json 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-xml2json Core Utility",
        "node-red-contrib-xml2json Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 29
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-xmysql",
    "name": "node-red-contrib-xmysql",
    "description": "A node-red module to get to your xmysql server",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-08-29",
    "lastActivityAt": "2020-08-29",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 61,
      "activity": 19,
      "potential": 90,
      "reuse": 72,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "querystring": "^0.2.0",
        "request": "^2.51.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-xmysql"
    },
    "postMortem": {
      "stoppedDate": "2020-08-29",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-xmysql 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-xmysql Core Utility",
        "node-red-contrib-xmysql Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 54
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-contrib-yaml",
    "name": "node-red-contrib-yaml",
    "description": "Node-RED node for yaml",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-04-23",
    "lastActivityAt": "2022-04-23",
    "stack": [
      "JavaScript",
      "Node-RED"
    ],
    "score": {
      "total": 55,
      "activity": 14,
      "potential": 81,
      "reuse": 77,
      "maintainability": 68
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Node-RED Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "yaml": "^2.0.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-contrib-yaml"
    },
    "postMortem": {
      "stoppedDate": "2022-04-23",
      "failedReason": "Node-RED 생태계 의존 및 특정 서드파티 OpenAPI 정책 변경",
      "detailedAnalysis": "node-red-contrib-yaml 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-contrib-yaml Core Utility",
        "node-red-contrib-yaml Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 55
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "node-red-flowgen-extension",
    "name": "node-red-flowgen-extension",
    "description": "node-red-flowgen-extension — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-10-29",
    "lastActivityAt": "2024-10-29",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 66,
      "activity": 29,
      "potential": 96,
      "reuse": 81,
      "maintainability": 75
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/node-red-flowgen-extension"
    },
    "postMortem": {
      "stoppedDate": "2024-10-29",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "node-red-flowgen-extension 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "node-red-flowgen-extension Core Utility",
        "node-red-flowgen-extension Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 36
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "odoo",
    "name": "odoo",
    "description": "odoo — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-07-19",
    "lastActivityAt": "2020-07-19",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 56,
      "activity": 21,
      "potential": 71,
      "reuse": 76,
      "maintainability": 78
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/odoo"
    },
    "postMortem": {
      "stoppedDate": "2020-07-19",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "odoo 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "odoo Core Utility",
        "odoo Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 40
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "oh-my-opencode",
    "name": "oh-my-opencode",
    "description": "The Best AI Agent Harness - Batteries-Included OpenCode Plugin with Multi-Model Orchestration, Parallel Background Agents, and Crafted LSP/AST Tools",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-02",
    "lastActivityAt": "2026-03-02",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 79,
      "activity": 82,
      "potential": 74,
      "reuse": 78,
      "maintainability": 83
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@ast-grep/cli": "^0.40.0",
        "@ast-grep/napi": "^0.40.0",
        "@clack/prompts": "^0.11.0",
        "@code-yeongyu/comment-checker": "^0.6.1",
        "@modelcontextprotocol/sdk": "^1.25.2",
        "@opencode-ai/plugin": "^1.1.19",
        "@opencode-ai/sdk": "^1.1.19",
        "commander": "^14.0.2",
        "detect-libc": "^2.0.0",
        "diff": "^8.0.3",
        "js-yaml": "^4.1.1",
        "jsonc-parser": "^3.3.1",
        "picocolors": "^1.1.1",
        "picomatch": "^4.0.2",
        "vscode-jsonrpc": "^8.2.0",
        "zod": "^4.1.8"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/oh-my-opencode"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ollama-extension",
    "name": "ollama-extension",
    "description": "ollama-extension — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-03-10",
    "lastActivityAt": "2024-03-10",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 57,
      "activity": 20,
      "potential": 77,
      "reuse": 86,
      "maintainability": 66
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ollama-extension"
    },
    "postMortem": {
      "stoppedDate": "2024-03-10",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "ollama-extension 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "ollama-extension Core Utility",
        "ollama-extension Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 26
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ollama-summarizer",
    "name": "ollama-summarizer",
    "description": "이 프로젝트는 **Flask** 기반의 웹 애플리케이션으로, 사용자가 입력한 내용을 요약하거나 Mermaid 다이어그램 코드로 변환하는 기능을 제공합니다.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2025-05-02",
    "lastActivityAt": "2025-05-02",
    "stack": [
      "Python",
      "Docker"
    ],
    "score": {
      "total": 82,
      "activity": 81,
      "potential": 81,
      "reuse": 85,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Python + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ollama-summarizer"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ollama_translator_app",
    "name": "ollama_translator_app",
    "description": "| 항목 | 설명 |",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-05-02",
    "lastActivityAt": "2025-05-02",
    "stack": [
      "Python",
      "Docker"
    ],
    "score": {
      "total": 74,
      "activity": 68,
      "potential": 70,
      "reuse": 80,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "Python + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ollama_translator_app"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "openclaude",
    "name": "openclaude",
    "description": "Claude Code opened to any LLM — OpenAI, Gemini, DeepSeek, Ollama, and 200+ models",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-04-03",
    "lastActivityAt": "2026-04-03",
    "stack": [
      "TypeScript",
      "React"
    ],
    "score": {
      "total": 86,
      "activity": 89,
      "potential": 89,
      "reuse": 77,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + React Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@alcalzone/ansi-tokenize": "0.3.0",
        "@anthropic-ai/bedrock-sdk": "0.26.4",
        "@anthropic-ai/foundry-sdk": "0.2.3",
        "@anthropic-ai/sandbox-runtime": "0.0.46",
        "@anthropic-ai/sdk": "0.81.0",
        "@anthropic-ai/vertex-sdk": "0.14.4",
        "@commander-js/extra-typings": "12.1.0",
        "@growthbook/growthbook": "1.6.5",
        "@mendable/firecrawl-js": "4.18.1",
        "@modelcontextprotocol/sdk": "1.29.0",
        "@opentelemetry/api": "1.9.1",
        "@opentelemetry/api-logs": "0.214.0",
        "@opentelemetry/core": "2.6.1",
        "@opentelemetry/exporter-logs-otlp-http": "0.214.0",
        "@opentelemetry/exporter-trace-otlp-grpc": "0.57.2",
        "@opentelemetry/resources": "2.6.1",
        "@opentelemetry/sdk-logs": "0.214.0",
        "@opentelemetry/sdk-metrics": "2.6.1",
        "@opentelemetry/sdk-trace-base": "2.6.1",
        "@opentelemetry/sdk-trace-node": "2.6.1",
        "@opentelemetry/semantic-conventions": "1.40.0",
        "ajv": "8.18.0",
        "auto-bind": "5.0.1",
        "axios": "1.14.0",
        "bidi-js": "1.0.3",
        "chalk": "5.6.2",
        "chokidar": "4.0.3",
        "cli-boxes": "3.0.0",
        "cli-highlight": "2.1.11",
        "code-excerpt": "4.0.0",
        "commander": "12.1.0",
        "diff": "8.0.3",
        "emoji-regex": "10.6.0",
        "env-paths": "3.0.0",
        "execa": "9.6.1",
        "fflate": "0.8.2",
        "figures": "6.1.0",
        "fuse.js": "7.1.0",
        "get-east-asian-width": "1.5.0",
        "google-auth-library": "9.15.1",
        "https-proxy-agent": "7.0.6",
        "ignore": "7.0.5",
        "indent-string": "5.0.0",
        "jsonc-parser": "3.3.1",
        "lodash-es": "4.18.0",
        "lru-cache": "11.2.7",
        "marked": "15.0.12",
        "p-map": "7.0.4",
        "picomatch": "4.0.4",
        "proper-lockfile": "4.1.2",
        "qrcode": "1.5.4",
        "react": "19.2.4",
        "react-compiler-runtime": "1.0.0",
        "react-reconciler": "0.33.0",
        "semver": "7.7.4",
        "shell-quote": "1.8.3",
        "signal-exit": "4.1.0",
        "stack-utils": "2.0.6",
        "strip-ansi": "7.2.0",
        "supports-hyperlinks": "3.2.0",
        "tree-kill": "1.2.2",
        "turndown": "7.2.2",
        "type-fest": "4.41.0",
        "undici": "7.24.6",
        "usehooks-ts": "3.1.1",
        "vscode-languageserver-protocol": "3.17.5",
        "wrap-ansi": "9.0.2",
        "ws": "8.20.0",
        "xss": "1.0.15",
        "yaml": "2.8.3",
        "zod": "3.25.76"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/openclaude"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "openclaw",
    "name": "openclaw",
    "description": "Multi-channel AI gateway with extensible messaging integrations",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-02-09",
    "lastActivityAt": "2026-02-09",
    "stack": [
      "TypeScript",
      "Express",
      "Docker"
    ],
    "score": {
      "total": 81,
      "activity": 86,
      "potential": 68,
      "reuse": 89,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + Express + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@agentclientprotocol/sdk": "0.14.1",
        "@aws-sdk/client-bedrock": "^3.985.0",
        "@buape/carbon": "0.14.0",
        "@clack/prompts": "^1.0.0",
        "@grammyjs/runner": "^2.0.3",
        "@grammyjs/transformer-throttler": "^1.2.1",
        "@homebridge/ciao": "^1.3.5",
        "@larksuiteoapi/node-sdk": "^1.58.0",
        "@line/bot-sdk": "^10.6.0",
        "@lydell/node-pty": "1.2.0-beta.3",
        "@mariozechner/pi-agent-core": "0.52.9",
        "@mariozechner/pi-ai": "0.52.9",
        "@mariozechner/pi-coding-agent": "0.52.9",
        "@mariozechner/pi-tui": "0.52.9",
        "@mozilla/readability": "^0.6.0",
        "@sinclair/typebox": "0.34.48",
        "@slack/bolt": "^4.6.0",
        "@slack/web-api": "^7.13.0",
        "@whiskeysockets/baileys": "7.0.0-rc.9",
        "ajv": "^8.17.1",
        "chalk": "^5.6.2",
        "chokidar": "^5.0.0",
        "cli-highlight": "^2.1.11",
        "commander": "^14.0.3",
        "croner": "^10.0.1",
        "discord-api-types": "^0.38.38",
        "dotenv": "^17.2.4",
        "express": "^5.2.1",
        "file-type": "^21.3.0",
        "grammy": "^1.39.3",
        "hono": "4.11.9",
        "jiti": "^2.6.1",
        "json5": "^2.2.3",
        "jszip": "^3.10.1",
        "linkedom": "^0.18.12",
        "long": "^5.3.2",
        "markdown-it": "^14.1.0",
        "node-edge-tts": "^1.2.10",
        "osc-progress": "^0.3.0",
        "pdfjs-dist": "^5.4.624",
        "playwright-core": "1.58.2",
        "proper-lockfile": "^4.1.2",
        "qrcode-terminal": "^0.12.0",
        "sharp": "^0.34.5",
        "signal-utils": "^0.21.1",
        "sqlite-vec": "0.1.7-alpha.2",
        "tar": "7.5.7",
        "tslog": "^4.10.2",
        "undici": "^7.21.0",
        "ws": "^8.19.0",
        "yaml": "^2.8.2",
        "zod": "^4.3.6"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/openclaw"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "opencode",
    "name": "opencode",
    "description": "AI-powered development tool",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-02-11",
    "lastActivityAt": "2026-02-11",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 83,
      "activity": 89,
      "potential": 73,
      "reuse": 86,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@aws-sdk/client-s3": "3.933.0",
        "@opencode-ai/plugin": "workspace:*",
        "@opencode-ai/script": "workspace:*",
        "@opencode-ai/sdk": "workspace:*",
        "typescript": "catalog:"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/opencode"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "opendart",
    "name": "opendart",
    "description": "Javascript opendart API package, Support Node.js",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-18",
    "lastActivityAt": "2021-03-18",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 55,
      "activity": 10,
      "potential": 79,
      "reuse": 74,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.21.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/opendart"
    },
    "postMortem": {
      "stoppedDate": "2021-03-18",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "opendart 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "opendart Core Utility",
        "opendart Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 34
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "opengajae",
    "name": "opengajae",
    "description": "WhatsApp gateway CLI (Baileys web) with Pi RPC agent",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-02-09",
    "lastActivityAt": "2026-02-09",
    "stack": [
      "TypeScript",
      "Express",
      "Docker"
    ],
    "score": {
      "total": 85,
      "activity": 98,
      "potential": 70,
      "reuse": 85,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript + Express + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@agentclientprotocol/sdk": "0.14.1",
        "@aws-sdk/client-bedrock": "^3.985.0",
        "@buape/carbon": "0.0.0-beta-20260130162700",
        "@clack/prompts": "^1.0.0",
        "@grammyjs/runner": "^2.0.3",
        "@grammyjs/transformer-throttler": "^1.2.1",
        "@homebridge/ciao": "^1.3.4",
        "@larksuiteoapi/node-sdk": "^1.58.0",
        "@line/bot-sdk": "^10.6.0",
        "@lydell/node-pty": "1.2.0-beta.3",
        "@mariozechner/pi-agent-core": "0.52.8",
        "@mariozechner/pi-ai": "0.52.8",
        "@mariozechner/pi-coding-agent": "0.52.8",
        "@mariozechner/pi-tui": "0.52.8",
        "@mozilla/readability": "^0.6.0",
        "@sinclair/typebox": "0.34.48",
        "@slack/bolt": "^4.6.0",
        "@slack/web-api": "^7.13.0",
        "@whiskeysockets/baileys": "7.0.0-rc.9",
        "ajv": "^8.17.1",
        "chalk": "^5.6.2",
        "chokidar": "^5.0.0",
        "cli-highlight": "^2.1.11",
        "commander": "^14.0.3",
        "croner": "^10.0.1",
        "discord-api-types": "^0.38.38",
        "dotenv": "^17.2.4",
        "express": "^5.2.1",
        "file-type": "^21.3.0",
        "grammy": "^1.39.3",
        "hono": "4.11.8",
        "jiti": "^2.6.1",
        "json5": "^2.2.3",
        "jszip": "^3.10.1",
        "linkedom": "^0.18.12",
        "long": "^5.3.2",
        "markdown-it": "^14.1.0",
        "node-edge-tts": "^1.2.10",
        "osc-progress": "^0.3.0",
        "pdfjs-dist": "^5.4.624",
        "playwright-core": "1.58.2",
        "proper-lockfile": "^4.1.2",
        "qrcode-terminal": "^0.12.0",
        "sharp": "^0.34.5",
        "signal-utils": "^0.21.1",
        "sqlite-vec": "0.1.7-alpha.2",
        "tar": "7.5.7",
        "tslog": "^4.10.2",
        "undici": "^7.21.0",
        "ws": "^8.19.0",
        "yaml": "^2.8.2",
        "zod": "^4.3.6"
      },
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/opengajae"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "openpro",
    "name": "openpro",
    "description": "Claude Code opened to any LLM — OpenAI, Gemini, DeepSeek, Ollama, and 200+ models",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-04-09",
    "lastActivityAt": "2026-04-09",
    "stack": [
      "TypeScript",
      "React"
    ],
    "score": {
      "total": 87,
      "activity": 86,
      "potential": 92,
      "reuse": 82,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + React Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@alcalzone/ansi-tokenize": "0.3.0",
        "@anthropic-ai/bedrock-sdk": "0.26.4",
        "@anthropic-ai/foundry-sdk": "0.2.3",
        "@anthropic-ai/sandbox-runtime": "0.0.46",
        "@anthropic-ai/sdk": "0.81.0",
        "@anthropic-ai/vertex-sdk": "0.14.4",
        "@commander-js/extra-typings": "12.1.0",
        "@growthbook/growthbook": "1.6.5",
        "@grpc/grpc-js": "^1.14.3",
        "@grpc/proto-loader": "^0.8.0",
        "@mendable/firecrawl-js": "4.18.1",
        "@modelcontextprotocol/sdk": "1.29.0",
        "@opentelemetry/api": "1.9.1",
        "@opentelemetry/api-logs": "0.214.0",
        "@opentelemetry/core": "2.6.1",
        "@opentelemetry/exporter-logs-otlp-http": "0.214.0",
        "@opentelemetry/exporter-trace-otlp-grpc": "0.57.2",
        "@opentelemetry/resources": "2.6.1",
        "@opentelemetry/sdk-logs": "0.214.0",
        "@opentelemetry/sdk-metrics": "2.6.1",
        "@opentelemetry/sdk-trace-base": "2.6.1",
        "@opentelemetry/sdk-trace-node": "2.6.1",
        "@opentelemetry/semantic-conventions": "1.40.0",
        "ajv": "8.18.0",
        "auto-bind": "5.0.1",
        "axios": "1.14.0",
        "bidi-js": "1.0.3",
        "chalk": "5.6.2",
        "chokidar": "4.0.3",
        "cli-boxes": "3.0.0",
        "cli-highlight": "2.1.11",
        "code-excerpt": "4.0.0",
        "commander": "12.1.0",
        "diff": "8.0.3",
        "emoji-regex": "10.6.0",
        "env-paths": "3.0.0",
        "execa": "9.6.1",
        "fflate": "0.8.2",
        "figures": "6.1.0",
        "fuse.js": "7.1.0",
        "get-east-asian-width": "1.5.0",
        "google-auth-library": "9.15.1",
        "https-proxy-agent": "7.0.6",
        "ignore": "7.0.5",
        "indent-string": "5.0.0",
        "jsonc-parser": "3.3.1",
        "lodash-es": "4.18.0",
        "lru-cache": "11.2.7",
        "marked": "15.0.12",
        "p-map": "7.0.4",
        "picomatch": "4.0.4",
        "proper-lockfile": "4.1.2",
        "qrcode": "1.5.4",
        "react": "19.2.4",
        "react-compiler-runtime": "1.0.0",
        "react-reconciler": "0.33.0",
        "semver": "7.7.4",
        "shell-quote": "1.8.3",
        "signal-exit": "4.1.0",
        "stack-utils": "2.0.6",
        "strip-ansi": "7.2.0",
        "supports-hyperlinks": "3.2.0",
        "tree-kill": "1.2.2",
        "turndown": "7.2.2",
        "type-fest": "4.41.0",
        "undici": "7.24.6",
        "usehooks-ts": "3.1.1",
        "vscode-languageserver-protocol": "3.17.5",
        "wrap-ansi": "9.0.2",
        "ws": "8.20.0",
        "xss": "1.0.15",
        "yaml": "2.8.3",
        "zod": "3.25.76"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/openpro"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "orbit",
    "name": "orbit",
    "description": "사람들을 단순한 CRM 점수로 다루지 않고, 나와 그 사람 사이의 중력(Gravity), 거리, 시간의 흐름을 하나의 우주로 시각화하는 프라이빗 관계 관리 플랫폼.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-16",
    "lastActivityAt": "2026-08-16",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 86,
      "activity": 95,
      "potential": 77,
      "reuse": 81,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/orbit"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ovenapp-io",
    "name": "ovenapp.io",
    "description": "UI prototype",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-01-10",
    "lastActivityAt": "2020-01-10",
    "stack": [
      "TypeScript",
      "Java"
    ],
    "score": {
      "total": 56,
      "activity": 13,
      "potential": 73,
      "reuse": 77,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + Java Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ovenapp.io"
    },
    "postMortem": {
      "stoppedDate": "2020-01-10",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "ovenapp.io 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "ovenapp.io Core Utility",
        "ovenapp.io Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 39
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "page-assist",
    "name": "page-assist",
    "description": "로컬에서 실행 중인 AI 모델을 사용하여 웹 검색을 지원하세요.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-11-17",
    "lastActivityAt": "2024-11-17",
    "stack": [
      "TypeScript",
      "React",
      "TailwindCSS"
    ],
    "score": {
      "total": 68,
      "activity": 27,
      "potential": 89,
      "reuse": 90,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + React + TailwindCSS Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@ant-design/cssinjs": "^1.18.4",
        "@headlessui/react": "^1.7.18",
        "@heroicons/react": "^2.1.1",
        "@langchain/community": "^0.0.41",
        "@langchain/openai": "0.0.24",
        "@mantine/form": "^7.5.0",
        "@mantine/hooks": "^7.5.3",
        "@mozilla/readability": "^0.5.0",
        "@plasmohq/storage": "^1.9.0",
        "@tailwindcss/forms": "^0.5.7",
        "@tailwindcss/typography": "^0.5.10",
        "@tanstack/react-query": "^5.17.19",
        "@vitejs/plugin-react": "^4.2.1",
        "antd": "^5.13.3",
        "axios": "^1.6.7",
        "cheerio": "^1.0.0-rc.12",
        "d3-dsv": "2",
        "dayjs": "^1.11.10",
        "html-to-text": "^9.0.5",
        "i18next": "^23.10.1",
        "i18next-browser-languagedetector": "^7.2.0",
        "langchain": "^0.1.28",
        "lucide-react": "^0.350.0",
        "mammoth": "^1.7.2",
        "ml-distance": "^4.0.1",
        "openai": "^4.65.0",
        "pdfjs-dist": "4.0.379",
        "property-information": "^6.4.1",
        "pubsub-js": "^1.9.4",
        "react": "18.2.0",
        "react-dom": "18.2.0",
        "react-i18next": "^14.1.0",
        "react-icons": "^5.2.1",
        "react-markdown": "8.0.0",
        "react-router-dom": "6.10.0",
        "react-syntax-highlighter": "^15.5.0",
        "react-toastify": "^10.0.4",
        "rehype-katex": "6.0.3",
        "rehype-mathjax": "4.0.3",
        "remark-gfm": "3.0.1",
        "remark-math": "5.1.1",
        "turndown": "^7.1.3",
        "yt-transcript": "^0.0.2",
        "zustand": "^4.5.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/page-assist"
    },
    "postMortem": {
      "stoppedDate": "2024-11-17",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "page-assist 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "page-assist Core Utility",
        "page-assist Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 49
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "playwright-player",
    "name": "playwright-player",
    "description": "Stateful Playwright REST API with script runs and Streamable MCP support",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-29",
    "lastActivityAt": "2026-03-29",
    "stack": [
      "TypeScript",
      "Express",
      "Docker"
    ],
    "score": {
      "total": 79,
      "activity": 81,
      "potential": 70,
      "reuse": 86,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + Express + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@playwright/test": "1.58.2",
        "express": "^4.21.2",
        "playwright": "1.58.2",
        "swagger-ui-dist": "^5.32.1"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/playwright-player"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "postman-collection-viewer",
    "name": "postman-collection-viewer",
    "description": "View your Postman collection documentation in browser.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-09-18",
    "lastActivityAt": "2020-09-18",
    "stack": [
      "TypeScript",
      "Vue.js",
      "Express"
    ],
    "score": {
      "total": 63,
      "activity": 20,
      "potential": 83,
      "reuse": 87,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + Vue.js + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "core-js": "^2.6.11",
        "express": "^4.17.1",
        "postman-collection": "^3.6.4",
        "vue": "^2.6.11",
        "vue-scrollto": "^2.18.2"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/postman-collection-viewer"
    },
    "postMortem": {
      "stoppedDate": "2020-09-18",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "postman-collection-viewer 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "postman-collection-viewer Core Utility",
        "postman-collection-viewer Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 55
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "postra",
    "name": "postra",
    "description": "Go로 작성한 개인/사내 구축형 메일 서비스입니다. 사용자의 **POP3/IMAP/SMTP** 계정을 연결해 메일을 안전하게 **수집·검색·분석·작성·발송**하며, 모든 업무 기능을 **REST API / CLI / MCP / Web UI** 로 제공합니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-07-31",
    "lastActivityAt": "2026-07-31",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 82,
      "activity": 92,
      "potential": 73,
      "reuse": 73,
      "maintainability": 92
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/postra"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "pptx",
    "name": "pptx",
    "description": "pptx — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-10-24",
    "lastActivityAt": "2024-10-24",
    "stack": [
      "JavaScript"
    ],
    "score": {
      "total": 56,
      "activity": 17,
      "potential": 80,
      "reuse": 76,
      "maintainability": 71
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "pptxgenjs": "^3.12.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/pptx"
    },
    "postMortem": {
      "stoppedDate": "2024-10-24",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "pptx 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "pptx Core Utility",
        "pptx Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 33
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ptium",
    "name": "ptium",
    "description": "---",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "Docker"
    ],
    "score": {
      "total": 84,
      "activity": 95,
      "potential": 79,
      "reuse": 75,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ptium"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "public",
    "name": "public",
    "description": "public — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-07-25",
    "lastActivityAt": "2020-07-25",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 58,
      "activity": 18,
      "potential": 81,
      "reuse": 80,
      "maintainability": 76
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/public"
    },
    "postMortem": {
      "stoppedDate": "2020-07-25",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "public 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "public Core Utility",
        "public Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 41
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "qr",
    "name": "qr",
    "description": "qr — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-10-26",
    "lastActivityAt": "2020-10-26",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 53,
      "activity": 11,
      "potential": 77,
      "reuse": 79,
      "maintainability": 68
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/qr"
    },
    "postMortem": {
      "stoppedDate": "2020-10-26",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "qr 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "qr Core Utility",
        "qr Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 28
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "qwen-code",
    "name": "qwen-code",
    "description": "**터미널에서 바로 사용할 수 있는 오픈 소스 AI 에이전트.**",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-05-11",
    "lastActivityAt": "2026-05-11",
    "stack": [
      "TypeScript",
      "Docker"
    ],
    "score": {
      "total": 80,
      "activity": 79,
      "potential": 82,
      "reuse": 72,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@testing-library/dom": "^10.4.1",
        "simple-git": "^3.28.0"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/qwen-code"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "redash",
    "name": "redash",
    "description": "The frontend part of Redash.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-03-25",
    "lastActivityAt": "2026-03-25",
    "stack": [
      "TypeScript",
      "React",
      "Python",
      "Docker"
    ],
    "score": {
      "total": 87,
      "activity": 84,
      "potential": 88,
      "reuse": 85,
      "maintainability": 94
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript + React + Python + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@ant-design/icons": "^4.2.1",
        "@redash/viz": "workspace:*",
        "ace-builds": "^1.43.3",
        "antd": "4.4.3",
        "axios": "0.27.2",
        "axios-auth-refresh": "3.3.6",
        "bootstrap": "^3.4.1",
        "classnames": "^2.2.6",
        "d3": "^3.5.17",
        "debug": "^3.2.7",
        "dompurify": "^2.0.17",
        "elliptic": "^6.6.0",
        "font-awesome": "^4.7.0",
        "history": "^4.10.1",
        "hoist-non-react-statics": "^3.3.0",
        "markdown": "0.5.0",
        "material-design-iconic-font": "^2.2.0",
        "mousetrap": "^1.6.1",
        "mustache": "^2.3.0",
        "numeral": "^2.0.6",
        "path-to-regexp": "^3.3.0",
        "prop-types": "^15.6.1",
        "query-string": "^6.9.0",
        "react": "16.14.0",
        "react-ace": "^14.0.1",
        "react-dom": "^16.14.0",
        "react-grid-layout": "^0.18.2",
        "react-resizable": "^1.10.1",
        "react-virtualized": "^9.21.2",
        "sql-formatter": "git+https://github.com/getredash/sql-formatter.git",
        "universal-router": "^8.3.0",
        "use-debounce": "^3.1.0",
        "use-media": "^1.4.0"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/redash"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "redman",
    "name": "redman",
    "description": "redman — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2023-08-23",
    "lastActivityAt": "2023-08-23",
    "stack": [
      "JavaScript",
      "Express"
    ],
    "score": {
      "total": 54,
      "activity": 14,
      "potential": 79,
      "reuse": 78,
      "maintainability": 66
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "cookie-parser": "~1.4.4",
        "debug": "~2.6.9",
        "express": "~4.16.1",
        "http-errors": "~1.6.3",
        "morgan": "~1.9.1",
        "pug": "2.0.0-beta11",
        "request": "^2.88.2"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/redman"
    },
    "postMortem": {
      "stoppedDate": "2023-08-23",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "redman 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "redman Core Utility",
        "redman Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 40
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "relio",
    "name": "relio",
    "description": "단일 Docker 컨테이너 기반 사내 에어갭 B2B CRM 및 영업관리 플랫폼.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-12",
    "lastActivityAt": "2026-08-12",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 87,
      "activity": 92,
      "potential": 79,
      "reuse": 86,
      "maintainability": 95
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/relio"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "reset",
    "name": "reset",
    "description": "reset — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-03-02",
    "lastActivityAt": "2020-03-02",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 52,
      "activity": 10,
      "potential": 74,
      "reuse": 83,
      "maintainability": 65
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/reset"
    },
    "postMortem": {
      "stoppedDate": "2020-03-02",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "reset 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "reset Core Utility",
        "reset Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 59
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "s-test",
    "name": "s-test",
    "description": "A stred application",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-12-06",
    "lastActivityAt": "2020-12-06",
    "stack": [
      "JavaScript"
    ],
    "score": {
      "total": 59,
      "activity": 23,
      "potential": 81,
      "reuse": 84,
      "maintainability": 68
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "stred": "3.3.4",
        "stred-admin": "3.3.4",
        "stred-utils": "3.3.4",
        "stred-plugin-content-type-builder": "3.3.4",
        "stred-plugin-content-manager": "3.3.4",
        "stred-plugin-users-permissions": "3.3.4",
        "stred-plugin-email": "3.3.4",
        "stred-plugin-upload": "3.3.4",
        "stred-connector-bookshelf": "3.3.4",
        "knex": "<0.20.0",
        "sqlite3": "latest"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/s-test"
    },
    "postMortem": {
      "stoppedDate": "2020-12-06",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "s-test 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "s-test Core Utility",
        "s-test Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 39
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "seaton",
    "name": "seaton",
    "description": "SVG 비율좌표 좌석맵, 오프라인 CV·사내 비전 모델 선택형 도면 판독, 이상 좌석 자동 감지 및 Streamable MCP 지원.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-12",
    "lastActivityAt": "2026-08-12",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 82,
      "activity": 94,
      "potential": 68,
      "reuse": 82,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/seaton"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "shorturl",
    "name": "shorturl",
    "description": "Python + Flask + Redis + Docker를 활용한 Short URL 생성 및 리디렉션 서비스입니다.",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-05-22",
    "lastActivityAt": "2025-05-22",
    "stack": [
      "Python",
      "Docker"
    ],
    "score": {
      "total": 73,
      "activity": 63,
      "potential": 77,
      "reuse": 76,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "Python + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/shorturl"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "snipe-it-collector",
    "name": "snipe-it-collector",
    "description": "Single-script agent to create new Assets in a Snipe-IT database",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-05-05",
    "lastActivityAt": "2020-05-05",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 52,
      "activity": 13,
      "potential": 69,
      "reuse": 73,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/snipe-it-collector"
    },
    "postMortem": {
      "stoppedDate": "2020-05-05",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "snipe-it-collector 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "snipe-it-collector Core Utility",
        "snipe-it-collector Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 43
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "specflow",
    "name": "specflow",
    "description": "specflow — AI & engineering project by hkjang",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-24",
    "lastActivityAt": "2025-12-24",
    "stack": [
      "JavaScript",
      "Docker"
    ],
    "score": {
      "total": 80,
      "activity": 67,
      "potential": 90,
      "reuse": 83,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "JavaScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/specflow"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "sql-assist",
    "name": "sql-assist",
    "description": "로컬에서 실행 중인 AI 모델을 사용하여 웹 검색을 지원하세요.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-11-29",
    "lastActivityAt": "2024-11-29",
    "stack": [
      "TypeScript",
      "React",
      "TailwindCSS"
    ],
    "score": {
      "total": 64,
      "activity": 17,
      "potential": 88,
      "reuse": 91,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + React + TailwindCSS Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@ant-design/cssinjs": "^1.18.4",
        "@headlessui/react": "^1.7.18",
        "@heroicons/react": "^2.1.1",
        "@langchain/community": "^0.0.41",
        "@langchain/openai": "0.0.24",
        "@mantine/form": "^7.5.0",
        "@mantine/hooks": "^7.5.3",
        "@mozilla/readability": "^0.5.0",
        "@plasmohq/storage": "^1.9.0",
        "@tailwindcss/forms": "^0.5.7",
        "@tailwindcss/typography": "^0.5.10",
        "@tanstack/react-query": "^5.17.19",
        "@vitejs/plugin-react": "^4.2.1",
        "antd": "^5.13.3",
        "axios": "^1.6.7",
        "cheerio": "^1.0.0-rc.12",
        "d3-dsv": "2",
        "dayjs": "^1.11.10",
        "html-to-text": "^9.0.5",
        "i18next": "^23.10.1",
        "i18next-browser-languagedetector": "^7.2.0",
        "langchain": "^0.1.28",
        "lucide-react": "^0.350.0",
        "mammoth": "^1.7.2",
        "ml-distance": "^4.0.1",
        "openai": "^4.65.0",
        "pdfjs-dist": "4.0.379",
        "property-information": "^6.4.1",
        "pubsub-js": "^1.9.4",
        "react": "18.2.0",
        "react-dom": "18.2.0",
        "react-i18next": "^14.1.0",
        "react-icons": "^5.2.1",
        "react-markdown": "8.0.0",
        "react-router-dom": "6.10.0",
        "react-syntax-highlighter": "^15.5.0",
        "react-toastify": "^10.0.4",
        "rehype-katex": "6.0.3",
        "rehype-mathjax": "4.0.3",
        "remark-gfm": "3.0.1",
        "remark-math": "5.1.1",
        "turndown": "^7.1.3",
        "yt-transcript": "^0.0.2",
        "zustand": "^4.5.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/sql-assist"
    },
    "postMortem": {
      "stoppedDate": "2024-11-29",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "sql-assist 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "sql-assist Core Utility",
        "sql-assist Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 54
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "sqlon",
    "name": "sqlon",
    "description": "SQLON is an evidence-driven database operations platform for DBAs and SREs.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-08",
    "lastActivityAt": "2026-08-08",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 89,
      "activity": 97,
      "potential": 88,
      "reuse": 79,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/sqlon"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "sqlpad",
    "name": "sqlpad",
    "description": "A web app for writing and running SQL queries and visualizing the results. Supports Postgres, MySQL, SQL Server, ClickHouse, Crate, Vertica, Trino, Pr",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-12-19",
    "lastActivityAt": "2021-12-19",
    "stack": [
      "JavaScript",
      "Docker"
    ],
    "score": {
      "total": 60,
      "activity": 12,
      "potential": 86,
      "reuse": 86,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/sqlpad"
    },
    "postMortem": {
      "stoppedDate": "2021-12-19",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "sqlpad 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "sqlpad Core Utility",
        "sqlpad Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 40
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ssak",
    "name": "ssak",
    "description": "게시된 워크플로 버전과 실행 상태를 PostgreSQL에 고정하고,<br>",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-14",
    "lastActivityAt": "2026-08-14",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 86,
      "activity": 97,
      "potential": 75,
      "reuse": 85,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ssak"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ssak-node-modules-broken-20260814",
    "name": "ssak-node-modules-broken-20260814",
    "description": "ssak-node-modules-broken-20260814 — AI & engineering project by hkjang",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-14",
    "lastActivityAt": "2026-08-14",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 79,
      "activity": 95,
      "potential": 70,
      "reuse": 73,
      "maintainability": 68
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ssak-node-modules-broken-20260814"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "ssak-node-modules-broken-playwright-20260814",
    "name": "ssak-node-modules-broken-playwright-20260814",
    "description": "ssak-node-modules-broken-playwright-20260814 — AI & engineering project by hkjang",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-14",
    "lastActivityAt": "2026-08-14",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 83,
      "activity": 96,
      "potential": 77,
      "reuse": 80,
      "maintainability": 67
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/ssak-node-modules-broken-playwright-20260814"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "static-website",
    "name": "static-website",
    "description": "The new cdnjs website, using Vue & Nuxt",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-09-18",
    "lastActivityAt": "2020-09-18",
    "stack": [
      "JavaScript",
      "Vue.js",
      "Express"
    ],
    "score": {
      "total": 59,
      "activity": 12,
      "potential": 78,
      "reuse": 87,
      "maintainability": 91
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Vue.js + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@fortawesome/fontawesome-free": "^5.14.0",
        "@nuxtjs/google-analytics": "^2.4.0",
        "@nuxtjs/sentry": "^4.3.4",
        "@nuxtjs/svg": "^0.1.11",
        "@sentry/node": "^5.20.1",
        "algoliasearch": "^4.3.1",
        "babel-polyfill": "^6.26.0",
        "chunk": "0.0.2",
        "consola": "^2.14.0",
        "copyfiles": "^2.3.0",
        "esm": "^3.2.25",
        "express": "^4.17.1",
        "fontmin": "^0.9.8",
        "glob-to-regexp": "^0.4.1",
        "imagemin": "^7.0.1",
        "imagemin-jpegtran": "^7.0.0",
        "imagemin-optipng": "^8.0.0",
        "imagemin-svgo": "^8.0.0",
        "instantsearch.css": "^7.4.2",
        "markdown-it": "^11.0.0",
        "morgan": "^1.10.0",
        "node-fetch": "^2.6.0",
        "nuxt": "^2.14.1",
        "prismjs": "^1.20.0",
        "semver-sort": "0.0.4",
        "sitemap": "^6.2.0",
        "spdx-license-ids": "^3.0.5",
        "thenby": "^1.3.4",
        "tlite": "^0.1.9",
        "typeface-ubuntu": "0.0.65",
        "url-parse": "^1.4.7",
        "vue": "^2.6.11",
        "vue-client-only": "^2.0.0",
        "vue-clipboard2": "^0.3.1",
        "vue-gravatar": "^1.3.1",
        "vue-hot-reload-api": "^2.3.4",
        "vue-instantsearch": "^3.1.0",
        "vue-prism-component": "^1.2.0",
        "vue-router": "^3.4.0",
        "vue-select": "^3.10.7"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/static-website"
    },
    "postMortem": {
      "stoppedDate": "2020-09-18",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "static-website 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "static-website Core Utility",
        "static-website Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 46
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "stockboom",
    "name": "stockboom",
    "description": "Stock Trading Automation System",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2026-01-17",
    "lastActivityAt": "2026-01-17",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 83,
      "activity": 84,
      "potential": 81,
      "reuse": 84,
      "maintainability": 86
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "date-fns": "^3.0.6"
      },
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/stockboom"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "stred-test",
    "name": "stred-test",
    "description": "A Strapi application",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-12-06",
    "lastActivityAt": "2020-12-06",
    "stack": [
      "JavaScript"
    ],
    "score": {
      "total": 56,
      "activity": 13,
      "potential": 83,
      "reuse": 81,
      "maintainability": 69
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "strapi": "3.3.4",
        "strapi-admin": "3.3.4",
        "strapi-utils": "3.3.4",
        "strapi-plugin-content-type-builder": "3.3.4",
        "strapi-plugin-content-manager": "3.3.4",
        "strapi-plugin-users-permissions": "3.3.4",
        "strapi-plugin-email": "3.3.4",
        "strapi-plugin-upload": "3.3.4",
        "strapi-connector-bookshelf": "3.3.4",
        "knex": "<0.20.0",
        "sqlite3": "latest"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/stred-test"
    },
    "postMortem": {
      "stoppedDate": "2020-12-06",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "stred-test 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "stred-test Core Utility",
        "stred-test Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 47
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "super-trading",
    "name": "super-trading",
    "description": "super-trading — AI & engineering project by hkjang",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-03-26",
    "lastActivityAt": "2025-03-26",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 72,
      "activity": 69,
      "potential": 68,
      "reuse": 86,
      "maintainability": 66
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/super-trading"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "system-companion",
    "name": "system-companion",
    "description": "Multi platform system informations tool.",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-04-30",
    "lastActivityAt": "2020-04-30",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 58,
      "activity": 18,
      "potential": 81,
      "reuse": 76,
      "maintainability": 84
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "electron-updater": "^4.2.0",
        "systeminformation": "^4.19.2"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/system-companion"
    },
    "postMortem": {
      "stoppedDate": "2020-04-30",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "system-companion 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "system-companion Core Utility",
        "system-companion Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 55
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "t2sql",
    "name": "t2sql",
    "description": "t2sql — AI & engineering project by hkjang",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-03-13",
    "lastActivityAt": "2025-03-13",
    "stack": [
      "Python"
    ],
    "score": {
      "total": 73,
      "activity": 60,
      "potential": 88,
      "reuse": 74,
      "maintainability": 73
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "Python Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/t2sql"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "tadpole-chrome-extension",
    "name": "tadpole-chrome-extension",
    "description": "tadpole-chrome-extension — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-05-27",
    "lastActivityAt": "2020-05-27",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 54,
      "activity": 14,
      "potential": 72,
      "reuse": 81,
      "maintainability": 77
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/tadpole-chrome-extension"
    },
    "postMortem": {
      "stoppedDate": "2020-05-27",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "tadpole-chrome-extension 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "tadpole-chrome-extension Core Utility",
        "tadpole-chrome-extension Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 30
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "tadpoledbhub-chrome-extension",
    "name": "tadpoledbhub-chrome-extension",
    "description": "tadpoledbhub-chrome-extension — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-05-27",
    "lastActivityAt": "2020-05-27",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 55,
      "activity": 12,
      "potential": 83,
      "reuse": 75,
      "maintainability": 70
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/tadpoledbhub-chrome-extension"
    },
    "postMortem": {
      "stoppedDate": "2020-05-27",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "tadpoledbhub-chrome-extension 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "tadpoledbhub-chrome-extension Core Utility",
        "tadpoledbhub-chrome-extension Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 43
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "tagflow",
    "name": "tagflow",
    "description": "RFID Tag Management System with NW.js, NestJS, and Next.js",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-04",
    "lastActivityAt": "2025-12-04",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 82,
      "activity": 69,
      "potential": 91,
      "reuse": 85,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/tagflow"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "telsa-dc-combo",
    "name": "telsa-dc-combo",
    "description": "telsa-dc-combo — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-10-25",
    "lastActivityAt": "2021-10-25",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 63,
      "activity": 28,
      "potential": 81,
      "reuse": 86,
      "maintainability": 77
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/telsa-dc-combo"
    },
    "postMortem": {
      "stoppedDate": "2021-10-25",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "telsa-dc-combo 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "telsa-dc-combo Core Utility",
        "telsa-dc-combo Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 49
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "tensorflow-ml-nlp",
    "name": "tensorflow-ml-nlp",
    "description": "텐서플로우와 머신러닝으로 시작하는 자연어처리(로지스틱회귀회귀부터 트렌스포머 챗봇까지)",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-05-10",
    "lastActivityAt": "2020-05-10",
    "stack": [
      "Python"
    ],
    "score": {
      "total": 66,
      "activity": 23,
      "potential": 92,
      "reuse": 86,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "Python Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/tensorflow-ml-nlp"
    },
    "postMortem": {
      "stoppedDate": "2020-05-10",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "tensorflow-ml-nlp 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "tensorflow-ml-nlp Core Utility",
        "tensorflow-ml-nlp Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 56
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "tesla-dc-combo",
    "name": "tesla-dc-combo",
    "description": "tesla-dc-combo — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-10-25",
    "lastActivityAt": "2021-10-25",
    "stack": [
      "JavaScript"
    ],
    "score": {
      "total": 54,
      "activity": 19,
      "potential": 68,
      "reuse": 80,
      "maintainability": 74
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "node-fetch": "^3.0.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/tesla-dc-combo"
    },
    "postMortem": {
      "stoppedDate": "2021-10-25",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "tesla-dc-combo 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "tesla-dc-combo Core Utility",
        "tesla-dc-combo Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 27
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "test",
    "name": "test",
    "description": "test — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-09",
    "lastActivityAt": "2021-03-09",
    "stack": [
      "JavaScript",
      "Express"
    ],
    "score": {
      "total": 53,
      "activity": 21,
      "potential": 72,
      "reuse": 73,
      "maintainability": 66
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript + Express Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "cookie-parser": "~1.4.4",
        "debug": "~2.6.9",
        "express": "~4.16.1",
        "google-news-json": "^2.0.4",
        "http-errors": "~1.6.3",
        "jade": "~1.11.0",
        "morgan": "~1.9.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/test"
    },
    "postMortem": {
      "stoppedDate": "2021-03-09",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "test 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "test Core Utility",
        "test Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 44
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "text2sql",
    "name": "text2sql",
    "description": "text2sql — AI & engineering project by hkjang",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-03-23",
    "lastActivityAt": "2025-03-23",
    "stack": [
      "Python"
    ],
    "score": {
      "total": 79,
      "activity": 64,
      "potential": 96,
      "reuse": 86,
      "maintainability": 69
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "Python Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/text2sql"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "tistory-js",
    "name": "tistory.js",
    "description": "Javascript Tistory API package, Support Node.js, and Browser",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2021-03-18",
    "lastActivityAt": "2021-03-18",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 54,
      "activity": 14,
      "potential": 73,
      "reuse": 72,
      "maintainability": 88
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "^0.18.0",
        "form-data": "^2.3.3",
        "query-string": "^6.2.0"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/tistory.js"
    },
    "postMortem": {
      "stoppedDate": "2021-03-18",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "tistory.js 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "tistory.js Core Utility",
        "tistory.js Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 42
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "trace",
    "name": "trace",
    "description": "결과가 아니라, 당시 알고 있던 정보와 판단의 품질을 시간축에 남겨 다시 보는 <strong>Decision Intelligence Platform</strong>",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-16",
    "lastActivityAt": "2026-08-16",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 89,
      "activity": 98,
      "potential": 83,
      "reuse": 81,
      "maintainability": 93
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/trace"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "tunny",
    "name": "tunny",
    "description": "직관적인 웹 인터페이스를 통해 AI 모델을 손쉽게 파인튜닝할 수 있는 React 기반 웹 애플리케이션입니다.",
    "status": "active",
    "stage": "experiment",
    "createdAt": "2025-05-25",
    "lastActivityAt": "2025-05-25",
    "stack": [
      "Python"
    ],
    "score": {
      "total": 79,
      "activity": 80,
      "potential": 76,
      "reuse": 78,
      "maintainability": 82
    },
    "assets": [],
    "nextAction": "가설 검증 피드백 수집 및 MVP 개선",
    "nextActionCategory": "validation",
    "dna": {
      "architecture": "Python Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 4,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/tunny"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "tutorial_add_javascript",
    "name": "tutorial_add_javascript",
    "description": "tutorial_add_javascript — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-06-13",
    "lastActivityAt": "2020-06-13",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 57,
      "activity": 13,
      "potential": 80,
      "reuse": 83,
      "maintainability": 77
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/tutorial_add_javascript"
    },
    "postMortem": {
      "stoppedDate": "2020-06-13",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "tutorial_add_javascript 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "tutorial_add_javascript Core Utility",
        "tutorial_add_javascript Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 49
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "umm",
    "name": "umm",
    "description": "밤사이 <b>Dream</b>으로 다시 발견하는 <b>Spatial Thought Memory</b> 서비스입니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-14",
    "lastActivityAt": "2026-08-14",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 84,
      "activity": 93,
      "potential": 74,
      "reuse": 78,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/umm"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "unlog",
    "name": "unlog",
    "description": "This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).",
    "status": "active",
    "stage": "maintain",
    "createdAt": "2025-12-14",
    "lastActivityAt": "2025-12-14",
    "stack": [
      "TypeScript",
      "React",
      "Next.js",
      "Docker"
    ],
    "score": {
      "total": 79,
      "activity": 60,
      "potential": 89,
      "reuse": 88,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "의존성 업데이트 및 안정화",
    "nextActionCategory": "refactor",
    "dna": {
      "architecture": "TypeScript + React + Next.js + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "@prisma/client": "^5.22.0",
        "lunar-javascript": "^1.7.7",
        "next": "16.0.10",
        "react": "19.2.1",
        "react-dom": "19.2.1",
        "recharts": "^3.5.1"
      },
      "commitVelocityWeekly": 1,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/unlog"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "untitled",
    "name": "untitled",
    "description": "untitled — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2022-09-05",
    "lastActivityAt": "2022-09-05",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 56,
      "activity": 26,
      "potential": 75,
      "reuse": 75,
      "maintainability": 65
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/untitled"
    },
    "postMortem": {
      "stoppedDate": "2022-09-05",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "untitled 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "untitled Core Utility",
        "untitled Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 37
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "vector_db_1226",
    "name": "vector_db_1226",
    "description": "vector_db_1226 — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2024-12-26",
    "lastActivityAt": "2024-12-26",
    "stack": [
      "Python"
    ],
    "score": {
      "total": 63,
      "activity": 29,
      "potential": 83,
      "reuse": 83,
      "maintainability": 76
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "Python Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/vector_db_1226"
    },
    "postMortem": {
      "stoppedDate": "2024-12-26",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "vector_db_1226 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "vector_db_1226 Core Utility",
        "vector_db_1226 Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 49
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "velo",
    "name": "velo",
    "description": "Netty 기반 엔터프라이즈 WAS 파운데이션.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-01",
    "lastActivityAt": "2026-08-01",
    "stack": [
      "Java",
      "Docker"
    ],
    "score": {
      "total": 88,
      "activity": 95,
      "potential": 81,
      "reuse": 86,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Java + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/velo"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "vibe-coders",
    "name": "vibe-coders",
    "description": "Roo Code / Cursor / Continue 등 OpenAI 호환 API 를 호출하는 VS Code 확장 및 AI 코딩 도구를 중간에서 초저지연으로 중계하면서 사용량·프롬프트·토큰·언어·호출 IP·비용(KRW) 을 추적하는 SSE 프록시 게이트웨이입니다. 폐쇄망",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-07-31",
    "lastActivityAt": "2026-07-31",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 87,
      "activity": 95,
      "potential": 77,
      "reuse": 86,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/vibe-coders"
    },
    "stars": 3,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "visitflow",
    "name": "visitflow",
    "description": "VisitFlow는 Go API와 React/Material UI를 하나의 Docker 이미지에 포함한다. 실행 중 CDN이나 이미지 레지스트리 접근이 없고 PostgreSQL 외 Redis·Object Storage 같은 추가 미들웨어가 필요하지 않다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-12",
    "lastActivityAt": "2026-08-12",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 91,
      "activity": 95,
      "potential": 95,
      "reuse": 78,
      "maintainability": 90
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/visitflow"
    },
    "stars": 2,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "vsphere-automation-sdk-rest",
    "name": "vsphere-automation-sdk-rest",
    "description": "The vsphere-automation-sdk-rest has been discontinued. This repo is a READ ONLY repo. Refer below links for REST API documentation and Postman samples",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-09-13",
    "lastActivityAt": "2020-09-13",
    "stack": [
      "TypeScript"
    ],
    "score": {
      "total": 57,
      "activity": 14,
      "potential": 80,
      "reuse": 77,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/vsphere-automation-sdk-rest"
    },
    "postMortem": {
      "stoppedDate": "2020-09-13",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "vsphere-automation-sdk-rest 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "vsphere-automation-sdk-rest Core Utility",
        "vsphere-automation-sdk-rest Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 41
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "vue-element-admin",
    "name": "vue-element-admin",
    "description": "A magical vue admin. An out-of-box UI solution for enterprise applications. Newest development stack of vue. Lots of awesome features",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-04-29",
    "lastActivityAt": "2020-04-29",
    "stack": [
      "TypeScript",
      "Vue.js"
    ],
    "score": {
      "total": 60,
      "activity": 27,
      "potential": 76,
      "reuse": 73,
      "maintainability": 87
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "TypeScript + Vue.js Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {
        "axios": "0.18.1",
        "clipboard": "2.0.4",
        "codemirror": "5.45.0",
        "driver.js": "0.9.5",
        "dropzone": "5.5.1",
        "echarts": "4.2.1",
        "element-ui": "2.13.0",
        "file-saver": "2.0.1",
        "fuse.js": "3.4.4",
        "js-cookie": "2.2.0",
        "jsonlint": "1.6.3",
        "jszip": "3.2.1",
        "normalize.css": "7.0.0",
        "nprogress": "0.2.0",
        "path-to-regexp": "2.4.0",
        "screenfull": "4.2.0",
        "script-loader": "0.7.2",
        "showdown": "1.9.0",
        "sortablejs": "1.8.4",
        "tui-editor": "1.3.3",
        "vue": "2.6.10",
        "vue-count-to": "1.0.13",
        "vue-router": "3.0.2",
        "vue-splitpane": "1.0.4",
        "vuedraggable": "2.20.0",
        "vuex": "3.1.0",
        "xlsx": "0.14.1"
      },
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/vue-element-admin"
    },
    "postMortem": {
      "stoppedDate": "2020-04-29",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "vue-element-admin 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "vue-element-admin Core Utility",
        "vue-element-admin Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 44
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "vuepress",
    "name": "vuepress",
    "description": "vuepress — AI & engineering project by hkjang",
    "status": "graveyard",
    "stage": "archived",
    "createdAt": "2020-05-09",
    "lastActivityAt": "2020-05-09",
    "stack": [
      "JavaScript"
    ],
    "score": {
      "total": 56,
      "activity": 22,
      "potential": 80,
      "reuse": 73,
      "maintainability": 66
    },
    "assets": [],
    "nextAction": "재사용 가능한 유틸리티 추출 및 아카이브",
    "nextActionCategory": "assetize",
    "dna": {
      "architecture": "JavaScript Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 0,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/vuepress"
    },
    "postMortem": {
      "stoppedDate": "2020-05-09",
      "failedReason": "외부 API 스키마 변경 또는 레거시 런타임 종속성",
      "detailedAnalysis": "vuepress 개발 중 확립된 핵심 비즈니스 로직 및 유틸리티는 후속 모던 풀스택 프로젝트에 재사용 가능한 자산으로 성공적으로 전용되었습니다.",
      "keyLearning": "외부 플랫폼 API에 직접 의존하지 않고 독립 추상화 계층 및 어댑터 패턴을 적용할 것.",
      "extractedAssets": [
        "vuepress Core Utility",
        "vuepress Client Adapter"
      ],
      "revivalTrigger": "차세대 AI Agent 마이크로서비스로 재구축 요구 시",
      "totalHoursInvested": 45
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "webgx",
    "name": "webgx",
    "description": "검증(Validation) · 불변 Revision · 2인 승인(Two-Person Rule) · 무중단 배포 및 즉각적 롤백",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-14",
    "lastActivityAt": "2026-08-14",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 85,
      "activity": 92,
      "potential": 74,
      "reuse": 86,
      "maintainability": 89
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/webgx"
    },
    "stars": 1,
    "forks": 0,
    "openIssues": 0
  },
  {
    "id": "weekly",
    "name": "weekly",
    "description": "개인 보고서 작성부터 팀장 승인, 원본 PPTX 보존 자동 내보내기까지 단일 패키지로 제공합니다.",
    "status": "active",
    "stage": "grow",
    "createdAt": "2026-08-12",
    "lastActivityAt": "2026-08-12",
    "stack": [
      "Go",
      "Docker"
    ],
    "score": {
      "total": 82,
      "activity": 92,
      "potential": 69,
      "reuse": 81,
      "maintainability": 85
    },
    "assets": [],
    "nextAction": "핵심 기능 확장 및 배포 파이프라인 점검",
    "nextActionCategory": "code",
    "dna": {
      "architecture": "Go + Docker Modular Architecture",
      "keyPatterns": [
        "Clean Architecture",
        "Modular Components"
      ],
      "dependencies": {},
      "commitVelocityWeekly": 8,
      "lastCommitMessage": "feat: update project codebase",
      "githubUrl": "https://github.com/hkjang/weekly"
    },
    "stars": 0,
    "forks": 0,
    "openIssues": 0
  }
];

export const INITIAL_ASSETS: ReusableAsset[] = [
  {
    "id": "asset-1",
    "name": "Multi-Channel Chat Gateway (WhatsApp / Slack / Discord)",
    "category": "api",
    "sourceProject": "opengajae",
    "description": "WhatsApp(Baileys), Slack(Bolt), Discord, Telegram 채널 메시지를 단일 표준 인터페이스로 수신·발신하는 어댑터",
    "language": "TypeScript",
    "codeSnippet": "import { EventEmitter } from 'events';\n\nexport interface UnifiedMessage {\n  channel: 'whatsapp' | 'slack' | 'discord' | 'line';\n  senderId: string;\n  senderName: string;\n  content: string;\n  timestamp: number;\n}\n\nexport class MultiChannelGateway extends EventEmitter {\n  async handleIncoming(channel: UnifiedMessage['channel'], payload: any) {\n    const msg: UnifiedMessage = {\n      channel,\n      senderId: payload.from || payload.user,\n      senderName: payload.pushName || payload.userName || 'Anonymous',\n      content: payload.text || payload.body || '',\n      timestamp: Date.now(),\n    };\n    this.emit('message', msg);\n  }\n}",
    "tags": [
      "ChatBot",
      "MultiChannel",
      "Baileys",
      "SlackBolt",
      "TypeScript"
    ],
    "usageCount": 14,
    "createdAt": "2026-08-16"
  },
  {
    "id": "asset-2",
    "name": "Monaco SQL Editor with Auto-Complete & Query Formatter",
    "category": "ui",
    "sourceProject": "jainsight",
    "description": "다크 테마 Monaco Editor 기반 SQL 하이라이팅, 테이블/컬럼 자동완성 및 프리티파이어 컴포넌트",
    "language": "TypeScript",
    "codeSnippet": "import React, { useRef } from 'react';\nimport Editor, { OnMount } from '@monaco-editor/react';\n\nexport const SqlMonacoEditor: React.FC<{ value: string; onChange: (val: string) => void }> = ({\n  value,\n  onChange,\n}) => {\n  const editorRef = useRef<any>(null);\n\n  const handleEditorDidMount: OnMount = (editor, monaco) => {\n    editorRef.current = editor;\n    monaco.languages.registerCompletionItemProvider('sql', {\n      provideCompletionItems: (model, position) => {\n        const word = model.getWordUntilPosition(position);\n        const range = {\n          startLineNumber: position.lineNumber,\n          endLineNumber: position.lineNumber,\n          startColumn: word.startColumn,\n          endColumn: word.endColumn,\n        };\n        const suggestions = [\n          { label: 'SELECT', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'SELECT ', range },\n          { label: 'WHERE', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'WHERE ', range },\n          { label: 'GROUP BY', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'GROUP BY ', range },\n        ];\n        return { suggestions };\n      },\n    });\n  };\n\n  return (\n    <Editor\n      height=\"300px\"\n      defaultLanguage=\"sql\"\n      theme=\"vs-dark\"\n      value={value}\n      onChange={(v) => onChange(v || '')}\n      onMount={handleEditorDidMount}\n      options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}\n    />\n  );\n};",
    "tags": [
      "Monaco",
      "SQL",
      "React",
      "SyntaxHighlight",
      "UI"
    ],
    "usageCount": 12,
    "createdAt": "2026-08-16"
  },
  {
    "id": "asset-3",
    "name": "NL2SQL Schema Prompt Ingestion Engine",
    "category": "llm",
    "sourceProject": "jask",
    "description": "데이터베이스 DDL 및 관계형 외래키 제약조건을 LLM Few-Shot 시스템 프롬프트로 최적화 포맷팅하는 유틸",
    "language": "TypeScript",
    "codeSnippet": "export function buildNl2SqlPrompt(schemaDdl: string, userQuery: string, dialect: 'postgres' | 'mysql' | 'sqlite' = 'postgres') {\n  return `You are an expert SQL engineer. Generate a valid, optimized ${dialect.toUpperCase()} query.\nDatabase Schema:\n${schemaDdl}\n\nGuidelines:\n1. Return ONLY the executable SQL query inside a markdown codeblock.\n2. Avoid destructive operations (DROP, DELETE, TRUNCATE) unless explicitly requested.\n3. Optimize for index usage and join conditions.\n\nUser Request: ${userQuery}`;\n}",
    "tags": [
      "NL2SQL",
      "PromptEngineering",
      "LLM",
      "SchemaContext"
    ],
    "usageCount": 18,
    "createdAt": "2026-08-16"
  },
  {
    "id": "asset-4",
    "name": "Playwright Video & Snapshot Headless Recorder",
    "category": "utility",
    "sourceProject": "GitFrame",
    "description": "Playwright를 활용하여 로컬 개발 서버를 대기(wait-on)하고 데모 영상 및 스크린샷을 자동 캡처하는 런타임",
    "language": "TypeScript",
    "codeSnippet": "import { chromium } from 'playwright';\nimport waitOn from 'wait-on';\n\nexport async function recordProjectDemo(url: string, outputVideoPath: string, durationSec = 10) {\n  await waitOn({ resources: [url], timeout: 30000 });\n  const browser = await chromium.launch({ headless: true });\n  const context = await browser.newContext({\n    recordVideo: { dir: './recordings', size: { width: 1280, height: 720 } }\n  });\n  const page = await context.newPage();\n  await page.goto(url);\n  await page.waitForTimeout(durationSec * 1000);\n  await context.close();\n  await browser.close();\n}",
    "tags": [
      "Playwright",
      "Automation",
      "VideoRecorder",
      "Testing"
    ],
    "usageCount": 9,
    "createdAt": "2026-08-16"
  },
  {
    "id": "asset-5",
    "name": "SQLite-Vec Local Embedding & Semantic RAG Search",
    "category": "database",
    "sourceProject": "opengajae",
    "description": "SQLite-Vec 확장을 활용한 제로 클라우드 비용 로컬 벡터 임베딩 유사도 검색 엔진",
    "language": "TypeScript",
    "codeSnippet": "import Database from 'better-sqlite3';\nimport * as sqliteVec from 'sqlite-vec';\n\nexport class LocalVectorStore {\n  private db: Database.Database;\n\n  constructor(dbPath = ':memory:') {\n    this.db = new Database(dbPath);\n    sqliteVec.load(this.db);\n    this.db.exec(`\n      CREATE VIRTUAL TABLE IF NOT EXISTS vec_documents USING vec0(\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        content TEXT,\n        embedding float[1536]\n      );\n    `);\n  }\n\n  insert(content: string, embedding: number[]) {\n    const stmt = this.db.prepare('INSERT INTO vec_documents(content, embedding) VALUES (?, ?)');\n    stmt.run(content, new Float32Array(embedding));\n  }\n}",
    "tags": [
      "SQLite",
      "VectorDB",
      "Embedding",
      "RAG",
      "LocalFirst"
    ],
    "usageCount": 15,
    "createdAt": "2026-08-16"
  },
  {
    "id": "asset-6",
    "name": "Postman Collection v2 to Markdown Exporter",
    "category": "utility",
    "sourceProject": "afterman",
    "description": "Postman Export JSON을 읽어 엔드포인트 파라미터, 헤더, 예제 응답을 마크다운 문서로 변환",
    "language": "TypeScript",
    "codeSnippet": "export function postmanToMarkdown(collection: any): string {\n  let md = \"# \" + (collection.info?.name || \"API Documentation\") + \"\\n\\n\";\n  for (const item of collection.item || []) {\n    md += \"## \" + item.name + \"\\n\";\n    md += \"**Method**: `\" + (item.request?.method || \"GET\") + \"`\\n\";\n    md += \"**URL**: `\" + (item.request?.url?.raw || item.request?.url || \"\") + \"`\\n\\n\";\n  }\n  return md;\n}",
    "tags": [
      "Postman",
      "Markdown",
      "ApiDoc",
      "Converter"
    ],
    "usageCount": 7,
    "createdAt": "2026-08-16"
  }
];

export const INITIAL_IDEAS: IdeaItem[] = [
  {
    "id": "idea-1",
    "title": "Local SQLite-Vec MCP Server for Antigravity & Claude",
    "description": "로컬 /mnt/d/project 내 모든 소스코드와 마크다운 문서를 실시간 임베딩하여 AI 어시스턴트가 0.1초만에 시맨틱 검색하도록 지원하는 MCP 서버",
    "viabilityScore": 95,
    "estimatedEffort": "weekend",
    "suggestedStack": [
      "TypeScript",
      "SQLite-Vec",
      "MCP SDK",
      "Ollama"
    ],
    "status": "inbox",
    "createdAt": "2026-08-16",
    "tags": [
      "MCP",
      "AI",
      "LocalFirst",
      "VectorDB"
    ]
  },
  {
    "id": "idea-2",
    "title": "Mattermost AI Daily Standup & Commit Digest Bot",
    "description": "팀원들의 당일 GitHub 커밋 및 PR diff를 수집하여 Mattermost 스탠드업 채널에 매일 아침 9시 지능형 서머리를 브리핑하는 봇",
    "viabilityScore": 91,
    "estimatedEffort": "weekend",
    "suggestedStack": [
      "Go",
      "TypeScript",
      "Mattermost API",
      "OpenAI"
    ],
    "status": "inbox",
    "createdAt": "2026-08-14",
    "tags": [
      "Mattermost",
      "Bot",
      "Automation",
      "DevProductivity"
    ]
  },
  {
    "id": "idea-3",
    "title": "Vibe-Coding Prompt Auto-Refiner CLI",
    "description": "자연어로 작성한 초기 아이디어를 구조화된 프로젝트 아키텍처 스펙, 디렉토리 트리, TypeScript 타입 정의서로 자동 확장해주는 CLI",
    "viabilityScore": 88,
    "estimatedEffort": "1-week",
    "suggestedStack": [
      "TypeScript",
      "Commander",
      "Anthropic Claude 3.5 Sonnet"
    ],
    "status": "inbox",
    "createdAt": "2026-08-12",
    "tags": [
      "CLI",
      "VibeCoding",
      "PromptEngineering"
    ]
  },
  {
    "id": "idea-4",
    "title": "Self-Hosted Atlassian Forge Bridge for On-Prem AI",
    "description": "폐쇄망 Bitbucket / Confluence 인프라에서 외부 클라우드 통신 없이 로컬 vLLM으로 코드 리뷰와 문서 작성을 수행하는 브릿지",
    "viabilityScore": 84,
    "estimatedEffort": "2-weeks",
    "suggestedStack": [
      "Java",
      "vLLM",
      "Atlassian P2 Plugin",
      "Docker"
    ],
    "status": "inbox",
    "createdAt": "2026-08-05",
    "tags": [
      "Atlassian",
      "OnPremise",
      "vLLM",
      "Enterprise"
    ]
  }
];

export const INITIAL_SUMMARY: PortfolioSummary = {
  totalProjects: INITIAL_PROJECTS.length,
  growing: INITIAL_PROJECTS.filter((p) => p.stage === 'grow').length,
  experiment: INITIAL_PROJECTS.filter((p) => p.stage === 'experiment').length,
  maintaining: INITIAL_PROJECTS.filter((p) => p.stage === 'maintain').length,
  dormant: INITIAL_PROJECTS.filter((p) => p.stage === 'dormant').length,
  archived: INITIAL_PROJECTS.filter((p) => p.stage === 'archived').length,
  totalAssetsExtracted: INITIAL_ASSETS.length,
  monthlyProjectsCreated: 14,
  monthlyCommitsCount: INITIAL_PROJECTS.reduce((acc, p) => acc + (p.dna.commitVelocityWeekly * 4), 0),
  topWorthContinuingProjects: INITIAL_PROJECTS.filter((p) => p.status === 'active').sort((a, b) => b.score.total - a.score.total).slice(0, 4).map((p) => p.name),
};
