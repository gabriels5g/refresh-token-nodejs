import cors from "cors";
import express from "express";
import { SignUpController } from "../src/controller/sign-up-controller";
import { refreshTokenUserController } from "./controller/refresh-token-user-controlle";
import { SignInController } from "./controller/sign-in-controller";
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";

const app = express();
app.use(cors());
app.use(express.json());

const createUser = new SignUpController();
const authUser = new SignInController();
const refreshToken = new refreshTokenUserController();

app.post("/users", createUser.execute);
app.post("/login", authUser.handle);
app.post("/refresh-token", refreshToken.handle);

app.get("/me", ensureAuthenticated, (req, res) => {
  const user = res.json({
    message: "logado",
  });

  res.json(user);
});

app.listen({ port: 8888 });
