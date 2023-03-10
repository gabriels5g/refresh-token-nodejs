import { User } from "../../../application/entities/user";
import { UserRepository } from "../../../application/repositories/user-repository";
import { prisma } from "./prisma";
import { findByEmailResponse } from "./response";

export class PrismaRepository implements UserRepository {
  async create(user: User) {
    await prisma.user.create({
      data: {
        id: user.id,
        userName: user.name,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
  async findByEmail(email: string): Promise<findByEmailResponse | null> {
    const userAlreadyExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userAlreadyExist) {
      return null;
    }
    return userAlreadyExist;
  }

  async findByUser(email: string): Promise<findByEmailResponse | null> {
    const userAlreadyExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userAlreadyExist) {
      return null;
    }
    return userAlreadyExist;
  }
}
