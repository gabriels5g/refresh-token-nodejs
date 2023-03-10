import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../error/app-error";
import { UserRepository } from "../../repositories/user-repository";

interface SingInRequest {
  email: string;
  password: string;
}

export class SingIn {
  constructor(private userRepository: UserRepository) {}
  async execute(request: SingInRequest) {
    const { email, password } = request;

    const UserExists = await this.userRepository.findByUser(email);

    if (!UserExists) {
      throw new AppError("email or password incorrect", 400);
    }

    const passwordMatch = await compare(password, UserExists.password);

    if (!passwordMatch) {
      throw new AppError("email or password incorrect", 400);
    }

    const token = sign({}, "6aec3a41-acdf-41f8-8ac2-96ff32988531", {
      subject: UserExists.id,
      expiresIn: "20s",
    });

    return { token };
  }
}
