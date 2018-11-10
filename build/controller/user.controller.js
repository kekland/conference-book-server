"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("../secret");
class UserController {
    register(email, username, password, company) {
        const hash = bcrypt_nodejs_1.default.hashSync(password);
        let data = {
            email,
            username,
            company,
            hash,
            orders: [],
        };
        let userBefore = this.collection.findOne({ username }) || this.collection.findOne({ email });
        if (userBefore) {
            throw { message: 'User with this username or email was registered before' };
        }
        this.collection.insert(data);
        let token = this.login(username, password);
        return token;
    }
    login(username, password) {
        let user = this.collection.findOne({ username });
        if (user === null) {
            throw { message: 'Invalid username or password' };
        }
        let hashEquals = bcrypt_nodejs_1.default.compareSync(password, user.hash);
        if (hashEquals) {
            let token = jsonwebtoken_1.default.sign({
                email: user.email,
                username: user.username,
                company: user.company
            }, secret_1.tokenKey);
            return { token };
        }
        else {
            throw { message: 'Invalid username or password' };
        }
    }
    constructor(collection) {
        this.collection = collection;
    }
}
exports.UserController = UserController;
