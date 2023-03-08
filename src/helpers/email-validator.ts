export class EmailValidator {
  private readonly emailRegex: RegExp;

  constructor() {
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  public validate(email: string): boolean {
    return this.emailRegex.test(email);
  }
}
