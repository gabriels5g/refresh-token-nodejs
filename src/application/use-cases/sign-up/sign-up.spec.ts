import { describe, it, expect } from "vitest";
import { InMemoryUserRepository } from "../../../../test/in-memory-user-repository";
import { SingUp } from "./sign-up";

describe("SignUp", () => {
  it("should create a user", async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new SingUp(userRepository);
    await createUser.execute({
      name: "user1",
      userName: "user2",
      email: "user@example.com",
      password: "Ga271200!",
    });

    // Try to create another user with the same email
    await expect(
      createUser.execute({
        name: "user2",
        userName: "user1",
        email: "user@example.com",
        password: "Ga271200!",
      })
    ).rejects.toThrow("email already registered");
  });
});
