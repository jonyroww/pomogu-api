import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class organisationType1580913473819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'organisations',
      new TableColumn({
        name: 'organisation_type',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('organisations', 'organisation_type');
  }
}
