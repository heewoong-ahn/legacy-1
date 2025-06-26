import { DataSource } from 'typeorm';
import { LlmModel } from '../entities/llm-model.entity';
import { LlmTest } from '../entities/llm-test.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'legacy_1',
  entities: [LlmModel, LlmTest],
  synchronize: true,
});

async function createLlmModels() {
  try {
    console.log('🔗 데이터베이스 연결 중...');
    await dataSource.initialize();
    console.log('✅ 데이터베이스 연결 성공');
    
    const llmModelRepository = dataSource.getRepository(LlmModel);
    
    // 기존 모델 확인
    const existingModels = await llmModelRepository.find();
    if (existingModels.length > 0) {
      console.log('⚠️  LLM 모델이 이미 존재합니다.');
      console.log(`현재 등록된 모델 수: ${existingModels.length}`);
      existingModels.forEach(model => {
        console.log(`- ${model.name} (${model.provider})`);
      });
      return;
    }
    
    console.log('🚀 LLM 모델 생성 시작...');
    
    // 기본 LLM 모델들 생성
    const models = [
      {
        name: 'GPT-4',
        provider: 'OpenAI',
        description: 'OpenAI의 고성능 언어 모델로, 복잡한 추론과 창작 작업에 뛰어난 성능을 보입니다.',
        is_active: true,
        config: {
          max_tokens: 4096,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
      },
      {
        name: 'GPT-3.5-turbo',
        provider: 'OpenAI',
        description: 'OpenAI의 빠르고 효율적인 언어 모델로, 일반적인 대화와 텍스트 작업에 적합합니다.',
        is_active: true,
        config: {
          max_tokens: 4096,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
      },
      {
        name: 'Claude-3',
        provider: 'Anthropic',
        description: 'Anthropic의 안전하고 유용한 AI 어시스턴트로, 긴 문맥 이해에 강점을 가집니다.',
        is_active: true,
        config: {
          max_tokens: 4096,
          temperature: 0.7,
          top_p: 1,
        },
      },
      {
        name: 'Gemini-Pro',
        provider: 'Google',
        description: 'Google의 멀티모달 AI 모델로, 텍스트와 이미지를 함께 처리할 수 있습니다.',
        is_active: true,
        config: {
          max_tokens: 4096,
          temperature: 0.7,
          top_p: 1,
        },
      },
    ];
    
    for (const modelData of models) {
      const model = llmModelRepository.create(modelData);
      await llmModelRepository.save(model);
      console.log(`✅ LLM 모델 생성됨: ${model.name} (${model.provider})`);
    }
    
    console.log('🎉 모든 LLM 모델이 성공적으로 생성되었습니다.');
    console.log(`총 ${models.length}개의 모델이 등록되었습니다.`);
    
  } catch (error) {
    console.error('❌ LLM 모델 생성 중 오류:', error);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 PostgreSQL 서버가 실행되고 있는지 확인해주세요.');
    } else if (error.code === '3D000') {
      console.error('💡 데이터베이스가 존재하지 않습니다. 데이터베이스를 먼저 생성해주세요.');
    } else if (error.code === '28P01') {
      console.error('💡 데이터베이스 인증 정보를 확인해주세요.');
    }
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 데이터베이스 연결 종료');
    }
  }
}

// 스크립트가 직접 실행될 때만 함수 호출
if (require.main === module) {
  createLlmModels();
}