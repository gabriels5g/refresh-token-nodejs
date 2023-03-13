import { compare } from "bcryptjs";
import { AppError } from "../../../error/app-error";
import { prisma } from "../../../infra/database/repositories/prisma";
import { GenerateRefreshToken } from "../../../provider/generate-refresh-token";
import { GenerateTokenProvider } from "../../../provider/generate-token-provider";
import { UserRepository } from "../../repositories/user-repository";

interface SingInRequest {
  email: string;
  password: string;
}

export class SingIn {
  constructor(private userRepository: UserRepository) {}
  async execute(request: SingInRequest) {
    const { email, password } = request;

    const user = await this.userRepository.findByUser(email);

    if (!user) {
      throw new AppError("email or password incorrect", 400);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("email or password incorrect", 400);
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(user.id);

    await prisma.refreshToken.deleteMany({
      where: {
        userId: user.id,
      },
    });
    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(user.id);

    return { token, refreshToken };
  }
}
