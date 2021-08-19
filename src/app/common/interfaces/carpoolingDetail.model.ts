import {User} from "./user.model";

export interface CarpoolingDetail {
  id: number;
  datetimeDeparture: Date;
  addressDeparture: string;
  addressArrival: string;
  organize: User;
  reserve: User
}
