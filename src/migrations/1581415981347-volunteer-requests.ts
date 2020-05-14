import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class volunteerRequests1581415981347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'volunteer_requests',
        indices: [
          {
            name: 'UQ_volunteer_requests__phone',
            columnNames: ['phone'],
            isUnique: true,
          },
          {
            name: 'UQ_volunteer_requests__email',
            columnNames: ['email'],
            isUnique: true,
          },
        ],
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp without time zone',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp without time zone',
            isNullable: true,
          },
          {
            name: 'birth_date',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_individual',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'hide_contacts',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'need_expert_help',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'with_fund',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'allow_search_in_messengers',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('volunteer_requests');
  }
}
