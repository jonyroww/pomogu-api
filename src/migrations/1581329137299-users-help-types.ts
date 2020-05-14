import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class usersHelpTypes1581329137299 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users_help_types',
        indices: [
          {
            name: 'IX_users_help_types__user_id',
            columnNames: ['user_id'],
          },
          {
            name: 'IX_users_help_types__help_type_id',
            columnNames: ['help_type_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
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
            name: 'user_id',
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
    await queryRunner.dropTable('users_help_types');
  }
}
