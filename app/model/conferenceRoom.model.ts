export interface IConferenceRoom {
  id: string;
  name: string;
  image: string;
  location: string;
  opensAt: string;
  closesAt: string;
  cost: string;
  capacity: string;
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