import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FollowController } from "./follow.controller";

// Entities Modules
import { FollowService } from "./follow.service";

// Entities
import { FollowView } from "../entities/FollowView";

@Module({
  imports: [TypeOrmModule.forFeature([FollowView])],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService, TypeOrmModule]
})
export class FollowModule {
}