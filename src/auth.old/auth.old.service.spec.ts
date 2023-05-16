import { Test, TestingModule } from '@nestjs/testing';
import { AuthOldService } from './auth.old.service';

describe('AuthService', () => {
  let service: AuthOldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthOldService],
    }).compile();

    service = module.get<AuthOldService>(AuthOldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
