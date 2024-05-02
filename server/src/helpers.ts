import { prisma } from "../prisma/prisma";

export const getUserRooms = async (userId: number) => {
  const rooms = await prisma.conversation.findMany({
    where: {
      members: {
        has: userId.toString(),
      },
    },
    select: {
      conversation_id: true,
    },
  });
  return rooms;
};
