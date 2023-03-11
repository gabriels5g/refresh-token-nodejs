import { findByEmailResponse } from "../../infra/database/repositories/response";
import { User } from "../entities/user";

export interface UserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<findByEmailResponse | null>;
  findByUser(email: string): Promise<findByEmailResponse | null>;
}
