import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  addUser(@Body() user: User): void {
    this.userService.insert(user.username, user.password, user.email);
  }
}
