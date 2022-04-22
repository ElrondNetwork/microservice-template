import { CreateUserDto } from "src/endpoints/users/entities/dto/create.user.dto";
import { User } from "src/endpoints/users/entities/user.entity";

export interface PersistenceInterface {
  createUser(createUserDto: CreateUserDto): Promise<User>

  findAllUsers(): Promise<User[]>

  findOneUser(id: string): Promise<User | undefined>

  deleteUser(id: string): Promise<void>
}
