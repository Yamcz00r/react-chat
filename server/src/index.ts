import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import auth from "./routes/auth";
import conversation from "./routes/conversation";
import messages from "./routes/messages";
import cors from "cors";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!error.status) {
    error.status = 500;
  }
  res.status(error.status).json({ message: error.message });
};

app.use(cors());
app.use(express.json());
app.use("/auth", auth);
app.use("/room", conversation);
app.use("/message", messages);

app.use(errorHandler);

// const connectionMap = new Map();

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} has been connected`);
  socket.on("newMessage", (message) => {
    console.log(`Client ${socket.id} has sent the message`);
    socket.broadcast.emit("message", message);
  });
});
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
