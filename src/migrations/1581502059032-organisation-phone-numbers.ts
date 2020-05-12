import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class organisationPhoneNumbers1581502059032
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "organisation_phone_numbers",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true
          },
          {
            name: "phone_number",
            type: "varchar",
            isNullable: false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("organisation_phone_numbers");
  }
}
