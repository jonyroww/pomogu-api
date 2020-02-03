import { Test, TestingModule } from "@nestjs/testing";
import { OrganisationsController } from "./organisations.controller";

describe("Organisations Controller", () => {
  let controller: OrganisationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationsController]
    }).compile();

    controller = module.get<OrganisationsController>(OrganisationsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
