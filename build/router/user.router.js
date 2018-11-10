"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
class UserRouter {
    constructor(collection) {
        this.router = express_1.default.Router();
        this.controller = new user_controller_1.UserController(collection);
        this.router.post('/login', (req, res) => {
            const data = req.body;
            try {
                let token = this.controller.login(data.username, data.password);
                res.status(200).send(token);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.post('/register', (req, res) => {
            const data = req.body;
            try {
                let token = this.controller.register(data.email, data.username, data.password, data.company);
                res.status(200).send(token);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.UserRouter = UserRouter;
