import { describe, it, expect } from "vitest";
import { PasswordValidatorAdapter } from "./password-validator";

describe("PasswordValidator Adapter", () => {
  it("should return false if the validator returns false", () => {
    const sut = new PasswordValidatorAdapter();
    const isValid = sut.isValid("password-invalid");
    expect(isValid).toBe(false);
  });

  it("should return true if the validator returns true", () => {
    const sut = new PasswordValidatorAdapter();
    const isValid = sut.isValid("Password-valid10");
    expect(isValid).toBe(true);
  });
});
