import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { Roles } from "nest-keycloak-connect";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
// Services
import { UserService } from "./user.service";
import { FollowService } from "../follow/follow.service";

// Entities
import { UserView } from "../entities/UserView";
import { InsertResult } from "typeorm";

const validateUUID = require("uuid-validate");
const R = require("ramda");

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private readonly followService: FollowService) {
  }

  @Get()
  @Roles("myclient:USER")
  findAll(): Promise<UserView[]> {
    return this.userService.findAll();
  }

  @Post()
  @Roles("myclient:USER")
  @ApiParam({
    name: "user",
    description: "new user",
    type: UserView,
    required: true
  })
  @ApiBody({
    schema: {
      type: "User",
      example: {
        "uid": "043c250c-130f-4fea-b9fb-f247aaa550c3",
        "email": "my.email@company.com",
        "password": "mySecurePassword",
        "username": "BGdu44",
        "fullname": "Jean Michel",
        "description": "Optionnal",
        "pictureProfile": "003ca634-d627-4f9c-a722-f8d59d4bae2a",
        "codeCountry": "FR"
      }
    }
  })
  newUser(@Body() newUser: UserView): Promise<InsertResult> {
    let validate = R.ifElse(
      () => validateUUID(newUser.uid),
      () => this.userService.createUser(newUser),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }

  @Get("/:uid")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uid",
    description: "uuid of the user",
    type: String,
    required: true
  })
  findOne(@Param("uid") uid: string): Promise<UserView> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.userService.findOne(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }

  @Get("/:uid/follow")
  @Roles("myclient:USER")
  @ApiParam({
    name: "uid",
    description: "uuid of the user",
    type: String,
    required: true
  })
  findAllFollowByUserUid(@Param("uid") uid: string): Promise<UserView> {
    let validate = R.ifElse(
      () => validateUUID(uid),
      () => this.followService.findAllFollowByUserUid(uid),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }
}