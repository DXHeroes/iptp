import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Account } from '../../accounts/entity/account.entity';
import { BasicEntity } from '../../utils/basicEntity';

@Entity()
export class Transaction extends BasicEntity {
  @Column()
  tsId: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  currency: string;

  @Column()
  date: Date;

  @Column({ type: 'float' })
  tsAmount: number;

  @Column({ nullable: true })
  tsTo: string;

  @Column({ nullable: true })
  tsFrom?: string;

  @Column({ nullable: true })
  tsVS: string;

  @ManyToOne(
    () => Account,
    (account: Account) => account.transactions,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  account: Account;

  @Index()
  @Column()
  accountId: string;
}
