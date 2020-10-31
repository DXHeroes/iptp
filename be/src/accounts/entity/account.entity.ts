import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { Transaction } from '../../transactions/entity/transaction.entity';
import { BasicEntity } from '../../utils/basicEntity';

@Entity()
export class Account extends BasicEntity {
  @Column()
  balance: string;

  @Column()
  acNumber: string;

  @Index()
  @Column()
  acId: string;

  @Column()
  name: string;

  @Column()
  currency: string;

  @OneToMany(
    () => Transaction,
    (transaction: Transaction) => transaction.account,
  )
  transactions: Account[];

  @ManyToOne(
    () => User,
    (user: User) => user.accounts,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user: User;

  @Index()
  @Column()
  userId: string;
}
