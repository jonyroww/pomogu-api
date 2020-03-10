import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class pnoneVerificationsUpdateUserId1581942833469
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "user_id" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "phone_verifications" ALTER COLUMN "user_id" SET NOT NULL`
    );
  }
}
