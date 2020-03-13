import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";
import { ModerationStatus } from "src/constants/ModerationStatus.enum";

export class usersModerationStatus1584107617745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "is_moderated" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "is_moderated" TYPE varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "is_moderated" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "is_moderated" TO "moderation_status"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "moderation_status" TO "is_moderated"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "is_moderated" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "is_moderated" TYPE boolean`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "is_moderated" SET DEFAULT FALSE`
    );
  }
}
