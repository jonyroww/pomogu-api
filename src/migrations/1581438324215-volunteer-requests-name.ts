import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class volunteerRequestsName1581438324215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('volunteer_requests', [
      new TableColumn({
        name: 'first_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'middle_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'last_name',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumns('volunteer_requests', [
      new TableColumn({
        name: 'first_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'middle_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'last_name',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }
}
