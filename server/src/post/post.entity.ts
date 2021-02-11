import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1000 })
  text: string;

  @Column()
  title: string;

  // @Column({ type: 'timestamp' })
  @UpdateDateColumn()
  time: Date;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;
}
