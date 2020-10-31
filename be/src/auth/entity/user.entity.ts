import { Column, Entity, Unique } from 'typeorm';
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
}
