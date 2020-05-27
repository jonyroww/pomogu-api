import {MigrationInterface, QueryRunner, TableIndex} from "typeorm";

export class usersDropUniquePhone1590585176601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "UQ_users__phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'UQ_requests_phone',
                columnNames: ['phone'],
                isUnique: true
            }),
        );

    }

}
