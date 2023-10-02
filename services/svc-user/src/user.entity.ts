import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'users', schema: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  email!: string;

  @Column({name: 'hashed_password'})
  hashedPassword!: string;

  @Column({name: 'role_id'})
  roleID!: number;

  @Column({name: 'sso_ticket', nullable: true})
  ssoTicket?: string;

  @Column({name: 'favorite_profile_id', nullable: true})
  favoriteProfileID?: number;

  @CreateDateColumn({name: 'created_at', type: 'timestamp'})
  createdAt?: Date;

  @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
  updatedAt?: Date;

  @DeleteDateColumn({name: 'deleted_at', type: 'timestamp'})
  deletedAt?: Date;
}
