import { UUID } from 'crypto';
import { RestaurantEntity } from 'src/restaurant/entities/restaurant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { STATUS } from 'src/constants';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => RestaurantEntity, (restaurant: RestaurantEntity) => restaurant.categories)
  restaurants: RestaurantEntity[];

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
