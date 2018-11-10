"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const chalk_1 = __importDefault(require("chalk"));
const conferenceRoom_router_1 = require("./router/conferenceRoom.router");
const user_router_1 = require("./router/user.router");
const bodyParser = require("body-parser");
const lokijs_1 = __importDefault(require("lokijs"));
const onClose = require('async-exit-hook');
const app = express_1.default();
const db = new lokijs_1.default('db.json');
if (db.getCollection('conference') == null) {
    db.addCollection('conference');
}
if (db.getCollection('user') == null) {
    db.addCollection('user');
}
const routers = {
    conference: new conferenceRoom_router_1.ConferenceRouter(db.getCollection('conference')),
    user: new user_router_1.UserRouter(db.getCollection('user'))
};
app.use(bodyParser.json());
app.use('/conferences', routers.conference.getRouter());
app.use('/account', routers.user.getRouter());
app.listen(process.env.PORT, () => {
    logger_1.log(`Listening on port ${chalk_1.default.blue('PORT')}`);
});
onClose((callback) => {
    logger_1.log('Saving database');
    db.save(() => {
        logger_1.log('Database saved');
        callback();
    });
});
