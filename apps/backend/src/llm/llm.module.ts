import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LlmController } from './llm.controller';
import { LlmService } from './llm.service';
import { LlmModel } from '../entities/llm-model.entity';
import { LlmTest } from '../entities/llm-test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LlmModel, LlmTest])],
  controllers: [LlmController],
  providers: [LlmService],
  exports: [LlmService],
})
export class LlmModule {} 