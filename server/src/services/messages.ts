import { prisma } from "../../prisma/prisma";
import { Request, Response, NextFunction } from "express";
export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user_id;
  const { text, conversationId } = req.body;
  try {
    const message = await prisma.message.create({
      data: {
        senderId: userId,
        conversationId,
        text,
      },
    });
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const editMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { msgId } = req.params;
  const userId = req.user_id;
  try {
    const existingMessage = await prisma.message.findUnique({
      where: {
        message_id: Number(msgId),
      },
    });
    if (!existingMessage) {
      const error: any = new Error("Message not found!");
      error.status = 404;
      throw error;
    }
    if (existingMessage.senderId !== userId) {
      const error: any = new Error("Forbidden!");
      error.status = 401;
      throw error;
    }
    const updatedMessage = await prisma.message.update({
      where: {
        message_id: Number(msgId),
      },
      data: {
        text: req.body.newText,
      },
    });
    return updatedMessage;
  } catch (error) {
    next(error);
  }
};
