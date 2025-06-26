# AI 과제 환경 자동화 플랫폼 (Legacy-1)

AI 과제 환경 요청, 승인, 생성 및 LLM 테스트를 위한 웹 플랫폼입니다.

## 🏗️ 프로젝트 구조

```
legacy-1/
├── apps/
│   ├── frontend/    # Next.js 프론트엔드
│   └── backend/     # NestJS 백엔드
└── context/         # 프로젝트 문서
```

## 🔧 기술 스택

### 프론트엔드
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: JWT

### 백엔드
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL + TypeORM
- **Authentication**: JWT + Passport
- **Validation**: class-validator

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone <repository-url>
cd legacy-1
```

### 2. 백엔드 설정 및 실행
```bash
cd apps/backend
npm install

# 환경 변수 설정 (.env 파일 생성)
cp .env.example .env

# 데이터베이스 설정 후 시드 데이터 생성
npm run seed:admin

# 개발 서버 실행
npm run start:dev
```

### 3. 프론트엔드 설정 및 실행
```bash
cd apps/frontend
npm install

# 환경 변수 설정 (.env.local 파일 생성)
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# 개발 서버 실행
npm run dev
```

### 4. 접속
- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:3001

## 🔐 테스트 계정

시드 데이터로 생성되는 계정:
- **관리자**: admin@example.com / admin123
- **일반사용자**: user@example.com / user123

## 📋 주요 기능

### ✅ 구현 완료
- [x] 사용자 인증 (로그인/로그아웃)
- [x] JWT 토큰 기반 인증
- [x] Role 기반 권한 관리 (ADMIN/USER)
- [x] 반응형 UI

### 🚧 개발 예정
- [ ] 과제 환경 요청 기능
- [ ] 임시 저장 기능
- [ ] 관리자 승인 기능
- [ ] LLM 사전 테스트
- [ ] 외부 API 연동

## 📚 문서

- [프로젝트 컨텍스트](./context/project-context.md)
- [기능 명세](./context/features.md)
- [API 문서](./context/api.md)
- [DB 스키마](./context/DB-schema.md)
- [워크플로우](./context/workflow.md)
- [커밋 규칙](./context/commit.md)

## 🤝 기여 가이드

1. Feature 브랜치 생성
2. [커밋 규칙](./context/commit.md) 준수
3. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 