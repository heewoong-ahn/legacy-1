import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateLlmTestDto {
  @IsUUID()
  @IsNotEmpty()
  llm_model_id: string;

  @IsString()
  @IsNotEmpty()
  prompt: string;
} 