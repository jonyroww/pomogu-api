import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerRequestsController } from './volunteer-requests.controller';

describe('VolunteerRequests Controller', () => {
  let controller: VolunteerRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteerRequestsController],
    }).compile();

    controller = module.get<VolunteerRequestsController>(
      VolunteerRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
