import {Router} from 'express';
import UserController from "../controllers/user.controller";

class UserRoutes{
    router = Router();
    controller = new UserController()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Create a new User
        this.router.post("/", this.controller.create);

        // Get all Users
        this.router.get("/", this.controller.getAll);

        // Get user by id
        this.router.get("/:userId", this.controller.getById);

        // Update user with id
        this.router.put("/:userId", this.controller.update);

        // Delete a user with id
        this.router.delete("/:userId", this.controller.delete);
    }
}

export default new UserRoutes().router