import { JwtPayload, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { env } from "process";

const jwt_secret = env.JWT_SECRET;

export const decryptToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    const error: any = new Error("Not token found");
    error.status = 401;
    throw error;
  }
  try {
    const decodedToken = <JwtPayload>verify(token, jwt_secret!);
    if (!decodedToken) {
      const error: any = new Error("Not authenticated");
      error.status = 401;
      throw error;
    }
    req.user_id = decodedToken.user_id;
  } catch (error) {
    next(error);
  }
  next();
};
