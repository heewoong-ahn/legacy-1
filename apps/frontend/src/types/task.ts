export enum TaskStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  submitter_id: string;
  department: string;
  pm: string;
  participants: string[];
  llm_model_id: string;
  expected_duration_days: number;
  expected_effect: string;
  usage_plan: string;
  status: TaskStatus;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export type CreateTaskDto = Omit<Task, 'id' | 'submitter_id' | 'status' | 'rejection_reason' | 'created_at' | 'updated_at'>; 