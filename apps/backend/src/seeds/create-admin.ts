import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';

async function createAdminUser(): Promise<void> {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'legacy_1',
    entities: [User],
    synchronize: true,
  });

  try {
    await dataSource.initialize();
    console.log('데이터베이스 연결 성공');

    const userRepository = dataSource.getRepository(User);

    // 기존 관리자 계정 확인
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@example.com' },
    });

    if (existingAdmin) {
      console.log('관리자 계정이 이미 존재합니다.');
      return;
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // 관리자 계정 생성
    const admin = userRepository.create({
      email: 'admin@example.com',
      password: hashedPassword,
      name: '관리자',
      department: 'IT부서',
      role: UserRole.ADMIN,
    });

    await userRepository.save(admin);
    console.log('관리자 계정이 생성되었습니다.');
    console.log('이메일: admin@example.com');
    console.log('비밀번호: admin123');

    // 일반 사용자 계정도 생성
    const existingUser = await userRepository.findOne({
      where: { email: 'user@example.com' },
    });

    if (!existingUser) {
      const userPassword = await bcrypt.hash('user123', 10);
      const user = userRepository.create({
        email: 'user@example.com',
        password: userPassword,
        name: '일반사용자',
        department: '개발팀',
        role: UserRole.USER,
      });

      await userRepository.save(user);
      console.log('일반 사용자 계정이 생성되었습니다.');
      console.log('이메일: user@example.com');
      console.log('비밀번호: user123');
    }
  } catch (error) {
    console.error('에러 발생:', error);
  } finally {
    await dataSource.destroy();
  }
}

// 환경 변수 로드
require('dotenv').config();

// 스크립트 실행
createAdminUser(); 