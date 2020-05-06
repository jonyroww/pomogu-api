import { Test, TestingModule } from "@nestjs/testing";
import { CitezenTypesService } from "./citezen-types.service";

describe("CitezenTypesService", () => {
  let service: CitezenTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitezenTypesService]
    }).compile();

    service = module.get<CitezenTypesService>(CitezenTypesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
