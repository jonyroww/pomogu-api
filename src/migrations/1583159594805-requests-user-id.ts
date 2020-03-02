import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class requestsUserId1583159594805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      "requests",
      "volunteer_id",
      new TableColumn({ name: "user_id", type: "int", isNullable: false })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("requests");
  }
}
