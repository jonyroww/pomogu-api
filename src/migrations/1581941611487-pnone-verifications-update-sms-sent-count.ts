import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class pnoneVerificationsUpdateSmsSentCount1581941611487
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      "phone_verifications",
      "sms_sent_count",
      new TableColumn({
        name: "sms_sent_count",
        type: "int",
        isNullable: false,
        default: 0
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("phone_verifications");
  }
}
