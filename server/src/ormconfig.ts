import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './packages/config/config.service';

/**
 * This is duplicated from the ConfigModule code as there's no straightforward way
 * to get it from main nest application object here
 */
const envFilename = '../.env' + (process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '')
const configService = new ConfigService(envFilename)

const config = {
  type: configService.get('DB_TYPE'),
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
} as TypeOrmModuleOptions;

export = config
