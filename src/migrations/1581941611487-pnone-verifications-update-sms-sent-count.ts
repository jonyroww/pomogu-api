import { MigrationInterface, QueryRunner } from "typeorm";

export class pnoneVerificationsUpdateSmsSentCount1581941611487
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "sms_sent_count" SET DEFAULT 0`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "sms_sent_count" DROP DEFAULT`
    );
  }
}
