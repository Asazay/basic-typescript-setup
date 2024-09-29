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
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
function instanceOfUser(object) {
    if (!("username" in object) || !("email " in object) || !('password' in object)) {
        return false;
    }
    else
        return true;
}
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.name) {
                res.status(400).send({
                    message: "Invalid request body"
                });
            }
            try {
                const user = req.body;
                const createdUser = yield user_repository_1.default.create(user);
                res.status(201).send(createdUser);
            }
            catch (e) {
                if (e instanceof Error) {
                    res.status(400).send({
                        message: e.message
                    });
                }
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_repository_1.default.getAll();
                res.status(200).send(users);
            }
            catch (e) {
                if (e instanceof Error) {
                    res.status(400).send({
                        message: e.message
                    });
                }
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.params.userId) {
                res.status(400).send({
                    message: "User id required"
                });
            }
            try {
                const theUser = yield user_repository_1.default.getById(parseInt(req.params.userId));
                if (theUser)
                    res.status(200).send(theUser);
                else
                    res.status(404).send({
                        message: `The user with id ${req.params.userId} doesnt exist.`
                    });
            }
            catch (e) {
                res.status(500).send({
                    message: "A error occurred while attempting to find the user."
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body || req.body.name) {
                res.status(400).send({
                    message: "Invalid request body"
                });
            }
            try {
                const userId = req.params.userId;
                const user = req.body;
                const theUser = yield user_repository_1.default.update(parseInt(userId), user);
                if (theUser)
                    res.status(201).send(theUser);
                else
                    res.status(400).send({
                        message: "A error occurred while trying to update the user."
                    });
            }
            catch (e) {
                if (e instanceof Error) {
                    res.status(500).send({
                        message: e.message
                    });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const deleted = yield user_repository_1.default.delete(userId);
                if (deleted.hasOwnProperty('success')) {
                    res.status(201).send(deleted);
                }
                else
                    res.status(400).send(deleted);
            }
            catch (e) {
                res.status(500).send({
                    message: `Could not delete user with id ${userId}.`
                });
            }
        });
    }
}
exports.default = UserController;
