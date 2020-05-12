import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class notificationsIndex1587627524214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createIndex(
      'notifications',
      new TableIndex({
        name: 'IX_notifications_user_id',
        columnNames: ['user_id'],
      }),
    );
    await queryRunner.createIndex(
      'notifications',
      new TableIndex({
        name: 'IX_notifications_created_at',
        columnNames: ['created_at'],
      }),
    );
    await queryRunner.createIndex(
      'notifications',
      new TableIndex({
        name: 'IX_notifications_is_read',
        columnNames: ['is_read'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex('notifications', 'IX_notifications_user_id');

    await queryRunner.dropIndex('notifications', 'IX_notifications_created_at');

    await queryRunner.dropIndex('notifications', 'IX_notifications_is_read');
  }
}
