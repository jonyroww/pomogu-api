import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from "typeorm";

export class organisationPhoneNumbersAddOrganisationId1581511005989
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "organisation_phone_numbers",
      new TableColumn({
        name: "organisation_id",
        type: "int",
        isNullable: false
      })
    );

    await queryRunner.createForeignKey(
      "organisation_phone_numbers",
      new TableForeignKey({
        columnNames: ["organisation_id"],
        referencedTableName: "organisations",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("organisation_phone_numbers");
  }
}
