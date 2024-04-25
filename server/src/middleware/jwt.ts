import { verify, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { env } from 'process';


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