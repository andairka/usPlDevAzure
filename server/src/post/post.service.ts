import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  findOne(id: string): Promise<PostEntity> {
    return this.postRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }

  insert(title, text, user: User): void {
    const postEntity: PostEntity = new PostEntity();
    postEntity.title = title;
    postEntity.text = text;
    postEntity.user = user;
    this.postRepository.insert(postEntity);
  }
}
