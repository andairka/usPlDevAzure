import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { CreatePostRequest } from './CreatePostRequest';
import { UsersService } from '../user/user.service';
import { User } from '../user/user.entity';
import { PostResponse } from './PostResponse';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getPosts(): Promise<PostResponse[]> {
    return this.postService
      .findAll()
      .then((entity: PostEntity[]) =>
        entity.map(
          (e: PostEntity) =>
            new PostResponse(e.text, e.title, e.time, e.user.username),
        ),
      );
  }

  @Post()
  async addPost(@Body() request: CreatePostRequest): Promise<void> {
    const authenticated = await this.userService.authenticate(
      request.username,
      request.password,
    );
    if (authenticated) {
      const user: User = await this.userService.findOneByUsername(
        request.username,
      );
      this.postService.insert(request.title, request.text, user);
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
