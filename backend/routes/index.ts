import {Application} from "express";
import {restoreUser} from '../utils/auth'
import userRoutes from "./user.routes";

export default class Routes {
    constructor(app: Application) {
        app.use(restoreUser)
        app.use("/api/users", userRoutes);
    }
}