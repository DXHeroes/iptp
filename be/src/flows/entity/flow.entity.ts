import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { BasicEntity } from '../../utils/basicEntity';
import { AmountCondition } from '../interface/amountCondition.enum';

@Entity()
export class Flow extends BasicEntity {
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
