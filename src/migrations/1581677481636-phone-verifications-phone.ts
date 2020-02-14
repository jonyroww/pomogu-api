import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class phoneVerificationsPhone1581677481636
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "phone_verifications",
      new TableColumn({ name: "phone", type: "varchar", isNullable: false })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("phone_verifications");
  }
}
