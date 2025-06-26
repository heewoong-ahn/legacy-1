import React from 'react';
import { LlmModel } from '@/types/llm';

interface LlmModelCardProps {
  model: LlmModel;
  isSelected: boolean;
  onSelect: (modelId: string) => void;
}

export default function LlmModelCard({ model, isSelected, onSelect }: LlmModelCardProps) {
  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'OpenAI':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Anthropic':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Google':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'OpenAI':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
        );
      case 'Anthropic':
        return (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        );
      case 'Google':
        return (
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">?</span>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={() => onSelect(model.id)}
    >
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
      
      <div className="flex items-start space-x-3">
        {getProviderIcon(model.provider)}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {model.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getProviderColor(model.provider)}`}>
              {model.provider}
            </span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2">
            {model.description}
          </p>
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-400">
            <span>활성 상태: {model.is_active ? '✅' : '❌'}</span>
            <span>생성일: {new Date(model.created_at).toLocaleDateString('ko-KR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 