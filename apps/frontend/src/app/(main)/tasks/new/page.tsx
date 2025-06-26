'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '@/lib/task-api';
import { CreateTaskDto } from '@/types/task';

export default function NewTaskPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateTaskDto>({
    title: '',
    description: '',
    department: '',
    pm: '',
    participants: [],
    llm_model_id: '',
    expected_duration_days: 7,
    expected_effect: '',
    usage_plan: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'expected_duration_days' ? parseInt(value, 10) : value,
    }));
  };
  
  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, participants: value.split(',').map(p => p.trim()) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Enhanced validation to match backend DTO
    const requiredFields: (keyof CreateTaskDto)[] = [
        'title', 'description', 'department', 'pm', 
        'llm_model_id', 'expected_effect', 'usage_plan'
    ];
    
    const missingField = requiredFields.find(field => !formData[field]);

    if (missingField) {
        setError(`필수 항목을 모두 입력해주세요: ${missingField}`);
        setIsLoading(false);
        return;
    }

    try {
      await createTask(formData);
      router.push('/tasks');
    } catch (err: any) {
      setError(err.message || '과제 요청에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">새 과제 요청</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">과제명</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">과제 설명</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">등록 부서</label>
            <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div>
            <label htmlFor="pm" className="block text-sm font-medium text-gray-700">과제 PM</label>
            <input type="text" id="pm" name="pm" value={formData.pm} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
        </div>
        <div>
          <label htmlFor="participants" className="block text-sm font-medium text-gray-700">참여자 (쉼표로 구분)</label>
          <input
            type="text"
            id="participants"
            name="participants"
            value={formData.participants.join(', ')}
            onChange={handleParticipantsChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="llm_model_id" className="block text-sm font-medium text-gray-700">사용 LLM 모델 ID</label>
            <input
              type="text"
              id="llm_model_id"
              name="llm_model_id"
              placeholder="모델의 UUID를 입력하세요"
              value={formData.llm_model_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="expected_duration_days" className="block text-sm font-medium text-gray-700">예상 기간 (일)</label>
            <input type="number" id="expected_duration_days" name="expected_duration_days" value={formData.expected_duration_days} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
        </div>
        <div>
          <label htmlFor="expected_effect" className="block text-sm font-medium text-gray-700">기대 효과</label>
          <textarea id="expected_effect" name="expected_effect" value={formData.expected_effect} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows={3} required />
        </div>
        <div>
          <label htmlFor="usage_plan" className="block text-sm font-medium text-gray-700">활용 계획</label>
          <textarea id="usage_plan" name="usage_plan" value={formData.usage_plan} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows={3} required />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
          {isLoading ? '제출 중...' : '제출하기'}
        </button>
      </form>
    </div>
  );
} 