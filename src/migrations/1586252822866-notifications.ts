import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class notifications1586252822866 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: "notifications",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isGenerated: true,
                        isPrimary: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        isNullable: false,
                        default: "NOW()"
                    },
                    {
                        name: "title",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "content",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "is_read",
                        type: "boolean",
                        isNullable: false,
                        default: false
                    }
              ]
            })
          );
        
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("notifications");
    }

}
