// backend/utils/auth.ts
import {Request, Response, NextFunction} from "express";
import {UserInterface}  from '../interfaces/interfaces'

import jwt from 'jsonwebtoken';
import {config} from '../config/db.config';
import User from '../db/models/user.model';
import exp from "node:constants";

class AuthError extends Error{
    private title: string;
    private errors : object;
    private status : number;

    constructor(message:string = '', title = '', errors = {}, status = 401) {
        super(message);
        this.title = title;
        this.errors = errors;
        this.status = status;
    }
}

const { secret, expiresIn } = config.jwtConfig

// Sends a JWT Cookie
const setTokenCookie = (res: Response, user: any) => {
    // Create the token.
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    // @ts-ignore
    const token = jwt.sign(
        { data: safeUser },
        {Secret: secret},
        { expiresIn: expiresIn ? parseInt(expiresIn) : 1000000 } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn ? parseInt(expiresIn) * 1000 : 1000000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "lax"
    });

    return token;
};

export const restoreUser = (req: Request, res: Response, next: NextFunction) => {
    // token parsed from cookies
    const { token } = req.cookies;

    // @ts-ignore
    if(req.user) req.user = null;

    // @ts-ignore
    return jwt.verify(token, secret, null, async (err : any, jwtPayload : any) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            // @ts-ignore
            req.user = await User.findByPk(id, {
                attributes: {
                    include: ['email', 'createdAt', 'updatedAt']
                }
            });
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        // @ts-ignore
        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
const requireAuth = function (req : Request, _res : Response, next : NextFunction) {
    // @ts-ignore
    if (req.user) return next();

    const err = new AuthError('Authentication required', 'Authentication Required', {
        message: 'Authentication Required'
    }, 401);

    return next(err);
}

const checkAuth = (userId : number, ownerId : number) => {
    return userId === ownerId;
}

module.exports = { setTokenCookie, restoreUser, requireAuth };