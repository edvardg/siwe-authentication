import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1688461244828 implements MigrationInterface {
  name = 'Init1688461244828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "ethereumAddress" varchar NOT NULL, CONSTRAINT "UQ_b9cec72c07383aa782c56713a14" UNIQUE ("ethereumAddress"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_78a916df40e02a9deb1c4b75ed"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
