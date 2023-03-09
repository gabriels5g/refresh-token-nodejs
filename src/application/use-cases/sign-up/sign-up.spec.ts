import { describe, it, expect } from "vitest";
import { InMemoryUserRepository } from "../../../../test/in-memory-user-repository";

import { SingUp } from "./sign-up";

describe("SignUp", () => {
  it("  should return error 400 if email already exists", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new SingUp(userRepository);
    await createUser.execute({
      name: "user1",
      userName: "user1",
      email: "email@example.com",
      password: "Ga271200!",
    });

    await expect(
      createUser.execute({
        name: "user1",
        userName: "user1",
        email: "email@example.com",
        password: "Ga271200!",
      })
    ).rejects.toThrow("email already registered");
  });

  it("should return error 400 if email format is invalid", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new SingUp(userRepository);

    await expect(
      createUser.execute({
        name: "user3",
        userName: "userName3",
        email: "example-email-invalid",
        password: "Ga271200!",
      })
    ).rejects.toThrow("email format is invalid");
  });

  it("should return error 400 if password format is invalid", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new SingUp(userRepository);

    await expect(
      createUser.execute({
        name: "user4",
        userName: "userName4",
        email: "email1@example.com",
        password: "example-password",
      })
    ).rejects.toThrow("password format is invalid");
  });
});
