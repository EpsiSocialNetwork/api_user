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
}
