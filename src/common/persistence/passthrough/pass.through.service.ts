/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from "@nestjs/common";
import { User } from "src/endpoints/users/entities/user.entity";
import { PersistenceInterface } from "../persistence.interface";

@Injectable()
export class PassThroughService implements PersistenceInterface {
  async createUser(user: User): Promise<User> {
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return [];
  }

  async findOneUser(_: string): Promise<User | undefined> {
    return undefined;
  }

  async deleteUser(_: string): Promise<void> {
  }
}
