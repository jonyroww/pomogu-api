import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class helpTypes1580827699356 implements MigrationInterface {
         public async up(queryRunner: QueryRunner): Promise<any> {
           await queryRunner.createTable(
             new Table({
               name: "help_types",
               columns: [
                 {
                   name: "id",
                   type: "int",
                   isGenerated: true,
                   isPrimary: true
                 },
                 {
                   name: "created_at",
                   type: "timestamp without time zone",
                   isNullable: false,
                   default: "NOW()"
                 },
                 {
                   name: "updated_at",
                   type: "timestamp without time zone",
                   isNullable: false,
                   default: "NOW()"
                 },
                 {
                   name: "title",
                   type: "text",
                   isNullable: true
                 }
               ]
             })
           );
         }

         public async down(queryRunner: QueryRunner): Promise<any> {
           await queryRunner.dropTable("help-types");
         }
       }
