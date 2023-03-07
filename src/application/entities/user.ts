import crypto from "crypto";

interface UserProps {
  name: string;
  userName: string;
  email: string;
  password: string;
}

export class User {
  private _id: string;

  public get id(): string {
    return this._id;
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
    this._id = crypto.randomUUID();
  }
}