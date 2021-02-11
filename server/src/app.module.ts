import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { User } from './user/user.entity';
import { PostEntity } from './post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'uspldevazure-serverdb.postgres.database.azure.com',
      port: 5432,
      username: 'myadmin@uspldevazure-serverdb',
      password: 'Az123456789',
      database: 'uspldevazurdb',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'postgres',
      // database: 'uspidevazure',
      entities: [User, PostEntity],
      synchronize: true,
      autoLoadEntities: true,
      ssl: true,
    }),
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
