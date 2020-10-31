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

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  amount: string;

  @Column({
    type: 'enum',
    enum: AmountCondition,
    default: AmountCondition.EQUAL,
  })
  amountCond: AmountCondition;

  @Column()
  date: Date;

  @Column()
  category: string;

  @Column()
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
  @Column()
  userId: string;
}
