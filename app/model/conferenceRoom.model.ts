interface IConferenceRoom {
  location: {
    lat: number,
    lon: number,
    address: string,
  },
  cost: number,
  capacity: number,
  tags?: string[],
  orders?: IConferenceOrder[],
}

interface IConferenceOrder {
  start: Date,
  end: Date,
  token: string,
  orderedBy: string,
}