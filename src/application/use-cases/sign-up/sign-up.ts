import { AppError } from "../../../error/app-error";
import { EmailValidator } from "../../../helpers/email-validator";
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
    const emailValidator = new EmailValidator();

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("email already registered", 400);
    }

    if (!emailValidator.validate(email)) {
      throw new AppError("email format is invalid", 400);
    }

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
