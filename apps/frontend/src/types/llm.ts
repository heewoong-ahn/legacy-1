export interface LlmModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  is_active: boolean;
  config: any;
  created_at: string;
  updated_at: string;
}

export interface LlmModelInfo {
  id: string;
  name: string;
  provider: string;
}

export interface CreateLlmTestRequest {
  llm_model_id: string;
  prompt: string;
}

export interface LlmTestResponse {
  id: string;
  llm_model: LlmModelInfo;
  prompt: string;
  actual_output: string;
  created_at: string;
}

export interface LlmTestHistory {
  id: string;
  model_name: string;
  provider: string;
  prompt: string;
  response: string;
  created_at: string;
} 