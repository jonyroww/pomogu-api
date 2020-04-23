import { Test, TestingModule } from "@nestjs/testing";
import { HelpTypesController } from "./help-types.controller";

describe("HelpTypes Controller", () => {
  let controller: HelpTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelpTypesController]
    }).compile();

    controller = module.get<HelpTypesController>(HelpTypesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
