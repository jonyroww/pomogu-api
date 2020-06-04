import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class userOwnOrganisationId1591273231276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'own_organisation_id',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'FK_users_own_organisation_id_organisations_id',
        columnNames: ['own_organisation_id'],
        referencedTableName: 'organisations',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'own_organisation_id');
    await queryRunner.dropForeignKey(
      'users',
      'FK_users_own_organisation_id_organisations_id',
    );
  }
}
