import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class volunteerRequestVerification1582116574592
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "volunteer_requests",
      new TableColumn({
        name: "verification_id",
        type: "int",
        isNullable: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn("volunteer_requests", "verification_id");
  }
}
