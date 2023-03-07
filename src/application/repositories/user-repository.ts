import { User } from "../entities/user";

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<object>;
}
