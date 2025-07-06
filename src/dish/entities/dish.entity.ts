import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RestaurantEntity } from 'src/restaurant/entities/restaurant.entity';
import { STATUS } from 'src/constants';
import { UUID } from 'crypto';

@Entity('dishes')
export class DishEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => RestaurantEntity, (restaurant: RestaurantEntity) => restaurant.dishes)
  restaurant: RestaurantEntity;

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
