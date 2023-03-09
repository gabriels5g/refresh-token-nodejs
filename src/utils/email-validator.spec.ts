import { describe, it, expect } from "vitest";
import { EmailValidatorAdapter } from "./email-validator";

describe("EmailValidator Adapter", () => {
  it("should return false if the validator returns false", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("invalid_email.com");
    expect(isValid).toBe(false);
  });

  it("should return true if the validator returns true", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("valid_email@email.com");
    expect(isValid).toBe(true);
  });
});
