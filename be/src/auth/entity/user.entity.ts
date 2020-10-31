import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Account } from '../../accounts/entity/account.entity';
import { BasicEntity } from '../../utils/basicEntity';

@Entity()
@Unique(['email'])
export class User extends BasicEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  pictureUrl: string;

  @OneToMany(
    () => Account,
    (account: Account) => account.user,
  )
  accounts: Account[];
}
