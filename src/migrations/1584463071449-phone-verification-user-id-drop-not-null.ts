import { MigrationInterface, QueryRunner } from "typeorm";

export class phoneVerificationUserIdDropNotNull1584463071449
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "volunteer_requests" ALTER COLUMN "user_id" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "volunteer_requests" ALTER COLUMN "user_id" SET NOT NULL`
    );
  }
}
