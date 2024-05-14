import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/prisma";

export const getConversationForUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user_id.toString();
  try {
    const rooms = await prisma.conversation.findMany({
      where: {
        members: {
          has: userId,
        },
      },
    });

    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { chatId } = req.params;
  try {
    const chat = await prisma.conversation.findUnique({
      where: {
        conversation_id: +chatId,
      },
      include: {
        Message: true,
      },
    });
    if (!chat) {
      const error: any = new Error("Conversation not found!");
      error.status = 404;
      throw error;
    }
    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user_id.toString();
  try {
    const result = await prisma.conversation.create({
      data: {
        conversation_name: req.body.conversationName,
        members: [userId, ...req.body.membersId],
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const conversationId = req.params.id;
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        conversation_id: Number(conversationId),
      },
    });
    if (!conversation) {
      const error: any = new Error("Conversation not found!");
      error.status = 404;
      throw error;
    }
    const result = await prisma.conversation.delete({
      where: {
        conversation_id: Number(conversationId),
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
