import {MigrationInterface, QueryRunner, TableIndex} from "typeorm";

export class usersDropUniqueEmail1590586577071 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "UQ_users__email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'UQ_requests_email',
                columnNames: ['email'],
                isUnique: true
            }),
        );
    }

}
