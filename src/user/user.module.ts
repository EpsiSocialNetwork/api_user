import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";

// Entities Modules
import { UserService } from "./user.service";
import { FollowService } from "../follow/follow.service";

// Entities
import { UserView } from "../entities/UserView";
import { FollowView } from "../entities/FollowView";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserView, FollowView])
  ],
  controllers: [UserController],
  providers: [UserService, FollowService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {
}
