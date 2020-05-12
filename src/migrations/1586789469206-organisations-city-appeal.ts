import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class organisationsCityAppeal1586789469206
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('organisations', [
      new TableColumn({ name: 'city', type: 'varchar', isNullable: true }),
      new TableColumn({
        name: 'appeal_to_volunteer',
        type: 'text',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumns('organisations', [
      new TableColumn({ name: 'city', type: 'varchar', isNullable: true }),
      new TableColumn({
        name: 'appeal_to_volunteer',
        type: 'text',
        isNullable: true,
      }),
    ]);
  }
}
