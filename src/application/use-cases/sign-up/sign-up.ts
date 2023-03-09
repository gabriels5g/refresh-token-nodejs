import { AppError } from "../../../error/app-error";
import { EmailValidator } from "../../../helpers/email-validator";
import { PasswordValidator } from "../../../helpers/password-validator";
import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user-repository";

interface SingUpRequest {
  name: string;
  userName: string;
  email: string;
  password: string;
}

interface SingUpResponse {
  user: User;
}

export class SingUp {
  constructor(private userRepository: UserRepository) {}
  async execute(request: SingUpRequest): Promise<SingUpResponse> {
    const { name, userName, email, password } = request;
    const emailValidator = new EmailValidator();
    const passwordValidator = new PasswordValidator();

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("email already registered", 400);
    }

    if (!password) {
      throw new AppError("Email and/or password not provided", 400);
    }

    if (!email) {
      throw new AppError("Email and/or password not provided", 400);
    }

    if (!emailValidator.validate(email)) {
      throw new AppError("email format is invalid", 400);
    }

    if (!passwordValidator.validate(password)) {
      throw new AppError("password format is invalid", 400);
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
