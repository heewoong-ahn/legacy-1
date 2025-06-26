# AI 과제 환경 자동화 플랫폼 - 프론트엔드

Next.js + TypeScript + Tailwind CSS를 사용한 웹 애플리케이션입니다.

## 🚀 시작하기

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🔐 인증

### 기본 계정
- **관리자**: admin@example.com / admin123
- **일반사용자**: user@example.com / user123

## 🤖 LLM 기능

### 사용 방법
1. 로그인 후 대시보드에서 "LLM 테스트" 카드 클릭
2. 사용하고 싶은 LLM 모델 선택
3. 프롬프트 입력 후 "테스트 실행" 버튼 클릭
4. 결과 확인

### 지원 모델
- **GPT-4** (OpenAI) - 고성능 언어 모델
- **GPT-3.5-turbo** (OpenAI) - 빠르고 효율적인 모델
- **Claude-3** (Anthropic) - 안전하고 유용한 AI 어시스턴트
- **Gemini-Pro** (Google) - 멀티모달 AI 모델

## 📱 주요 기능

### 인증
- JWT 기반 로그인/로그아웃
- 자동 토큰 갱신
- 보호된 라우트

### 대시보드
- 사용자 정보 표시
- 기능별 카드 인터페이스
- 직관적인 네비게이션

### LLM 테스트
- 다양한 LLM 모델 선택
- 실시간 테스트 실행
- 결과 히스토리 표시
- 응답시간 표시

## 🛠️ 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

## 📚 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **HTTP Client**: Fetch API
- **State Management**: React Hooks

## 🗂️ 프로젝트 구조

```
src/
├── app/                    # App Router 페이지들
│   ├── dashboard/         # 대시보드 페이지
│   ├── llm/              # LLM 테스트 페이지
│   └── login/            # 로그인 페이지
├── components/           # 재사용 가능한 컴포넌트들
│   └── llm-model-card.tsx
├── contexts/            # React 컨텍스트들
│   └── auth-context.tsx
├── lib/                # 유틸리티 함수들
│   ├── auth.ts         # 인증 관련 함수
│   └── llm-api.ts      # LLM API 호출 함수
└── types/              # TypeScript 타입 정의들
    ├── auth.ts
    └── llm.ts
```

## 🔗 API 연동

백엔드 API와 연동하여 다음 기능을 제공합니다:

- **POST** `/auth/login` - 로그인
- **GET** `/llm-tests/models` - LLM 모델 목록
- **POST** `/llm-tests` - LLM 테스트 실행

## 🚧 개발 가이드

### 새로운 페이지 추가
1. `src/app/` 디렉토리에 새 폴더 생성
2. `page.tsx` 파일 생성
3. 필요시 인증 가드 추가

### 새로운 API 호출 추가
1. `src/lib/` 디렉토리에 API 함수 추가
2. 타입 정의를 `src/types/`에 추가
3. 컴포넌트에서 사용

## Next.js 학습 자료

- [Next.js Documentation](https://nextjs.org/docs) - Next.js 기능 및 API 학습
- [Learn Next.js](https://nextjs.org/learn) - 대화형 Next.js 튜토리얼
