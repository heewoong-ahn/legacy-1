import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, User } from '../entities/user.entity';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * 과제 요청서를 작성하고 제출합니다.
   * @param createTaskDto 과제 요청 데이터
   * @param user 인증된 사용자 객체
   * @returns 생성된 과제의 ID, 상태, 생성일
   */
  @Post()
  @Roles(UserRole.USER)
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  /**
   * 과제 요청 목록을 조회합니다. (관리자: 전체, 사용자: 본인 것)
   * @param user 인증된 사용자 객체
   * @returns 과제 목록
   */
  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAll(@CurrentUser() user: User) {
    return this.tasksService.findAll(user);
  }
} 