import { Test, TestingModule } from '@nestjs/testing';
import { HelpTypesService } from './help-types.service';

describe('HelpTypesService', () => {
  let service: HelpTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpTypesService],
    }).compile();

    service = module.get<HelpTypesService>(HelpTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
