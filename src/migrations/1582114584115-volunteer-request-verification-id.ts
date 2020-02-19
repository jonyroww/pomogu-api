import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class volunteerRequestVerificationId1582114584115
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "phone_verifications",
      new TableColumn({
        name: "verification_id",
        type: "int",
        isNullable: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("phone_verifications");
  }
}
