import { AppError } from "../../../error/app-error";
import dayjs from "dayjs";
import { prisma } from "../../../infra/database/repositories/prisma";
import { GenerateTokenProvider } from "../../../provider/generate-token-provider";
import { GenerateRefreshToken } from "../../../provider/generate-refresh-token";

export class refreshToken {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });
    if (!refreshToken) {  
      throw new AppError("refresh token invalid", 400);
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });

      const generateRefreshTokenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.userId
      );

      return { token, refreshToken: newRefreshToken    };
    }

    return { token };
  }
}
