import {MigrationInterface, QueryRunner, TableIndex} from "typeorm";

export class usersFilterIndexChange1590668533359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "UQ_users_phone"`);
        await queryRunner.query(`DROP INDEX "UQ_users_email"`);

        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'UQ_users_phone',
                columnNames: ['phone'],
                isUnique: true,
                where: 'deleted_at IS NULL'
            }),
        );

        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'UQ_users_email',
                columnNames: ['email'],
                isUnique: true,
                where: 'deleted_at IS NULL'
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "UQ_users_phone"`);
        await queryRunner.query(`DROP INDEX "UQ_users_email"`);

        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'UQ_users_phone',
                columnNames: ['phone'],
                isUnique: true,
                where: 'deleted_at IS NOT NULL'
            }),
        );

        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'UQ_users_email',
                columnNames: ['email'],
                isUnique: true,
                where: 'deleted_at IS NOT NULL'
            }),
        );
    }

}
