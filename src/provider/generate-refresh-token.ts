import { prisma } from "../infra/database/repositories/prisma";
import dayjs from "dayjs";
import { AppError } from "../error/app-error";

export class GenerateRefreshToken {
  async execute(userId: string) {
    try {
      const expiresIn = dayjs().add(60, "minutes").unix();

      const generateRefreshToken = await prisma.refreshToken.create({
        data: {
          userId,
          expiresIn,
        },
      });

      return generateRefreshToken;
    } catch (error) {
      throw new AppError("error", 400);
    }
  }
}
