import { AppError } from "../../../error/app-error"
import { prisma } from "../../../infra/database/repositories/prisma"
import { GenerateTokenProvider } from "../../../provider/generate-token-provider"

export class refreshToken {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })
    if(!refreshToken) {
      throw new AppError("refresh token invalid", 400)
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId)

    return { token }
  }
}