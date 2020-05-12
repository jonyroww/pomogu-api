import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class phoneVerificationsPurposeUsed1581674205851
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('phone_verifications', [
      new TableColumn({
        name: 'purpose',
        type: 'varchar',
        isNullable: false,
      }),
      new TableColumn({
        name: 'used',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumns('phone_verifications', [
      new TableColumn({
        name: 'purpose',
        type: 'varchar',
        isNullable: false,
      }),
      new TableColumn({
        name: 'used',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    ]);
  }
}
