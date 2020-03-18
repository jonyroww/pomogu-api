import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from "typeorm";

export class phoneVerificationVerificationId1584461189767
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "volunteer_requests" ALTER COLUMN "verification_id" DROP NOT NULL`
    );

    await queryRunner.addColumn(
      "volunteer_requests",
      new TableColumn({ name: "user_id", type: "int", isNullable: true })
    );

    await queryRunner.createForeignKey(
      "volunteer_requests",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "volunteer_requests" ALTER COLUMN "verification_id" SET NOT NULL`
    );

    await queryRunner.dropColumn("volunteer_requests", "user_id");
  }
}
