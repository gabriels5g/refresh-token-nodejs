import { User } from "../src/application/entities/user";
import { UserRepository } from "../src/application/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = this.users.find((user) => user.email === email);

    if (foundUser) {
      return foundUser;
    }
    return null;
  }

  async findByUser(email: string): Promise<User | null> {
    const foundUser = this.users.find((user) => user.email === email);

    if (foundUser) {
      return foundUser;
    }
    return null;
  }
}
