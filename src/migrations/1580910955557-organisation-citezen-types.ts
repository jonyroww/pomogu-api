import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class organisationCitezenTypes1580910955557
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'organisation_citezen_types',
        foreignKeys: [
          {
            columnNames: ['organisation_id'],
            referencedTableName: 'organisations',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['citezen_types_id'],
            referencedTableName: 'citezen_types',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        columns: [
          {
            name: 'organisation_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'citezen_types_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('organisation_citezen_types');
  }
}
