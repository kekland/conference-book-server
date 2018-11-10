import loki from 'lokijs'
import { IConferenceRoom } from '../model/conferenceRoom.model'
import { IUser } from '../model/user.model'
import uuid from 'uuid'

export class ConferenceRoomController {
  collection: loki.Collection<IConferenceRoom>;
  constructor(collection: loki.Collection<IConferenceRoom>) {
    this.collection = collection
  }

  get() {
    return this.collection.find()
  }

  create(data: IConferenceRoom, user?: IUser) {
    let insertData = {
      id: uuid.v4(),
      location: data.location,
      cost: data.cost,
      capacity: data.capacity,
      room: data.room,
      tags: data.tags,
      company: (user)? user.company : 'Company',
      createdBy: (user)? user.username : 'Username',
      orders: [],
    } as IConferenceRoom
    
    this.collection.insert(insertData)

    return insertData
  }

  //TODO: Implement
  update(user: IUser, data: IConferenceRoom) {

  }

  remove(id: string, user?: IUser) {
    let search = this.collection.find({id: id})
    return search
  }
}