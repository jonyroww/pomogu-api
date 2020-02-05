import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class organisationHelpTypes1580908483740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "organisation_help_types",
        foreignKeys: [
          {
            columnNames: ["organisation_id"],
            referencedTableName: "organisations",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          },
          {
            columnNames: ["help_types_id"],
            referencedTableName: "help_types",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          }
        ],
        columns: [
          {
            name: "organisation_id",
            type: "int",
            isNullable: false,
            isPrimary: true
          },
          {
            name: "help_types_id",
            type: "int",
            isNullable: false,
            isPrimary: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("organisation_help_types");
  }
}
