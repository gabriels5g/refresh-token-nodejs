import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization


  if (!authToken) {
    return response.status(401).json({
      message: "Token is missing",
    });
  }



  const [, token] = authToken.split(" ");

  try {
    verify(token, "6aec3a41-acdf-41f8-8ac2-96ff32988531");
    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Token Invalid ",
    });
  }
}