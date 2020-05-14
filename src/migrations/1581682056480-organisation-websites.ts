import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class organisationWebsites1581682056480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'organisation_websites',
        foreignKeys: [
          {
            name: 'FK_organisation_websites__organisation_id',
            columnNames: ['organisation_id'],
            referencedTableName: 'organisations',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
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
            name: 'url',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'organisation_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('organisation_websites');
  }
}
