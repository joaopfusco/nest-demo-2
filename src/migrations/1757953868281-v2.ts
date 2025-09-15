import { MigrationInterface, QueryRunner } from "typeorm";

export class V21757953868281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "users" (name, email, password, role, "createdAt", "updatedAt")
            VALUES ('admin', 'admin@email.com', '$argon2id$v=19$m=65536,t=3,p=4$H+vTINx343sSxU65qF8juQ$VCB3jGjUmMgS3vV1ZEJhu5Gm0++ntCpT9mXjhOY9Hmk', 'admin', NOW(), NOW())
        `);
        // password -> Admin@123
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "users" WHERE email = 'admin@email.com'
        `);
    }

}
