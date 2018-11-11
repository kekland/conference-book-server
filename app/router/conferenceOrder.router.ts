import express from "express";
import { ConferenceRoomController } from "../controller/conferenceRoom.controller";
import { IConferenceRoom } from "../model/conferenceRoom.model";
import jwt from "express-jwt";
import { tokenKey } from "../secret";
import { ConferenceOrderController } from "../controller/conferenceOrder.controller";
import { IUser } from "../model/user.model";
export class OrderRouter {
  router: express.Router;
  controller: ConferenceOrderController;

  constructor(collectionRoom: Collection<IConferenceRoom>, collectionUser: Collection<IUser>) {
    this.router = express.Router();
    this.controller = new ConferenceOrderController(collectionUser, collectionRoom);
    this.router.get('/room', jwt({secret: tokenKey, credentialsRequired: true}), (req, res) => {
      let data = req.body
      try {
        let orders = this.controller.getOrdersForRoom(data.id, req.user)
        res.status(200).send(orders)
      }
      catch(e) {
        res.status(400).send(e)
      }
    })
    this.router.post('/', jwt({secret: tokenKey, credentialsRequired: true}), (req, res) => {
      let data = req.body
      try {
        let order = this.controller.createOrder(new Date(data.from), new Date(data.to), data.cost, data.room, req.user)
        res.status(200).send(order)
      }
      catch(e) {
        res.status(400).send(e)
      }
    })
    this.router.get('/user', jwt({secret: tokenKey, credentialsRequired: true}), (req, res) => {
      try {
        let orders = this.controller.getOrdersForUser(req.user)
        res.status(200).send(orders)
      }
      catch(e) {
        res.status(400).send(e)
      }
    })
    this
  }
  getRouter() {
    return this.router;
  }
}