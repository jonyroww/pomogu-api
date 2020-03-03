import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class requestsPhone1583236419840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      "requests",
      "phone",
      new TableColumn({
        name: "phone",
        type: "varchar",
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("requests");
  }
}
