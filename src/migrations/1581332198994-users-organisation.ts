import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class usersOrganisation1581332198994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users_organisations',
        indices: [
          {
            name: 'IX_users_organisations__user_id',
            columnNames: ['user_id'],
          },
          {
            name: 'IX_users_organisations__organisation_id',
            columnNames: ['organisation_id'],
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
            columnNames: ['organisation_id'],
            referencedTableName: 'organisations',
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
    await queryRunner.dropTable('users_organisations');
  }
}
