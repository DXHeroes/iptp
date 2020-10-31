import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Action } from '../../actions/entity/action.entity';
import { User } from '../../auth/entity/user.entity';
import { BasicEntity } from '../../utils/basicEntity';
import { AmountCondition } from '../interface/amountCondition.enum';

@Entity()
export class Flow extends BasicEntity {
  @Column()
  title: string;

  @Column({ nullable: true})
  from: string;

  @Column({ nullable: true})
  to: string;

  @Column({ nullable: true})
  amount: number;

  @Column({
    type: 'enum',
    enum: AmountCondition,
    default: AmountCondition.EQUAL,
    nullable: true
  })
  amountCond: AmountCondition;

  @Column({ nullable: true})
  date: Date;

  @Column({ nullable: true})
  category: string;

  @Column({ nullable: true})
  priority: number;

  @OneToMany(
    () => Action,
    (action: Action) => action.flow,
  )
  actions: Action[];

  @ManyToOne(
    () => User,
    (user: User) => user.flows,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user: User;

  @Index()
  @Column({ nullable: true})
  userId: string;
}
