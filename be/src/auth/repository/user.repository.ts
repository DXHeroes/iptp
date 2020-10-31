import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
