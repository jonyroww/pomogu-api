import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class requestsRemoveUnique1583420100800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      "requests",
      "phone",
      new TableColumn({
        name: "phone",
        type: "varchar",
        isNullable: false,
        isUnique: false
      })
    );

    await queryRunner.changeColumn(
      "requests",
      "email",
      new TableColumn({
        name: "email",
        type: "varchar",
        isNullable: false,
        isUnique: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("requests");
  }
}
