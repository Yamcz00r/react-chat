import {JwtPayload, verify} from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {env} from 'process';
import {Socket} from 'socket.io';


const jwt_secret = env.JWT_SECRET;

export const decryptToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        const error = new Error('Not authorized');
        throw error;
    }
    try {
        const decodedToken = (<JwtPayload>(
            verify(token, jwt_secret!)
        ));
        if (!decodedToken) {
            const error = new Error("Not authenticated");
            throw error;
        }
        req.user_id = decodedToken.user_id;
    } catch (error) {
        console.error(error)
    }
    next();
}

export const socketAuthentication = async (socket: Socket) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        throw new Error('Not authenticated');
    }
    try {
        const data = (<JwtPayload>(
            verify(token, jwt_secret!)
        ));
        if (!data) {
            throw new Error('Something went wrong!');
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}
