import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUserByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    pictureUrl: string,
  ): Promise<User> {
    const u = new User();
    u.firstName = firstName;
    u.lastName = lastName;
    u.email = email;
    u.pictureUrl = pictureUrl;
    return this.save(u);
  }

  async getUserById(id: string): Promise<User> {
    return this.findOne({ where: { id } });
  }
}
