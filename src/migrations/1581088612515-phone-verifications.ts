import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class registrations1581088612515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "phone_verifications",
        indices: [
          {
            name: "IX_registrations__user_id",
            columnNames: ["user_id"]
          }
        ],
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
            name: "key",
            type: "varchar",
            isNullable: false
          },

          {
            name: "role",
            type: "varchar",
            isNullable: true
          },
          {
            name: "sms_sent_count",
            type: "int",
            isNullable: false
          },
          {
            name: "sms_last_sent_at",
            type: "timestamp with time zone",
            isNullable: true
          },
          {
            name: "sms_code",
            type: "varchar",
            isNullable: true
          },
          {
            name: "success",
            type: "boolean",
            isNullable: true,
            default: false
          },
          {
            name: "user_id",
            type: "int"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("phone_verifications");
  }
}
