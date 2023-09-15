import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import type { Todo } from './todo.entity';

@Entity('user')
export class User extends GenericEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  verification_token: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ type: 'text', nullable: true })
  password_reset_token: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  password_reset_token_expires_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany('todo', 'user', { onDelete: 'CASCADE' })
  todos: Relation<Todo[]>;
}
