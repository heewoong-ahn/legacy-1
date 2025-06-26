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

## LLM API

###POST `/llm-tests`

**설명**: 선택한 LLM 모델에 대해 입력 프롬프트를 테스트하고, 실제 출력 결과를 응답으로 제공한다.

**요청 바디**
```json
{
  "llm_model_id": "uuid",
  "prompt": "당신은 AI 평가 플랫폼입니다. 역할을 설명해주세요."
}
```

**요청 응답**
```json
{
  "id": "test-log-uuid",
  "llm_model": {
    "id": "uuid",
    "name": "GPT-4",
    "provider": "OpenAI"
  },
  "prompt": "당신은 AI 평가 플랫폼입니다. 역할을 설명해주세요.",
  "actual_output": "저는 다양한 LLM을 테스트할 수 있는 평가 플랫폼입니다...",
  "created_at": "2025-06-25T13:22:11.943Z"
}
```

**오류 응답**
```json
{
  "error": "Invalid LLM model ID"
}
```
## 📝 과제 요청서 API

### POST /tasks  
**설명**: 과제 요청서를 작성하고 제출합니다. 제출된 요청서는 기본적으로 `pending` 상태로 저장되며, 관리자의 승인 또는 반려를 기다립니다.

**요청 헤더**
```
Authorization: Bearer <jwt-token>
```

**요청**
```json
{
  "title": "LLM 성능 비교",
  "description": "GPT-4 vs Claude 실험",
  "department": "AI팀",
  "pm": "홍길동",
  "participants": ["김개발", "이실험"],
  "llm_model_id": "uuid",
  "expected_duration_days": 7,
  "expected_effect": "최적 모델 선정",
  "usage_plan": "프로덕션 전환 고려"
}
```

**응답**
```json
{
  "id": "task-uuid",
  "status": "pending",
  "created_at": "2025-06-26T04:12:00Z"
}
```

### GET /tasks  
**설명**: 로그인한 사용자의 과제 요청 목록을 조회합니다. 관리자의 경우 전체 요청서를 조회할 수 있습니다.

**요청 헤더**
```
Authorization: Bearer <jwt-token>
```

**응답**
```json
[
  {
    "id": "task-uuid",
    "title": "LLM 성능 비교",
    "status": "approved",
    "llm_model": {
      "id": "uuid",
      "name": "GPT-4"
    },
    "created_at": "2025-06-20T02:00:00Z"
  }
]
```
