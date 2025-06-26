import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// Assuming these entities will be created.
// import { User } from '../../users/entities/user.entity';
// import { LlmModel } from '../../llm-models/entities/llm-model.entity';

export enum TaskStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'submitter_id' })
  // submitter: User;
  @Column({ type: 'uuid', name: 'submitter_id' })
  submitter_id: string;


  @Column()
  department: string;

  @Column()
  pm: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  participants: string[];

  // @ManyToOne(() => LlmModel)
  // @JoinColumn({ name: 'llm_model_id' })
  // llm_model: LlmModel;
  @Column({ type: 'uuid', name: 'llm_model_id' })
  llm_model_id: string;


  @Column({ name: 'expected_duration_days' })
  expected_duration_days: number;

  @Column('text', { name: 'expected_effect' })
  expected_effect: string;

  @Column('text', { name: 'usage_plan' })
  usage_plan: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column('text', { name: 'rejection_reason', nullable: true })
  rejection_reason: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
} 