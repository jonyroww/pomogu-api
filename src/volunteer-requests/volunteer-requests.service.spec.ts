import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerRequestsService } from './volunteer-requests.service';

describe('VolunteerRequestsService', () => {
  let service: VolunteerRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerRequestsService],
    }).compile();

    service = module.get<VolunteerRequestsService>(VolunteerRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
