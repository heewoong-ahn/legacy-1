import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LlmModel } from '../entities/llm-model.entity';
import { LlmTest } from '../entities/llm-test.entity';
import { CreateLlmTestDto } from './dto/create-llm-test.dto';
import { LlmTestResponseDto, LlmModelInfo } from './dto/llm-test-response.dto';

@Injectable()
export class LlmService {
  constructor(
    @InjectRepository(LlmModel)
    private llmModelRepository: Repository<LlmModel>,
    @InjectRepository(LlmTest)
    private llmTestRepository: Repository<LlmTest>,
  ) {}

  async createLlmTest(createLlmTestDto: CreateLlmTestDto): Promise<LlmTestResponseDto> {
    const { llm_model_id, prompt } = createLlmTestDto;

    // LLM 모델 존재 확인
    const llmModel = await this.llmModelRepository.findOne({
      where: { id: llm_model_id, is_active: true },
    });

    if (!llmModel) {
      throw new NotFoundException('Invalid LLM model ID');
    }

    // 실제 LLM API 호출 (현재는 모킹)
    const actualOutput = await this.callLlmApi(llmModel, prompt);

    // 테스트 결과 저장
    const llmTest = this.llmTestRepository.create({
      llm_model_id,
      prompt,
      actual_output: actualOutput,
    });

    const savedTest = await this.llmTestRepository.save(llmTest);

    // 응답 DTO 생성
    const llmModelInfo: LlmModelInfo = {
      id: llmModel.id,
      name: llmModel.name,
      provider: llmModel.provider,
    };

    return {
      id: savedTest.id,
      llm_model: llmModelInfo,
      prompt: savedTest.prompt,
      actual_output: savedTest.actual_output,
      created_at: savedTest.created_at,
    };
  }

  private async callLlmApi(llmModel: LlmModel, prompt: string): Promise<string> {
    // 실제 구현에서는 각 provider별로 다른 API를 호출해야 합니다.
    // 현재는 모킹된 응답을 반환합니다.
    
    try {
      // 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 모킹된 응답 생성
      const mockResponses: Record<string, string> = {
        'OpenAI': `안녕하세요! 저는 ${llmModel.name} 모델입니다. 요청하신 "${prompt}" 에 대한 응답을 제공드리겠습니다. 저는 다양한 AI 작업을 수행할 수 있는 언어 모델로서, 텍스트 생성, 질문 답변, 번역 등의 기능을 제공합니다.`,
        'Anthropic': `Claude입니다. "${prompt}" 에 대해 말씀드리자면, 저는 Anthropic에서 개발된 AI 어시스턴트로서 도움이 되고 정확한 정보를 제공하려고 노력합니다.`,
        'Google': `Gemini 모델입니다. "${prompt}" 질문에 대해 구글의 최신 AI 기술을 활용하여 응답드리겠습니다.`,
      };
      
      return mockResponses[llmModel.provider] || `${llmModel.name} 모델에서 "${prompt}" 에 대한 응답을 생성했습니다. 실제 API 연동이 필요합니다.`;
      
    } catch (error) {
      throw new BadRequestException(`LLM API 호출 중 오류가 발생했습니다: ${error.message}`);
    }
  }

  async getAllLlmModels(): Promise<LlmModel[]> {
    return this.llmModelRepository.find({
      where: { is_active: true },
      order: { created_at: 'DESC' },
    });
  }

  async getLlmModelById(id: string): Promise<LlmModel> {
    const model = await this.llmModelRepository.findOne({
      where: { id, is_active: true },
    });
    
    if (!model) {
      throw new NotFoundException('LLM model not found');
    }
    
    return model;
  }
} 