"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const db_config_1 = require("../config/db.config");
const user_model_1 = __importDefault(require("./models/user.model"));
class Database {
    sequelize;
    constructor() {
        this.connectToDatabase();
    }
    async connectToDatabase() {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            logging: (...msg) => console.log(msg),
            database: db_config_1.config.DB,
            username: db_config_1.config.USER,
            password: db_config_1.config.PASSWORD,
            host: db_config_1.config.HOST,
            dialect: db_config_1.dialect,
            // pool: {
            //     max: config.pool.max,
            //     min: config.pool.min,
            //     acquire: config.pool.acquire,
            //     idle: config.pool.idle
            // },
            models: [user_model_1.default]
        });
        await this.sequelize
            .authenticate()
            .then(() => {
            console.log("Connection has been established successfully.");
        })
            .catch((err) => {
            console.error("Unable to connect to the Database:", err);
        });
    }
}
exports.default = Database;
