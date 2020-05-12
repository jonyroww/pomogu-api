import { MigrationInterface, QueryRunner } from 'typeorm';

export class requestsPhone1583236419840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "phone" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "phone" SET NOT NULL`,
    );
  }
}
