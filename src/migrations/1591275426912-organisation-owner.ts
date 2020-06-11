import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class organisationOwner1591275426912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'organisations',
      new TableColumn({
        name: 'owner_id',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'organisations',
      new TableForeignKey({
        name: 'FK_organisations_owner_id_users_id',
        columnNames: ['owner_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      'organisations',
      'FK_organisations_owner_id_users_id',
    );
    await queryRunner.dropColumn('organisations', 'owner_id');
  }
}
