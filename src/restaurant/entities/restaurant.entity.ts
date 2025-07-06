import { UUID } from 'crypto';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { STATUS } from 'src/constants';
import { DishEntity } from 'src/dish/entities/dish.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('restaurants')
export class RestaurantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  coverImage: string;

  @ManyToMany(() => CategoryEntity, (category: CategoryEntity) => category.restaurants, { cascade: true })
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(() => DishEntity, (dish: DishEntity) => dish.restaurant)
  dishes: DishEntity[];

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
