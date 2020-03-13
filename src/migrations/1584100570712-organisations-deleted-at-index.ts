import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class organisationsDeletedAtIndex1584100570712
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createIndex(
      "organisations",
      new TableIndex({
        name: "IX_organisations_deleted_at",
        columnNames: ["deleted_at"]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex("organisations", "IX_organisations_deleted_at");
  }
}
