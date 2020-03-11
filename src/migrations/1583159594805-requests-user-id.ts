import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class requestsUserId1583159594805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "requests" RENAME COLUMN "volunteer_id" TO "user_id"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "requests" RENAME COLUMN "user_id" TO "volunteer_id"`
    );
  }
}
