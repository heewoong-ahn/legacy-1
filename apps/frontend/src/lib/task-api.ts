import { fetchWithAuth } from './auth';
import { Task, CreateTaskDto } from '../types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * 새로운 과제 요청서를 제출합니다.
 * @param taskData 과제 생성에 필요한 데이터
 * @returns 생성된 과제의 일부 정보
 */
export const createTask = async (taskData: CreateTaskDto): Promise<Partial<Task>> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '과제 요청에 실패했습니다.');
  }

  return response.json();
};

/**
 * 과제 목록을 조회합니다.
 * @returns 사용자의 역할에 따라 필터링된 과제 목록
 */
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error('과제 목록을 불러오는 데 실패했습니다.');
  }

  return response.json();
}; 