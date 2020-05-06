import { Test, TestingModule } from "@nestjs/testing";
import { CitezenTypesController } from "./citezen-types.controller";

describe("CitezenTypes Controller", () => {
  let controller: CitezenTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitezenTypesController]
    }).compile();

    controller = module.get<CitezenTypesController>(CitezenTypesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
