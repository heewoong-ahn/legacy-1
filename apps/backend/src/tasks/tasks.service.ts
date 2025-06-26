import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  /**
   * 새로운 과제 요청을 생성합니다.
   * @param createTaskDto 과제 생성 데이터
   * @param user 요청을 제출한 사용자
   * @returns 생성된 과제 정보
   */
  async create(createTaskDto: CreateTaskDto, user: User): Promise<Partial<Task>> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      submitter_id: user.id,
      status: TaskStatus.PENDING,
    });

    const savedTask = await this.tasksRepository.save(task);

    return {
        id: savedTask.id,
        status: savedTask.status,
        created_at: savedTask.created_at,
    };
  }

  /**
   * 과제 요청 목록을 조회합니다.
   * @param user 요청한 사용자
   * @returns 과제 목록
   */
  async findAll(user: User): Promise<Task[]> {
    if (user.role === UserRole.ADMIN) {
      return this.tasksRepository.find();
    }
    
    return this.tasksRepository.find({
      where: { submitter_id: user.id },
    });
  }
} 