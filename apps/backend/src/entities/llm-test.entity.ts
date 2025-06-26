import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LlmModel } from './llm-model.entity';

@Entity('llm_tests')
export class LlmTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  llm_model_id: string;

  @Column('text')
  prompt: string;

  @Column('text')
  actual_output: string;

  @Column('json', { nullable: true })
  metadata: any;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => LlmModel, (llmModel) => llmModel.llm_tests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'llm_model_id' })
  llm_model: LlmModel;
} 