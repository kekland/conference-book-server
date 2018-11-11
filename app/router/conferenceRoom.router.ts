import express from "express";
import { ConferenceRoomController } from "../controller/conferenceRoom.controller";
import { IConferenceRoom } from "../model/conferenceRoom.model";
import jwt from "express-jwt";
import { tokenKey } from "../secret";
export class ConferenceRouter {
  router: express.Router;
  controller: ConferenceRoomController;

  constructor(collection: Collection<IConferenceRoom>) {
    this.router = express.Router();
    this.controller = new ConferenceRoomController(collection);
    this.router.get("/", jwt({ credentialsRequired: false, secret: tokenKey }), (req, res) => {
      try {
        let objects = this.controller.get();
        res.status(200).send(objects);
      } catch (e) {
        res.status(400).send(e);
      }
    });
    
    //some comment
    this.router.get("/user", jwt({ credentialsRequired: false, secret: tokenKey }), (req, res) => {
      try {
        let objects = this.controller.getForUser(req.body.username);
        res.status(200).send(objects);
      } catch (e) {
        res.status(400).send(e);
      }
    });

    this.router.post("/", jwt({ credentialsRequired: true, secret: tokenKey }), (req, res) => {
      const data = req.body;
      try {
        let object = this.controller.create(data, req.user);
        res.status(200).send(object);
      } catch (e) {
        res.status(400).send(e);
      }
    });

    this.router.delete("/", jwt({ credentialsRequired: true, secret: tokenKey }), (req, res) => {
      const data = req.body;
      try {
        let object = this.controller.remove(data.id, req.user);
        res.status(200).send(object);
      } catch (e) {
        res.status(400).send(e);
      }
    });
  }
  getRouter() {
    return this.router;
  }
}