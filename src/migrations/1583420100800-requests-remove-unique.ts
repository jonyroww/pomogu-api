import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableIndex
} from "typeorm";

export class requestsRemoveUnique1583420100800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "UQ_4f8a7e1a3fbd1caea1b5cc5671e" `
    );

    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "UQ_15831369ce9f4212e4c745f50aa"  `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createIndex(
      "requests",
      new TableIndex({
        name: "UQ_requests_phone",
        columnNames: ["phone"]
      })
    );

    await queryRunner.createIndex(
      "requests",
      new TableIndex({
        name: "UQ_requests_email",
        columnNames: ["email"]
      })
    );
  }
}
