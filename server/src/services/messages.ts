import {Request, Response} from 'express';
import {prisma} from "../../prisma/prisma";

export const sendMessage = async (req: Request, res: Response) => {
    const senderId = req.user_id;
    
    const { content } = req.body;
    
    if (!content) {
        throw new Error("You need to send the message");
    }
    try {
        const result = await prisma.message.create({
            data: {
                content: content,
                userId: senderId
            }
        });
        console.log(result)
        return res.status(200).json(result)
    } catch(error) {
        console.error(error)
    }
}


export const editMessage = async (req: Request, res: Response) => {
    const { user_id } = req;
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
        throw new Error("Content was not provided");
    }
    try {
        const message = await prisma.message.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!message) {
            throw new Error("You need to send the message");
        };
        if (message.userId !== user_id) {
            throw new Error("You dont have permission");
        };
        const updatedMessage = await prisma.message.update({
            where: {
                id: Number(id)
            },
            data: {
                content
            }
        });
        return res.status(200).json(updatedMessage);
    } catch (error) {
        console.error(error)
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user_id = req.user_id;
    try {
        const message = await prisma.message.findUnique({
            where: {
                id: Number(id),
            }
        });
        if (!message) {
            throw new Error('No message was found!');
        }
        if (message.userId !== user_id) {
            throw new Error("You dont have permission");
        };
        const result = await prisma.message.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json(result);
    } catch (error) {
        console.error(error)
    }
}

//TODO: Find out why it does not work!!