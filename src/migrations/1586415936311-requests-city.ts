import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class requestsCity1586415936311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'requests',
      new TableColumn({ name: 'city', type: 'varchar', isNullable: false }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('requests', 'city');
  }
}
