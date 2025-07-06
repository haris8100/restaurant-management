import { UUID } from 'crypto';
import { STATUS } from 'src/constants';
import { DishEntity } from 'src/dish/entities/dish.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

export type PaymentStatus = 'pending' | 'paid' | 'failed';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToMany(() => DishEntity)
  @JoinTable()
  dishes: DishEntity[];

  @Column('decimal')
  totalPrice: number;

  @Column({ type: 'enum', enum: ['pending', 'paid', 'failed'], default: 'pending' })
  paymentStatus: PaymentStatus;

  @Column({ type: 'uuid', nullable: true, default: null })
  createdBy: UUID;

  @Column({ type: 'uuid', nullable: true, default: null })
  updatedBy: UUID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
