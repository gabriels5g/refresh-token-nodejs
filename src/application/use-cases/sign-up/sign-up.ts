import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user-repository";

interface SingUpRequest {
  name: string;
  userName: string;
  email: string;
  password: string;
}

interface SingUpResponse {
  user: Record<string, any>;
}

export class SingUp {
  constructor(private userRepository: UserRepository) {}
  async execute(request: SingUpRequest): Promise<SingUpResponse> {
    const { name, userName, email, password } = request;

    const user = new User({
      name,
      userName,
      email,
      password,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
