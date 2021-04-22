import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from "typeorm";
import { UserView } from '../entities/UserView';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserView)
    private userRepository: Repository<UserView>,
  ) {}

  findAll(): Promise<UserView[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<UserView| undefined> {
    return this.userRepository.findOne({ where: { uid: id } });
  }

  createUser(user: UserView): Promise<InsertResult> {
    return this.userRepository.insert(user);
  }
}
