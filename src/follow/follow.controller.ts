import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { Roles } from "nest-keycloak-connect";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
// Services
import { FollowService } from "./follow.service";

// Entities
import { FollowView } from "../entities/FollowView";
import { InsertResult } from "typeorm";

const validateUUID = require("uuid-validate");
const R = require("ramda");

@ApiTags("follow")
@Controller("follow")
export class FollowController {
  constructor(private readonly followService: FollowService) {
  }

  @Get()
  @Roles("myclient:USER")
  findAll(): Promise<FollowView[]> {
    return this.followService.findAll();
  }

  @Post("")
  @Roles("myclient:USER")
  @ApiParam({
    name: "follow",
    description: "new follow",
    type: FollowView,
    required: true
  })
  @ApiBody({
    schema: {
      type: "Follow",
      example: {
        "uidUser": "043c250c-130f-4fea-b9fb-f247aaa550c3",
        "followUidUser": "e08460a6-b1c9-4b86-983f-de85cf6331fc"
      }
    }
  })
  newFollow(@Body() newFollow: FollowView): Promise<InsertResult> {
    let checkDifferenceUid = R.ifElse(
      () => !R.equals(newFollow.uidUser, newFollow.followUidUser),
      () => this.followService.createFollow(newFollow),
      () => {
        throw new HttpException("uidUser and followUidUser must be different", HttpStatus.BAD_REQUEST);
      }
    );

    let validate = R.ifElse(
      () => validateUUID(newFollow.uidUser) && validateUUID(newFollow.followUidUser),
      () => checkDifferenceUid(),
      () => {
        throw new HttpException("Incorrect uuid format", HttpStatus.BAD_REQUEST);
      }
    );
    return validate();
  }
}