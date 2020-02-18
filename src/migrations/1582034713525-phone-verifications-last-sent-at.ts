import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class phoneVerificationsLastSentAt1582034713525
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      "phone_verifications",
      "sms_last_sent_at",
      new TableColumn({
        name: "sms_last_sent_at",
        type: "timestamp with time zone",
        isNullable: false,
        default: "NOW()"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("phone_verifications");
  }
}
