import { findByEmailResponse } from "../../infra/database/repositories/response";
import { User } from "../entities/user";

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<findByEmailResponse | null>;
  abstract findByUser(email: string): Promise<findByEmailResponse | null>;
}
