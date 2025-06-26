# AI 과제 환경 자동화 플랫폼 - 백엔드

NestJS + TypeScript + PostgreSQL + JWT 인증을 사용한 REST API 서버입니다.

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=legacy_1

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# App
NODE_ENV=development
PORT=3001
```

### 3. 데이터베이스 설정
PostgreSQL이 실행 중인지 확인하고 `legacy_1` 데이터베이스를 생성하세요.

### 4. 관리자 계정 생성
```bash
npm run seed:admin
```

이 명령은 다음 계정들을 생성합니다:
- **관리자**: admin@example.com / admin123
- **일반사용자**: user@example.com / user123

### 5. LLM 모델 생성
```bash
npm run seed:llm
```

이 명령은 다음 LLM 모델들을 생성합니다:
- **GPT-4** (OpenAI)
- **GPT-3.5-turbo** (OpenAI)
- **Claude-3** (Anthropic)
- **Gemini-Pro** (Google)

### 6. 서버 실행
```bash
# 개발 모드
npm run start:dev

# 프로덕션 모드
npm run start:prod
```

서버는 `http://localhost:3001`에서 실행됩니다.

## 📋 API 엔드포인트

### 인증 API
- `POST /auth/login` - 로그인
- `POST /auth/refresh` - 토큰 갱신
- `POST /auth/logout` - 로그아웃
- `GET /auth/me` - 현재 사용자 정보

### 사용자 API
- `GET /users/me` - 현재 사용자 정보

### LLM API
- `POST /llm-tests` - LLM 테스트 실행
- `GET /llm-tests/models` - 사용 가능한 LLM 모델 목록
- `GET /llm-tests/models/:id` - 특정 LLM 모델 정보

## 🔐 인증

모든 보호된 엔드포인트는 Authorization 헤더에 JWT 토큰이 필요합니다:

```
Authorization: Bearer <your-jwt-token>
```

## 🤖 LLM API 사용 예시

### 1. 로그인
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 2. LLM 모델 목록 조회
```bash
curl -X GET http://localhost:3001/llm-tests/models \
  -H "Authorization: Bearer <your-jwt-token>"
```

### 3. LLM 테스트 실행
```bash
curl -X POST http://localhost:3001/llm-tests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "llm_model_id": "uuid-of-llm-model",
    "prompt": "안녕하세요, 자기소개를 해주세요."
  }'
```

### 응답 예시
```json
{
  "id": "test-uuid",
  "llm_model": {
    "id": "model-uuid",
    "name": "GPT-4",
    "provider": "OpenAI"
  },
  "prompt": "안녕하세요, 자기소개를 해주세요.",
  "actual_output": "안녕하세요! 저는 GPT-4 모델입니다. 요청하신 '안녕하세요, 자기소개를 해주세요.' 에 대한 응답을 제공드리겠습니다...",
  "created_at": "2025-01-25T10:30:00.000Z"
}
```

## 📚 기술 스택

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Password Hashing**: bcrypt

## 🗄️ 데이터베이스 스키마

### Users 테이블
- `id` (UUID, Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `name`
- `department`
- `role` (ADMIN | USER)
- `createdAt`
- `updatedAt`

### LLM Models 테이블
- `id` (UUID, Primary Key)
- `name` (모델 이름)
- `provider` (제공업체: OpenAI, Anthropic, Google 등)
- `description` (모델 설명)
- `is_active` (활성화 여부)
- `config` (JSON, 모델 설정)
- `created_at`
- `updated_at`

### LLM Tests 테이블
- `id` (UUID, Primary Key)
- `llm_model_id` (Foreign Key to LLM Models)
- `prompt` (입력 프롬프트)
- `actual_output` (모델 응답)
- `metadata` (JSON, 추가 메타데이터)
- `created_at`

## 🛠️ 개발 스크립트

```bash
# 개발 서버 실행
npm run start:dev

# 빌드
npm run build

# 테스트
npm run test

# 관리자 계정 생성
npm run seed:admin

# LLM 모델 생성
npm run seed:llm

# 린트
npm run lint

# 포맷팅
npm run format
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
