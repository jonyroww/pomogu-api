import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class requestsCitezenTypes1582903615081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "requests_citezen_types",
        indices: [
          {
            name: "IX_requests_citezen_types__request_id",
            columnNames: ["request_id"]
          },
          {
            name: "IX_requests_citezen_types__citezen_type_id",
            columnNames: ["citezen_type_id"]
          }
        ],
        foreignKeys: [
          {
            name: "FK_requests_citezen_types__request_id",
            columnNames: ["request_id"],
            referencedTableName: "requests",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          },
          {
            name: "FK_requests_citezen_types__citezen_type_id",
            columnNames: ["citezen_type_id"],
            referencedTableName: "citezen_types",
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
            name: "citezen_type_id",
            type: "int",
            isNullable: false,
            isPrimary: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("requests_citezen_types");
  }
}
