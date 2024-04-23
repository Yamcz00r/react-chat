import { prisma } from "../../prisma/prisma";
import { Request, Response } from "express";
import { hash, genSalt, compare } from "bcrypt";
import { sign } from 'jsonwebtoken';
import { env } from "process";
import { AuthorizationRequest } from "../middleware/jwt";
const jwt_secret = env.JWT_SECRET;

export const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (existingUser) {
        const error = new Error("This email is already used");
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
    return res.status(200).json(result)
  } catch (error) {
    console.error(error);
  }
};

export const getUserData = async (req: Request, res: Response) => {
    const id = req.user_id;
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: Number(id)
            }
        });
        if (!user) {
            const error = new Error('There are no user found!');
            throw error;
        }
        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const userData = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        });
        if (!existingUser) {
            const error = new Error('We could not find the user with this email. Try again');
            throw error;
        }
        const hashedPassword = existingUser.password;
        const isPasswordCorrect = await compare(userData.password, hashedPassword);
        if (!isPasswordCorrect) {
            const error = new Error('Bad password. Try again');
            throw error;
        }

        const token = sign({user_id: existingUser.user_id}, jwt_secret!);
        
        return res.status(200).json({
            token,
        })

    } catch (error) {
        console.error(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                user_id: Number(id),
            }
        });
        if (!existingUser) {
            const error = new Error('Sorry, we could not find the user with this id.');
            throw error;
        }
        const result = prisma.user.delete({
            where: {
                user_id: Number(id)
            }
        });
        return res.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
}