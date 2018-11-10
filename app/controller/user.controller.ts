import { IUser } from "../model/user.model";
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import { tokenKey } from '../secret'

export class UserController {
  collection: Collection<IUser>;

  register(email: string, username: string, password: string, company?: string) {
    const hash = bcrypt.hashSync(password)
    let data = {
      email,
      username,
      company,
      hash,
      orders: [],
      rooms: [],
    } as IUser

    let userBefore = this.collection.findOne({ username }) || this.collection.findOne({ email })
    if (userBefore) {
      throw { message: 'User with this username or email was registered before' }
    }
    this.collection.insert(data)
    let token = this.login(username, password)
    return token
  }

  login(username: string, password: string) {
    let user = this.collection.findOne({ username })
    if (user === null) {
      throw { message: 'Invalid username or password' }
    }
    let hashEquals = bcrypt.compareSync(password, user.hash)
    if (hashEquals) {
      let token = jwt.sign({
        email: user.email,
        username: user.username,
        company: user.company
      }, tokenKey)
      return { token }
    }
    else {
      throw { message: 'Invalid username or password' }
    }
  }

  constructor(collection: Collection<IUser>) {
    this.collection = collection
  }
}