import { FastifyReply, FastifyRequest } from "fastify";
import { SingUp } from "../application/use-cases/sign-up/sign-up";
import { PrismaRepository } from "../infra/database/repositories/prisma-repository";

interface RequestController {
  name: string;
  userName: string;
  email: string;
  password: string;
}

export class SignUpController {
  async execute(req: FastifyRequest, res: FastifyReply) {
    const { name, userName, email, password } = req.body as RequestController;
    const userRepository = new PrismaRepository();
    const createUser = new SingUp(userRepository);

    const user = await createUser.execute({
      name,
      userName,
      email,
      password,
    });

    res.status(201).send(user);
  }
}
