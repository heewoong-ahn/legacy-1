import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { LlmService } from './llm.service';
import { CreateLlmTestDto } from './dto/create-llm-test.dto';
import { LlmTestResponseDto } from './dto/llm-test-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LlmModel } from '../entities/llm-model.entity';

@Controller('llm-tests')
@UseGuards(JwtAuthGuard)
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post()
  async createLlmTest(@Body() createLlmTestDto: CreateLlmTestDto): Promise<LlmTestResponseDto> {
    return this.llmService.createLlmTest(createLlmTestDto);
  }

  @Get('models')
  async getAllLlmModels(): Promise<LlmModel[]> {
    return this.llmService.getAllLlmModels();
  }

  @Get('models/:id')
  async getLlmModelById(@Param('id') id: string): Promise<LlmModel> {
    return this.llmService.getLlmModelById(id);
  }
} 