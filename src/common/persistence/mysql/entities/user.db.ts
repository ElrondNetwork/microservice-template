import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserDb {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ default: true })
  isActive?: boolean;
}
