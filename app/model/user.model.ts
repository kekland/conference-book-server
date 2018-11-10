
import { IConferenceRoom, IConferenceOrder } from './conferenceRoom.model'
export interface IUser {
  email: string,
  username: string,
  company?: string,
  hash: string,
  orders: IConferenceOrder[],
}