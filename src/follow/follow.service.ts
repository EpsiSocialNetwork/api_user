import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { FollowView } from "../entities/FollowView";

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowView)
    private followRepository: Repository<FollowView>
  ) {
  }

  findAll(): Promise<FollowView[]> {
    return this.followRepository.find();
  }

  createFollow(Follow: FollowView): Promise<InsertResult> {
    return this.followRepository.insert(Follow);
  }

  findAllFollowByUserUid(id: string): Promise<FollowView[]> {
    return this.followRepository.find({
      where: {
        uidUser: id
      }
    });
  }
}