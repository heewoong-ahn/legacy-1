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

### 5. 서버 실행
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

## 🔐 인증

모든 보호된 엔드포인트는 Authorization 헤더에 JWT 토큰이 필요합니다:

```
Authorization: Bearer <your-jwt-token>
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
