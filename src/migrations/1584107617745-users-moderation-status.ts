import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class usersModerationStatus1584107617745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'is_moderated');
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'moderation_status',
        type: 'varchar',
        default: "'NOT_MODERATED'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'moderation_status');
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'is_moderated',
        type: 'boolean',
        default: 'false',
      }),
    );
  }
}
