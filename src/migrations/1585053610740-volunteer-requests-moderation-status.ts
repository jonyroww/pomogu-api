import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class volunteerRequestsModerationStatus1585053610740
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'volunteer_requests',
      new TableColumn({
        name: 'moderation_status',
        type: 'varchar',
        default: "'NOT_MODERATED'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('volunteer_requests', 'moderation_status');
  }
}
