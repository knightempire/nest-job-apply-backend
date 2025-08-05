import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return hi dev and db status for root()', async () => {
    const result = await appController.root();
    expect(result).toHaveProperty('message', 'hi dev');
    expect(result).toHaveProperty('db');
  });

  it('should add a job (mocked)', async () => {
    const body = { title: 'Test', company: 'TestCo' };
    const result = await appController.addJob(body);
    expect(result).toHaveProperty('success');
  });

  it('should get jobs (mocked)', async () => {
    const result = await appController.getJobs();
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('data');
  });
});
