import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class usersIsModeratedName1581092529692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "first_name",
        type: "varchar",
        isNullable: true
      }),
      new TableColumn({
        name: "middle_name",
        type: "varchar",
        isNullable: true
      }),
      new TableColumn({
        name: "last_name",
        type: "varchar",
        isNullable: true
      }),
      new TableColumn({
        name: "is_moderated",
        type: "boolean",
        isNullable: false,
        default: false
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumns("users", [
      new TableColumn({
        name: "first_name",
        type: "varchar",
        isNullable: true
      }),
      new TableColumn({
        name: "middle_name",
        type: "varchar",
        isNullable: true
      }),
      new TableColumn({
        name: "last_name",
        type: "varchar",
        isNullable: true
      }),
      new TableColumn({
        name: "is_moderated",
        type: "boolean",
        isNullable: false,
        default: false
      })
    ]);
  }
}
