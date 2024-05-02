import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import auth from "./routes/auth";
import conversation from "./routes/conversation";
import { socket } from "./socket";
const app = express();
const server = createServer(app);
const io = new Server(server);

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!error.status) {
    error.status = 500;
  }
  res.status(error.status).json(error.message);
};

app.use(express.json());
app.use("/auth", auth);
app.use("/room", conversation);

app.use(errorHandler);
server.listen(8080, () => {
  console.log("Server is running on port 8080");
  const io = socket.init(server);
  io.on("connection", (socket) => {
    console.log("Client connected with id: " + socket.id);
  });
});
