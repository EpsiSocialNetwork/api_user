import { Controller, Get } from '@nestjs/common';
import { Public } from "nest-keycloak-connect";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Public()
  home(){
    return `Welcome to API User`;
  }

  @Get("debug")
  @Public()
  debug(){
    return `
    KEYCLOAK_HOST: ${process.env.KEYCLOAK_HOST}
    KEYCLOAK_REALM: ${process.env.KEYCLOAK_REALM}
    KEYCLOAK_LOGING_LEVEL: ${process.env.KEYCLOAK_LOGING_LEVEL}
    KEYCLOAK_IGNORE_EXPIRATION: ${process.env.KEYCLOAK_IGNORE_EXPIRATION}
    KEYCLOAK_ALGORITHMS: ${process.env.KEYCLOAK_ALGORITHMS}
    KEYCLOAK_CLIENT_ID: ${process.env.KEYCLOAK_CLIENT_ID}
    KEYCLOAK_CLIENT_SECRET: ${process.env.KEYCLOAK_CLIENT_SECRET}
    `;
  }
}
