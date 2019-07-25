import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Initial1563975994826 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
        name: 'submission',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'created_date',
            type: 'date'
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      const table = await queryRunner.getTable('submission');

      await queryRunner.dropTable('submission')
    }

}
