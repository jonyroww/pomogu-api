import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class volunteerRequestsCitezenTypes1581424072060
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'volunteer_requests_citezen_types',
        indices: [
          {
            name: 'IX_volunteer_requests_citezen_types__volunteer_request_id',
            columnNames: ['volunteer_request_id'],
          },
          {
            name: 'IX_volunteer_requests_citezen_types__citezen_type_id',
            columnNames: ['citezen_type_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_volunteer_requests_citezen_types__volunteer_request_id',
            columnNames: ['volunteer_request_id'],
            referencedTableName: 'volunteer_requests',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_volunteer_requests_citezen_types__citezen_type_id',
            columnNames: ['citezen_type_id'],
            referencedTableName: 'citezen_types',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],

        columns: [
          {
            name: 'volunteer_request_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'citezen_type_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('volunteer_requests_citezen_types');
  }
}
