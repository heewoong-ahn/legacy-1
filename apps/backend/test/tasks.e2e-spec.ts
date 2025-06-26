import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../src/tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../src/entities/user.entity';
import { JwtPayload } from '../src/auth/strategies/jwt.strategy';

describe('Tasks (e2e)', () => {
  let app: INestApplication;
  let taskRepository: Repository<Task>;
  let jwtService: JwtService;
  let jwtToken: string;

  const mockUser: User = {
    id: 'd08ad910-9be3-4cde-9534-dd025901f7a9',
    email: 'test@example.com',
    name: 'Test User',
    role: UserRole.USER,
    password: 'test-password',
    department: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    taskRepository = moduleFixture.get<Repository<Task>>(getRepositoryToken(Task));
    jwtService = moduleFixture.get<JwtService>(JwtService);
    
    const payload: JwtPayload = { sub: mockUser.id, email: mockUser.email, role: mockUser.role };
    jwtToken = jwtService.sign(payload);

    await taskRepository.query('DELETE FROM tasks');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /tasks', () => {
    const createTaskDto = {
        title: 'E2E Test Task',
        description: 'A task for e2e testing',
        department: 'Test Department',
        pm: 'Test PM',
        participants: ['tester1', 'tester2'],
        llm_model_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        expected_duration_days: 10,
        expected_effect: 'Great effect',
        usage_plan: 'Internal testing',
    };

    it('should not create a task if not authenticated (401)', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send(createTaskDto)
        .expect(401);
    });

    it('should not create a task with missing required fields (400)', () => {
      const incompleteDto = { ...createTaskDto, title: '' };
      return request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(incompleteDto)
        .expect(400);
    });

    it('should create a new task successfully (201)', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(createTaskDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.status).toEqual('pending');

      const savedTask = await taskRepository.findOneBy({ id: response.body.id });
      expect(savedTask).toBeDefined();
      expect(savedTask!.title).toEqual(createTaskDto.title);
      expect(savedTask!.submitter_id).toEqual(mockUser.id);
    });
  });
}); 