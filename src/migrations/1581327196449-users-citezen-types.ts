import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class usersCitezenTypes1581327196449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "users_citezen_types",
        indices: [
          {
            name: "IX_users_citezen_types__user_id",
            columnNames: ["user_id"]
          },
          {
            name: "IX_users_citezen_types__citezen_type_id",
            columnNames: ["citezen_type_id"]
          }
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          },
          {
            columnNames: ["citezen_type_id"],
            referencedTableName: "citezen_types",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          }
        ],
        columns: [
          {
            name: "user_id",
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
    await queryRunner.dropTable("users_citezen_types");
  }
}
