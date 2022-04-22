import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PersistenceService } from 'src/common/persistence/persistence.service';
import { CreateUserDto } from './entities/dto/create.user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly persistenceService: PersistenceService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.persistenceService.createUser(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.persistenceService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.persistenceService.findOneUser(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.persistenceService.deleteUser(id);
  }
}
