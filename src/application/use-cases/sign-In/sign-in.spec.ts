import { describe, it, expect } from "vitest";
import { InMemoryUserRepository } from "../../../../test/in-memory-user-repository";
import { SingUp } from "../sign-up/sign-up";
import { SingIn } from "./sign-in";

describe("SignIn", () => {
  it("authentication must be performed", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new SingUp(userRepository);
    const authenticateUser = new SingIn(userRepository);

    await createUser.execute({
      name: "name-example",
      userName: "userName-example",
      email: "user@example.com",
      password: "Example10-password",
    });
    

    const result = await authenticateUser.execute({
      email: "user@example.com",
      password: "Example10-password",
    });
    expect(result).toHaveProperty("token");
  });

  it("should return an error if authentication fails", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new SingUp(userRepository);
    const authenticateUser = new SingIn(userRepository);

    await createUser.execute({
      name: "name-example",
      userName: "userName-example",
      email: "user@example.com",
      password: "Example10-password",
    });

    await expect(
      authenticateUser.execute({
        email: "user@example.com",
        password: "Example10password",
      })
    ).rejects.toThrow("email or password incorrect");
  });
});
