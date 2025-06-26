'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { fetchLlmModels, createLlmTest } from '@/lib/llm-api';
import { LlmModel, LlmTestResponse } from '@/types/llm';
import LlmModelCard from '@/components/llm-model-card';

export default function LlmPage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();
  
  const [models, setModels] = useState<LlmModel[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isTestLoading, setIsTestLoading] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<LlmTestResponse[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadModels();
    }
  }, [isAuthenticated]);

  const loadModels = async () => {
    try {
      const modelsData = await fetchLlmModels();
      setModels(modelsData);
      if (modelsData.length > 0) {
        setSelectedModelId(modelsData[0].id);
      }
    } catch (error) {
      console.error('모델 목록 로딩 실패:', error);
      setError('모델 목록을 불러오는데 실패했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedModelId || !prompt.trim()) {
      setError('모델을 선택하고 프롬프트를 입력해주세요.');
      return;
    }

    setIsTestLoading(true);
    setError('');

    try {
      const result = await createLlmTest({
        llm_model_id: selectedModelId,
        prompt: prompt.trim(),
      });
      
      setTestResults([result, ...testResults]);
      setPrompt('');
    } catch (error) {
      console.error('LLM 테스트 실패:', error);
      setError(error instanceof Error ? error.message : '테스트 실행 중 오류가 발생했습니다.');
    } finally {
      setIsTestLoading(false);
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'OpenAI':
        return 'bg-green-100 text-green-800';
      case 'Anthropic':
        return 'bg-blue-100 text-blue-800';
      case 'Google':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">LLM 테스트</h1>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                대시보드
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                안녕하세요, {user.name}님!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* LLM 테스트 폼 */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">새 LLM 테스트</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  LLM 모델 선택
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {models.map((model) => (
                    <LlmModelCard
                      key={model.id}
                      model={model}
                      isSelected={selectedModelId === model.id}
                      onSelect={setSelectedModelId}
                    />
                  ))}
                </div>
                {models.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    사용 가능한 LLM 모델이 없습니다.
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  프롬프트
                </label>
                <textarea
                  id="prompt"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="LLM에게 보낼 메시지를 입력하세요..."
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isTestLoading || !selectedModelId || !prompt.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTestLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    테스트 실행 중...
                  </>
                ) : (
                  '테스트 실행'
                )}
              </button>
            </form>
          </div>

          {/* 테스트 결과 */}
          {testResults.length > 0 && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">테스트 결과</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {testResults.map((result) => (
                  <div key={result.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{result.llm_model.name}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProviderColor(result.llm_model.provider)}`}>
                          {result.llm_model.provider}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(result.created_at).toLocaleString('ko-KR')}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">프롬프트:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{result.prompt}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">응답:</h4>
                      <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded-md whitespace-pre-wrap">{result.actual_output}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 