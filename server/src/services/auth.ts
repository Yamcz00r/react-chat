import { prisma } from "../../prisma/prisma";
import { NextFunction, Request, Response } from "express";
import { hash, genSalt, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { env } from "process";
const jwt_secret = env.JWT_SECRET;

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      const error: any = new Error("This email is already used");
      error.status = 404;
      throw error;
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(data.password, salt);
    const result = await prisma.user.create({
      data: {
        email: data.email,
        name: data.username,
        password: hashedPassword,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.user_id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: Number(id),
      },
    });
    if (!user) {
      const error: any = new Error("There are no user found!");
      error.status = 404;
      throw error;
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userData = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (!existingUser) {
      const error: any = new Error(
        "We could not find the user with this email. Try again",
      );
      error.status = 404;
      throw error;
    }
    const hashedPassword = existingUser.password;
    const isPasswordCorrect = await compare(userData.password, hashedPassword);
    if (!isPasswordCorrect) {
      const error: any = new Error("Bad password. Try again");
      error.status = 404;
      throw error;
    }

    const token = sign({ user_id: existingUser.user_id }, jwt_secret!);

    return res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.user_id;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        user_id: Number(id),
      },
    });
    if (!existingUser) {
      const error: any = new Error(
        "Sorry, we could not find the user with this id.",
      );
      error.status = 404;
      throw error;
    }
    const result = prisma.user.delete({
      where: {
        user_id: Number(id),
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
