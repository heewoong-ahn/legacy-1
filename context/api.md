# 📘 API 명세서: AI 과제 환경 자동화 플랫폼

이 문서는 AI 과제 환경 자동화를 위한 플랫폼의 REST API 전체 명세를 정의합니다. 모든 API는 JWT 인증 기반이며, 사용자 권한(role)에 따라 접근 범위가 구분됩니다.

## ✅ 공통 사항
- 모든 요청은 다음 헤더를 포함해야 합니다:  
  `Authorization: Bearer <JWT-Token>`
- 모든 응답은 `application/json` 형식입니다.
- 시간 관련 필드는 ISO 8601 (UTC) 형식을 따릅니다.

## 🔐 인증 API

### POST /auth/login  
**설명**: 사용자 로그인 및 JWT 토큰 발급

**요청**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**응답**
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "developer"
  }
}
```

## 👤 사용자 API

### GET /users/me  
**설명**: 로그인한 사용자 정보 조회

**요청 헤더**
```
Authorization: Bearer <jwt-token>
```

**응답**
```json
{
  "id": "b4f2e4c1-11ab-4a6b-97d0-1e3ad31cba77",
  "email": "developer@example.com",
  "name": "김개발",
  "department": "AI팀",
  "role": "developer",
  "created_at": "2025-06-01T03:12:45.123Z"
}
```

**오류 응답**
```json
{
  "error": "Unauthorized"
}
```


