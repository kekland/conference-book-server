"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("../secret");
const uuid = require("uuid");
class ConferenceOrderController {
    createOrder(from, to, cost, room, user) {
        let token = jsonwebtoken_1.default.sign({ room, username: user.username, from, to }, secret_1.tokenKey);
        let order = {
            id: uuid.v4(),
            from,
            to,
            cost,
            orderedBy: user.username,
            token: token
        };
        this.userCollection.findAndUpdate({ username: user.username }, (object) => {
            object.orders.push(order);
            return object;
        });
        this.roomCollection.findAndUpdate({ id: room }, (object) => {
            object.orders.push(order);
            return object;
        });
        return order;
    }
    getOrdersForRoom(room, user) {
        let roomObject = this.roomCollection.findOne({ id: room });
        if (roomObject === null) {
            throw { message: 'Room with this ID was not found' };
        }
        if (roomObject.createdBy !== user.username) {
            throw { message: 'Access denied' };
        }
        return roomObject.orders;
    }
    getOrdersForUser(user) {
        let userObject = this.userCollection.findOne({ username: user.username });
        if (userObject !== null) {
            return userObject.orders;
        }
    }
    constructor(userCollection, roomCollection) {
        this.userCollection = userCollection;
        this.roomCollection = roomCollection;
    }
}
exports.ConferenceOrderController = ConferenceOrderController;
