import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class volunteerRequestsHelpTypes1581423454051
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'volunteer_requests_help_types',
        indices: [
          {
            name: 'IX_volunteer_requests_help_types__volunteer_request_id',
            columnNames: ['volunteer_request_id'],
          },
          {
            name: 'IX_volunteer_requests_help_types__help_type_id',
            columnNames: ['help_type_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['volunteer_request_id'],
            referencedTableName: 'volunteer_requests',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['help_type_id'],
            referencedTableName: 'help_types',
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
            name: 'help_type_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('volunteer_requests_help_types');
  }
}
