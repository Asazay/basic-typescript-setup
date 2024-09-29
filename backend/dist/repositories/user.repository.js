"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../db/models/user.model"));
class UserRepository {
    // @ts-ignore
    async create(user) {
        try {
            // let hashedPass : string;
            // if (user.password != null) {
            //     hashedPass = hashSync(user.password, 10);
            // }
            const newUser = await user_model_1.default.create({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                password: user.password
            });
            if (newUser)
                return newUser;
            else
                throw new Error("Something went wrong.");
        }
        catch (e) {
            if (e instanceof Error) {
                return e.message;
            }
        }
    }
    // @ts-ignore
    async delete(userId) {
        try {
            const success = await user_model_1.default.destroy({
                where: {
                    id: userId
                }
            });
            if (success)
                return { success: "User successfully deleted" };
        }
        catch (e) {
            if (e instanceof Error) {
                return { message: e.message };
            }
        }
    }
    // @ts-ignore
    async getAll() {
        try {
            return await user_model_1.default.findAll();
        }
        catch (e) {
        }
    }
    // @ts-ignore
    async getById(userId) {
        try {
            return await user_model_1.default.findByPk(userId);
        }
        catch (e) {
            if (e instanceof Error) {
                return e.message;
            }
        }
    }
    // @ts-ignore
    async update(userId, data) {
        const { firstName, lastName, email, username } = data;
        try {
            const updatedUser = await user_model_1.default.update({
                firstName, lastName, email, username
            }, { where: { id: userId }, returning: true });
            if (updatedUser)
                return updatedUser[1];
        }
        catch (e) {
            if (e instanceof Error) {
                return e.message;
            }
        }
    }
}
exports.default = new UserRepository();
