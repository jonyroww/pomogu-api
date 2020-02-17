import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class pnoneVerificationsUpdateUserId1581942833469
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      "phone_verifications",
      "user_id",
      new TableColumn({
        name: "user_id",
        type: "int",
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("phone_verifications");
  }
}
