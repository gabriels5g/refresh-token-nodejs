import { Request, Response } from "express";
import { refreshToken } from "../application/use-cases/refresh-token-users/refresh-token";

export class refreshTokenUserController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;
    try {
      const refreshTokenUseCase = new refreshToken();

      const token = await refreshTokenUseCase.execute(refresh_token);

      return res.json(token);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}
