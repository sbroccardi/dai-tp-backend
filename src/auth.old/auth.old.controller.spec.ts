import { Test, TestingModule } from '@nestjs/testing';
import { AuthOldController } from './auth.old.controller';

describe('AuthController', () => {
  let controller: AuthOldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthOldController],
    }).compile();

    controller = module.get<AuthOldController>(AuthOldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
