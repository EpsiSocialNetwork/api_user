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
    TypeOrmModule.forRoot(),
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