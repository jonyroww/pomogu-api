import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class phoneVerificationsLastSentAt1582034713525
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "sms_last_sent_at"  SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "sms_last_sent_at"  SET DEFAULT NOW()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "sms_last_sent_at"  DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "sms_last_sent_at"  DROP DEFAULT `
    );
  }
}
