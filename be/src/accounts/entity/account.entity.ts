import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { BasicEntity } from '../../utils/basicEntity';

@Entity()
export class Account extends BasicEntity {
  @Column()
  balance: number;

  @Column()
  code: number;

  @Column()
  acNumber: number;

  @Column()
  currency: string;

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
