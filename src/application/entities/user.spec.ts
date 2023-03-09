import { describe, it, expect } from "vitest";
import { User } from "./user";

describe("User", () => {
  it("should create a user", () => {
    const sut = new User({
      name: "John",
      userName: "John123",
      email: "example@example.com",
      password: "example10-password",
    });

    expect(sut).toBeInstanceOf(User);
  });
});
