export class PasswordValidator {
  private readonly passwordRegex: RegExp;

  constructor() {
    this.passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  }

  public validate(password: string): boolean {
    return this.passwordRegex.test(password);
  }
}
