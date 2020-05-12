import {
  MigrationInterface,
  QueryRunner,
  TableIndex
} from "typeorm";

export class requestsRemoveUnique1583420100800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "UQ_requests_email"`);

    await queryRunner.query(`DROP INDEX "UQ_requests_phone"`);
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
