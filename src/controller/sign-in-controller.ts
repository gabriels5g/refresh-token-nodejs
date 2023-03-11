import express, { Request, Response } from "express";
import { SingIn } from "../application/use-cases/SignIn/sign-in";
import { PrismaRepository } from "../infra/database/repositories/prisma-repository";

export class SignInController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userRepository = new PrismaRepository();
      const autheticateUseCase = new SingIn(userRepository);

      const token = await autheticateUseCase.execute({
        email,
        password,
      });

      res.status(201).send(token);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}
