"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conferenceRoom_controller_1 = require("../controller/conferenceRoom.controller");
const express_jwt_1 = __importDefault(require("express-jwt"));
const secret_1 = require("../secret");
class ConferenceRouter {
    constructor(collection) {
        this.router = express_1.default.Router();
        this.controller = new conferenceRoom_controller_1.ConferenceRoomController(collection);
        this.router.get('/', express_jwt_1.default({ credentialsRequired: false, secret: secret_1.tokenKey }), (req, res) => {
            try {
                let objects = this.controller.get();
                res.status(200).send(objects);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.post('/', express_jwt_1.default({ credentialsRequired: true, secret: secret_1.tokenKey }), (req, res) => {
            const data = req.body;
            try {
                let object = this.controller.create(data, req.user);
                res.status(200).send(object);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
        this.router.put('/', (req, res) => {
        });
        this.router.delete('/', express_jwt_1.default({ credentialsRequired: true, secret: secret_1.tokenKey }), (req, res) => {
            const data = req.body;
            try {
                let object = this.controller.remove(data.id, req.user);
                res.status(200).send(object);
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
exports.ConferenceRouter = ConferenceRouter;
