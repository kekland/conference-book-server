import express from 'express'
import { UserController } from '../controller/user.controller';
import { IUser } from '../model/user.model'
export class UserRouter {
  router: express.Router;
  controller: UserController;

  constructor(collection: Collection<IUser>) {
    this.router = express.Router()
    this.controller = new UserController(collection)
    this.router.post('/login', (req, res) => {
      const data = req.body
      try {
        let token = this.controller.login(data.username, data.password)
        res.status(200).send(token)
      }
      catch(e) {
        res.status(400).send(e)
      }
    })

    this.router.post('/register', (req, res) => {
      const data = req.body
      try {
        let token = this.controller.register(data.email, data.username, data.password, data.company)
        res.status(200).send(token)
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