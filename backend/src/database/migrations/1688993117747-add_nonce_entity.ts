import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNonceEntity1688993117747 implements MigrationInterface {
  name = 'AddNonceEntity1688993117747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "nonce" ("ethereumAddress" varchar PRIMARY KEY NOT NULL, "nonce" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "nonce"`);
  }
}
