import {Request, Response} from 'express';
import User from '../db/models/user.model';
import UserRepository from '../repositories/user.repository';

interface UserObject {
    firstName?: string
    lastName?: string
    username: string
    email: string
    password: string
}

function instanceOfUser(object: any): boolean {
    if (!("username" in object) || !("email " in object) || !('password' in object)) {
        return false
    } else return true
}

export default class UserController {
    async create(req: Request, res: Response) {
        if (!req.body.email) {
            res.status(400).json({
                message: "Invalid request body"
            })
        }

        try {
            const user: User = req.body;
            const createdUser = await UserRepository.create(user)
            res.status(201).json(createdUser)
        } catch (e) {
            if (e instanceof Error) {
                res.status(400).json({
                    message: e.message
                })
            }
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await UserRepository.getAll()
            res.status(200).json(users)
        } catch (e) {
            if (e instanceof Error) {
                res.status(400).json({
                    message: e.message
                })
            }
        }
    }

    async getById(req: Request, res: Response) {
        if (!req.params.userId || !Number(req.params.userId)) {
            res.status(400).json({
                message: "User id is required"
            })
        }

        else try {

            const theUser = await UserRepository.getById(parseInt(req.params.userId));

            if (theUser) res.status(200).json(theUser)

            else res.status(404).json({
                message: `The user with id ${req.params.userId} doesnt exist.`
            })
        } catch (e) {
            res.status(500).json({
                message: "A error occurred while attempting to find the user."
            })
        }
    }

    async update(req: Request, res: Response) {
        if (!req.body || req.body.name) {
            res.status(400).json({
                message: "Invalid request body"
            })
        }

        try {
            const userId = req.params.userId
            const user: User = req.body;

            const theUser = await UserRepository.update(parseInt(userId), user);

            if (theUser) res.status(201).json(theUser)

            else res.status(400).json({
                message: "A error occurred while trying to update the user."
            })
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message
                })
            }
        }
    }

    async delete(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);

        try {
            const deleted = await UserRepository.delete(userId)

            if (deleted.hasOwnProperty('success')) {
                res.status(201).json(deleted)
            } else res.status(400).json(deleted)
        } catch (e) {
            res.status(500).json({
                message: `Could not delete user with id ${userId}.`
            });
        }
    }
}