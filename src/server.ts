import express from "express";
import { SignUpController } from "../src/controller/sign-up-controller";
import { refreshTokenUserController } from "./controller/refresh-token-user-controlle";
import { SignInController } from "./controller/sign-in-controller";

const app = express();
app.use(express.json());

const createUser = new SignUpController();
const authUser = new SignInController();
const refreshToken = new refreshTokenUserController();

app.post("/users", createUser.execute);
app.post("/login", authUser.handle);
app.post("/refresh-token", refreshToken.handle);

app.listen({ port: 3000 });
