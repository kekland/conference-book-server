interface IUser {
  email: string,
  username: string,
  company?: string,
  hash: string,
  orders: IConferenceOrder[],
  rooms: IConferenceRoom[],
}