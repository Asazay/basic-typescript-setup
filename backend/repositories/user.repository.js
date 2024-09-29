"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../db/models/user.model"));
const bcrypt_ts_1 = require("bcrypt-ts");
class UserRepository {
    // @ts-ignore
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hashedPass;
                if (user.password != null) {
                    hashedPass = (0, bcrypt_ts_1.hashSync)(user.password, 10);
                }
                const newUser = yield user_model_1.default.create({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    password: (0, bcrypt_ts_1.hashSync)(user.password, 10)
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
        });
    }
    // @ts-ignore
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield user_model_1.default.destroy({
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
        });
    }
    // @ts-ignore
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findAll();
            }
            catch (e) {
            }
        });
    }
    // @ts-ignore
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findByPk(userId);
            }
            catch (e) {
                if (e instanceof Error) {
                    return e.message;
                }
            }
        });
    }
    // @ts-ignore
    update(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, username } = data;
            try {
                const updatedUser = yield user_model_1.default.update({
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
        });
    }
}
exports.default = new UserRepository();
