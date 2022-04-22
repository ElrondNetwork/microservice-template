import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class UserDb {
  @ObjectIdColumn()
  id?: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ default: true })
  isActive?: boolean;
}
