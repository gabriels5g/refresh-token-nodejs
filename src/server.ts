import fastify from "fastify";
import { SignUpController } from "../src/controller/sign-up-controller";
import { SignInController } from "./controller/sign-in-controller";

const app = fastify();

const createUser = new SignUpController();
const authUser = new SignInController();
app.post("/user", createUser.execute);

app.post("/auth", authUser.handle);

app.listen(3000);
