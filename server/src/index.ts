import express, { NextFunction } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import auth from './routes/auth';
import messages from './routes/messages';
import { socketAuthentication } from "./middleware/jwt";
import { prisma } from "../prisma/prisma";


const app = express();
const server = createServer(app);
const io = new Server(server)


app.use(express.json())
app.use('/auth', auth);
app.use('/message', messages);



io.on('connection', async (socket) => {
    const roomId = socket.handshake.query.roomId;
    if (!roomId) {
        throw new Error("No room id was provided");
    }
    const userId = socket.handshake.query.userId;
    if (!userId) {
        throw new Error("No user was found");
    }
    socket.join(roomId)

    socket.on('message', async (data) => {
        if (!data) {
            throw new Error('No message was sent');
        }
       const result = await prisma.message.create({
           data: {
               content: data.message,
               userId: data.user_id,
               chatRoomId: data.chatRoomId
           }
       });
       socket.to(roomId).emit('new_message', result)
    });
    //Does not work for now

})

server.listen(8080, () => {
    console.log("Server is running on port 8080")
})