# Database Schema for AI 과제 환경 자동화 플랫폼

본 문서는 AI 과제 환경 자동화 플랫폼을 위한 데이터베이스 스키마를 정의합니다. 플랫폼은 개발자와 관리자가 과제 환경을 요청, 승인, 생성 및 테스트하는 일련의 기능을 지원합니다.

---

## 📌 테이블 목록

- `users`: 사용자 정보
- `llm_models`: 사용 가능한 LLM 목록
- `tasks`: 과제 요청 정보
- `task_drafts`: 임시 저장된 과제 요청서
- `llm_test_logs`: LLM 사전 테스트 기록

---

## 📄 테이블 정의

### 1. `users`

| 컬럼명       | 타입            | 설명                         |
|--------------|-----------------|------------------------------|
| id           | UUID            | 사용자 고유 ID               |
| email        | VARCHAR         | 이메일 주소                  |
| name         | VARCHAR         | 사용자 이름                  |
| department   | VARCHAR         | 소속 부서                    |
| role         | ENUM            | 'admin' 또는 'developer'     |
| created_at   | TIMESTAMP       | 계정 생성일                  |

---

### 2. `llm_models`

| 컬럼명       | 타입      | 설명                          |
|--------------|-----------|-------------------------------|
| id           | UUID      | 모델 고유 ID                  |
| name         | VARCHAR   | 모델 이름 (예: GPT-4)         |
| provider     | VARCHAR   | 제공자 (예: OpenAI, Anthropic)|
| version      | VARCHAR   | 모델 버전                     |
| is_active    | BOOLEAN   | 사용 가능 여부                |
| created_at   | TIMESTAMP | 등록일                        |

---

### 3. `tasks`

| 컬럼명              | 타입           | 설명                                       |
|---------------------|----------------|--------------------------------------------|
| id                  | UUID           | 과제 고유 ID                               |
| title               | VARCHAR        | 과제명                                     |
| description         | TEXT           | 과제 설명                                  |
| submitter_id        | UUID           | 제출자 (FK: `users.id`)                    |
| department          | VARCHAR        | 등록 부서                                  |
| pm                  | VARCHAR        | 과제 PM                                    |
| participants        | TEXT           | 참여자 목록 (CSV 형태 또는 테이블 분리 가능)|
| llm_model_id        | UUID           | 사용 LLM ID (FK: `llm_models.id`)          |
| expected_duration_days | INT         | 예상 기간 (일 단위)                        |
| expected_effect     | TEXT           | 기대 효과                                  |
| usage_plan          | TEXT           | 활용 계획                                  |
| status              | ENUM           | 'draft', 'pending', 'approved', 'rejected' |
| rejection_reason    | TEXT           | 반려 사유 (nullable)                       |
| created_at          | TIMESTAMP      | 생성일                                     |
| updated_at          | TIMESTAMP      | 수정일                                     |

---

### 4. `task_drafts`

| 컬럼명     | 타입     | 설명                               |
|------------|----------|------------------------------------|
| id         | UUID     | 임시 저장 ID                       |
| user_id    | UUID     | 작성자 ID (FK: `users.id`)         |
| data       | JSONB    | 임시 저장된 요청서 전체 데이터     |
| updated_at | TIMESTAMP| 마지막 수정일                      |

---

### 5. `llm_test_logs`

| 컬럼명         | 타입     | 설명                                 |
|----------------|----------|--------------------------------------|
| id             | UUID     | 테스트 기록 ID                       |
| user_id        | UUID     | 사용자 ID (FK: `users.id`)           |
| llm_model_id   | UUID     | 테스트 모델 ID (FK: `llm_models.id`) |
| prompt         | TEXT     | 입력 프롬프트                         |
| actual_output  | TEXT     | 실제 출력                             |
| created_at     | TIMESTAMP| 테스트 일시                           |

---

## ✅ 주의 사항
- 모든 시간 정보는 UTC 기준의 `TIMESTAMP` 사용 권장
- `ENUM` 타입은 DB마다 다르게 구현되므로 명확히 정의 필요

---
