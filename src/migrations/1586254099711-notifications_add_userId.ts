import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn
} from "typeorm";

export class notificationsAddUserId1586254099711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "notifications",
      new TableColumn({
        name: "user_id",
        type: "int",
        isNullable: false
      })
    );

    await queryRunner.createForeignKey(
      "notifications",
      new TableForeignKey({
        name: "FK_notifications_users_user_id",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn("notifications", "user_id");

    await queryRunner.dropForeignKey(
      "notifications",
      "FK_notifications_users_user_id"
    );
  }
}
