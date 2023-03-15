import express from "express";
import cors from "cors";
import { SignUpController } from "../src/controller/sign-up-controller";
import { refreshTokenUserController } from "./controller/refresh-token-user-controlle";
import { SignInController } from "./controller/sign-in-controller";
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";
import { prisma } from "./infra/database/repositories/prisma";



const app = express();
app.use(cors());
app.use(express.json());

const createUser = new SignUpController();
const authUser = new SignInController();
const refreshToken = new refreshTokenUserController();

app.post("/users", createUser.execute);
app.post("/login", authUser.handle);
app.post("/refresh-token", refreshToken.handle);


app.get("/profile/:userName", ensureAuthenticated, async (request, response) => {
  const { userName } = request.params
  const users = await prisma.user.findFirst({
    where: {
      userName
    }
  })

  response.json(users)
});


app.listen({ port: 8888 });
