import { IUser } from "../model/user.model";
import { IConferenceRoom, IConferenceOrder } from "../model/conferenceRoom.model";
import jwt from 'jsonwebtoken'
import { tokenKey } from '../secret'
import uuid = require("uuid");
export class ConferenceOrderController {
  userCollection: Collection<IUser>;
  roomCollection: Collection<IConferenceRoom>;

  createOrder(from: Date, to: Date, cost: string, room: string, user: IUser) {
    let token = jwt.sign({room, username: user.username, from, to}, tokenKey)
    let order = {
      id: uuid.v4(),
      from,
      to,
      cost,
      orderedBy: user.username,
      token: token
    } as IConferenceOrder
    this.userCollection.findAndUpdate({username: user.username}, (object) => {
      object.orders.push(order)
      return object
    })
    this.roomCollection.findAndUpdate({id: room}, (object) => {
      object.orders.push(order)
      return object
    })
    return order
  }

  getOrdersForRoom(room: string, user: IUser) {
    let roomObject = this.roomCollection.findOne({id: room})
    if(roomObject === null) {
      throw {message: 'Room with this ID was not found'}
    }
    if(roomObject.createdBy !== user.username) {
      throw {message: 'Access denied'}
    }
    return roomObject.orders
  }

  getOrdersForUser(user: IUser) {
    let userObject = this.userCollection.findOne({username: user.username})
    if(userObject !== null) {
      return userObject.orders
    }
  }
  constructor(userCollection: Collection<IUser>, roomCollection: Collection<IConferenceRoom>) {
    this.userCollection = userCollection;
    this.roomCollection = roomCollection;
  }
}