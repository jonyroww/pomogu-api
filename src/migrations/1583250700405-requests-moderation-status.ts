import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class requestsModerationStatus1583250700405
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      "requests",
      "is_moderated",
      new TableColumn({
        name: "moderation_status",
        type: "varchar",
        isNullable: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("requests");
  }
}
