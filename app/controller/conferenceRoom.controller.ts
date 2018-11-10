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
      company: (user) ? user.company : 'Company',
      createdBy: (user) ? user.username : 'Username',
      orders: [],
    } as IConferenceRoom

    this.collection.insert(insertData)

    return insertData
  }

  //TODO: Implement
  update(data: IConferenceRoom, user?: IUser) {
    let update = this.collection.findAndUpdate({id: data.id}, (obj) => {
      return data
    })
    return update
  }

  remove(id: string, user?: IUser) {
    let search = this.collection.findAndRemove({ id: id })
    if (search === null) {
      throw { message: 'Conference room under this ID was not found' }
    }
    return search
  }
}