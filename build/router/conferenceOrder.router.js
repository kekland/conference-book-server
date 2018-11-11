"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const secret_1 = require("../secret");
const conferenceOrder_controller_1 = require("../controller/conferenceOrder.controller");
class OrderRouter {
    constructor(collectionRoom, collectionUser) {
        this.router = express_1.default.Router();
        this.controller = new conferenceOrder_controller_1.ConferenceOrderController(collectionUser, collectionRoom);
        this.router.get('/room', express_jwt_1.default({ secret: secret_1.tokenKey, credentialsRequired: true }), (req, res) => {
            let data = req.body;
            try {
                let orders = this.controller.getOrdersForRoom(data.id, req.user);
                res.status(200).send(orders);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.post('/', express_jwt_1.default({ secret: secret_1.tokenKey, credentialsRequired: true }), (req, res) => {
            let data = req.body;
            try {
                let order = this.controller.createOrder(new Date(data.from), new Date(data.to), data.cost, data.room, req.user);
                res.status(200).send(order);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.get('/user', express_jwt_1.default({ secret: secret_1.tokenKey, credentialsRequired: true }), (req, res) => {
            try {
                let orders = this.controller.getOrdersForUser(req.user);
                res.status(200).send(orders);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        this;
    }
    getRouter() {
        return this.router;
    }
}
exports.OrderRouter = OrderRouter;
