import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  RelationId,
  UpdateDateColumn
} from 'typeorm';
import { GenericEntity } from './generic.entity';
import type { User } from './user.entity';

@Entity('todo')
export class Todo extends GenericEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  is_completed: boolean;

  @Column()
  is_private: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne('user', 'todo')
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @Column('uuid')
  @RelationId('user')
  user_id: string;
}
