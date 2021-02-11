import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username: username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  authenticate(username, password): Promise<boolean> {
    return this.usersRepository
      .findOne({
        username: username,
      })
      .then((user) => !!user && user.password === password);
  }

  insert(username, password, email): void {
    const user: User = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    this.usersRepository.insert(user);
  }
}
