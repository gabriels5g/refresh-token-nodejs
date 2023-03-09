import validator from "validator";
import { PasswordValidator } from "../protocols/password-validator";

export class PasswordValidatorAdapter implements PasswordValidator {
  isValid(password: string): boolean {
    return validator.isStrongPassword(password);
  }
}
