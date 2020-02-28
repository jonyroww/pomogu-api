import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class requestsHelpTypes1582902474971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "requests_help_types",
        indices: [
          {
            name: "IX_requests_help_types__request_id",
            columnNames: ["request_id"]
          },
          {
            name: "IX_requests_help_types__help_type_id",
            columnNames: ["help_type_id"]
          }
        ],
        foreignKeys: [
          {
            name: "FK_requests_help_types__request_id",
            columnNames: ["request_id"],
            referencedTableName: "requests",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          },
          {
            name: "FK_requests_help_types__help_type_id",
            columnNames: ["help_type_id"],
            referencedTableName: "help_types",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          }
        ],
        columns: [
          {
            name: "request_id",
            type: "int",
            isNullable: false,
            isPrimary: true
          },
          {
            name: "help_type_id",
            type: "int",
            isNullable: false,
            isPrimary: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("requests_help_types");
  }
}
