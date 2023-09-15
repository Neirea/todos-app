import { BaseEntity } from 'typeorm';

export type EntityInstanceType<T extends abstract new (...args: any) => any> = Omit<
  InstanceType<T>,
  keyof BaseEntity
>;
