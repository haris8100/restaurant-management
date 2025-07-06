import { UUID } from 'crypto';
import { STATUS } from 'src/constants';
import { OrderEntity } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @Column({ nullable: false, default: STATUS.ACTIVE })
  status: STATUS;

  @Column({ type: 'uuid', nullable: true, default: null })
  createdBy: UUID;

  @Column({ type: 'uuid', nullable: true, default: null })
  updatedBy: UUID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 