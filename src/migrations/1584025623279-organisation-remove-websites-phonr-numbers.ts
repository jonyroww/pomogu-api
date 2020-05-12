import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class organisationRemoveWebsitesPhonrNumbers1584025623279
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('organisations', 'phone_number');
    await queryRunner.dropColumn('organisations', 'website_address');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('organisations', [
      new TableColumn({
        name: 'phone_number',
        type: 'varchar',
        length: '255',
        isNullable: false,
      }),
      new TableColumn({
        name: 'website_address',
        type: 'varchar',
        isNullable: false,
      }),
    ]);
  }
}
