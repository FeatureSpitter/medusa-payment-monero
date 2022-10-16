import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoneroMigration1665927864 implements MigrationInterface {
    name = 'MoneroMigration1665927864';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE PUBLIC.monero_payment (
                id                  BIGSERIAL PRIMARY KEY,
                cart_id             TEXT NOT NULL UNIQUE,
                total_amount        REAL NOT NULL,
                user_email          TEXT,
                virtual_wallet_addr TEXT NOT NULL,
                virtual_wallet_pkey TEXT NOT NULL,
                virtual_wallet_vkey TEXT NOT NULL,
                created_a           TIMESTAMP WITH time zone NOT NULL DEFAULT Now(),
                updated_at          TIMESTAMP WITH time zone NOT NULL DEFAULT Now(),
                deleted_at          TIMESTAMP WITH time zone
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE public.monero_payment`)
    }
}