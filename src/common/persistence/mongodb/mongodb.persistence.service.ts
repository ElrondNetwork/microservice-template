import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PersistenceInterface } from "../persistence.interface";
import { User } from "src/endpoints/users/entities/user.entity";
import { CreateUserDto } from "src/endpoints/users/entities/dto/create.user.dto";
import { ApiUtils } from "src/utils/api.utils";
import { UserDb } from "./entities/user.db";

@Injectable()
export class MongoDbPersistenceService implements PersistenceInterface {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(UserDb)
    private readonly usersRepository: Repository<UserDb>,
  ) {
    this.logger = new Logger(MongoDbPersistenceService.name);
  }

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
    try {
      const userDb = await this.usersRepository.findOne(id);
      if (!userDb) {
        return undefined;
      }

      return ApiUtils.mergeObjects(new User(), userDb);
    } catch (error) {
      this.logger.log(`Error when getting user with id '${id}'`);
      this.logger.error(error);

      return undefined;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      this.logger.log(`Error when deleting user with id '${id}'`);
      this.logger.error(error);
    }
  }
}
