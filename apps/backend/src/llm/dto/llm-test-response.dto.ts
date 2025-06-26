export class LlmModelInfo {
  id: string;
  name: string;
  provider: string;
}

export class LlmTestResponseDto {
  id: string;
  llm_model: LlmModelInfo;
  prompt: string;
  actual_output: string;
  created_at: Date;
} 