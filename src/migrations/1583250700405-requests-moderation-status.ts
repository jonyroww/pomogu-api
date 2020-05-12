import { MigrationInterface, QueryRunner } from "typeorm";

export class requestsModerationStatus1583250700405
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "is_moderated" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "is_moderated" TYPE varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "is_moderated" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "requests" RENAME COLUMN "is_moderated" TO "moderation_status"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "requests" RENAME COLUMN "moderation_status" TO "is_moderated"`
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "is_moderated" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "is_moderated" TYPE boolean`
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "is_moderated" SET DEFAULT 0`
    );
  }
}
