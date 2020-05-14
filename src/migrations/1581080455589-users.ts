import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1581080455589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        indices: [
          {
            name: 'IX_users__created_at',
            columnNames: ['created_at'],
          },
          {
            name: 'UQ_users__phone',
            columnNames: ['phone'],
            isUnique: true,
          },
          {
            name: 'UQ_users__email',
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
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
