import * as express from 'express';
import * as socket from 'socket.io';
declare global {
    namespace Express {
        interface Request {
            user_id: number
        }
    }
}