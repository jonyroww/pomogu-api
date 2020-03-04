import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class requests1582901731143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "requests",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true
          },
          {
            name: "created_at",
            type: "timestamp without time zone",
            isNullable: false,
            default: "NOW()"
          },
          {
            name: "updated_at",
            type: "timestamp without time zone",
            isNullable: false,
            default: "NOW()"
          },
          {
            name: "deleted_at",
            type: "timestamp without time zone",
            isNullable: true
          },
          {
            name: "first_name",
            type: "varchar",
            isNullable: true
          },
          {
            name: "middle_name",
            type: "varchar",
            isNullable: true
          },
          {
            name: "last_name",
            type: "varchar",
            isNullable: true
          },
          {
            name: "email",
            type: "varchar",
            isNullable: true,
            isUnique: true
          },
          {
            name: "phone",
            type: "varchar",
            isNullable: false,
            isUnique: true
          },
          {
            name: "comment",
            type: "text",
            isNullable: true
          },
          {
            name: "is_moderated",
            type: "boolean",
            isNullable: true,
            default: null
          },
          {
            name: "volunteer_id",
            type: "int",
            isNullable: true
          },
          {
            name: "status",
            type: "varchar",
            isNullable: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("requests");
  }
}
