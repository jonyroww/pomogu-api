import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class notificatinsIndex1587627524214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createIndex(
      "notifications",
      new TableIndex({
        name: "IX_notifications_user_id",
        columnNames: ["user_id"]
      })
    );
    await queryRunner.createIndex(
      "notifications",
      new TableIndex({
        name: "IX_notifications_created_at",
        columnNames: ["created_at"]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex("notifications", "IX_notifications_user_id");

    await queryRunner.dropIndex("notifications", "IX_notifications_created_at");
  }
}
