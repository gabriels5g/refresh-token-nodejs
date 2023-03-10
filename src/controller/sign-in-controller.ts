import { FastifyReply, FastifyRequest } from "fastify";
import { SingIn } from "../application/use-cases/SignIn/sign-in";
import { PrismaRepository } from "../infra/database/repositories/prisma-repository";

interface RequestController {
  name: string;
  userName: string;
  email: string;
  password: string;
}

export class SignInController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { email, password } = req.body as RequestController;
    const userRepository = new PrismaRepository();
    const autheticateUseCase = new SingIn(userRepository);

    const token = await autheticateUseCase.execute({
      email,
      password,
    });

    res.status(201).send(token);
  }
}
