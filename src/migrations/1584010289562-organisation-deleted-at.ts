import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class organisationDeletedAt1584010289562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'organisations',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('organisations', 'deleted_at');
  }
}
