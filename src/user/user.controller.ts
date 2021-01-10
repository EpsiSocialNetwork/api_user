import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { Roles } from "nest-keycloak-connect";
import { ApiParam, ApiTags } from "@nestjs/swagger";
// Services
import { UserService } from "./user.service";

// Entities
import { User } from "../entities/User";

const validateUUID = require("uuid-validate");
const R = require("ramda");

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @Roles("myclient:USER")
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get("/:uid")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uid",
    description: "uuid of the user",
    type: String,
    required: true
  })
  findOne(@Param("uid") uid: string): Promise<User> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.userService.findOne(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }
}