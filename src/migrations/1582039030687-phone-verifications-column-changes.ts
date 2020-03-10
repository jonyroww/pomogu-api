import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class phoneVerificationsColumnChanges1582039030687
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "sms_last_sent_at"  DROP NOT NULL`
    );
    await queryRunner.addColumn(
      "phone_verifications",
      new TableColumn({
        name: "wrong_attempts_count",
        type: "int",
        isNullable: false,
        default: 0
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "sms_last_sent_at"  SET NOT NULL`
    );
    await queryRunner.dropColumn("phone_verifications", "wrong_attempts_count");
  }
}
