import express from 'express'
import { ConferenceRoomController } from '../controller/conferenceRoom.controller';
import { IConferenceRoom } from '../model/conferenceRoom.model'
export class ConferenceRouter {
  router: express.Router;
  controller: ConferenceRoomController;

  constructor(collection: Collection<IConferenceRoom>) {
    this.router = express.Router()
    this.controller = new ConferenceRoomController(collection)
    this.router.get('/', (req, res) => {
      try {
        let objects = this.controller.get()
        res.status(200).send(objects)
      }
      catch (e) {
        res.status(400).send(e)
      }
    })

    this.router.post('/', (req, res) => {
      const data = req.body
      try {
        let object = this.controller.create(data, undefined)
        res.status(200).send(object)
      }
      catch(e) {
        res.status(400).send(e)
      }
    })

    this.router.put('/', (req, res) => {

    })

    this.router.delete('/', (req, res) => {
      const data = req.body
      try {
        let object = this.controller.remove(data.id, undefined)
        res.status(200).send(object)
      }
      catch(e) {
        res.status(400).send(e)
      }
    })
  }
  getRouter() {
    return this.router
  }
}