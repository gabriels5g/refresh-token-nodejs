import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../infra/database/repositories/prisma";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Token is missing",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const decodedToken = verify(
      token,
      "6aec3a41-acdf-41f8-8ac2-96ff32988531"
    ) as { sub: string };
    const userId = decodedToken.sub;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        name: true,
      },
    });

    if (!user) {
      return response.status(401).json({
        message: "User not found",
      });
    }

    // Adicione o usuário no objeto request para que ele possa ser acessado pelos próximos middlewares ou rotas
    response.json(user);

    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Token Invalid ",
    });
  }
}
