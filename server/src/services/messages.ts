import { Request, Response } from 'express';
import { prisma } from "../../prisma/prisma";

export const sendMessage = (req: Request, res: Response) => {
    const senderId = req.user_id;
    
    const { content } = req.body;
    
    if (!content) {
        const error = new Error("You need to send the message");
        throw error;
    }
    try {
        const result = prisma.message.create({
            data: {
                content: content,
                userId: senderId
            }
        });
        return res.status(200).json(result)
    } catch(error) {
        console.error(error)
    }
}

//TODO: Find out why it does not work!!