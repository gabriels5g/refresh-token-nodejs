import crypto from "crypto";

interface UserProps {
  id?: string;
  userName: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  public get id(): string {
    return this.props.id;
  }

  public get userName(): string {
    return this.props.userName;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }
  public get password(): string {
    return this.props.password;
  }

  constructor(private props: UserProps) {
    this.props.id = crypto.randomUUID();
  }
}
