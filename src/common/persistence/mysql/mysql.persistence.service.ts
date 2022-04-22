import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PersistenceInterface } from "../persistence.interface";
import { User } from "src/endpoints/users/entities/user.entity";
import { CreateUserDto } from "src/endpoints/users/entities/dto/create.user.dto";
import { ApiUtils } from "src/utils/api.utils";
import { UserDb } from "./entities/user.db";

@Injectable()
export class MysqlPersistenceService implements PersistenceInterface {
  constructor(
    @InjectRepository(UserDb)
    private readonly usersRepository: Repository<UserDb>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new UserDb();
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;

    const userDb = await this.usersRepository.save(newUser);

    return ApiUtils.mergeObjects(new User(), userDb);
  }

  async findAllUsers(): Promise<User[]> {
    const usersDb = await this.usersRepository.find();
    return usersDb.map(userDb => ApiUtils.mergeObjects(new User(), userDb));
  }

  async findOneUser(id: string): Promise<User | undefined> {
    const userDb = await this.usersRepository.findOne(id);
    if (!userDb) {
      return undefined;
    }

    return ApiUtils.mergeObjects(new User(), userDb);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
