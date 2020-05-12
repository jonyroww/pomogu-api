import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class volunteerRequestsOrgs1581421171446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'volunteer_requests_orgs',
        indices: [
          {
            name: 'IX_volunteer_requests_orgs__volunteer_request_id',
            columnNames: ['volunteer_request_id'],
          },
          {
            name: 'IX_volunteer_requests_orgs__organisation_id',
            columnNames: ['organisation_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_volunteer_requests_orgs__volunteer_request_id',
            columnNames: ['volunteer_request_id'],
            referencedTableName: 'volunteer_requests',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_volunteer_requests_orgs__organisation_id',
            columnNames: ['organisation_id'],
            referencedTableName: 'organisations',
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
            name: 'organisation_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('volunteer_requests_orgs');
  }
}
