import {MigrationInterface, QueryRunner, TableIndex} from "typeorm";

export class usersFilterIndex1590589561521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
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

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "UQ_users__phone"`);
        await queryRunner.query(`DROP INDEX "UQ_users__email"`);
    }

}
