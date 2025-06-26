import { IsString, IsNotEmpty, IsArray, IsInt, Min, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  pm: string;

  @IsArray()
  @IsString({ each: true })
  participants: string[];

  @IsUUID()
  llm_model_id: string;

  @IsInt()
  @Min(1)
  expected_duration_days: number;

  @IsString()
  @IsNotEmpty()
  expected_effect: string;

  @IsString()
  @IsNotEmpty()
  usage_plan: string;
} 