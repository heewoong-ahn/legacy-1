import { fetchWithAuth } from './auth';
import { LlmModel, CreateLlmTestRequest, LlmTestResponse } from '@/types/llm';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// LLM 모델 목록 조회
export const fetchLlmModels = async (): Promise<LlmModel[]> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/llm-tests/models`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'LLM 모델 목록을 가져오는데 실패했습니다.');
  }
  
  return response.json();
};

// 특정 LLM 모델 조회
export const fetchLlmModel = async (id: string): Promise<LlmModel> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/llm-tests/models/${id}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'LLM 모델 정보를 가져오는데 실패했습니다.');
  }
  
  return response.json();
};

// LLM 테스트 실행
export const createLlmTest = async (request: CreateLlmTestRequest): Promise<LlmTestResponse> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/llm-tests`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'LLM 테스트 실행에 실패했습니다.');
  }
  
  return response.json();
}; 