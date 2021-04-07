import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';
// Modules
import { KeycloakModule } from './auth/keycloak.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      name: "default",
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      schema: process.env.DATABASE_SCHEMA,
      connectTimeoutMS: 2500,
      entities: ["dist/entities/*{.ts,.js}"],
      synchronize: false,
      logging: true
    }),
    // All routes are controled by Keycloak
    KeycloakModule,
    UserModule,
    FollowModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private connection: Connection) {}
}