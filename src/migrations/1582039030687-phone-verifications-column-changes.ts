import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class phoneVerificationsColumnChanges1582039030687
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      "phone_verifications",
      "sms_last_sent_at",
      new TableColumn({
        name: "sms_last_sent_at",
        type: "timestamp with time zone",
        isNullable: true
      })
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
    await queryRunner.dropTable("phone_verifications");
  }
}
