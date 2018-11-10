export interface IConferenceRoom {
  id: string;
  name: string;
  image: string;
  location: {
    lat: number,
    lon: number,
    address: string,
  };
  cost: number;
  capacity: number;
  room: string;
  tags?: string[];
  orders?: IConferenceOrder[];
  company: string;
  createdBy: string;
}

export interface IConferenceOrder {
  start: Date;
  end: Date;
  token: string;
  orderedBy: string;
}