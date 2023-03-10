import { hash } from "bcryptjs";
import { AppError } from "../../../error/app-error";
import { EmailValidatorAdapter } from "../../../utils/email-validator";
import { PasswordValidatorAdapter } from "../../../utils/password-validator";
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
    const emailValidator = new EmailValidatorAdapter();
    const passwordValidator = new PasswordValidatorAdapter();

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

    if (!emailValidator.isValid(email)) {
      throw new AppError("email format is invalid", 400);
    }

    if (!passwordValidator.isValid(password)) {
      throw new AppError("password format is invalid", 400);
    }

    const passwordHash = await hash(password, 8);
    const user = new User({
      name,
      userName,
      email,
      password: passwordHash,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
