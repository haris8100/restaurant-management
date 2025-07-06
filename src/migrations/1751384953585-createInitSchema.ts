import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInitSchema1751384953585 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Create tables
        await queryRunner.createTable(new Table({
            name: 'restaurants',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'location',
                    type: 'varchar',
                },
                {
                    name: 'coverImage',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'status',
                    type: 'smallint',


                    default: 1,
                    comment: "1 Active, 2 Deleted"
                },
                {
                    name: 'createdBy',
                    type: 'varchar',
                },
                {
                    name: 'updatedBy',
                    type: 'varchar',
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: 'now()',
                }
            ]
        }), true);

        // Add foreign key etc... where we need to add manual table changes
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "restaurants";
        `);
    }

}
