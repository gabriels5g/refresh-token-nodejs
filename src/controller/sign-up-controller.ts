import express, { Request, Response } from "express";
import { SingUp } from "../application/use-cases/sign-up/sign-up";
import { PrismaRepository } from "../infra/database/repositories/prisma-repository";

export class SignUpController {
  async execute(req: Request, res: Response) {
    try {
      const { name, userName, email, password } = req.body;
      const userRepository = new PrismaRepository();
      const createUser = new SingUp(userRepository);

      const user = await createUser.execute({
        name,
        userName,
        email,
        password,
      });

      res.status(201).send(user);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}
