import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class typesDeletedAt1583920151007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "citezen_types",
      new TableColumn({
        name: "deleted_at",
        type: "timestamp without time zone",
        isNullable: true
      })
    );

    await queryRunner.addColumn(
      "help_types",
      new TableColumn({
        name: "deleted_at",
        type: "timestamp without time zone",
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn("citezen_types", "deleted_at");
    await queryRunner.dropColumn("help_types", "deleted_at");
  }
}
