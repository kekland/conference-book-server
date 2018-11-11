"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
class ConferenceRoomController {
    constructor(collection) {
        this.collection = collection;
    }
    get() {
        return this.collection.find();
    }
    getForUser(username) {
        let docs = this.collection.find({ createdBy: username });
        return docs;
    }
    create(data, user) {
        let insertData = {
            id: uuid_1.default.v4(),
            name: data.name,
            image: data.image,
            location: data.location,
            opensAt: data.opensAt,
            closesAt: data.closesAt,
            cost: data.cost,
            capacity: data.capacity,
            room: data.room,
            tags: data.tags,
            company: user.company,
            createdBy: user.username,
            orders: [],
        };
        this.collection.insert(insertData);
        return insertData;
    }
    // tODO: Implement
    update(data, user) {
        let update = this.collection.findAndUpdate({ id: data.id }, (obj) => {
            return data;
        });
        return update;
    }
    remove(id, user) {
        let search = this.collection.findOne({ id });
        if (search === null) {
            throw { message: "Conference room under this ID was not found" };
        }
        if (search.createdBy === user.username) {
            this.collection.findAndRemove({ id });
            return search;
        }
        else {
            throw { message: "Access denied" };
        }
        return search;
    }
}
exports.ConferenceRoomController = ConferenceRoomController;
