import { Request, Response, NextFunction, json } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/responseError";

const jwt = require("jsonwebtoken");

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: `Error Validation: ${JSON.stringify(error)}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const jwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication Failed !, Please Insert Token Into Header",
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
    console.log(err);

    if (err) {
      throw new ResponseError(401, "Invalid Bearer JWT Token !")
    }

    next()
  });
};
