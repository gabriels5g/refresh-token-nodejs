import { sign } from "jsonwebtoken";

export class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "6aec3a41-acdf-41f8-8ac2-96ff32988531", {
      subject: userId,
      expiresIn: "60m",
    });
    return token;
  }
}
