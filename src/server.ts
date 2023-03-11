import express from "express";
import { SignUpController } from "../src/controller/sign-up-controller";
import { SignInController } from "./controller/sign-in-controller";

const app = express();
app.use(express.json());

const createUser = new SignUpController();
const authUser = new SignInController();
app.post("/signup", createUser.execute);

app.post("/login", authUser.handle);

app.listen({ port: 3000 });
